var express = require('express');
var HttpStatus = require('http-status-codes');
var request	   = require('request');
var Config = require('../config');
var Receita = require('../models/receita');
var User = require('../models/user');

// on routes that end in /api/receitas ----------------------
var router = express.Router();

// add Receita (POST <site>/api/receitas)
router.post('/new', function (req, res) {
    currentUserId = "5a0b119850524829d0af47f7";
    if (req.body.paciente != null) {
        if (req.body.paciente != currentUserId) {

            var receita = new Receita();

            receita.medico = currentUserId;
            receita.paciente = req.body.paciente;
            receita.data = new Date(Date.now());

            if (req.body.prescricoes != null || req.body.prescricoes.length > 0) {

                /*for (var i = 0; i < req.body.prescricoes.length; i++) {
                    if (req.body.prescricoes[i].validade == null || 
                        //req.body.prescricoes[i].quantidadePrescrita == null || 
                        //req.body.prescricoes[i].posologia == null || 
                        req.body.prescricoes[i].apresentacao_id == null) {
                        
                        res.status(HttpStatus.BAD_REQUEST).json({ message: "Preencha os campos da prescrição todos: validade, quantidadePrescrita, posologia, apresentacao_id" });
                        break;
                    }
                }*/
                
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
});

function eachAsync(prescricoesArray, res, receita, func) {
    var doneCounter = 0,
    results = [];
    prescricoesArray.forEach(function (item) {
        func(item.apresentacaoID, function (apresentacao) {
            doneCounter += 1;

            console.log(item);
            console.log(apresentacao);

            var prescricao = {
                numero: item.numero,
                apresentacaoID: item.apresentacaoID,
                apresentacao: apresentacao,
                //posologiaPrescrita: String,
                //posologiaID: String,
                //farmaco: item.apresentacao.farmacoNome,
                quantidade: item.quantidade,
                validade: item.validade,
                aviamentos: [] // sem aviamentos aquando da criacao
            }

            console.log(prescricao);

            receita.prescricoes.push(prescricao);

            console.log(receita.prescricoes);

            if (doneCounter === prescricoesArray.length) {
                receita.save(function (err) {
                    if (err) res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
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
            return res(String(body));
            //return res("apresentacaoString");
        }
    );
}        

router.get('/apresentacao/:apresentacaoID', function(req, res, next) {
    request(
      { uri: Config.IT1 + '/apresentacao/' + req.params.apresentacaoID }
    ).pipe(res);      
});

// create a Receita
router.post('/', function (req, res) {

    var receita = new Receita();
    //receita.nome = req.body.nome;

    receita.save(function (err) {
        if (err) res.send(err);
        res.json({ message: 'Receita created!' });
    });

});

// get all the Receitas
router.get('/', function (req, res) {
    Receita.find(function (err, receitas) {
        if (err) res.send(err);
        res.json(receitas);
    });
});

// get the receita with that id
router.get('/:receita_id', function (req, res) {
    Receita.findById(req.params.receita_id, function (err, receita) {
        if (err) res.send(err);
        res.json(receita);
    });
});

// update the receita with this id
router.put('/:receita_id', function (req, res) {
    Receita.findById(req.params.receita_id, function (err, receita) {
        if (err) res.send(err);

        receita.name = req.body.name;
        receita.save(function (err) {
            if (err) res.send(err);
            res.json({ message: 'Receita updated!' });
        });

    });
});

module.exports = router;
