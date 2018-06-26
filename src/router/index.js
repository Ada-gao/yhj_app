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
  component: resolve => require(['../pages/home/home.vue'], resolve),
  name: 'home',
  meta: {
    title: '首页',
    description: '首页',
    requiresAuth: true
  }
})

routes.push({
  path: '/profile',
  component: resolve => require(['../pages/my/profile.vue'], resolve),
  name: 'profile',
  meta: {
    title: '我的',
    description: '我的'
  }
})

routes.push({
  path: '/call',
  component: resolve => require(['../pages/call/call.vue'], resolve),
  name: 'call',
  meta: {
    title: '数赟',
    description: '数赟 云呼叫'
  }
})

routes.push({
  path: '/login',
  component: resolve => require(['../pages/login/login.vue'], resolve),
  name: 'login',
  meta: {
    title: '登录',
    description: '登录',
    tabShow: false
  }
})

routes.push({
  path: '/login/trial',
  component: resolve => require(['../pages/login/trial.vue'], resolve),
  name: 'trial',
  meta: {
    title: '申请试用',
    description: '试用',
    requiresAuth: false,
    tabShow: false
  }
})

routes.push({
  path: '/my/relevant',
  component: resolve => require(['../pages/my/relevant.vue'], resolve),
  name: 'relevant',
  meta: {
    title: '关于闪电呼',
    description: '关于',
    requiresAuth: false,
    tabShow: false
  }
})

routes.push({
  path: '/call/details-y',
  component: resolve => require(['../pages/call/customer-details.vue'], resolve),
  name: 'details-y',
  meta: {
    title: 'details-y',
    description: '已呼客户',
    requiresAuth: false,
    tabShow: false
  }
})

routes.push({
  path: '/my/feedback',
  component: resolve => require(['../pages/my/feedback.vue'], resolve),
  name: 'feedback',
  meta: {
    title: 'feedback',
    description: '问题反馈',
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
