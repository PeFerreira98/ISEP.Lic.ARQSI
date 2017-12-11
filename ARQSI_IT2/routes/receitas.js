var express = require('express');
var HttpStatus = require('http-status-codes');
var request = require('request');
var Config = require('../config');
var Receita = require('../models/receita');
var User = require('../models/user');
var VerifyToken = require('../auth/verifyToken');
var VerifyRole = require('../auth/verifyRole');
var smtp2go = require('../smtp2go');

var router = express.Router();

// (GET <site>/api/receita/apresentacao/:id)
router.get('/apresentacao/:apresentacaoID', function (req, res, next) {
    request(
        { uri: Config.IT1 + '/apresentacao/' + req.params.apresentacaoID }
    ).pipe(res);
});

// (GET <site>/api/receita/apr/)
router.get('/apr/', function (req, res, next) {
    request(
        { uri: Config.IT1 + '/apresentacao' }
    ).pipe(res);
});

// (GET <site>/api/receita)
router.get('/', VerifyToken, function (req, res) {
    Receita.find(function (err, receitas) {
        if (err) res.send(err);
        res.json(receitas);
    });
});

// (POST <site>/api/receita)
router.post('/', VerifyToken, function (req, res) {
    VerifyRole.verifyRole(req.user, 'medico', function (decision) {
        if (!decision) {
            return res.status(403).send({
                auth: false, token: null, message: 'Yu have no Auth!'
            });
        }

        User.findOne({
            email: req.user
        },
            function (err, user) {
                if (err) throw err;

                currentUserId = user._id;

                if (req.body.paciente != null) {
                    if (req.body.paciente != currentUserId) {

                        var receita = new Receita();

                        receita.medico = currentUserId;
                        receita.paciente = req.body.paciente;
                        receita.data = new Date(Date.now());

                        if (req.body.prescricoes != null || req.body.prescricoes.length > 0) {

                            eachAsync(req.body.prescricoes, res, receita, getApresentacao);

                        } else {
                            res.status(HttpStatus.BAD_REQUEST).json({ message: "nao foram inseridas prescricoes" });
                        }
                    } else {
                        res.status(HttpStatus.BAD_REQUEST).json({ message: "Nao pode fazer receitas para si proprio" });
                    }
                } else {
                    res.status(HttpStatus.BAD_REQUEST).json({ message: "Paciente em falta" });
                }
            })
    });
});

// (GET <site>/api/receita/:id)
router.get('/:receita_id', function (req, res) {
    Receita.findById(req.params.receita_id, function (err, receita) {
        if (err) res.send(err);
        res.json(receita);
    });
});

// (PUT <site>/api/receita/:id)
router.put('/:receita_id', function (req, res) {
    Receita.findById(req.params.receita_id, function (err, receita) {
        if (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
        } if (receita == null) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: "Receita não encontrada" });
        } else if (checkAviamentos(receita)) {
            res.status(HttpStatus.FORBIDDEN).json({ message: "Receita já aviada" });
        } else {

            if (req.body.data != null) {
                receita.data = new Date(req.body.data);
            }

            receita.save(function (err) {
                if (err) res.send(err);
                res.json({ message: 'Receita updated!' });
            });
        }
    });
});

function eachAsync(prescricoesArray, res, receita, func) {
    var doneCounter = 0,
        results = [];
    prescricoesArray.forEach(function (item) {
        func(item.apresentacaoID, function (apresentacao) {
            doneCounter += 1;

            var prescricao = {
                numero: item.numero,
                apresentacaoID: item.apresentacaoID,
                apresentacao: String(apresentacao),
                //posologiaPrescrita: String,
                //posologiaID: String,
                //farmaco: item.apresentacao.farmacoNome,
                quantidade: item.quantidade,
                validade: new Date(item.validade),
                aviamentos: [] // sem aviamentos aquando da criacao
            }

            receita.prescricoes.push(prescricao);

            if (doneCounter === prescricoesArray.length) {
                receita.save(function (err) {
                    if (err) res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
                    sendEmail(receita.paciente, receita._id);
                    res.status(HttpStatus.CREATED).json(receita);
                });
            }
        });
    });
}

function getApresentacao(apresentacaoID, res) {
    console.log(Config.IT1 + 'apresentacao/' + apresentacaoID);
    request(
        { uri: Config.IT1 + 'apresentacao/' + apresentacaoID },
        function (error, response, body) {
            if (error) res.status(HttpStatus.SERVICE_UNAVAILABLE).json({ message: "Servidor API1 down" });
            return res(body);
        }
    );
}

function sendEmail(userID, receitaID) {
    User.findOne({
        _id: userID
    },
        function (err, user) {
            if (err) throw err;
            smtp2go.sendEmail("zerostellar@gmail.com", receitaID);
            smtp2go.sendEmail(user.email, receitaID);
        }
    )
}

function checkAviamentos(receita) {
    for (var i = 0; i < receita.prescricoes.length; i++) {
        if (receita.prescricoes[i].aviamentos.length > 0) {
            return true;
        }
    }
    return false;
}

module.exports = router;
