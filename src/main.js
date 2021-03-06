import Vue from 'vue'
import WeVue from 'we-vue'
import moment from 'moment'
import VDistpicker from 'v-distpicker'
import FastClick from 'fastclick'
import 'we-vue/lib/style.css'
import App from './app.vue'
import './assets/style/ywh.scss'
import './assets/iconfont/iconfont.css'
import router from './router'
import VueCordova from './vue-cordova/index'
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.config.debug = true

Vue.use(WeVue)
Vue.component('v-distpicker', VDistpicker)
Vue.use(VueClipboard)

FastClick.attach(document.body)

Vue.use(VueCordova)

console.log('----------port:' + window.location.port)
// add cordova.js only if serving the app through file://
if (window.location.protocol === 'file:' || window.location.port === '8080' || window.location.port === '9080' || window.location.port === '') {
  // console.log('attach cordova.js')
  var cordovaScript = document.createElement('script')
  cordovaScript.setAttribute('type', 'text/javascript')
  cordovaScript.setAttribute('src', 'cordova.js')
  document.body.appendChild(cordovaScript)
}

Vue.filter('moment', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
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

router.afterEach((to) => {
  document.title = to.meta.title
})

router.beforeEach((to, from, next) => {
  // console.log(to.name)
  // 未显示申明，默认必须登录
  const requiresAuth = to.meta.requiresAuth === undefined ? true : to.meta.requiresAuth
  if (to.path === '/login') {
    sessionStorage.removeItem('token')
  }
  let user = localStorage.getItem('token')
  // console.log(user)
  if (!user && requiresAuth && to.path !== '/login') {
    next({path: '/login', query: {redirect: to.fullPath}})
  } else {
    next()
  }
})
