import Firebase from 'firebase'
import axios from 'axios'

const config = require('../config.json')

let database
let auth

export function initializeFirebase (store) {
  console.log('Initializing Firebase...')
  var firebase = Firebase.initializeApp(config)
  database = firebase.database()
  auth = firebase.auth()
  return checkConfiguration(store)
}

function checkConfiguration (store) {
  var databaseConfigured = checkDatabaseConfigured(store)
  var loggedIn = checkLoggedIn(store)
  return Promise.all([databaseConfigured, loggedIn])
}

function checkDatabaseConfigured (store) {
  return database.ref('configured')
    .once('value')
    .then(function (snapshot) {
      var exists = (snapshot.val() !== null)
      if (exists) {
        var isConfigured = snapshot.val()
        store.state.hasFirebaseConfigured = isConfigured
      }
    })
}

function checkLoggedIn (store) {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        store.state.isLoggedIn = true
        store.state.userId = user.uid
        var userPromise = fetchUser(user.uid, store)
        var teamPromise = fetchTeam(store)
        Promise.all([userPromise, teamPromise])
          .then(() => {
            resolve()
          })
      } else {
        store.state.isLoggedIn = false
        resolve()
      }
    })
  })
}

export function checkSecret (newSecret) {
  return axios.post('/api/test_secret', {
    secret: newSecret
  })
}

export function create (secret, teamName, displayName, email, password) {
  return axios.post('/api/create', {
    secret: secret,
    team_name: teamName,
    display_name: displayName,
    email: email,
    password: password
  })
}

export function sendInvites (invites) {
  return auth.currentUser.getIdToken(true)
    .then((token) => {
      return axios.post('/api/send_invites', {
        token: token,
        invites: invites
      })
    })
}

export function login (email, password) {
  return auth.signInWithEmailAndPassword(email, password)
}

export function fetchUser (userId, store) {
  return database.ref('/users/' + userId)
    .once('value')
    .then(function (snapshot) {
      var exists = (snapshot.val() !== null)
      if (exists) {
        store.state.user = snapshot.val()
      }
    })
}

export function fetchTeam (store) {
  return database.ref('team')
    .once('value')
    .then(function (snapshot) {
      var exists = (snapshot.val() !== null)
      if (exists) {
        store.state.team = snapshot.val()
      }
    })
}

export function fetchChannels (userId) {
  return database.ref('/user_channels/' + userId)
    .once('value')
    .then(function (snapshot) {
      return snapshot
    })
}

export function fetchUsers () {
  return database.ref('users')
    .once('value')
    .then(function (snapshot) {
      return snapshot
    })
}

export function fetchMessages (channelId) {
  return database.ref('/messages/' + channelId)
    .once('value')
    .then(function (snapshot) {
      return snapshot
    })
}

export function sendMessage (user, userId, channelId, messageInput) {
  var message = {
    user_id: userId,
    name: user.display_name,
    message: messageInput,
    timestamp: Firebase.database.ServerValue.TIMESTAMP
  }
  if (user.photo_url) {
    message.photo_url = user.photo_url
  }
  var messageKey = database.ref('messages').push().key
  var update = {}
  update['/messages/' + channelId + '/' + messageKey] = message
  return database.ref().update(update)
    .then(function () {
      message.id = messageKey
      // artificially set the timestamp property as Firebase.database.ServerValue.TIMESTAMP
      // doesn't actually set the timestamp (it merely acts as an indicator to tell the
      // database to use the server time when writing).
      message.timestamp = Date.now()
      return message
    })
}

export function setCurrentChannelId (userId, channelId) {
  var update = {}
  update['/users/' + userId + '/last_viewed_channel_id'] = channelId
  return database.ref().update(update)
}
