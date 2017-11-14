<template>
  <div class="container">
    <div class="header">
      <div
        class="side_menu"
        v-bind:class="{ open: open}"
        v-on:click="showSideMenu">
       <span></span>
       <span></span>
       <span></span>
      </div>
    </div>
    <div class="content">
    </div>
  </div>
</template>

<script>

export default {
  name: 'sideinfocontainer',
  props: ['type', 'open'],
  data () {
    return {
      isOpen: this.open,
      messageId: this.$store.state.currentMessageId
    }
  },
  methods: {
    showSideMenu: function () {
      if (this.open || this.isOpen) {
        this.isOpen = false
        this.$emit('closeInfoContainer')
      } else {
        this.isOpen = true
        this.$emit('openInfoContainer')
      }
    }
  }
}
</script>

<style scoped>
.container {
  background: white;
}

.side_menu {
  width: 30px;
  height: 40px;
  float: right;
  margin-top: 24.5px;
  margin-bottom: 24.5px;
  margin-right: 20px;
  position: relative;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .5s ease-in-out;
  -moz-transition: .5s ease-in-out;
  -o-transition: .5s ease-in-out;
  transition: .5s ease-in-out;
  cursor: pointer;
}

.side_menu span {
  display: block;
  position: absolute;
  height: 2px;
  width: 100%;
  background: white;
  border-radius: 2px;
  opacity: 1;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .25s ease-in-out;
  -moz-transition: .25s ease-in-out;
  -o-transition: .25s ease-in-out;
  transition: .25s ease-in-out;
}

.side_menu span:nth-child(1) {
  top: 0px;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

.side_menu span:nth-child(2) {
  top: 8px;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

.side_menu span:nth-child(3) {
  top: 16px;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

.side_menu.open span:nth-child(1) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
  top: -1px;
  left: 10px;
}

.side_menu.open span:nth-child(2) {
  width: 0%;
  opacity: 0;
}

.side_menu.open span:nth-child(3) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
  top: 20px;
  left: 10px;
}

.header {
  border-bottom: 1px solid #003a99;
  border-left: 2px solid #003a99;
  height: 69px;
  background: linear-gradient(90deg, white 75%, #0352c7);
}

.content {
  height: 100%;
  border-left: 2px solid #003a99;
}

</style>
