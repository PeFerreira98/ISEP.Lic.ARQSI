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
          func(role === 'medico' && user.medico === true);
        }
      }
    )
  }
};