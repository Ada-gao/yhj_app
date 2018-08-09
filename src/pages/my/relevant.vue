<template>
  <div class="page">
    <wv-header title="关于闪电呼" class="x-header bgcolor">
      <div class="btn-back" slot="left" style="position: absolute;top: 7px;left: 0;width: 20%;">
        <i class="iconfont icon-fanhui icon size_i" @click="$router.push('/profile')"></i>
      </div>
    </wv-header>
    <div class="wv-content x-wrapper">
      <div style="width: 3.14rem;margin: 0 auto;padding-top: 4rem">
        <img :src="logoImg" style="max-width: 100%">
      </div>
    <p class="relevant_edition" style="margin-top: 1.18rem">客户端版本号：1.0</p>
    <p class="relevant_edition">版权所有：上海数赟科技有限公司</p>
    <wv-footer style="font-size: 0.56rem" class="footer-demo" text="Copyright © 2018 ShuYun.All Rights Reserved"/>
    <wv-group style="margin-top: 1.86rem">
      <wv-cell title="微信公众号" value="gh_374030c43f3c" is-link v-clipboard:copy="message"
               v-clipboard:success="onCopy">
      </wv-cell>
    </wv-group>
    </div>
    <div class="details_return" v-show="detailsreturn">
      <div class="detail_contents">
        <div style="height: 2rem;line-height: 2rem;font-size: 18px;color: #333333;">微信公众号已复制</div>
        <div style="font-size: 0.56rem;color: #9c9ca0;">点击微信-通讯录-公众号-添加<br/>在搜索栏中粘贴公众号，搜索关注“数赟科技”</div>
        <wv-flex>
          <wv-flex-item>
            <div class="placeholder button_outs bgcolor" @click="buttoneturn">确 定</div>
          </wv-flex-item>
        </wv-flex>
      </div>
    </div>
  </div>
</template>
<script>
import logoImg from '../../assets/images/LOGO_.png'
// import { Dialog } from 'we-vue'
export default {
  data () {
    return {
      logoImg,
      detailsreturn: false,
      message: 'gh_374030c43f3c'
    }
  },
  methods: {
    onCopy: function (e) {
      this.detailsreturn = true
      // Dialog({
      //   title: '微信公众号已复制',
      //   message: '点击微信-通讯录-公众号-添加<br/>在搜索栏中粘贴公众号，搜索关注“数赟科技”',
      //   showConfirmButton: true
      // }).then(() => {})
    },
    buttoneturn () {
      this.detailsreturn = false
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
</style>
