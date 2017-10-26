import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hasFirebaseConfigured: false,
    hasElasticSearch: false,
    isLoggedIn: false,
    userId: '',
    user: null,
    team: null,
    users: { /* [id: string]: User */ },
    channels: { /* [id: string]: Channel */ },
    messages: { /* [Channel id: Object with message ids as keys and message objects as values] */ }
  },
  actions,
  mutations,
  getters
})
