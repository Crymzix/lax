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
  }
}
