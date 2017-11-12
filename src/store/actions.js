import {
  create,
  login,
  fetchChannels,
  fetchUsers,
  fetchMessages,
  sendMessage,
  setCurrentChannelId
} from '../api'

export default {
  CREATE_TEAM: ({ commit }, { secret, teamName, displayName, email, password }) => {
    return create(secret, teamName, displayName, email, password)
      .then(() => commit('SET_CONFIGURED'))
  },
  LOGIN: ({ commit }, { email, password }) => {
    return login(email, password)
      .then(() => commit('SET_LOGIN'))
  },
  FETCH_CHANNELS: ({ commit, state }) => {
    return fetchChannels()
      .then(channels => commit('SET_CHANNELS', { channels }))
  },
  FETCH_USERS: ({ commit, state }) => {
    return fetchUsers()
      .then(users => commit('SET_USERS', {users}))
  },
  FETCH_MESSAGES: ({ commit, state }, { channelId }) => {
    return fetchMessages(channelId)
      .then(messages => commit('SET_MESSAGES', { channelId, messages }))
  },
  SEND_MESSAGE: ({ commit, state }, { messageInput }) => {
    var user = state.user
    var channelId = user.last_viewed_channel_id
    return sendMessage(user, state.userId, channelId, messageInput)
      .then(message => commit('SET_MESSAGE', { channelId, message }))
  },
  SET_CURRENT_CHANNEL: ({ commit, state }, { channelId }) => {
    return setCurrentChannelId(state.userId, channelId)
      .then(() => commit('SET_CURRENT_CHANNEL', { channelId }))
  }
}
