<template>
  <wv-tabbar>
    <wv-tabbar-item to="/home" >
      <span slot="icon" style="display: inline-block; position: relative;">
        <img class="weui-tabbar__icon" :src="thumbSmall" slot="icon">
        <wv-badge is-dot style="position: absolute;top: -2px;right: -13px;">8</wv-badge>
      </span>
      首页
    </wv-tabbar-item>
    <wv-tabbar-item to="/">
      <span slot="icon" style="display: inline-block; position: relative;">
        <img class="weui-tabbar__icon" :src="thumbSmall" slot="icon">
        <wv-badge style="position: absolute;top: 0;right: -6px;">8</wv-badge>
      </span>
      外呼
    </wv-tabbar-item>
    <wv-tabbar-item to="/profile">
      <img class="weui-tabbar__icon" :src="thumbSmall" slot="icon"> 我的
    </wv-tabbar-item>
  </wv-tabbar>
</template>

<script>
import thumbSmall from '../../assets/images/icon_tabbar.png'

export default {
  data () {
    return {
      thumbSmall
    }
  }
}
</script>
