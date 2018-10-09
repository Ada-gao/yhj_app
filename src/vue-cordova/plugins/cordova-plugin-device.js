import { Dialog, Toast } from 'we-vue'
import router from '@/router'

// import { BackgroundMode } from '@ionic-native/background-mode'
export const install = function (Vue, options, cb) {
  document.addEventListener('deviceready', () => {
    /* global device */
    if (typeof device === 'undefined' || typeof device.cordova === 'undefined') {
      // eslint-disable-next-line
      return cb(false)
    }

    // default values
    Vue.cordova.device = {
      cordova: null,
      model: null,
      platform: null,
      uuid: null,
      version: null,
      manufacturer: null,
      isVirtual: null,
      serial: null
    }

    Object.keys(Vue.cordova.device).forEach(key => {
      if (typeof device[key] !== 'undefined') {
        Vue.cordova.device[key] = device[key]
      }
    })

    let platform = Vue.cordova.device.platform
    console.log('Now we are running on platform:' + platform)
    if (platform) {
      document.body.classList.add('is-' + platform)
    }

    console.log('app is ready..')
    var event = new Event('appReady')
    document.addEventListener('backbutton', onBackKeyDown, false)
    function onBackKeyDown () {
      // console.log(this.$router.currentRoute.path)
      let url = (location.href).split('#')[1]
      let urls = (location.href).split('#')[1].substring(0, 17)
      let urlsRandom = (location.href).split('#')[1].substring(0, 21)
      // alert(urlsRandom)
      if (url === '/home' || url === '/profile' || url === '/login') {
        if (navigator.app) {
          Dialog({
            title: '温馨提示',
            message: '您确定要退出吗？',
            showCancelButton: true
          }).then(() => {
            navigator.app.exitApp()
            localStorage.removeItem('token')
            localStorage.removeItem('completetoday')
          }).catch(() => {
          })
        } else if (navigator.device) {
          navigator.device.exitApp()
        } else {
          window.close()
        }
      } else if (urls === '/call/call-record' || urls === '/call/call-detail') {
        Toast.fail({
          duration: 2000,
          message: '强制返回会导致您的数据问题哦！'
        })
        window.close()
      } else if (urlsRandom === '/call/customer-random') {
        if (sessionStorage.getItem('type') === '1') {
          alert('1')
          router.push('/home')
        } else {
          router.push({name: 'call', params: {groupId: sessionStorage.getItem('groupId')}})
        }
      } else if (urlsRandom === '/call') {
        router.push({name: 'home'})
      } else {
        history.back(-1)
      }
    }
    // Dispatch the event.
    document.dispatchEvent(event)

    // eslint-disable-next-line
    return cb(true)
  }, false)
}
