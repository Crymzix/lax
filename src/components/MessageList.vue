<template>
  <div class="root">
    <div class="message_list_container">
      <message v-for="message in sortedMessages" :key="message.id" :message="message">
      </message>
    </div>
  </div>
</template>

<script>
import Message from '../components/Message.vue'

export default {
  name: 'messagelist',
  props: ['channelId'],
  components: {
    'message': Message
  },
  data () {
    return {
      messages: this.$store.state.messages[this.channelId]
    }
  },
  computed: {
    sortedMessages: function () {
      var sortedMessages = []
      var storedMessages = this.$store.state.messages[this.channelId]
      for (var messageId in storedMessages) {
        sortedMessages.push(storedMessages[messageId])
      }

      sortedMessages.sort(function (a, b) {
        return b.timestamp - a.timestamp
      })
      return sortedMessages
    }
  }
}
</script>

<style scoped>
.root {

}

.message_list_container {
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
}

.message_list_container::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

.message_list_container::-webkit-scrollbar-track {
    border-radius: 8px;
}

.message_list_container::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: #003a99;
}

</style>
