// Though this will most likely be a single node application. We use a Queue
// to coordinate work between listeners in case we decide to horizontally scale
// the application to multiple nodes.
var Queue = require('firebase-queue');
var firebase = require('firebase');
var anchorme = require("anchorme").default;
var ogs = require('open-graph-scraper');

var database;

module.exports.initialize = function (db) {
  console.log('Worker initialized.');
  if (!db) {
    console.log('Error assigning database.');
    return;
  }
  database = db;
  var ref = database.ref('queue');

  // start listening for tasks being pushed on to the work queue.
  var queue = new Queue(ref, function(data, progress, resolve, reject) {
    if (data.type === 'message') {
      processMessageTask(data, resolve, reject);
    } else if (data.type === 'channel') {
      processChannelTask(data, resolve, reject);
    } else {
      reject("Invalid data type.");
    }
  });
}

function processChannelTask(data, resolve, reject) {
  fanOutChannel(data)
    .then(function(channel) {
      resolve();
    })
    .catch(function(error) {
      reject(error);
    });
}

function fanOutChannel(data) {
  var channel = data;
  var update = {};
  update['/members/' + channel.id + '/' + channel.creator_id] = true;
  channel.creator_id = null;
  if (channel.invites) {
    channel.invites.forEach(function(invite) {
      update['/members/' + channel.id + '/' + invite.user_id] = true;
    });
    channel.invites = null;
  }
  channel.type = null;

  update['/channels/' + channel.id] = channel;
  return database.ref().update(update)
    .then(function() {
      return channel;
    });
}

function processMessageTask(data, resolve, reject) {
  fanOutMessage(data)
    .then(function(message) {
      return updateChannel(message);
    })
    .then(function(message) {
      return populateUrlMetadata(message);
    })
    .then(function() {
      resolve()
    })
    .catch(function(error) {
      reject(error);
    });
}

// Grab Open Graph data and populate meta data about the first url mentioned in
// the message content.
function populateUrlMetadata(message) {
  return new Promise(function(resolve, reject) {
    var urls = anchorme(message.message, { list: true });
    if (urls.length >= 1) {
      var options = {'url': urls[0].raw, 'timeout': 4000};
      ogs(options, function(error, results) {
        if (error) {
          reject(error);
        } else {
          var data = results.data;
          if (results.success) {
            var meta = {
              title: data.ogTitle,
              description: data.ogDescription,
              url: data.ogUrl,
              photo_url: data.ogImage.url
            };
            database.ref('/channel-messages/' + message.channel_id + '/' + message.id + '/meta').set(meta)
              .then(function() {
                resolve();
              })
              .catch(function(error) {
                reject(error);
              });
          } else {
            resolve();
          }
        }
      });
    } else {
      resolve();
    }
  });
}

function updateChannel(message) {
  var channelRef = database.ref('/channels/' + message.channel_id);
  return channelRef.once('value')
    .then(function(snapshot) {
      var channel = snapshot.val();
      channel.last_message = message.message;
      channel.last_message_id = message.id;
      channel.last_message_timestamp = firebase.database.ServerValue.TIMESTAMP;
      channel.message_count = channel.message_count + 1;
      return channelRef.set(channel);
    })
    .then(function() {
      return message;
    });
}

function fanOutMessage(data) {
  var message = data;
  // clear out the 'type' field as it provides no use except for the queue to
  // distinguish which task it is.
  message.type = null;

  // perform fan-out
  var update = {};
  update['/messages/' + message.id] = message;
  update['/channel-messages/' + message.channel_id + '/' + message.id] = message;
  return database.ref().update(update)
    .then(function() {
      return message;
    });
}
