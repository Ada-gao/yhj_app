<template>
  <div class="page">
    <!--<wv-header :title="title" :fixed="false" background-color="#09bb07">-->
    <!--</wv-header>-->
    <!--<wv-grid>-->
      <!--<wv-grid-item class="demo-grid-item" to="/land">-->
        <!--<img :src="thumbSmall" slot="icon">-->
        <!--<span slot="label">今日任务数</span>-->
      <!--</wv-grid-item>-->
      <!--<wv-grid-item class="demo-grid-item" to="/">-->
        <!--<img :src="thumbSmall" slot="icon">-->
        <!--<span slot="label">今日完成数</span>-->
        <!--<wv-badge style="position: absolute;top: 15px;right: 20px;">3</wv-badge>-->
      <!--</wv-grid-item>-->
      <!--<wv-grid-item class="demo-grid-item" to="/">-->
        <!--<img :src="thumbSmall" slot="icon">-->
        <!--<span slot="label">今日通话时长</span>-->
      <!--</wv-grid-item>-->
    <!--</wv-grid>-->
    <!--<div class="tips" to="/land">任务完成进度条</div>-->
    <!--<wv-slider v-model="percent" disabled/>-->
    <wv-tabbar>
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
    </wv-tabbar>
    <transition :name="$root.transitionName">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import thumbSmall from '../assets/images/icon_tabbar.png'

export default {
  data () {
    return {
      thumbSmall,
      percent: 60
    }
  },
  methods: {
    onClick () {
      this.$root.message('click')
    },
    selected (route) {
      return this.$router.currentRoute.path === route
    }
  },
  computed: {
    title () {
      return this.$route.meta.title
    }
  }
}
</script>

<style scoped lang="scss">
  .demo-grid-item {
    background-color: white;
  }

  .custom-content {
    display: block;
    overflow: hidden;
    color: #555;
    font-size: 13px;
    text-align: center;
    height: 50px;
  }

  .weui-progress {
    height: 50px;
    margin-left: 20px;
    margin-right: 20px;
  }

  .tips {
    margin-top: 2em;
    font-size: 14px;
    color: #666;
    margin-left: 1em;
  }
</style>
