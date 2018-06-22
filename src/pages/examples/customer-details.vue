<template>
  <div class="page">
    <wv-header title="任务完成(15/20)" :fixed="true" background-color="#32CCBC">
      <div class="btn-back" slot="left">
        <i class="iconfont icon-fanhui" @click="$router.push('/profile')"></i>
      </div>
      <div class="btn-menu" slot="right">
        <p style="font-size: 0.56rem">(40:20)</p>
      </div>
    </wv-header>
    <wv-flex :gutter="10" style="margin-top: 2rem">
      <wv-flex-item flex="3">
        <div class="placeholder details_left">
          <p style="font-size: 0.56rem;color: #32CCBC;text-align: center">外呼次数2次，最近外呼时间：2018.6.14</p>
          <p style="width: 2.5rem;margin: 0 auto">
            <img :src="thumbSmall" style="max-width: 100%">
          </p>
          <p style="font-size: 0.64rem;text-align: center">小阿西</p>
          <p class="inform">年龄：<small style="font-size: 100%;color: rgb(106, 107, 105)">10-20岁</small></p>
          <p class="inform">性别：<small style="font-size: 100%;color: rgb(106, 107, 105) ">女</small></p>
          <p class="inform">电话：<small style="font-size: 100%;color: rgb(106, 107, 105)">1366****489</small></p>
        </div>
      </wv-flex-item>
      <wv-flex-item >
        <div class="placeholder details_right">
          <p class="photo_img">
            <img :src="photoImg">
          </p>
          <p class="details_phone">无人接听</p>
        </div>
        <div class="placeholder details_right">
          <p class="iconfont icon-personal-center icon_ju"></p>
          <p class="details_phone">聚宝盆</p>
        </div>
        <div class="placeholder details_right">
          <p class="iconfont icon-xiansuo icon_sou"></p>
          <p class="details_phone">自有线索</p>
        </div>
      </wv-flex-item>
    </wv-flex>
    <div class="phone_details">
      <p class="phone_content">外呼话述：</p>
      <div class="phone_html" v-html="message">
        <!--<textarea class="weui-cells" placeholder="" :rows="8" :show-counter="false"></textarea>-->
      </div>
      <div class="phone_button">
        <small class="iconfont icon-waihuquerenxuanzhong" style="font-size: 100%;"></small>开始外呼
      </div>
    </div>
  </div>
</template>
<script>
import thumbSmall from '../../assets/images/icon_tabbar.png'
import photoImg from '../../assets/images/photo.png'
export default {
  data () {
    return {
      thumbSmall,
      photoImg,
      message: '<p style="margin: 5px">客户：外呼</p>'
    }
  }
}
</script>
<style scoped lang="scss">
  .details_left{
    width: 100%;
    height: 9.28rem;
    background: white;
    margin-top: 0.272rem;
    border-radius: 0.1rem;
  }
  .details_right{
    width: 100%;
    background: white;
    height: 2.9rem;
    margin: 0.272rem 0 ;
    border-radius: 0.1rem;
  }
  .inform{
    font-size: 0.56rem;
    padding-left: 3.38rem;
    margin: 0.42rem 0;
  }
  .photo_img{
    width: 0.88rem;
    margin: 0 auto;
  }
  .photo_img>img{
    max-width: 100%;
  }
  .icon_ju{
    width: 0.88rem;
    margin: 0 auto;
    font-size: 0.85rem;
    color: #CF2828;

  }
  .details_phone{
    font-size: 0.56rem;
    text-align: center;
  }
  .icon_sou{
    width: 0.88rem;
    margin: 0 auto;
    font-size: 0.85rem;
    color: #3A99FC;
  }
  .phone_details{
    width: 100%;
    height: 10.34rem;
    background: #FFFFFF;
  }
  .phone_html{
    width: 92%;
    height: 8.34rem;
    margin: 0 auto;
    border-radius: 0.2rem;
    border: 1.5px solid #DEDEDE;
    font-size: 0.52rem;
    color: #666666;
  }
  .phone_content{
    font-size: 0.6rem;
    width: 92%;
    margin: 0.38rem auto;
  }
  .phone_button{
    width: 90%;
    margin: 0.76rem auto 0;
    height: 1.64rem;
    background: #32CCBC ;
    border-radius: 0.2rem;
    font-size: 0.62rem;
    text-align: center;
    line-height: 1.64rem;
    color: #FFFFFF ;
  }
</style>
