export const install = function (Vue, options, cb) {
  document.addEventListener('deviceready', () => {
    if (typeof navigator.contacts === 'undefined') {
      // eslint-disable-next-line
      return cb(false)
    }

    // pass through the contacts object
    Vue.cordova.contacts = navigator.contacts
    // eslint-disable-next-line
    return cb(true)
  }, false)
}
