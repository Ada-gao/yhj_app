<template>
  <div id="app">
    <!--<wv-tabbar v-show="tabShow" :fixed="true" style="background: #FFFFFF">-->
      <!--<wv-tabbar-item to="/home" :isOn="selected('/home')">-->
      <!--<span slot="icon" style="display: inline-block; position: relative;">-->
        <!--<div class="iconfont icon-shouye weui-tabbar__label" style="font-size: 0.92rem;"></div>-->
        <!--&lt;!&ndash;<wv-badge is-dot style="position: absolute;top: -2px;right: -13px;">8</wv-badge>&ndash;&gt;-->
      <!--</span>-->
        <!--首页-->
      <!--</wv-tabbar-item>-->
      <!--<wv-tabbar-item to="/call/customer-random" :isOn="selected('/call/details-y')">-->
      <!--<span slot="icon" style="display: inline-block; position: relative;">-->
        <!--<div class="iconfont icon-hujiaozhongxin weui-tabbar__label" style="font-size: 0.96rem;"></div>-->
        <!--&lt;!&ndash;<wv-badge style="position: absolute;top: 0;right: -6px;">3</wv-badge>&ndash;&gt;-->
      <!--</span>-->
        <!--开始外呼-->
      <!--</wv-tabbar-item>-->
      <!--<wv-tabbar-item to="/profile" :isOn="selected('/profile')">-->
        <!--<span slot="icon" style="display: inline-block; position: relative;">-->
        <!--<div class="iconfont icon-wode weui-tabbar__label" style="font-size: 0.92rem;"></div>-->
        <!--&lt;!&ndash;<wv-badge style="position: absolute;top: 0;right: -6px;">3</wv-badge>&ndash;&gt;-->
      <!--</span>-->
        <!--我的-->
      <!--</wv-tabbar-item>-->
    <!--</wv-tabbar>-->
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
  .wv-header[data-v-a5b8d5b6]{
    height: 80px!important;
    line-height: 80px!important;
  }
  .wv-header .wv-header-title[data-v-a5b8d5b6]{
    color: #000000;
    font-size: 36px;
  }
  .wv-content{
    position: absolute;
    top: 80px;
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
  .button_outs{
    color: #F0F0F0;
    width: 38%;
    margin: 0 auto;
    border-radius: 4px;
    font-size: 17px;
    height: 1.61rem;
    line-height: 1.61rem;
  }
  .details_return{
    z-index: 501;
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.61);
  }
  .detail_contents{
    position: fixed;
    z-index: 501;
    width: 73%;
    max-width: 300px;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    overflow: hidden;
    height: 6.9rem;
    text-align: center;
    background: #ffffff;
    border-radius: 0.2rem;
    font-size: 0.8rem;
  }
  .size_i{
    font-size: 40px;
    margin-left: 0.2rem;
    color:#000000!important;
  }
  .size_c{
    font-size: 40px;
    margin-left: 0.2rem;
    color:#ffffff!important;
  }
</style>
