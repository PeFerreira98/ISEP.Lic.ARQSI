var nodemailer = require('nodemailer');
var config = require('./config');

var transporter = nodemailer.createTransport({
    host: "mail.smtp2go.com",
    port: 2525,
    auth: {
        user: config.smtp2User,
        pass: config.smtp2Passwd
    }
});

module.exports = {
    sendEmail: function sendEmail(email, codReceita) {

        var emailConfig = {
            from: "aviamentoDeReceitas@arqsi.com",
            to: email,
            subject: "Codigo de receita",
            text: "A sua receita ja foi emitida com o código: " + codReceita
        };

        transporter.sendMail(emailConfig, function (error, response) {
            if (error) {
                console.log(">>" + error);
                //res.status(500).send("there was a problem sending email.");
            } else {
                console.log("Message sent!");
                //res.send("email sent!");
            }
        });
    }
}