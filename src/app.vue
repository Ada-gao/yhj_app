<template>
  <div id="app">
    <transition :enter-active-class="enterAnimate" :leave-active-class="leaveAnimate">
      <keep-alive :include="includeComponent">
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import thumbSmall from './assets/images/icon_tabbar.png'
import Vue from 'vue'

export default {
  data () {
    return {
      thumbSmall,
      tabShow: true,
      statusBarcolorPath: {
        black: ['/call/customer-random', '/login']
      },
      enterAnimate: '', // 页面进入动效
      leaveAnimate: '', // 页面离开动效
      includeComponent: 'call'
    }
  },
  created () {
    // this.isIphoneX()
  },
  methods: {
    selected (route) {
      return this.$router.currentRoute.path === route
    },
    isIphoneX () {
      const u = navigator.userAgent
      const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
      if (isIOS) {
        if (screen.height === 812 && screen.width === 375) {
          // 是iphoneX
          console.log('iphoneX')
          const metaEl = document.querySelector('meta[name="viewport"]')
          // console.log(metaEl)
          metaEl.content = 'width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, viewport-fit=cover'
        } else {
          // 不是iphoneX
        }
      }
    }
  },
  watch: {
    $route (to, from) {
      this.tabShow = to.meta.tabShow === undefined ? true : to.meta.tabShow
      let str = ''
      if (/[0-9]/.test(to.path)) {
        const arr = to.path.split('/')
        str = '/' + arr[1] + '/' + arr[2]
      } else {
        str = to.path
      }
      if (this.statusBarcolorPath.black.indexOf(str) !== -1) {
        // Vue.cordova.statusBar.overlaysWebView(true)
        // Vue.cordova.statusBar.backgroundColorByHexString('') // 设置状态栏颜色
        // Vue.cordova.statusBar.hide()
      } else {
        if (Vue.cordova.device.platform !== 'browser') {
          Vue.cordova.statusBar.styleDefault()
          Vue.cordova.statusBar.show()
        }
      }
      // keep-alive include
      // if (to.name === 'home') {
      //   this.includeComponent = ''
      // } else {
      //   this.includeComponent = 'call'
      // }
      // 增加进入淡出动画效果
      // console.log('from ' + from.path + ' to ' + to.path)
      if (from.path === '/login' || to.path === '/login') {
        this.enterAnimate = ''
        this.leaveAnimate = ''
        return
      }
      if (from.path === '/home') {
        this.enterAnimate = 'animated fadeInRight'
        this.leaveAnimate = 'animated fadeOutLeft'
        return
      } else if (to.path === '/home') {
        this.enterAnimate = 'animated fadeInLeft'
        this.leaveAnimate = 'animated fadeOutRight'
        return
      }
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      // 同一级页面无需设置过渡效果
      if (toDepth === fromDepth) {
        this.enterAnimate = ''
        this.leaveAnimate = ''
        return
      }
      this.enterAnimate = toDepth > fromDepth ? 'animated fadeInRight' : 'animated fadeInLeft'
      this.leaveAnimate = toDepth > fromDepth ? 'animated fadeOutLeft' : 'animated fadeOutRight'
    }
  }
}
</script>
<style lang="scss">
  @import "assets/css/lib/animate.css";
  .bgcolor{  //导航颜色
    background-color: #ffffff!important;
  }
  .appcolor{ //字体颜色
    color:#02B6DC;
  }
  .pagebgcolor{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ffffff;
  }
  .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon>i, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{
    color: #02B6DC;
  }
  .weui-toast_text[data-v-4af60de0]{
    top: 41%;
  }
  .weui-picker__action{
    color: #2F6BE2!important;
  }
  .weui-picker__action:first-child{
    color: #888!important;
  }
  .wv-content_nav{
    position: absolute;
    top: 49px;
    left: 0;
    right: 0;
    bottom: 56px;
    /* height: 18.2rem; */
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .header_left{
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 21%;
    color: #000000;
    /*font-size: 26px;*/
  }
  .wv-content_profile{
    position: fixed;
    top: 85px;
    left: 0;
    right: 0;
    bottom: 0;
    /* height: 18.2rem; */
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .wv-header[data-v-a5b8d5b6]{
    height: 96px!important;
    line-height: 96px!important;
    padding: 0;
    box-sizing: content-box;
  }
  .wv-header .wv-header-title[data-v-a5b8d5b6]{
    color: #000000;
    font-size: 36px!important;
  }
  .wv-content{
    position: absolute;
    top: 96px;
    left: 0;
    right: 0;
    bottom: 0;
    /*!* height: 18.2rem; *!*/
    /*overflow: hidden;*/
    /*overflow-y: scroll;*/
    /*-webkit-overflow-scrolling: touch;*/
  }
  .weui-tabbar__item{
    padding: 0;
  }
  .weui-tabbar__label{
    line-height: 1.6;
  }
  .weui-tabbar{
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);

  }
  // .button_outs{
  //   color: #F0F0F0;
  //   width: 38%;
  //   margin: 0 auto;
  //   border-radius: 4px;
  //   font-size: 17px;
  //   height: 1.61rem;
  //   line-height: 1.61rem;
  // }
  // .details_return{
  //   z-index: 501;
  //   position: fixed;
  //   top:0;
  //   left: 0;
  //   right: 0;
  //   bottom: 0;
  //   background: rgba(0, 0, 0, 0.61);
  // }
  // .detail_contents{
  //   position: fixed;
  //   z-index: 501;
  //   width: 73%;
  //   max-width: 300px;
  //   top: 50%;
  //   left: 50%;
  //   -webkit-transform: translate(-50%,-50%);
  //   transform: translate(-50%,-50%);
  //   overflow: hidden;
  //   height: 6.9rem;
  //   text-align: center;
  //   background: #ffffff;
  //   border-radius: 0.2rem;
  //   font-size: 0.8rem;
  // }
  .head_return{
    position: absolute;
    top: 3px;
    font-size: 100% !important;
    display: inline-block;
    font-weight: 300;
  }
  .size_i{
    font-size: 46px!important;
    margin-left: 34px;
    color:#000000!important;
  }
  .size_c{
    font-size: 46px!important;
    margin-left: 34px;
    color:#ffffff!important;
  }
  .icon_right{
    transform:rotate(180deg);
    -ms-transform:rotate(180deg);
    -moz-transform:rotate(180deg);
    -webkit-transform:rotate(180deg);
    -o-transform:rotate(180deg);
  }
  .weui-dialog__btn_primary{
    color: #2F6BE2!important;
  }
  input,
  textarea {
    -webkit-appearance: none;
    appearance: none;
  }
  .weui-animate-fade-in,
  .weui-animate-fade-out {
    animation: none;
  }
  @-webkit-keyframes slideInDown {
    from {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        visibility: visible;
    }
    to {
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
    }
  }
  @keyframes slideInDown {
      from {
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
          visibility: visible;
      }
      to {
          -webkit-transform: translate3d(0, 100%, 0);
          transform: translate3d(0, 100%, 0);
      }
  }
  .weui-animate-slide-down {
    animation: slideInDown ease .3s;
  }
  @-webkit-keyframes slideInUp {
    from {
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
        visibility: visible;
    }
    to {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
}

@keyframes slideInUp {
    from {
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
        visibility: visible;
    }
    to {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
}
  .weui-animate-slide-up {
    animation: slideInUp ease .3s;
  }
</style>
