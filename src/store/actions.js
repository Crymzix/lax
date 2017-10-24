import {
  create,
  login,
  fetchChannels
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
    return fetchChannels(state.userId)
      .then(channels => commit('SET_CHANNELS', { channels }))
  }
}
