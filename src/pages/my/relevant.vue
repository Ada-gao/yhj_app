<template>
  <div class="page">
    <wv-header title="关于闪电呼" :fixed="true" background-color="#32CCBC">
      <div class="btn-back" slot="left">
        <i class="iconfont icon-fanhui" @click="$router.push('/profile')"></i>
      </div>
    </wv-header>
      <div style="width: 3.14rem;margin: 0 auto;padding-top: 4.8rem">
        <img :src="logoImg" style="max-width: 100%">
      </div>
    <p class="relevant_edition" style="margin-top: 1.18rem">客户端版本号：1.0</p>
    <p class="relevant_edition">版权所有：上海数赟科技有限公司</p>
    <wv-footer style="font-size: 0.56rem" class="footer-demo" text="Copyright © 2018 suxiang.All Rights Reserved"/>
    <wv-group title="" style="margin-top: 1.86rem">
      <wv-cell title="微信公众号" value="gh_374030c43f3c" is-link @click="showDialog('ios')"></wv-cell>
    </wv-group>
  </div>
</template>
<script>
import logoImg from '../../assets/images/LOGO_.png'
import { Dialog } from 'we-vue'
export default {
  data () {
    return {
      logoImg
    }
  },
  methods: {
    showDialog (skin, title) {
      Dialog({
        title: '微信公众号已复制',
        message: '点击微信-通讯录-公众号-添加<br/>在搜索栏中粘贴公众号，搜索关注“数赟科技”？',
        skin,
        showConfirmButton: true
      }).then(() => {})
    }
  }
}
</script>
<style scoped lang="scss">
  .relevant_edition{
    text-align: center;
    font-size: 0.72rem;
    font-weight: 500;
    color: #333333;
  }
</style>
