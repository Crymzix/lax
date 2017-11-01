var express = require('express');
var router = express.Router();
var serverConfig = require('../server-config.json');
var data = require('../firebase/data');

const isEmpty = function (str) {
  return (!str || 0 === str.length);
}

const re = new RegExp('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')

// Public facing API to handle client to server communication for sensitive data.
router.post('/test_secret', function(req, res, next) {
  var secret = req.body.secret;
  res.json({
    match: secret === serverConfig.secret
  });
});

router.post('/create', function(req, res, next) {
  var secret = req.body.secret;
  var teamName = req.body.team_name;
  var displayName = req.body.display_name;
  var email = req.body.email;
  var password = req.body.password;

  if (secret === serverConfig.secret) {
    if (isEmpty(teamName)) {
      res.status(400).send('Missing team name');
      return;
    }
    if (isEmpty(displayName)) {
      res.status(400).send('Missing display name');
      return;
    } else if (displayName.indexOf(' ') >= 0) {
      res.status(400).send('Display name cannot have spaces');
      return;
    }
    if (isEmpty(email)) {
      res.status(400).send('Missing email');
      return;
    } else if (!re.test(email)) {
      res.status(400).send('Invalid email');
      return;
    }
    if (isEmpty(password)) {
      res.status(400).send('Missing password');
      return;
    } else if (password.length < 8) {
      res.status(400).send('Incorrect password length');
      return;
    }

    data.createTeam(teamName, displayName, email, password)
      .then(function() {
        res.status(200).send('Success');
      })
      .catch(function(error) {
        res.status(500).send(error.message);
      });
  } else {
    res.status(401).send('Invalid secret');
  }
});

router.post('/send_invites', function(req, res, next) {
  var token = req.body.token;
  var invites = req.body.invites;

  if (isEmpty(token)) {
    res.status(400).send('Missing token');
    return;
  }

  if (!invites) {
    res.status(400).send('Missing "invites" parameter');
    return;
  } else {
    // filter invites for any empty email fields and invalid emails,
    // check if resulting invites contain at least 1 valid email.
    invites = invites.filter(function(invite) {
      return invite.email !== null && invite.email !== ''
        && re.test(invite.email);
    });

    if (invites.length < 1) {
      res.status(400).send('Need at least one valid email.');
      return;
    }
  }

  data.verifyToken(token)
    .then(function() {
      data.sendInvites(req, res, invites)
        .then(function() {
          res.status(200).send('Success');
        })
        .catch(function(error) {
          res.status(500).send(error.message);
        });
    })
    .catch(function(error) {
      console.log(error.message);
      res.status(401).send('Token error');
    });
});

router.post('/verify_email_token', function(req, res, next) {
  var token = req.body.token;
  if (isEmpty(token)) {
    res.status(400).send('Missing token');
    return;
  }
  data.verifyEmailToken(token)
    .then(function(val) {
      if (val === 1) { // verified
        res.status(200).send('Success');
      } else if (val === 2) { // expired, data resent.
        res.status(200).send('Expired');
      }
    })
    .catch(function(error) {
      res.status(500).send(error.message);
    });
});

router.post('/resend_verification', function(req, res, next) {
  var token = req.body.token;
  if (isEmpty(token)) {
    res.status(400).send('Missing token');
    return;
  }
  data.resendVerificationToken(req, res, token)
    .then(function() {
      res.status(200).send('Resent verification email.');
    })
    .catch(function(error) {
      res.status(500).send(error.message);
    });
});

router.post('/set_account', function(req, res, next) {
  var token = req.body.token;
  var displayName = req.body.display_name;
  var password = req.body.password;
  if (isEmpty(token)) {
    res.status(400).send('Missing token');
    return;
  }

  if (isEmpty(displayName)) {
    res.status(400).send('Display name is missing.');
    return;
  }

  if (isEmpty(password)) {
    res.status(400).send('Password is missing');
    return;
  } else if (password.length < 8) {
    res.status(400).send('Incorrect password length');
    return;
  }

  data.setAccount(token, displayName, password)
    .then(function() {
      res.status(200).send('Success');
    })
    .catch(function(error) {
      res.status(500).send(error.message);
    });
});

module.exports = router;
