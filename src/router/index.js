import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

let routes = []
let user = localStorage.getItem('token')
if (!user || user === '') {
  routes.push({
    path: '/',
    redirect: { path: '/login' }
  })
} else {
  routes.push({
    path: '/',
    redirect: { path: '/home' }
  })
}

routes.push({
  path: '/home',
  component: resolve => require(['../pages/home/home.vue'], resolve),
  name: 'home',
  meta: {
    title: '闪电呼',
    description: '闪电呼-首页',
    requiresAuth: true,
    keepAlive: false
  }
})

routes.push({
  path: '/profile',
  component: resolve => require(['../pages/my/profile.vue'], resolve),
  name: 'profile',
  meta: {
    title: '我的',
    description: '我的',
    keepAlive: true
  }
})

routes.push({
  path: '/call',
  component: resolve => require(['../pages/call/call.vue'], resolve),
  name: 'call',
  meta: {
    title: '数赟',
    description: '数赟 云呼叫',
    tabShow: true,
    keepAlive: true
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
    tabShow: false,
    keepAlive: true
  }
})
// routes.push({
//   path: '/login/trial',
//   component: resolve => require(['../pages/examples/picker.vue'], resolve),
//   name: 'trial',
//   meta: {
//     title: '申请试用',
//     description: '试用',
//     requiresAuth: false,
//     tabShow: false
//   }
// })

routes.push({
  path: '/my/relevant',
  component: resolve => require(['../pages/my/relevant.vue'], resolve),
  name: 'relevant',
  meta: {
    title: '关于闪电呼',
    description: '关于',
    requiresAuth: false,
    tabShow: false,
    keepAlive: true
  }
})

routes.push({
  path: '/call/customer-random/:type/:groupId?', // 0: 列表详情进入; 1: 随机呼入
  component: resolve => require(['../pages/call/customer-random.vue'], resolve),
  name: 'customer-random',
  meta: {
    title: 'customer-random',
    description: '已呼客户',
    requiresAuth: false,
    tabShow: false,
    keepAlive: false // true 表示需要使用缓存 false表示不需要被缓存
  }
})

routes.push({
  path: '/call/call-record',
  component: resolve => require(['../pages/call/call-record.vue'], resolve),
  name: 'call-record',
  meta: {
    title: 'call-record',
    description: '外呼记录-拨打',
    requiresAuth: false,
    tabShow: false,
    keepAlive: true
  }
})

routes.push({
  path: '/call/call-detail',
  component: resolve => require(['../pages/call/call-details.vue'], resolve),
  name: 'call-detail',
  meta: {
    title: 'call-detail',
    description: '外呼记录-详情',
    requiresAuth: false,
    tabShow: false,
    keepAlive: true
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
    tabShow: false,
    keepAlive: true
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
  base: '/',
  routes,
  scrollBehavior (to, from, savedPosition) {
    // let token = localStorage['token']
    return { x: 0, y: 0 }
  }
})

export default router
