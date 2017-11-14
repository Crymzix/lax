import Vue from 'vue'

export default {
  // mutations
  SET_CONFIGURED: (state) => {
    state.hasFirebaseConfigured = true
  },
  SET_LOGIN: (state) => {
    state.isLoggedIn = true
  },
  SET_ONLINE: (state) => {
    Vue.set(state.users[state.userId], 'online', true)
  },
  SET_CHANNELS: (state, { channels }) => {
    channels.forEach(channel => {
      var channelValue = channel.val()
      if (channelValue) {
        channelValue.id = channel.key
        Vue.set(state.channels, channel.key, channelValue)
      }
    })
  },
  SET_CHANNEL: (state, { channel }) => {
    Vue.set(state.channels, channel.id, channel)
  },
  SET_USER_CHANNELS: (state, { userChannels }) => {
    userChannels.forEach(channel => {
      var channelValue = channel.val()
      if (channelValue) {
        channelValue.id = channel.key
        Vue.set(state.userChannels, channel.key, channelValue)
      }
    })
  },
  SET_USER_CHANNEL: (state, { channel }) => {
    Vue.set(state.userChannels, channel.id, channel)
  },
  SET_USERS: (state, { users }) => {
    users.forEach(user => {
      var userValue = user.val()
      if (userValue) {
        userValue.id = user.key
        Vue.set(state.users, user.key, userValue)
      }
    })
  },
  SET_USER: (state, { user }) => {
    Vue.set(state.users, user.key, user.val())
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
  },
  SET_CURRENT_CHANNEL: (state, { channelId }) => {
    Vue.set(state.user, 'last_viewed_channel_id', channelId)
  },
  SET_CURRENT_USER_CHANNEL: (state, { channelId }) => {
    state.lastViewedUserChannelId = channelId
  }
}
