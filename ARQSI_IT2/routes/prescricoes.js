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

// (GET <site>/api/receitas/:id/prescricao)
router.get('/:receita_id/prescricao', function (req, res) {
    Receita.findById(req.params.receita_id, function (err, receita) {
        if (err) res.send(err);
        res.json(receita.prescricoes);
    });
});

// (GET <site>/api/receitas/:id1/prescricao/:id2)
router.get('/:receita_id/prescricao/:presc_id', function (req, res) {
    Receita.findById(req.params.receita_id, function (err, receita) {
        if (err) res.send(err);

        var presc = receita.prescricoes[req.params.presc_id];

        if (presc != 'undefined' && presc != null) {
            res.status(HttpStatus.OK).json(presc);
        } else {
            res.status(HttpStatus.NOT_FOUND).json({ message: "Prescricao does not exist" });
        }
    });
});

// (PUT <site>/api/receita/:id1/prescricao/:nr/aviar/:qtd)
router.put('/:receita_id/prescricao/:presc_id/aviar/:quant', VerifyToken, function (req, res) {
    VerifyRole.verifyRole(req.user, 'farmaceutico', function (decision) {
        if (!decision) {
            return res.status(403).send({
                auth: false, token: req.headers['x-access-token'], message: 'Yu have no Auth!'
            });
        }

        Receita.findById(req.params.receita_id, function (err, receita) {
            if (err) res.send(err);

            var presc = receita.prescricoes[req.params.presc_id];

            if (presc != 'undefined' && presc != null) {
                var quantidadeAaviar = req.params.quant;
                var quantidadeTotal = presc.quantidade;
                var quantidadeAviada = 0;
                var quantidadePorAviar = 0;

                presc.aviamentos.forEach(function (aviamento) {
                    quantidadeAviada += aviamento.quantidade;
                });

                quantidadePorAviar = quantidadeTotal - quantidadeAviada;

                console.log(quantidadeTotal + ' '
                    + quantidadeAviada + ' '
                    + quantidadeAaviar + ' '
                    + quantidadePorAviar);

                if (quantidadePorAviar != 0) {
                    if (quantidadePorAviar >= quantidadeAaviar) {

                        var aviamento = {
                            farmaceutico: req.userId,
                            data: new Date(),
                            quantidade: quantidadeAaviar
                        }

                        receita.prescricoes[req.params.presc_id].aviamentos.push(aviamento);
                        receita.save(function (err) {
                            if (err) {
                                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
                            }
                        });

                        res.status(HttpStatus.CREATED).json(receita);
                    } else {
                        res.status(HttpStatus.FORBIDDEN).json({ message: "Quantidade a aviar maior que quantidade disponivel" });
                    }
                } else {
                    res.status(HttpStatus.FORBIDDEN).json({ message: "Prescricao aviada totalmente" });
                }
            } else {
                res.status(HttpStatus.NOT_FOUND).json({ message: "Prescricao does not exist" });
            }
        });
    });
});

module.exports = router;