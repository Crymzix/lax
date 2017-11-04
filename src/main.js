// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { VTooltip } from 'v-tooltip'
import Multiselect from 'vue-multiselect'
import App from './App'
import store from './store'
import router from './router'
import { initializeFirebase } from './api'

Vue.config.productionTip = false
Vue.directive('tooltip', VTooltip)
Vue.component('multiselect', Multiselect)

initializeFirebase(store)
  .then(() => {
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
  })
