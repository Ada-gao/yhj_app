<template>
  <div id="app">
  <!--  <wv-tabbar>
      <wv-tabbar-item to="/home" :isOn="selected('/home')">
      <span slot="icon" style="display: inline-block; position: relative;">
        <img class="weui-tabbar__icon" :src="thumbSmall" slot="icon">
        <wv-badge is-dot style="position: absolute;top: -2px;right: -13px;">8</wv-badge>
      </span>
        首页
      </wv-tabbar-item>
      <wv-tabbar-item to="/call" :isOn="selected('/call')">
      <span slot="icon" style="display: inline-block; position: relative;">
        <img class="weui-tabbar__icon" :src="thumbSmall" slot="icon">
        <wv-badge style="position: absolute;top: 0;right: -6px;">3</wv-badge>
      </span>
        外呼
      </wv-tabbar-item>
      <wv-tabbar-item to="/profile" :isOn="selected('/profile')">
        <img class="weui-tabbar__icon" :src="thumbSmall" slot="icon"> 我的
      </wv-tabbar-item>
    </wv-tabbar>-->
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
      thumbSmall
    }
  },
  methods: {
    selected (route) {
      console.log(route)
      return this.$router.currentRoute.path === route
    }
  }
}
</script>
