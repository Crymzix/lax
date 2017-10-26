<template>
  <div class="root">
    <div class="user_info_container">
      <img class="user_image" :src="user.photo_url" src="~../assets/user.png"/>
      <div class="name_container">
        <h2>{{ team.team_name }}</h2>
        <h1>{{ user.display_name }}</h1>
      </div>
    </div>
    <h3>channels</h3>
    <ul class="channel_list">
      <li v-for="channel in channels" class="channel_item">
        <div v-on:click="selectChannel(channel)" class="channel_item_container" v-bind:class="{ active: channel.id === currentChannelId }">
          # {{ channel.name }}
          <div class="message_indicator">1</div>
        </div>
      </li>
    </ul>
    <h3>members</h3>
    <ul class="user_list">
      <li v-for="user in users" class="user_item">
        <div class="user_item_container">
          @ {{ user.display_name }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
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
  mounted () {
    this.fetchChannels()
    this.fetchUsers()
  },
  methods: {
    fetchChannels: function () {
      this.$store.dispatch('FETCH_CHANNELS')
    },
    fetchUsers: function () {
      this.$store.dispatch('FETCH_USERS')
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

.channel_item_container:hover, .user_item_container:hover {
  background: linear-gradient(90deg, transparent, #082e65, transparent);
}

.channel_item_container.active, .user_item_container.active {
  background: linear-gradient(90deg, #ff6105, #ff7e08);
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
