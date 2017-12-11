var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var User = require('../models/user');
var VerifyToken = require('../auth/verifyToken');
var VerifyRole = require('../auth/verifyRole');
var Receita = require('../models/receita');
var smtp2go = require('../smtp2go');

var router = express.Router();

// (GET <site>/api/user)
router.get('/', VerifyToken, function (req, res) {
  VerifyRole.verifyRole(req.user, 'medico', function (decision) {
    if (!decision) {
      return res.status(403).send({
        auth: false, token: null, message: 'Yu have no Auth!'
      });
    }

    User.find(function (err, users) {
      if (err) res.send(err);
      res.json(users);
    });

  });
});

// (POST <site>/api/user/register)
router.post('/register', function (req, res) {
  var user = new User();
  user.name = req.body.name;
  user.password = bcrypt.hashSync(req.body.password, 8);
  user.email = req.body.email;
  user.medico = req.body.medico;
  user.farmaceutico = req.body.farmaceutico;
  user.paciente = req.body.paciente;

  user.save(function (err) {
    console.log("Saving User...");
    if (err) return res.status(500).send("Problem Registering User.");
    res.json({ message: 'User Registered!' });
  });
});

// (POST <site>/api/user/login)
router.post('/login', function (req, res) {

  User.findOne({
    email: req.body.email
  },
    function (err, user) {
      if (err) throw err;

      if (!user) { res.json({ success: false, message: 'Authentication failed. Check Username.' }); }
      else if (user) {
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
          return res.status(401).send({ auth: false, token: null, message: 'Authentication Failed. Check Password.' });
        }
        else {
          const payload = {
            userId: user._id,
            user: user.email,
            medico: user.medico,
            farmaceutico: user.farmaceutico,
            utente: user.paciente
          };
          var token = jwt.sign(payload, config.secret); //never expires

          res.json({ success: true, message: 'Here is yr Token', token: token });
        }
      }
    });
});

// (GET <site>/api/user/:user_id/prescricao/poraviar)
router.get('/:user_id/prescricao/poraviar', function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    if (user === null) res.status(HttpStatus.BAD_REQUEST).json({ message: "User not found" });

    Receita.find(function (err, receitas) {
      if (err) res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);

      var prescricaoUtente = [];

      receitas.forEach(function (receita) {
        receita.prescricoes.forEach(function (prescricao) {
          if (!totallyAviada(prescricao)) prescricaoUtente.push(prescricao);
        });
      });

      res.json(prescricaoUtente);
    });
  });
});

function totallyAviada(prescricao) {
  var quantidade = prescricao.quantidade;

  prescricao.aviamentos.forEach(function (aviamento) {
    quantidade -= aviamento.quantidade;
  });

  if (quantidade === 0) return true;
  return false;
}

module.exports = router;
