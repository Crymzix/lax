// Though this will most likely be a single node application. We use a Queue
// to coordinate work between listeners in case we decide to horizontally scale
// the application to multiple nodes.
var Queue = require('firebase-queue');
var firebase = require('firebase');

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
      fanOutMessage(data)
        .then(function(message) {
          return updateChannel(message);
        })
        .then(function() {
          resolve();
        })
        .catch(function(error) {
          reject(error);
        })
    } else {
      reject("Invalid data type.");
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
