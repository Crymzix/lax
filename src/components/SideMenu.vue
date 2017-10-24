<template>
  <div class="root">
    <ul class="channel_list">
      <li v-for="channel in channels" class="channel_item">
        {{ channel.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'sidemenu',
  data () {
    return {
      channels: this.$store.state.channels
    }
  },
  mounted () {
    this.fetchChannels()
  },
  methods: {
    fetchChannels: function () {
      this.$store.dispatch('FETCH_CHANNELS')
        .then(() => {
          //
        })
    }
  }
}
</script>

<style scoped>
.root {
  position: fixed;
  background: linear-gradient(0deg, #0352c7, #083577);
}

.channel_item {
  font-family: 'Roboto', sans-serif;
  color: white;
}

</style>
