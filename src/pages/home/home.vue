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
        <p>{{dateTime}}</p>
        </div>
        <div class="home_head">
          <div class="head_h">
            <img :src="company.logo" alt="">
          </div>
          <div class="inform">
            <h5 class="home_company">{{company.companyName}}</h5>
            <h6 class="home_name">姓名：{{name}}</h6>
            <p class="home_state">状态：任务尚未完成，请继续努力</p>
          </div>
        </div>
      </div>
    </div>
    <div class="home_nav">
      <div style="width: 95%">
        <wv-flex :gutter="10" style="width: 100%;">
          <wv-flex-item>
            <div class="placeholder home_number">{{form.dailyTaskCnt}}个</div>
            <div class="placeholder home_text">今日任务数</div>
          </wv-flex-item>
          <wv-flex-item>
            <div class="placeholder home_number">{{form.dailyTaskCompleteCnt}}个</div>
            <div class="placeholder home_text">今日完成数</div>
          </wv-flex-item>
          <wv-flex-item>
            <div class="placeholder home_number">{{form.dailyEffectiveDuration}}秒</div>
            <div class="placeholder home_text">今日有效通话时长</div>
          </wv-flex-item>
        </wv-flex>
      </div>
      <div style="width: 5%">
        <router-link to="/call" class="iconfont icon-fanhui icon_jian"></router-link>
        <!-- <p class="iconfont icon-fanhui icon_jian"></p> -->
      </div>
    </div>
    <div class="home_progress" v-for="item in statisGroup" :key="item.taskGroupId">
      <p class="progress_title">{{item.productName}}</p>
      <!-- <p class="progress_list"></p> -->
      <wv-progress :percent="item.percent" :show-clear="false" style="width: 95%; margin: 0 auto"/>
      <p style="font-size: 0.48rem;margin-top: 0.58rem;margin-left: 0.4rem;">
        <small style="color: #32CCBC;font-size: 100%">
          {{item.totalTaskCompleteCnt}}</small>/{{item.totalTaskCnt}}
      </p>
      <p class="progress_time">任务计划完成时间：{{item.taskEndDate}}</p>
    </div>
  </div>
</template>

<script>
import thumbSmall from '../../assets/images/icon_tabbar.png'
import { getTaskStatisticsDaily, getCompany, getUser, getStatisGroup } from '@/api/api'

export default {
  data () {
    return {
      thumbSmall,
      dateTime: '',
      form: {},
      company: {},
      name: '',
      statisGroup: {},
      percent: 60
    }
  },
  mounted () {
    this.time()
    this.getList()
  },
  methods: {
    getList () {
      getTaskStatisticsDaily().then(res => {
        this.form = res.data
      })
      getCompany().then(res => {
        this.company = res.data
      })
      getUser().then(res => {
        this.name = res.data.name
      })
      getStatisGroup().then(res => {
        this.statisGroup = res.data
        this.statisGroup.forEach(item => {
          item.percent = item.totalTaskCompleteCnt * 100 / item.totalTaskCnt
          console.log(item.percent)
        })
      })
    },
    onClick () {
      this.$root.message('click')
    },
    selected (route) {
      return this.$router.currentRoute.path === route
    },
    time () {
      var nowdate = new Date()
      var y = nowdate.getFullYear()
      var m = nowdate.getMonth() + 1
      var d = nowdate.getDate()
      var my = nowdate.getDay()
      var weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      if (m < 10) {
        m = '0' + m
      }
      if (d < 10) {
        d = '0' + d
      }
      this.dateTime = y + '年' + m + '月' + d + '日' + weekday[my]
    }
  },
  computed: {
    title () {
      return this.$route.meta.title
    }
  }
}
</script>

<style lang="scss">
  .wv-header .left[data-v-a5b8d5b6],.wv-header .wv-header-title[data-v-a5b8d5b6]{
    font-size: 0.72rem;
  }
  .home_content{
    width: 100%;
  }
  .home_header{
    height: 5.42rem;
    width: 100%;
    /*margin-top: 1.29rem;*/
    margin-bottom: 0.06rem;
    background: #FFFFFF;
  }
  // .home_header>p{
  // }
  .home_time{
    height: 1.6rem;
    font-size: 0.52rem;
    line-height: 1.6rem;
    border-bottom: 1px solid #D8D8D8;
  }
  .home_head{
    height: 3.76rem;
  }
  .head_h{
    width: 29%;
    height: 100%;
    text-align: center;
    img {
      width: 85px;
      height: 85px;
      border-radius: 50%;
      margin-top: 5px;
    }
  }
  .head_h,.inform{
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
    height: 4.82rem;
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
  .weui-progress__bar {
    height: 0.5rem!important;
    border-radius: 10px!important;
  }
  .weui-progress__inner-bar {
    background-color: #32CCBC!important;
    height: 0.5rem!important;
    border-radius: 10px!important;
  }
</style>
