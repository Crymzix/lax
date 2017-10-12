import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import MainView from '../views/MainView.vue'
import LoginView from '../views/LoginView.vue'
import CreateView from '../views/CreateView.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      beforeEnter: checkState,
      component: MainView
    },
    {
      path: '/login',
      component: LoginView
    },
    {
      path: '/create',
      component: CreateView
    }
  ]
})

function checkState (to, from, next) {
  if (store.state.hasFirebaseConfigured) {
    next()
  } else {
    next('/create')
  }
}
