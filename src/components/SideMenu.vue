<template>
  <div class="root">
    <div class="user_info_container">
      <img class="user_image" :src="user.photo_url" src="~../assets/user.png"/>
      <div class="name_container">
        <h2>{{ team.team_name }}</h2>
        <h1>{{ user.display_name }}</h1>
      </div>
    </div>
    <div>
      <h3 class="heading">channels</h3>
      <img class="add_icon" v-tooltip.top-center="'Create a channel'" v-on:click="addChannel" src="~../assets/plus.png"/>
    </div>
    <ul class="channel_list">
      <li v-for="channel in channels" class="channel_item">
        <div v-on:click="selectChannel(channel.id)" class="channel_item_container" v-bind:class="{ active: channel.id === currentChannelId }">
          # {{ channel.name }}
          <div class="message_indicator">1</div>
        </div>
      </li>
    </ul>
    <div>
      <h3 class="heading">messages</h3>
      <img class="add_icon" v-tooltip.top-center="'Open a direct message'"v-on:click="directMessage" src="~../assets/plus.png"/>
    </div>
    <ul class="direct_message_list">
      <li v-for="message in messageList" class="direct_message_item">
        <div v-on:click="selectUser(message.userId)" class="direct_message_item_container" v-bind:class="{ active: message.channelId === currentChannelId || message.userId === currentChannelId}">
          <div class="status_icon" v-bind:class="{ online: message.isOnline }">
          </div>
          <p class="message_name">
            @ {{ message.displayName }}
          </p>
        </div>
      </li>
    </ul>
    <div class="invite_heading" v-on:click="showInviteModal">+ Invite</div>
  </div>
</template>

<script>
import {
  watchChannels,
  watchUserChannels,
  watchUsers
} from '../api'

export default {
  name: 'sidemenu',
  data () {
    return {
      user: this.$store.state.user,
      team: this.$store.state.team,
      channels: this.$store.state.channels,
      userChannels: this.$store.state.userChannels,
      currentChannelId: this.$store.state.user.last_viewed_channel_id
    }
  },
  beforeMount () {
    this.fetchChannels()
    this.fetchUserChannels()
    this.fetchUsers()
  },
  beforeDestroy () {
    watchChannels(false)
    watchUserChannels(false)
    watchUsers(false)
  },
  computed: {
    // renders the message list data based on how many retrieved user channels
    // (direct messages) there are.
    messageList: function () {
      var messageList = []
      var users = this.$store.state.users
      var userChannels = this.$store.state.userChannels
      // No direct messages yet, show first 10 users.
      var userChannelsSize = Object.keys(userChannels).length
      if (userChannelsSize === 0) {
        let i = 0
        for (let userId in users) {
          let user = users[userId]
          let message = {}
          if (!user.email_verified) {
            continue
          }
          message.userId = userId
          message.displayName = user.display_name
          message.isOnline = user.online
          if (userId === this.$store.state.userId) {
            messageList.unshift(message)
          } else {
            messageList.push(message)
          }
          if (i === 9) {
            break
          }
          i++
        }
      // User has over 8 direct messages, display only the direct messages.
      } else if (userChannelsSize >= 8) {
        let i = 0
        for (let channelId in userChannels) {
          let channel = userChannels[channelId]
          let message = {}
          message.channelId = channelId
          // check if any user in the direct message is online, if true set
          // the online status of the direct message to be online
          let hasOnlineUser = false
          let displayName = ''
          let j = 0
          for (let userId in channel.members) {
            if (users[userId].online && !hasOnlineUser) {
              message.isOnline = true
              hasOnlineUser = true
            }
            if (j === 0) {
              displayName += users[userId].display_name
            } else {
              displayName += ', ' + users[userId].display_name
            }
            j++
          }
          message.displayName = displayName
          messageList.push(message)
          if (i === 9) {
            break
          }
          i++
        }
        // Still insert the current user into the beginning of the list.
        let message = {}
        message.userId = this.$store.state.userId
        message.displayName = this.$store.state.user.display_name
        message.isOnline = true
        messageList.unshift(message)
      // User has less than 8 direct messages, show all direct messages and
      // fill the rest with users.
      } else {
        for (let channelId in userChannels) {
          let channel = userChannels[channelId]
          let message = {}
          message.channelId = channelId
          let hasOnlineUser = false
          let displayName = ''
          let j = 0
          for (let userId in channel.members) {
            if (users[userId].online && !hasOnlineUser) {
              message.isOnline = true
              hasOnlineUser = true
            }
            if (j === 0) {
              displayName += users[userId].display_name
            } else {
              displayName += ', ' + users[userId].display_name
            }
            j++
          }
          message.displayName = displayName
          messageList.push(message)
        }

        var userSize = 10 - userChannelsSize
        let i = 0
        for (let userId in users) {
          let user = users[userId]
          let message = {}
          message.userId = userId
          message.displayName = user.display_name
          message.isOnline = user.online
          messageList.push(message)
          if (i === userSize) {
            break
          }
          i++
        }

        let message = {}
        message.userId = this.$store.state.userId
        message.displayName = this.$store.state.user.display_name
        message.isOnline = true
        messageList.unshift(message)
      }
      return messageList
    }
  },
  methods: {
    fetchChannels: function () {
      this.$store.dispatch('FETCH_CHANNELS')
        .then(() => {
          watchChannels(true, (channel) => {
            this.$store.commit('SET_CHANNEL', {
              channel: channel
            })
          })
        })
    },
    fetchUsers: function () {
      this.$store.dispatch('FETCH_USERS')
        .then(() => {
          watchUsers(true, (user) => {
            this.$store.commit('SET_USER', {
              user: user
            })
          })
        })
    },
    fetchUserChannels: function () {
      this.$store.dispatch('FETCH_USER_CHANNELS')
        .then(() => {
          watchUserChannels(true, (channel) => {
            this.$store.commit('SET_USER_CHANNEL', {
              channel: channel
            })
          })
        })
    },
    selectChannel: function (channelId) {
      if (this.currentChannelId !== channelId) {
        this.currentChannelId = channelId
        this.$store.commit('SET_CURRENT_CHANNEL', {
          channelId: this.currentChannelId
        })
        this.$store.dispatch('SET_CURRENT_CHANNEL', {
          channelId: channelId
        })
        this.$emit('changedChannelId')
      }
    },
    selectUser: function (userId) {
      var userChannel = this.userChannels[userId]
      if (userChannel) {
        this.$store.commit('SET_CURRENT_USER_CHANNEL', {
          channelId: userChannel.id
        })
        this.currentChannelId = userChannel.id
        this.$store.commit('SET_CURRENT_CHANNEL', {
          channelId: userChannel.id
        })
        this.$store.dispatch('SET_CURRENT_CHANNEL', {
          channelId: userChannel.id
        })
      } else {
        this.$store.commit('SET_CURRENT_USER_CHANNEL', {
          channelId: ''
        })
      }
      this.$emit('userSelected')
    },
    addChannel: function () {
      this.$emit('showAddChannelModal')
    },
    directMessage: function () {
      //
    },
    showInviteModal: function () {
      this.$emit('showInviteModal')
    },
    messageName: function (message) {
      //
    }
  }
}
</script>

