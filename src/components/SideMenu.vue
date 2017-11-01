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
      <img class="add_icon" v-on:click="addChannel" src="~../assets/plus.png"/>
    </div>
    <ul class="channel_list">
      <li v-for="channel in channels" class="channel_item">
        <div v-on:click="selectChannel(channel)" class="channel_item_container" v-bind:class="{ active: channel.id === currentChannelId }">
          # {{ channel.name }}
          <div class="message_indicator">1</div>
        </div>
      </li>
    </ul>
    <div>
      <h3 class="heading">members</h3>
      <img class="add_icon" v-on:click="addMembers" src="~../assets/plus.png"/>
    </div>
    <ul class="user_list">
      <li v-for="user in users" class="user_item">
        <div v-if="user.email_verified" class="user_item_container">
          <div class="status_icon" v-bind:class="{ online: user.online }">
          </div>
          <p class="username">
            @ {{ username(user) }}
          </p>
        </div>
      </li>
    </ul>
    <div class="invite_heading" v-on:click="showInviteModal">+ Invite</div>
  </div>
</template>

<script>
import {
  watchUsers
} from '../api'

export default {
  name: 'sidemenu',
  data () {
    return {
      user: this.$store.state.user,
      team: this.$store.state.team,
      channels: this.$store.state.channels,
      users: this.$store.state.users,
      currentChannelId: this.$store.state.user.last_viewed_channel_id
    }
  },
  beforeMount () {
    this.fetchChannels()
    this.fetchUsers()
      .then(() => {
        watchUsers(true, (user) => {
          this.$store.commit('SET_USER', {
            user: user
          })
        })
      })
  },
  beforeDestroy () {
    watchUsers(false)
  },
  methods: {
    fetchChannels: function () {
      this.$store.dispatch('FETCH_CHANNELS')
    },
    fetchUsers: function () {
      return this.$store.dispatch('FETCH_USERS')
    },
    selectChannel: function (channel) {
      if (this.currentChannelId !== channel.id) {
        this.currentChannelId = channel.id
        this.$store.commit('SET_CHANNEL', {
          channelId: this.currentChannelId
        })
        this.$store.dispatch('SET_CURRENT_CHANNEL', {
          channelId: channel.id
        })
        this.$emit('changedChannelId')
      }
    },
    addChannel: function () {
      //
    },
    addMembers: function () {
      //
    },
    showInviteModal: function () {
      this.$emit('showInviteModal')
    },
    username: function (user) {
      if (user.display_name && user.display_name !== '') {
        return user.display_name
      } else {
        return user.email.substring(0, user.email.lastIndexOf('@'))
      }
    }
  }
}
</script>

<style scoped>
.root {
  background: linear-gradient(0deg, #0352c7, #083577);
  padding-left: 15px;
  padding-right: 15px;
}

.user_info_container {
  display: flex;
  margin-top: 20px;
}

.user_image {
  margin-top: 10px;
  margin-left: 25px;
  width: 45px;
  height: 45px;
  display: inline-block;
}

.name_container {
  margin-left: 15px;
  display: inline-block;
}

.channel_list, .user_list {
  margin-top: 15px;
  padding: 0px;
  margin-bottom: 0px;
}

.channel_item, .user_item {
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

.channel_item_container, .user_item_container {
  padding-left: 20px;
  border-radius: 8px;
  cursor: pointer;
  pointer-events: all;
}

.user_item_container.inactive {
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

.username {
  display: inline-block;
  margin: 0;
}

.channel_item_container:hover, .user_item_container:hover {
  background: linear-gradient(90deg, transparent, #082e65, transparent);
}

.channel_item_container.active, .user_item_container.active {
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
  font-weight: 700;
  color: #ffffff;
  margin-left: 15px;
  margin-top: 50px;
  margin-bottom: 0px;
}

</style>
