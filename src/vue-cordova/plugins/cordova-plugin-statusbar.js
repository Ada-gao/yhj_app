/**
 * Created by zhuangyinping on 5/2/17.
 */
export const install = function (Vue, options, cb) {
  document.addEventListener('deviceready', () => {
    /* global StatusBar */
    if (typeof StatusBar === 'undefined') {
      // eslint-disable-next-line
      return cb(false)
    }
    // pass through the StatusBar object
    Vue.cordova.statusBar = StatusBar
    // eslint-disable-next-line
    return cb(true)
  }, false)
}
