# yunhj_wevue

> Yun HJ base on WeVue project

## Build Setup

#install platform


``` bash
# install platform
cordova platform add android@7.1.0 ios@4.5.4 browser@5.0.3

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

插件skwas-cordova-plugin-appinfo获取正确的Build时间需要在~/.gradle/gradle.properties增加：
```
android.keepTimestampsInApk = true
```
