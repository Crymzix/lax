var express = require('express');
var router = express.Router();
var serviceAccount = require('../serviceAccountKey.json');

// Public facing API to handle client to server communication for sensitive
// data. Primarily used in the initial workspace creation process.
router.post('/test_secret', function(req, res, next) {
  var secret = req.body.secret;
  res.json({
    match: secret === serviceAccount.secret
  });
});

module.exports = router;
