import Firebase from 'firebase'
import axios from 'axios'

const config = require('../config.json')

let database

export function initializeFirebase (store) {
  console.log('Initializing Firebase...')
  var firebase = Firebase.initializeApp(config)
  database = firebase.database()
  return checkConfiguration(store)
}

function checkConfiguration (store) {
  return database.ref('configured')
    .once('value')
    .then(function (snapshot) {
      var exists = (snapshot.val() !== null)
      if (exists) {
        var isConfigured = snapshot.val()
        store.state.hasFirebaseConfigured = isConfigured
      }
    })
    .catch(function (err) {
      console.log(err)
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
