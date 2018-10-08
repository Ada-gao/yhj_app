/**
 * Created by zhuangyinping on 5/2/17.
 */
exports.install = function (Vue, options, cb) {
  document.addEventListener('deviceready', () => {
    /* global appInfo */
    if (typeof appInfo === 'undefined') {
      // eslint-disable-next-line
      return cb(false)
    }

    var ai = {}
    ai.name = appInfo.name
    ai.version = appInfo.version
    ai.identifier = appInfo.identifier
    ai.build = appInfo.build
    ai.compileDate = appInfo.compileDate
    ai.isHardwareAccelerated = appInfo.isHardwareAccelerated
    ai.isDebuggable = appInfo.isDebuggable

    Vue.cordova.appInfo = ai
    // eslint-disable-next-line
    return cb(true)
  }, false)
}
