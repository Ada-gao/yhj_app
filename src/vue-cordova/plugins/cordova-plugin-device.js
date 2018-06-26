export const install = function (Vue, options, cb) {
  document.addEventListener('deviceready', () => {
    /* global device */
    if (typeof device === 'undefined' || typeof device.cordova === 'undefined') {
      return cb(new Error('error to init device.'))
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

    return cb()
  }, false)
}
