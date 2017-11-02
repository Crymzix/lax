<template>
  <div class="root">
    <div class="container">
      <textarea v-model="messageInput" class="message_input"></textarea>
      <button v-on:click="sendMessage" type="button" class="send_button" v-bind:class="{ active: messageInput !== '' }">
        <img class="add_image" src="~../assets/add.png"/>
      </button>
    </div>
  </div>
</template>

<script>
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
    }
  },
  watch: {
    messageInput: function (messageInput) {
    }
  }
}
</script>

<style scoped>

.container {
  border-top: 2px solid #003a99;
}

.message_input {
  display: inline-block;
  margin-top: 15px;
  margin-left: 15px;
  font-family: 'Roboto', sans-serif;
  font-size: 15px;
  font-weight: 400;
  height: 70px;
  width: 800px;
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
