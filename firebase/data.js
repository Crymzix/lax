var firebase = require('firebase')
var firebaseModule = require('../firebase');
var mailer = require('../api/mailer');
var crypto = require('crypto');
var database = firebaseModule.database;
var auth = firebaseModule.auth;

module.exports.sendInvites = function(req, res, invites) {
  // create Promises for each email where we create the user, and then
  // send an verification email to each user.
  var inviteTasks = [];
  invites.forEach(function(invite) {
    var user = {};
    user.email = invite.email;
    if (user.name) {
      user.displayName = user.name;
    } else {
      user.displayName = '';
    }
    user.emailVerified = true; // set to true as a formality since we use our own verification logic

    var inviteTask = auth.createUser(user)
      .then(function(userRecord) {
        // Create user meta-data
        var userObject = userRecord.toJSON();
        var user = {
          email: userObject.email,
          email_verified: false,
          display_name: userObject.displayName,
          disabled: userObject.disabled,
          is_admin: false,
          last_viewed_channel_id: "",
          online: false,
          status: 'offline',
          timestamp: firebase.database.ServerValue.TIMESTAMP
        };

        // Create data for verification
        var verification = {
          user_id: userObject.uid,
          expiration: Date.now() + 86400000 // 24 hour expiration
        };

        return createVerificationToken(userObject.uid, user, verification);
      })
      .then(function(result) {
        var update = {};
        update['/users/' + result.userId] = result.user;
        update['/verifications/' + result.token] = result.verification;
        return database.ref().update(update)
          .then(function() {
            return result;
          });
      })
      .then(function(result) {

        var email = result.user.email;
        var name;
        if (result.user.display_name) {
          name = result.user.display_name;
        } else {
          name = '';
        }
        var link = 'http://' + req.headers.host + '/verify/' + result.token;
        return mailer.sendVerificationEmail(res, email, name, link);
      })
      .catch(function(error) {
        console.log(error.message);
      });
    inviteTasks.push(inviteTask);
  });

  return Promise.all(inviteTasks);
}

function createVerificationToken(userId, user, verification) {
  return new Promise(function(resolve, reject) {
    crypto.randomBytes(48, function(err, buffer) {
      if (err) {
        reject(err);
      } else {
        var token = buffer.toString('hex');
        var result = {
          userId: userId,
          user: user,
          verification: verification,
          token: token
        };
        resolve(result);
      }
    });
  });
}

module.exports.verifyToken = function(token) {
  return auth.verifyIdToken(token);
}

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
        email_verified: userObject.emailVerified,
        display_name: userObject.displayName,
        disabled: userObject.disabled,
        is_admin: true,
        last_viewed_channel_id: "",
        online: false,
        status: 'offline',
        timestamp: firebase.database.ServerValue.TIMESTAMP
      };

      // Creating default messages to be put in default channels
      var firstGeneralMessage = {
        user_id: "lax_bot",
        name: "lax",
        photo_url: null,
        message: "This is the general channel! Generally speaking...",
        timestamp: firebase.database.ServerValue.TIMESTAMP
      };
      var firstGeneralMessageKey = database.ref('messages').push().key;

      var firstRandomMessage = {
        user_id: "lax_bot",
        name: "lax",
        photo_url: null,
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
      user.last_viewed_channel_id = generalChannelKey;

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

      var team = {
        team_name: teamName,
        member_count: 1,
        channel_count: 2
      };

      // Bulk-update
      var update = {};
      update['/messages/' + generalChannelKey + '/' + firstGeneralMessageKey] = firstGeneralMessage;
      update['/messages/' + randomChannelKey + '/' + firstRandomMessageKey] = firstRandomMessage;
      update['/channels/' + generalChannelKey] = generalChannel;
      update['/channels/' + randomChannelKey] = randomChannel;
      update['/users/' + userObject.uid] = user;
      update['/user_channels/' + userObject.uid + '/'+ generalChannelKey] = generalChannel;
      update['/user_channels/' + userObject.uid + '/' + randomChannelKey] = randomChannel;
      update['/members/' + generalChannelKey + '/' + userObject.uid] = true;
      update['/members/' + randomChannelKey + '/' + userObject.uid] = true;
      update['/team/'] = team;
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