<style scoped>
.root {
  background: linear-gradient(0deg, #0352c7, #083577, #083577);
  padding-left: 15px;
  padding-right: 15px;
}

.user_info_container {
  display: flex;
  margin-top: 20px;
}

.user_info_container:hover {
  background: linear-gradient(90deg, #082e65, #082e65, transparent);
  border-radius: 32.5px;
  cursor: pointer;
}

.user_image {
  margin-top: 10px;
  margin-left: 10px;
  width: 45px;
  height: 45px;
  display: inline-block;
}

.name_container {
  margin-left: 15px;
  display: inline-block;
}

.channel_list, .direct_message_list {
  margin-top: 15px;
  padding: 0px;
  margin-bottom: 0px;
}

.channel_item, .direct_message_item {
  font-family: 'Roboto', sans-serif;
  color: white;
  margin-bottom: 10px;
  list-style-type: none;
}

.message_indicator {
  display: inline-block;
  float: right;
  margin-right: 20px;
  font-size: 13px;
  width: 30px;
  background-color: #bf120c;
  text-align: center;
  border-radius: 8px;
  margin-top: 2px;
  visibility: hidden;
}

.channel_item_container, .direct_message_item_container {
  padding-left: 20px;
  padding-right: 10px;
  border-radius: 8px;
  cursor: pointer;
  pointer-events: all;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-x: hidden;
}

.direct_message_item_container.inactive {
  font-style: italic;
}

.status_icon {
  vertical-align: middle;
  background-color: transparent;
  border: 2px solid #79adc7;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.status_icon.online {
  vertical-align: middle;
  background-color: #1ac726;
  border: 2px solid transparent;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.message_name {
  display: inline-block;
  margin: 0;
  text-overflow: ellipsis;
}

.channel_item_container:hover, .direct_message_item_container:hover {
  background: linear-gradient(90deg, #082e65, #082e65, transparent);
}

.channel_item_container.active, .direct_message_item_container.active {
  background: linear-gradient(90deg, #ff6105, #ff7e08);
}

.heading {
  display: inline-block;
}

.add_icon {
  float: right;
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-top: 54px;
  margin-right: 10px;
  opacity: 0.5;
  cursor: pointer;
}

.add_icon:hover {
  opacity: 1.0;
}

.invite_heading {
  margin-top: 65px;
  margin-left: 15px;
  color: #c4e7f4;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 18px;
  cursor: pointer;
}

.invite_heading:hover {
  text-decoration: underline;
}

h1 {
  margin-top: 5px;
  margin-bottom: 8px;
  font-family: 'Roboto', sans-serif;
  color: #c4e7f4;
  font-weight: 300;
  font-size: 16px;
}

h2 {
  font-family: 'Roboto', sans-serif;
  color: #ffffff;
  font-weight: 400;
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 0px;
}

h3 {
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 17px;
  color: #ffffff;
  margin-left: 15px;
  margin-top: 50px;
  margin-bottom: 0px;
}

</style>
