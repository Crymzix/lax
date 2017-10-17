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
      beforeEnter: checkMainState,
      component: MainView
    },
    {
      path: '/login',
      beforeEnter: checkLoginState,
      component: LoginView
    },
    {
      path: '/create',
      beforeEnter: checkCreateState,
      component: CreateView
    }
  ]
})

function checkMainState (to, from, next) {
  if (store.state.hasFirebaseConfigured) {
    if (store.state.isLoggedIn) {
      next()
    } else {
      next('login')
    }
  } else {
    next('/create')
  }
}

function checkLoginState (to, from, next) {
  if (store.state.hasFirebaseConfigured) {
    if (store.state.isLoggedIn) {
      next('/')
    } else {
      next()
    }
  } else {
    next('/create')
  }
}

function checkCreateState (to, from, next) {
  if (store.state.hasFirebaseConfigured) {
    if (store.state.isLoggedIn) {
      next('/')
    } else {
      next('/login')
    }
  } else {
    next()
  }
}
