<template>
  <div class="container">
    <div>
      <h1 class="channel_title">{{ title }}</h1>
    </div>
    <p class="channel_description">{{ description }}</p>
  </div>
</template>

<script>

export default {
  name: 'headerbar',
  props: ['channelId'],
  data () {
    return {
      //
    }
  },
  mounted () {
    //
  },
  computed: {
    title: function () {
      return this.$store.state.channels[this.channelId] ? this.$store.state.channels[this.channelId].name : ''
    },
    description: function () {
      return this.$store.state.channels[this.channelId] ? this.$store.state.channels[this.channelId].description : ''
    }
  }
}
</script>

<style scoped>
.container {
  border-bottom: 1px solid #003a99;
  background: linear-gradient(135deg, white, white 70%, #0352c7);
  box-sizing: border-box;
}

.channel_title {
  display: inline-block;
  font-size: 20px;
  font-weight: 400;
  font-family: 'Roboto', sans-serif;
  color: #033988;
  text-align: left;
  padding-top: 10px;
  padding-left: 15px;
}

.channel_description {
  display: inline-block;
  opacity: 0.65;
  font-style: italic;
  color: #0c4aa7;
  font-family: 'Roboto', sans-serif;
  margin-left: 15px;
  margin-top: 5px;
  font-size: 12px;
}

p {
  margin: 0;
}

</style>
