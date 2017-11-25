var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var User = require('../models/user');
var VerifyToken = require('../auth/verifyToken');
var VerifyRole = require('../auth/verifyRole');

global.currentUserId

// on routes that end in /api/users ----------------------
var router = express.Router();

//test purposes (GET <site>/api/users/all)
router.get('/all', function (req, res) {
  User.find(function (err, users) {
    if (err) res.send(err);
    res.json(users);
  })
});

//list all Users (GET <site>/api/users)
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
    })

  });
});

//register User (POST <site>/api/users/register)
router.post('/register', function (req, res) {
  var user = new User();
  user.name = req.body.name;
  user.password = bcrypt.hashSync(req.body.password,8);
  user.email = req.body.email;
  user.medico = req.body.medico;
  user.farmaceutico = req.body.farmaceutico;
  user.paciente = req.body.paciente;

  user.save(function (err) {
    console.log("Saving User...");
    if (err) return res.status(500).send("Problem Registering User.");
    res.json({ message: 'User Registered!' });
  })
});

//login User (POST <site>/api/users/login)
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
          return res.status(401).send({ auth: false, token: null, message: 'Authentication Failed. Check Password.' })
        }
        else {
          const payload = { user: user.email };
          var token = jwt.sign(payload, config.secret);
          
          currentUserId = user._id

          res.json({ success: true, message: 'Here is yr Token', token: token });
        }

      }
    });
});

module.exports = router;
