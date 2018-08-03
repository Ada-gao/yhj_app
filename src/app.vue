<template>
  <div id="app">
    <wv-tabbar v-show="tabShow" :fixed="true" style="background: #FFFFFF">
      <wv-tabbar-item to="/home" :isOn="selected('/home')">
      <span slot="icon" style="display: inline-block; position: relative;">
        <div class="iconfont icon-shouye weui-tabbar__label" style="font-size: 0.92rem;"></div>
        <!--<wv-badge is-dot style="position: absolute;top: -2px;right: -13px;">8</wv-badge>-->
      </span>
        首页
      </wv-tabbar-item>
      <wv-tabbar-item to="/call/customer-random" :isOn="selected('/call/details-y')">
      <span slot="icon" style="display: inline-block; position: relative;">
        <div class="iconfont icon-hujiaozhongxin weui-tabbar__label" style="font-size: 0.96rem;"></div>
        <!--<wv-badge style="position: absolute;top: 0;right: -6px;">3</wv-badge>-->
      </span>
        开始外呼
      </wv-tabbar-item>
      <wv-tabbar-item to="/profile" :isOn="selected('/profile')">
        <span slot="icon" style="display: inline-block; position: relative;">
        <div class="iconfont icon-wode weui-tabbar__label" style="font-size: 0.92rem;"></div>
        <!--<wv-badge style="position: absolute;top: 0;right: -6px;">3</wv-badge>-->
      </span>
        我的
      </wv-tabbar-item>
    </wv-tabbar>
    <transition :name="$root.transitionName">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import thumbSmall from './assets/images/icon_tabbar.png'

export default {
  data () {
    return {
      thumbSmall,
      tabShow: true
    }
  },
  methods: {
    selected (route) {
      return this.$router.currentRoute.path === route
    }
  },
  watch: {
    $route (to, from) {
      this.tabShow = to.meta.tabShow === undefined ? true : to.meta.tabShow
    }
  }
}
</script>
<style lang="scss">
  .bgcolor{
    background-color: #02B6DC!important;
  }
  .appcolor{
    color:#02B6DC;
  }
  .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon>i, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{
    color: #02B6DC;
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
  /*.wv-content_profile{*/
    /*position: fixed;*/
    /*top: 1.6rem;*/
    /*left: 0;*/
    /*right: 0;*/
    /*bottom: 2rem;*/
    /*!* height: 18.2rem; *!*/
    /*overflow: hidden;*/
    /*overflow-y: scroll;*/
    /*-webkit-overflow-scrolling: touch;*/
  /*}*/
  .wv-content{
    position: absolute;
    top: 49px;
    left: 0;
    right: 0;
    bottom: 0;
    /* height: 18.2rem; */
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
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
  .icon{
    font-size: 22px;
  }
</style>
