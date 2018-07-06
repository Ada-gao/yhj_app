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
      <wv-tabbar-item to="/call/details-y" :isOn="selected('/call/details-y')">
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
<style>
  .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon>i, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{
    color: #32CCBC;
  }
  .weui-tabbar__label{
    line-height: 1.6;
  }
  .weui-tabbar{
    margin-bottom: constant(safe-area-inset-bottom);
    margin-bottom: env(safe-area-inset-bottom);
  }
</style>
