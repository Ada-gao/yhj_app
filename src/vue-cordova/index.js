// list here all supported plugins
const pluginsList = [
  'cordova-plugin-camera',
  'cordova-plugin-device',
  'cordova-plugin-contacts',
  'cordova-plugin-file',
  'cordova-plugin-file-transfer',
  'cordova-plugin-statusbar',
<<<<<<< HEAD
  'cordova-plugin-background-mode'
=======
  'cordova-plugin-background-mode',
  'jpush-phonegap-plugin'
>>>>>>> 3080f0e75e79bd6610630020d59bdd68138ceab6
]

exports.install = (Vue, options) => {
  // declare global Vue.cordova object
  Vue.cordova = Vue.cordova || {
    deviceready: false,
    plugins: []
  }

  // Cordova events wrapper
  Vue.cordova.on = (eventName, cb) => {
    document.addEventListener(eventName, cb, false)
  }

  // let Vue know that deviceready has been triggered
  document.addEventListener('deviceready', () => {
    console.log('deviceready is ready')
    Vue.cordova.deviceready = true
  }, false)

  // load supported plugins
  pluginsList.forEach(pluginName => {
    let plugin = require('./plugins/' + pluginName)
    plugin.install(Vue, options, pluginLoaded => {
      if (pluginLoaded) {
        Vue.cordova.plugins.push(pluginName)
      }
      if (Vue.config.debug) {
        console.log('[VueCordova]', pluginName, '→', pluginLoaded ? 'loaded' : 'not loaded')
      }
    })
  })
}
