// Bootstraps the database with a readable flag to indicate that the database
// has not been initialized.
var admin =  require('firebase-admin');
var request = require('request');

var serviceAccount = require('../server-config.json');
var databaseUrl = require('../src/config.json').databaseURL;
var worker = require('./worker');

if (serviceAccount !== null && databaseUrl !== null) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: databaseUrl
  });
}

var database = admin.database();
worker.initialize(database);
module.exports.database = database;

var auth = admin.auth();
module.exports.auth = auth;

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

// Sets the security rules for the 'configured' field to public,
// as the client facing application needs to query this field to determine what
// page to show on first run.
function setConfigFlagRules() {
  var url = databaseUrl + "/.settings/rules.json?auth=" + serviceAccount.secret;
  request.put(url, {
          json: {
            "rules": {
              "configured": {
                ".read": true
              },
              "channels": {
                ".read": true,
                ".indexOn": "timestamp",
                "$channel_id": {
                  ".read" : "root.child('members/' + $channel_id + '/' + auth.uid).exists() && auth != null",
                  ".write": "root.child('members/' + $channel_id + '/' + auth.uid).exists() && auth != null"
                }
              },
              "channel-messages": {
                "$channel_id" : {
                  ".read" : "root.child('members/' + $channel_id + '/' + auth.uid).exists() && auth != null",
                  ".write" : "root.child('members/' + $channel_id + '/' + auth.uid).exists() && auth != null",
                  ".indexOn": "timestamp",
                  "$message_id" : {
                    ".read" : "root.child('members/' + $channel_id + '/' + auth.uid).exists() && auth != null"
                  }
                }
              },
              "user-channels": {
                "$user_id": {
                	".read": "auth.uid == $user_id && auth != null"
                }
              },
              "messages": {
                ".write" : "auth != null"
              },
              "users": {
                ".read": true,
                ".indexOn": "timestamp",
                "$uid": {
                  ".read": true,
                  ".write": "$uid === auth.uid"
                }
              },
              "team": {
              	".read":true
              },
              "queue": {
                "tasks": {
                  ".write": "auth != null",
                  ".indexOn": "_state"
                }
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
