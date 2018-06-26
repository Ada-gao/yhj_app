<template>
  <div class="page" style="background: #F5F5F5;">
    <wv-header title="首页" :fixed="false" background-color="#32CCBC" class="x-header">
      <div class="btn-back" slot="left">
      </div>
    </wv-header>
    <div class="home_content" >
      <div class="home_header">
        <div class="home_time">
        <p class="iconfont icon-rili" style="float: left;margin: 0 0.2rem"></p>
        <p>2018年6月12日 星期一</p>
        </div>
        <div class="home_head">
          <div class="head">
            <p class="head_img"></p>
          </div>
          <div class="inform">
            <h5 class="home_company">数赟科技</h5>
            <h6 class="home_name">姓名：阿西</h6>
            <p class="home_state">状态：任务尚未完成，请继续努力</p>
          </div>
        </div>
      </div>
    </div>
    <div class="home_nav">
      <div style="width: 95%">
        <wv-flex :gutter="10" style="width: 100%;">
          <wv-flex-item>
            <div class="placeholder home_number">1200分</div>
            <div class="placeholder home_text">总通话时长</div>
          </wv-flex-item>
          <wv-flex-item>
            <div class="placeholder home_number">699个</div>
            <div class="placeholder home_text">总任务完成数</div>
          </wv-flex-item>
          <wv-flex-item>
            <div class="placeholder home_number">50秒</div>
            <div class="placeholder home_text">平均通话时长</div>
          </wv-flex-item>
        </wv-flex>
      </div>
      <div style="width: 5%">
        <p class="iconfont icon-fanhui icon_jian"></p>
      </div>
    </div>
    <div class="home_progress">
      <p class="progress_title">“聚宝盆”陌call</p>
      <p class="progress_list"></p>
      <p style="font-size: 0.48rem;margin-top: 0.58rem;margin-left: 0.4rem;">
        <small style="color: #32CCBC;font-size: 100%">1000</small>/10000
      </p>
      <p class="progress_time">任务计划完成时间：2018.7.1</p>
    </div>
  </div>
</template>

<script>
import thumbSmall from '../../assets/images/icon_tabbar.png'

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
  .home_content{
    width: 100%;
  }
  .home_header{
    height: 5.42rem;
    width: 100%;
    margin-top: 1.29rem;
    margin-bottom: 0.06rem;
    background: #FFFFFF;
  }
  .home_header>p{
  }
  .home_time{
    height: 1.6rem;
    font-size: 0.52rem;
    line-height: 1.6rem;
    border-bottom: 1px solid #D8D8D8;
  }
  .home_head{
    height: 3.76rem;
  }
  .head{
    width: 29%;
  }
  .head,.inform{
    float: left;
  }
  .head_img{
    width: 2.5rem;
    height: 2.5rem;
    background-color: #1aad19;
    border-radius: 50%;
    box-shadow:rgba(238, 233, 233, 0.34) 0px 0px 0px 5px;
    margin: 0.6rem auto;
  }
  .home_company{
    font-size: 0.48rem;
    text-align: right;
    padding-right: 0.4rem;
    padding-top: 0.2rem;
  }
  .inform{
    width: 71%;
  }
  .home_name{
    font-size: 0.52rem;
    margin-bottom: 0.44rem;
  }
  .home_state{
    font-size: 0.48rem;
    font-weight: 100;
  }
  .home_nav{
    height: 4.82rem;
    background: #FFFFFF;
  }
  .home_number{
    font-size: 0.64rem;
    color: #02A2D1;
    text-align: center;
    margin-top: 1.32rem;
    margin-bottom: 0.66rem;
  }
  .home_text{
    font-size: 0.52rem;
    text-align: center;
    margin-bottom: 1.16rem;
  }
  .home_nav>div{
    float: left;
  }
  .home_progress{
    height: 5.72rem;
    background: #FFFFFF;
    margin-top: 0.4rem;
  }
  .progress_title{
    font-size: 0.56rem;
    margin-top: 0.58rem;
    margin-left: 0.4rem;
  }
  .progress_list{
    width: 90%;
    margin:0.78rem auto 0;
    background:#32CCBC;
    height: 0.5rem;
    border-radius: 10px;
  }
  .progress_time{
    font-size: 0.48rem;
    color: #666666;
    margin-top: 0.56rem;
    text-align: right;
    width: 95%;
  }
  .icon_jian{
    line-height: 4.82rem;
    color:#32CCBC;
    transform:rotate(180deg);
    -ms-transform:rotate(180deg);
    -moz-transform:rotate(180deg);
    -webkit-transform:rotate(180deg);
    -o-transform:rotate(180deg);
  }
</style>
