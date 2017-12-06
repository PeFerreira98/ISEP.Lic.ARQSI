var jwt = require('jsonwebtoken');
var config = require('../config');

function verifyToken(req, res, next){
    var token = req.headers['x-access-token'];
    
    if(!token) {
        return res.status(403).send({ auth: false, message: 'No Token provided.' });
    }

    jwt.verify(token, config.secret, function(err, decoded) {
        if(err) {
            return res.status(500).send({ auth: false, message: 'Failed to auth Token.' });
        }

        req.user = decoded.user;
        req.userId = decoded.userId;
        next();
    });
}

module.exports = verifyToken;