var nodemailer = require('nodemailer');
var mail = require('../server-config.json').mail;

const transporter = nodemailer.createTransport(mail);

module.exports.sendVerificationEmail = function(res, email, name, link) {
  return new Promise(function(resolve, reject) {
    res.render('verification', {
      name: name,
      verificationLink: link
    }, function(err, html) {
      if (err) {
        reject(err);
      } else {
        var mailOptions = {
            from: '"Admin" <admin@lax.workspace.com>',
            to: email,
            subject: 'Lax Email Verification ✔',
            text: 'Verify your account.',
            html: html
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
        });
      }
    });
  });
}
