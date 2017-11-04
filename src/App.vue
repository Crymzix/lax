<template>
  <div id="app">
    <router-view class="view"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
}

.tooltip {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  color: white;
  font-size: 14px;
  background: black;
  transition: opacity .15s;
  pointer-events: none;
  padding: 5px 10px;
  margin-bottom: 10px;
  z-index: 10000;
  border-radius: 10px;
  font-weight: 300;
}

.tooltip::after {
  content: " ";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}

.custom_multiselect .multiselect__tag {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  background: #0352c7;
  font-size: 15px;
}

.custom_multiselect .multiselect__tag-icon:after {
  color: #ffffff;
}

.custom_multiselect .multiselect__tag-icon:focus,
.custom_multiselect .multiselect__tag-icon:hover {
  background: #083577;
}

.custom_multiselect .multiselect__tags {
  border: 1px solid #003a99;
}

h1 {
  margin: 0 0 0 0;
}

body {
  margin: 0 0 0 0
}
</style>
