// Bootstraps the database with a readable flag to indicate that the database
// has not been initialized.
var admin =  require('firebase-admin');
var request = require('request');

var serviceAccount = require('./serviceAccountKey.json');
var databaseUrl = require('./src/config.json').databaseURL;

if (serviceAccount !== null && databaseUrl !== null) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: databaseUrl
  });
}

var database = admin.database();
database.ref('configured')
  .once('value')
  .then(function (snapshot) {
    var exists = (snapshot.val() !== null)
    if (!exists) {
      // 'configured' flag does not exist. Create the flag and set it to false.
      database.ref('configured').set(false)
        .then(function () {
          console.log('\'configured\' flag set.');
          setConfigFlagRules();
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  })
  .catch(function (err) {
    console.log(err)
  });

// Sets the security rules for the 'configured' field for public access,
// as the client facing application needs to query this field to determine what
// page to show on first run.
function setConfigFlagRules() {
  var url = databaseUrl + "/.settings/rules.json?auth=" + serviceAccount.secret;
  request.put(url, {
          json: {
            "rules": {
              ".read": "auth != null",
              ".write": "auth != null",
              "configured": {
                ".read": true
              }
            }
          }
      },
      function(err, response, body) {
        if (err) {
          console.log(err);
        } else {
          console.log('Security rules configured.');
        }
      });
}
