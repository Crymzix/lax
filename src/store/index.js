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
    lastViewedUserChannelId: '',
    currentMessageId: '' /* The current message id the user selected to comment on */,
    user: null,
    team: null,
    users: { /* [id: string]: User */ },
    channels: { /* [id: string]: Channel */ },
    userChannels: { /* [id: string]: Channel (we call direct messages user channels as they have essentially the same schema as normal channels */ },
    messages: { /* [Channel id: Object with message ids as keys and message objects as values] */ }
  },
  actions,
  mutations,
  getters
})
