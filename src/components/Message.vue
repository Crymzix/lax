<template>
  <div class="message_container">
    <img class="user_image" v-if="!message.photo_url && message.user_id !== 'lax_bot'" src="~../assets/user.png"/>
    <img class="user_image" v-if="!message.photo_url && message.user_id === 'lax_bot'" src="~../assets/robot.png"/>
    <img class="user_image" v-if="message.photo_url" :src="message.photo_url"/>
    <div class="right_container">
      <div>
        <h1 class="username">{{ message.name }}</h1>
        <span class="timestamp">{{ timestamp }}</span>
      </div>
      <p class="message">{{ message.message }}</p>
    </div>
  </div>
</template>

<script>
import { timeAgo } from '../utils/filters'

export default {
  name: 'message',
  props: ['message'],
  data () {
    return {
      userId: this.$store.state.userId
    }
  },
  computed: {
    timestamp: function () {
      return timeAgo(this.message.timestamp) + ' ago'
    }
  }
}
</script>

<style scoped>

.message_container {
  padding: 15px 25px;
}

.user_image {
  display: inline-block;
  width: 40px;
  height: 40px;
  vertical-align: top;
}

.right_container {
  margin-left: 10px;
  display: inline-block;
}

.username {
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #2c3e50;
  cursor: pointer;
  display: inline-block;
}

.timestamp {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 10px;
  color: #2c3e50;
  margin-left: 5px;
  display: inline-block;
}

.username:hover {
  text-decoration: underline;
}

.message {
  margin-left: 0px;
  vertical-align: top;
}

p {
  font-size: 16px;
  margin: 0;
  color: #2c3e50;
  font-family: 'Roboto', sans-serif;
}

</style>
