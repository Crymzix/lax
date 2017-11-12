<template>
  <div class="container">
    <div>
      <h1 class="channel_title">{{ title }}</h1>
    </div>
    <div class="channel_info">
      <img class="channel_icon" src="~../assets/member.svg"/>
      {{ memberCount }}
    </div>
    <div class="channel_info">
      <img class="channel_icon" src="~../assets/message.svg"/>
      {{ messageCount }}
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
    },
    memberCount: function () {
      return this.$store.state.channels[this.channelId] ? this.$store.state.channels[this.channelId].member_count : 0
    },
    messageCount: function () {
      return this.$store.state.channels[this.channelId] ? this.$store.state.channels[this.channelId].message_count : 0
    }
  }
}
</script>

<style scoped>
.container {
  border-bottom: 1px solid #003a99;
  background: linear-gradient(90deg, #083577, #083577, #0352c7);
  box-sizing: border-box;
}

.channel_info {
  margin-top: 10px;
  margin-left: 15px;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  font-size: 14px;
  color: #d9e1f0;
  font-family: 'Roboto', sans-serif;
}

.channel_icon {
  width: 12px;
  height: 12px;
}

.channel_title {
  display: inline-block;
  font-size: 20px;
  font-weight: 400;
  font-family: 'Roboto', sans-serif;
  color: white;
  text-align: left;
  padding-top: 10px;
  padding-left: 15px;
}

.channel_description {
  display: inline-block;
  opacity: 0.65;
  font-style: italic;
  color: #d9e1f0;
  font-family: 'Roboto', sans-serif;
  margin-left: 15px;
  font-size: 12px;
  margin-bottom: 2px;
  vertical-align: bottom;
}

p {
  margin: 0;
}

</style>
