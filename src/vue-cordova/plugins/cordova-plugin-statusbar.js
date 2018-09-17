/**
 * Created by zhuangyinping on 5/2/17.
 */
import router from '../../router'
export const install = function (Vue, options, cb) {
  document.addEventListener('deviceready', () => {
    /* global StatusBar */
    if (typeof StatusBar === 'undefined') {
      // eslint-disable-next-line
      return cb(false)
    }
    // pass through the StatusBar object
    Vue.cordova.statusBar = StatusBar
    if (window.location.hash.indexOf('/login') !== -1) {
      Vue.cordova.statusBar.hide()
    }
    // eslint-disable-next-line
    return cb(true)
  }, false)
}
