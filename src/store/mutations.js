import Vue from 'vue'

export default {
  // mutations
  SET_CONFIGURED: (state) => {
    state.hasFirebaseConfigured = true
  },
  SET_LOGIN: (state) => {
    state.isLoggedIn = true
  },
  SET_CHANNELS: (state, { channels }) => {
    channels.forEach(channel => {
      var channelValue = channel.val()
      if (channelValue) {
        Vue.set(state.channels, channel.key, channelValue)
      }
    })
  },
  SET_USERS: (state, { users }) => {
    users.forEach(user => {
      var userValue = user.val()
      if (userValue) {
        Vue.set(state.users, user.key, userValue)
      }
    })
  },
  SET_MESSAGES: (state, { channelId, messages }) => {
    if (!state.messages.hasOwnProperty(channelId)) {
      Vue.set(state.messages, channelId, {})
    }
    messages.forEach(message => {
      var messageValue = message.val()
      messageValue.id = message.key
      if (messageValue) {
        Vue.set(state.messages[channelId], messageValue.id, messageValue)
      }
    })
  },
  SET_MESSAGE: (state, { channelId, message }) => {
    Vue.set(state.messages[channelId], message.id, message)
  }
}
