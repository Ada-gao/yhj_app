<template>
  <div class="page pagebgcolor">
    <wv-header title="关于闪电呼" class="x-header bgcolor">
      <div class="btn-back header_left" slot="left" @click="$router.push('/profile')">
        <i class="iconfont icon-fanhui icon size_i"></i>
        <p class="head_return">返回</p>
      </div>
    </wv-header>
    <div class="x-wrapper">
      <div class="relevant_logo">
        <img :src="logoImg" style="max-width: 100%">
      </div>
      <p class="app_name">闪电呼</p>
      <p class="app_edition">客户端版本号：1.0</p>
      <div class="company_content">
        <p class="company">版权所有：上海数赟科技有限公司</p>
        <p class="app_txt">Copyright © 2018 shuyun.All Rights Reserved</p>
        <p class="app_weixin">微信公众号：gh_374030c43f3c<small style="font-size: 100%;color: #306ce2;" v-clipboard:copy="message" v-clipboard:success="onCopy">一键复制</small></p>
      </div>
    </div>
  </div>
</template>
<script>
import logoImg from '../../assets/images/lo.png'
import { Toast } from 'we-vue'
export default {
  data () {
    return {
      logoImg,
      detailsreturn: false,
      message: 'gh_374030c43f3c'
    }
  },
  methods: {
    onCopy: function () {
      Toast.text({
        duration: 1000,
        message: '复制成功！'
      })
    },
    buttoneturn () {
      this.detailsreturn = false
    }
  }
}
</script>
<style scoped lang="scss">
  .relevant_logo{
    width: 150px;
    height: 150px;
    margin: 0 auto;
    padding-top: 217px;
  }
  .app_name{
    width: 100%;
    text-align: center;
    font-size: 36px;
    margin-top: 39px;
  }
  .app_edition{
    width: 100%;
    text-align: center;
    font-size: 26px;
    color: #868686;
    margin-top: 18px;
  }
  .company_content{
    /*margin-top: 544px;*/
    width: 100%;
    position: absolute;
    bottom: 99px;
  }
  .company{
    width: 100%;
    text-align: center;
    font-size: 28px;
    color: #3e3e3e;
  }
  .app_txt{
    width: 100%;
    text-align: center;
    color: #868686;
    font-size: 24px;
    margin-top: 18px;
  }
  .app_weixin{
    width: 100%;
    text-align: center;
    font-size: 28px;
    color: #3e3e3e;
    margin-top: 29px;
  }

  // .relevant_edition{
  //   text-align: center;
  //   font-size: 0.72rem;
  //   font-weight: 500;
  //   color: #333333;
  // }
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
</style>
