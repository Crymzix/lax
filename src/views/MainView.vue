<template>
  <div class="main">
    <sidemenu class="sidemenu"></sidemenu>
  </div>
</template>

<script>
import SideMenu from '../components/SideMenu.vue'

export default {
  name: 'main',
  components: { 'sidemenu': SideMenu },

  data () {
    return {
      msg: 'Welcome to the main view.'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sidemenu {
  width: 35vh;
  height: 100vh;
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

body {
  margin: 0;
}
</style>
