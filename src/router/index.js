import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

let routes = []

routes.push({
  path: '/',
  redirect: { path: '/home' }
})

routes.push({
  path: '/home',
  component: resolve => require(['../pages/home.vue'], resolve),
  name: 'home',
  meta: {
    title: '首页',
    description: '首页'
  }
})

routes.push({
  path: '/profile',
  component: resolve => require(['../pages/profile.vue'], resolve),
  name: 'profile',
  meta: {
    title: '我的',
    description: '我的'
  }
})

routes.push({
  path: '/call',
  component: resolve => require(['../pages/call.vue'], resolve),
  name: 'call',
  meta: {
    title: '数赟',
    description: '数赟 云呼叫'
  }
})

routes.push({
  path: '/login',
  component: resolve => require(['../pages/login.vue'], resolve),
  name: 'login',
  meta: {
    title: '登录',
    description: '登录',
    tabShow: false
  }
})

routes.push({
  path: '/trial',
  component: resolve => require(['../pages/trial.vue'], resolve),
  name: 'trial',
  meta: {
    title: '申请试用',
    description: '试用',
    requiresAuth: false,
    tabShow: false
  }
})

routes.push({
  path: '*',
  component: resolve => require(['../pages/404.vue'], resolve),
  name: '404',
  meta: {
    title: '404 Not Found',
    description: ''
  }
})

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
