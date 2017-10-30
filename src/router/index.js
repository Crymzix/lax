import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import MessageView from '../views/MessageView.vue'
import LoginView from '../views/LoginView.vue'
import CreateView from '../views/CreateView.vue'
import VerifyView from '../views/VerifyView.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/messages',
      beforeEnter: checkMessageState,
      component: MessageView
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
    },
    {
      path: '/verify/:token',
      component: VerifyView
    },
    {
      path: '/',
      redirect: '/messages'
    }
  ]
})

function checkMessageState (to, from, next) {
  if (store.state.hasFirebaseConfigured) {
    if (store.state.isLoggedIn) {
      next()
    } else {
      next('/login')
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
