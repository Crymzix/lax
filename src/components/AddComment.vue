<template>
  <div class="root">
    <div class="message_container">
      <img class="user_image" :src="userImage"/>
      <p class="message_text">{{ message.message }}</p>
    </div>
  </div>
</template>

<script>
const defaultUserImg = require('../assets/user.png')

export default {
  name: 'addcomment',
  data () {
    return {
      user: null,
      currentMessage: null
    }
  },
  methods: {
    //
  },
  computed: {
    message: function () {
      let message = {}
      let messageChannel = this.$store.state.messages[this.$store.state.user.last_viewed_channel_id]
      if (messageChannel) {
        if (messageChannel[this.$store.state.currentMessageId]) {
          message = messageChannel[this.$store.state.currentMessageId]
          this.user = this.$store.state.users[message.user_id]
          this.currentMessage = message
        } else {
          return this.currentMessage
        }
      }
      return message
    },
    userImage: function () {
      if (this.user) {
        if (this.user.photo_url) {
          return this.user.photo_url
        } else {
          return defaultUserImg
        }
      } else {
        return defaultUserImg
      }
    }
  }
}

</script>

<style scoped>
.root {

}

.message_container {

}

.user_image {
  display: inline-block;
  margin-top: 40px;
  margin-left: 30px;
  width: 55px;
  height: 55px;
}

.message_text {
  color: #165196;
  position: absolute;
  width: 230px;
  display: inline-block;
  margin-top: 40px;
  margin-left: 10px;
  margin-right: 10px;
  vertical-align: top;
  word-wrap: break-word;
  white-space: initial;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 16px;
  min-height: 100px;
  border: 1px solid #b9d6e7;
  border-radius: 7px;
  padding: 10px 8px;
  text-align: justify;
}

</style>
