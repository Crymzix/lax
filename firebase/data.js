var firebase = require('firebase')
var firebaseModule = require('../firebase');
var database = firebaseModule.database;
var auth = firebaseModule.auth;

module.exports.createTeam = function(teamName, displayName, email, password) {
  return new Promise(function(resolve, reject) {
    // Create the first user.
    auth.createUser({
      email: email,
      password: password,
      emailVerified: true,
      displayName: displayName,
      disabled: false
    })
    .then(function(userRecord) {
      // Save user meta-data
      var userObject = userRecord.toJSON();
      var user = {
        email: userObject.email,
        emailVerified: userObject.emailVerified,
        displayName: userObject.displayName,
        disabled: userObject.disabled
      };

      // Creating default messages to be put in default channels
      var firstGeneralMessage = {
        user_id: "lax_bot",
        name: "lax",
        photoUrl: null,
        message: "This is the general channel! Generally speaking...",
        timestamp: firebase.database.ServerValue.TIMESTAMP
      };
      var firstGeneralMessageKey = database.ref('messages').push().key;

      var firstRandomMessage = {
        user_id: "lax_bot",
        name: "lax",
        photoUrl: null,
        message: "Welcome to the random channel! Let's get weird",
        timestamp: firebase.database.ServerValue.TIMESTAMP
      };
      var firstRandomMessageKey = database.ref('messages').push().key;

      // Creating default channels
      var generalChannel = {
        name: "general",
        member_count: 1,
        message_count: 1,
        last_message: "This is the general channel! Generally speaking...",
        last_message_id: firstGeneralMessageKey,
        deletable: false,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      };
      var generalChannelKey = database.ref('channels').push().key;

      var randomChannel = {
        name: "random",
        member_count: 1,
        message_count: 1,
        last_message: "Welcome to the random channel! Let's get weird.",
        last_message_id: firstRandomMessageKey,
        deletable: false,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      };
      var randomChannelKey = database.ref('channels').push().key;

      // Bulk-update
      var update = {};
      update['/messages/' + generalChannelKey + '/' + firstGeneralMessageKey] = firstGeneralMessage;
      update['/messages/' + randomChannelKey + '/' + firstRandomMessageKey] = firstRandomMessage;
      update['/channels/' + generalChannelKey] = generalChannel;
      update['/channels/' + randomChannelKey] = randomChannel;
      update['/users/' + userObject.uid] = user;
      update['/users_channels/' + userObject.uid + '/'+ generalChannelKey] = generalChannel;
      update['/users_channels/' + userObject.uid + '/' + randomChannelKey] = randomChannel;
      update['/members/' + generalChannelKey + '/' + userObject.uid] = true;
      update['/members/' + randomChannelKey + '/' + userObject.uid] = true;
      update['/configured/'] = true;
      database.ref().update(update)
        .then(function() {
          resolve();
        })
        .catch(function(error) {
          reject(error);
        });
    })
    .catch(function(error) {
      reject(error);
    });
  });
}
