// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import { initializeFirebase } from './api'

Vue.config.productionTip = false

initializeFirebase(store)

// Create the app instance.
// Here we inject the router, store and ssr context to all child components,
// making them available everywhere as `this.$router` and `this.$store`.
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
