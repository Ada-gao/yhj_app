import Vue from 'vue'
import WeVue from 'we-vue'
import 'we-vue/lib/style.css'
import App from './app.vue'
import './assets/style/ywh.scss'
import './assets/iconfont/iconfont.css'
import router from './router'

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(WeVue)

router.afterEach((to) => {
  document.title = to.meta.title
})

/* eslint-disable no-new */
new Vue({
  el: '#app',

  render: h => h(App),

  router,

  data () {
    return {
      transitionName: 'slide-right'
    }
  },

  methods: {
    message (msg) {
      this.$toast.text(msg)
    }
  },

  watch: {
    '$route' (to, from) {
      this.transitionName = from.name === 'index' ? 'slide-left' : 'slide-right'
    }
  }
})

router.beforeEach((to, from, next) => {
  // 未显示申明，默认必须登录
  const requiresAuth = to.meta.requiresAuth === undefined ? true : to.meta.requiresAuth
  if (to.path === '/login') {
    sessionStorage.removeItem('token')
  }
  let user = localStorage.getItem('token')
  if (!user && requiresAuth && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})
