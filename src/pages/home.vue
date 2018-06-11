<template>
  <div class="page">
    <wv-header :title="title" :fixed="false" background-color="#09bb07">
    </wv-header>
    <wv-grid>
      <wv-grid-item class="demo-grid-item" to="/">
        <img :src="thumbSmall" slot="icon">
        <span slot="label">今日任务数</span>
      </wv-grid-item>
      <wv-grid-item class="demo-grid-item" to="/">
        <img :src="thumbSmall" slot="icon">
        <span slot="label">今日完成数</span>
        <wv-badge style="position: absolute;top: 15px;right: 20px;">3</wv-badge>
      </wv-grid-item>
      <wv-grid-item class="demo-grid-item" to="/">
        <img :src="thumbSmall" slot="icon">
        <span slot="label">今日通话时长</span>
      </wv-grid-item>
    </wv-grid>
    <div class="tips">任务完成进度条</div>
    <wv-slider v-model="percent" disabled/>
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
