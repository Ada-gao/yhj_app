export const install = function (Vue, options, cb) {
  document.addEventListener('deviceready', () => {
    /* global cordova */
    if (typeof cordova.file === 'undefined' || typeof window.FileUploadOptions === 'undefined') {
      // eslint-disable-next-line
      return cb(false)
    }

    Vue.cordova.file = cordova.file
    Vue.cordova.FileUploadOptions = window.FileUploadOptions
    // eslint-disable-next-line
    return cb(true)
  }, false)
}
