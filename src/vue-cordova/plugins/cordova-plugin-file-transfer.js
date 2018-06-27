export const install = function (Vue, options, cb) {
  document.addEventListener('deviceready', () => {
    if (typeof window.FileTransfer === 'undefined') {
      // eslint-disable-next-line
      return cb(false)
    }

    Vue.cordova.FileTransfer = window.FileTransfer

    // eslint-disable-next-line
    return cb(true)
  }, false)
}
