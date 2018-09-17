/**
 * Created by gaoyuan on 9/14/18.
 */
export const install = function (Vue, options, cb) {
  document.addEventListener('deviceready', () => {
    if (typeof navigator.splashscreen === 'undefined') {
      // eslint-disable-next-line
      return cb(false)
    }
    // pass through the navigator.splashscreen object
    Vue.cordova.splashscreen = navigator.splashscreen
    // eslint-disable-next-line
    return cb(true)
  }, false)
}
