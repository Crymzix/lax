<template>
  <div class="main">
    <invitemodal v-if="shouldShowInviteModal" v-on:closeInviteModal="showInviteModal(false)"></invitemodal>
    <addchannelmodal v-if="shouldShowAddChannelModal" v-on:closeAddChannelModal="showAddChannelModal(false)"></addchannelmodal>
    <sidemenu
      v-on:showProfile="showProfile"
      v-on:changedChannelId="changeChannelId"
      v-on:userSelected="changeUserChannelId"
      v-on:showAddChannelModal="showAddChannelModal(true)"
      v-on:showInviteModal="showInviteModal(true)"
      class="sidemenu">
    </sidemenu>
    <div class="right_container">
      <headerbar
        class="header"
        :channel-id="currentChannelId">
      </headerbar>
      <messagelist
        v-on:showCommentInput="showCommentInput"
        class="message_list"
        :channel-id="currentChannelId"
        v-bind:class="{ collapsed: shouldShowInfoContainer}">
      </messagelist>
      <composer class="composer"></composer>
    </div>
    <sideinfocontainer
      v-on:closeInfoContainer="showInfoContainer(false)"
      v-on:openInfoContainer="showInfoContainer(true)"
      class="side_info_container"
      :message-id="currentMessageId"
      :channel-id="currentChannelId"
      :type="infoType"
      :open="shouldShowInfoContainer"
      v-bind:class="{ visible: shouldShowInfoContainer }">
    </sideinfocontainer>
  </div>
</template>

<script>
import SideMenu from '../components/SideMenu.vue'
import MessageList from '../components/MessageList.vue'
import Composer from '../components/Composer.vue'
import InviteModal from '../components/InviteModal.vue'
import AddChannelModal from '../components/AddChannelModal.vue'
import Header from '../components/Header.vue'
import SideInfoContainer from '../components/SideInfoContainer.vue'
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
    'invitemodal': InviteModal,
    'addchannelmodal': AddChannelModal,
    'headerbar': Header,
    'sideinfocontainer': SideInfoContainer
  },
  data () {
    return {
      currentMessageId: this.$store.state.currentMessageId,
      currentChannelId: this.$store.state.user.last_viewed_channel_id,
      shouldShowInviteModal: false,
      shouldShowAddChannelModal: false,
      shouldShowInfoContainer: false,
      infoType: ''
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
    changeUserChannelId: function () {
      this.currentChannelId = this.$store.state.user.last_viewed_channel_id
      this.fetchMessages()
    },
    showInviteModal: function (shouldShow) {
      this.shouldShowInviteModal = shouldShow
    },
    showAddChannelModal: function (shouldShow) {
      this.shouldShowAddChannelModal = shouldShow
    },
    showCommentInput: function () {
      this.infoType = 'comment'
      this.shouldShowInfoContainer = true
    },
    showProfile: function () {
      this.infoType = 'profile'
      this.shouldShowInfoContainer = true
    },
    showInfoContainer: function (show) {
      this.shouldShowInfoContainer = show
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  width: 1920px;
  height: 1080px;
  overflow: hidden;
  position: fixed;
}

.side_info_container.visible {
  position: absolute;
  top: 0;
  right: 0;
  width: 400px;
  height: calc(82vh - 70px);
  -webkit-transition: width 0.5s ease-in-out;
  -moz-transition: width 0.5s ease-in-out;
  -o-transition: width 0.5s ease-in-out;
  transition: width 0.5s ease-in-out;
}

.side_info_container {
  position: absolute;
  top: 0;
  right: 0;
  width: 0px;
  height: calc(82vh - 70px);
  -webkit-transition: width 0.25s ease-in-out;
  -moz-transition: width 0.25s ease-in-out;
  -o-transition: width 0.25s ease-in-out;
  transition: width 0.25s ease-in-out;
}

.right_container {
  width: 100%;
  height: 100vh;
  vertical-align: top;
}

.sidemenu {
  float: left;
  width: 220px;
  height: 100vh;
  vertical-align: top;
}

.composer {
  width: 100%;
  height: calc(100% - 82vh);
}

.message_list {
  height: calc(82vh - 70px);
  width: 100%;
  -webkit-transition: width 0.25s ease-in-out;
  -moz-transition: width 0.25s ease-in-out;
  -o-transition: width 0.25s ease-in-out;
  transition: width 0.25s ease-in-out;
}

.message_list.collapsed {
  width: calc(100% - 400px);
  -webkit-transition: width 0.5s ease-in-out;
  -moz-transition: width 0.5s ease-in-out;
  -o-transition: width 0.5s ease-in-out;
  transition: width 0.5s ease-in-out;
}

.header {
  height: 70px;
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
