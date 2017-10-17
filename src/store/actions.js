import { create } from '../api'

export default {
  CREATE_TEAM: ({ commit }, { secret, teamName, displayName, email, password }) => {
    return create(secret, teamName, displayName, email, password)
      .then(() => commit('SET_CONFIGURED'))
  }
}
