<template>
  <div class="main">
    <invitemodal v-if="shouldShowInviteModal" v-on:closeInviteModal="showInviteModal(false)"></invitemodal>
    <sidemenu v-on:changedChannelId="changeChannelId" v-on:showInviteModal="showInviteModal(true)" class="sidemenu"></sidemenu>
    <div class="right_container">
      <messagelist class="message_list" :channel-id="currentChannelId"></messagelist>
      <composer class="composer"></composer>
    </div>
  </div>
</template>

<script>
import SideMenu from '../components/SideMenu.vue'
import MessageList from '../components/MessageList.vue'
import Composer from '../components/Composer.vue'
import InviteModal from '../components/InviteModal.vue'
import {
  presenceListener,
  watchMessages
} from '../api'

export default {
  name: 'messages',
  components: {
    'sidemenu': SideMenu,
    'messagelist': MessageList,
    'composer': Composer,
    'invitemodal': InviteModal
  },
  data () {
    return {
      currentChannelId: this.$store.state.user.last_viewed_channel_id,
      shouldShowInviteModal: false
    }
  },
  mounted () {
    this.fetchMessages()
    presenceListener(this.$store.state.userId, () => {
      this.$store.commit('SET_ONLINE')
    })
  },
  beforeDestroy () {
    watchMessages(false)
  },
  methods: {
    fetchMessages: function () {
      this.$store.dispatch('FETCH_MESSAGES', {
        channelId: this.currentChannelId
      })
      .then(() => {
        watchMessages(false) // unwatch previous, if any.
        watchMessages(true, this.currentChannelId, (message) => {
          this.$store.commit('SET_MESSAGE', {
            channelId: this.currentChannelId,
            message: message
          })
        })
      })
    },
    changeChannelId: function () {
      this.currentChannelId = this.$store.state.user.last_viewed_channel_id
      this.fetchMessages()
    },
    showInviteModal: function (shouldShow) {
      this.shouldShowInviteModal = shouldShow
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main {

}

.right_container {
  width: 100%;
  height: 100vh;
  vertical-align: top;
}

.sidemenu {
  float: left;
  width: 250px;
  height: 100vh;
  vertical-align: top;
}

.composer {
  width: 100%;
  height: calc(100% - 82vh);
}

.message_list {
  height: 82vh;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

html, body {
   width: 100%;
   height: 100%;
 }

body {
  margin: 0;
  padding: 0;
}
</style>
