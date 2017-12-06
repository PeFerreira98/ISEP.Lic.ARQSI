var User = require('../models/user');

module.exports = {
  verifyRole: function verifyRole(userEmail, role, func) {
    User.findOne({
      email: userEmail
    },
      function (err, user) {
        if (err) throw err;

        if (!user) {
          res.json({ success: false, message: 'Authentication failed.' });
        }

        if (user) {
          if (role === 'medico' && user.medico === true) {
             return func(true);
          }
          if (role === 'farmaceutico' && user.farmaceutico === true) {
            return func(true);
          }
          if (role === 'paciente' && user.paciente === true) {
            return func(true);
          }
          return func(false);
        }
      }
    )
  }
};