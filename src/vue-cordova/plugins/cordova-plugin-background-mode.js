/**
 * Created by zhuangyinping on 7/23/17.
 */
export const install = function (Vue, options, cb) {
  document.addEventListener('deviceready', () => {
    /* global cordova */
    if (typeof cordova.plugins.backgroundMode === 'undefined') {
      // eslint-disable-next-line
      return cb(false)
    }

    Vue.cordova.backgroundMode = cordova.plugins.backgroundMode
    Vue.cordova.backgroundMode.enable() // enable backgroudMode
    // eslint-disable-next-line
    return cb(true)
  }, false)
}
