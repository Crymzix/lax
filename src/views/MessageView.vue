<template>
  <div class="main">
    <sidemenu class="sidemenu"></sidemenu>
    <div class="right_container">
      <messagelist class="message_list"></messagelist>
      <composer class="composer"></composer>
    </div>
  </div>
</template>

<script>
import SideMenu from '../components/SideMenu.vue'
import MessageList from '../components/MessageList.vue'
import Composer from '../components/Composer.vue'

export default {
  name: 'messages',
  components: {
    'sidemenu': SideMenu,
    'messagelist': MessageList,
    'composer': Composer
  },
  data () {
    return {
      msg: 'Welcome to the main view.'
    }
  },
  mounted () {
    //
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main {

}

.right_container {
  width: 100%;
  height: 100vh;
  vertical-align: top;
}

.sidemenu {
  float: left;
  width: 250px;
  height: 100vh;
  vertical-align: top;
}

.composer {
  width: 100%;
  height: calc(100% - 82vh);
}

.message_list {
  height: 82vh;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

html, body {
   width: 100%;
   height: 100%;
 }

body {
  margin: 0;
  padding: 0;
}
</style>
