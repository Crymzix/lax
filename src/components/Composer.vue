<template>
  <div class="root">
    <div class="container">
      <textarea v-model="messageInput" class="message_input"></textarea>
      <button v-on:click="sendMessage" type="button" class="send_button" v-bind:class="{ active: messageInput !== '' }">
        <img class="add_image" src="~../assets/add.png"/>
      </button>
    </div>
    <div class="message_info">
      {{ typingText }}
    </div>
  </div>
</template>

<script>
import {
  setTyping
} from '../api'
import debounce from 'debounce'

export default {
  name: 'composer',
  data () {
    return {
      messageInput: ''
    }
  },
  methods: {
    sendMessage: function () {
      this.$store.dispatch('SEND_MESSAGE', {
        messageInput: this.messageInput
      }).then(() => {
        this.messageInput = ''
      })
    },
    notifyTyping: debounce(
      function (messageInput) {
        if (messageInput !== '') {
          setTyping(true, this.$store.state.userId, this.$store.state.user.last_viewed_channel_id)
        } else {
          setTyping(false, this.$store.state.userId, this.$store.state.user.last_viewed_channel_id)
        }
      },
      150)
  },
  watch: {
    messageInput: function (messageInput) {
      this.notifyTyping(messageInput)
    }
  },
  computed: {
    typingText: function () {
      var currentChannel = this.$store.state.channels[this.$store.state.user.last_viewed_channel_id]
      if (!currentChannel) {
        return ''
      }
      var typingMap = currentChannel.typing
      if (!typingMap) {
        return ''
      }
      var users = this.$store.state.users
      var typingString = ''
      var i = 0
      for (var userId in typingMap) {
        if (i === 0) {
          typingString += users[userId].display_name
        } else {
          typingString += ', ' + users[userId].display_name
        }
        if (i === Object.keys(typingMap).length - 1) {
          typingString += ' is typing...'
        }
        i++
      }
      return typingString
    }
  }
}
</script>

<style scoped>
.container {
  white-space: nowrap;
  border-top: 2px solid #003a99;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 4px;
  height: auto;
}

.message_info {
  width: auto;
  margin-left: 15px;
  display: inline-block;
  font-size: 12px;
}

.message_input {
  display: inline-block;
  margin-top: 15px;
  margin-left: 15px;
  font-family: 'Roboto', sans-serif;
  font-size: 15px;
  font-weight: 400;
  height: 70px;
  width: 700px;
  resize: none;
  padding: 12px 10px;
  border: 2px solid #003a99;
  border-radius: 10px;
  outline: none;
}

.message_input::-webkit-scrollbar {
    width: 10px;
}

.message_input::-webkit-scrollbar-track {
    border-radius: 8px;
}

.message_input::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: #003a99;
}

.send_button {
  margin-top: 15px;
  margin-left: 10px;
  display: inline-block;
  height: 100px;
  width: 80px;
  outline: none;
  border: none;
  border-radius: 10px;
  vertical-align: top;
  pointer-events: none;
  background: #acacac;
}

.send_button.active {
  background: #0352c7;
  cursor: pointer;
  pointer-events: all;
  -o-transition:color .2s ease-out, background .2s ease-in;
  -ms-transition:color .2s ease-out, background .2s ease-in;
  -moz-transition:color .2s ease-out, background .2s ease-in;
  -webkit-transition:color .2s ease-out, background .2s ease-in;
  transition:color .2s ease-out, background .2s ease-in;
}

.send_button.active:hover {
  cursor: pointer;
  pointer-events: all;
  background: #083577;
}

.add_image {
  width: 20px;
  height: 20px;
}

</style>
