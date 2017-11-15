<template>
  <div class="root">
    <div class="message">
      {{ message.message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'addcomment',
  data () {
    return {
      message: this.$store.state.messages[this.$store.state.user.last_viewed_channel_id][this.$store.state.currentMessageId],
      currentMessageId: this.$store.state.currentMessageId
    }
  },
  mounted () {
    //
  },
  watch: {
    messageId: function (newCurrentMessageId) {
      console.log(newCurrentMessageId)
    }
  },
  methods: {
    //
  }
}

</script>

<style scoped>
.root {

}

.message {

}

</style>
