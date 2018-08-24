<template>
  <div class="page" style="background: #ffffff;position: absolute">
    <wv-header title="首页" class="x-header" background-color="#FFFFFF">
      <div class="btn-back header_left" slot="left">
        <i class="iconfont icon-wode" @click="$router.push('/profile')" style="font-size: 27px"></i>
      </div>
    </wv-header>
    <div class="x-wrapper">
      <!--<div class="home_content" >-->
        <!--<div class="home_header">-->
          <!--<div class="home_time">-->
          <!--<p class="iconfont icon-rili" style="float: left;margin: 0 0.2rem"></p>-->
          <!--<p>{{dateTime}}</p>-->
          <!--</div>-->
          <!--<div class="home_head">-->
            <!--<div class="head_h">-->
              <!--<div class="head_img">-->
                <!--<img :src="logo_head" alt="">-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="home_inform">-->
              <!--<h5 class="home_company">{{Belonged || '公司名称未设置'}}</h5>-->
              <!--<h6 class="home_name">姓名：{{name}}</h6>-->
              <!--<p class="home_state" v-if="completeStatus==false">状态：任务尚未完成，请继续努力</p>-->
              <!--<p class="home_state" v-if="completeStatus==true">状态：任务已完成，请继续加油哦！</p>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <div class="home_progress">
        <wv-progress  :show-clear="false" style="width: 95%; margin: 0 auto"/>
      </div>
      <div class="home_nav">
          <wv-flex :gutter="10" style="width: 100%;">
            <wv-flex-item>
              <div class="placeholder home_number">{{form.dailyTaskCnt || '-' }}个</div>
              <div class="placeholder home_text">今日任务数</div>
            </wv-flex-item>
            <wv-flex-item>
              <div class="placeholder home_number">{{form.dailyTaskCompleteCnt || '-' }}个</div>
              <div class="placeholder home_text">今日完成数</div>
            </wv-flex-item>
            <wv-flex-item>
              <div class="placeholder home_number">{{form.dailyEffectiveDuration || '-' }}</div>
              <div class="placeholder home_text">今日有效通话时长</div>
            </wv-flex-item>
          </wv-flex>
        <!--<div style="width: 5%">-->
          <!--<router-link :to="{path:'/call', params:{userId: userId}}">-->
            <!--<p class="iconfont icon-fanhui icon_right"></p>-->
          <!--</router-link>-->
        <!--</div>-->
      </div>
      <div class="swiper_page">
        <div style="width:28090000px;" v-for="item in statisGroup" :key="item.taskGroupId">
          <div class="home_list">
            <div class="progress_title">
              <p style="width: 90%">{{item.productName}}</p>
              <p class="iconfont icon-huadong" style=" color:#E9E9E9"></p>
            </div>
            <wv-flex :gutter="10" style="width: 88%;margin: 0.5rem auto 0;border-bottom: 1px solid rgba(216, 216, 216, 0.2)">
              <wv-flex-item>
                <div class="placeholder progress_number">{{item.totalTaskCnt}}<small style="font-size: 50%">个</small></div>
                <div class="placeholder progress_text">客户总数</div>
              </wv-flex-item>
              <wv-flex-item>
                <div class="placeholder progress_number">{{item.totalTaskCompleteCnt }}个</div>
                <div class="placeholder progress_text">剩余未呼</div>
              </wv-flex-item>
            </wv-flex>
            <p class="progress_time">任务计划完成时间：{{item.taskEndDate | moment('YYYY.MM.DD')}}</p>
          </div>
        </div>
      </div>
      <div class="phone_button bgcolor" @click="$router.push('/call/customer-random')">
        <small class="iconfont icon-hujiao" style="font-size: 100%;"></small>开始外呼
      </div>
      <!--<div class="home_progress" v-for="item in statisGroup" :key="item.taskGroupId">-->
        <!--<p class="progress_title">{{item.productName}}</p>-->
        <!--&lt;!&ndash; <p class="progress_list"></p> &ndash;&gt;-->
        <!--<wv-progress :percent="item.percent" :show-clear="false" style="width: 95%; margin: 0 auto"/>-->
        <!--<p style="font-size: 0.48rem;margin-top: 0.58rem;margin-left: 0.4rem;">-->
          <!--<small style="color: #02B6DC;font-size: 100%">-->
            <!--{{item.totalTaskCompleteCnt}}</small>/{{item.totalTaskCnt}}-->
        <!--</p>-->
        <!--<p class="progress_time">任务计划完成时间：{{item.taskEndDate | moment('YYYY.MM.DD')}}</p>-->
      <!--</div>-->
      <!--<wv-footer class="footer-demo footer_status" text="——已加载全部——"></wv-footer>-->
    </div>
    <div class="home_complete" v-show="complete">
      <div class="complete_content"></div>
    </div>
  </div>
</template>

<script>
import thumbSmall from '../../assets/images/icon_tabbar.png'
import head from '@/assets/images/hand.png'
import { getCompany, getUser, getStatisGroup, getCompleteStatus, getRank } from '@/api/api'
import { timeDate } from '@/utils'
// getTaskStatisticsDaily
export default {
  data () {
    return {
      thumbSmall,
      head,
      dateTime: '',
      form: {},
      Belonged: '',
      name: '',
      statisGroup: {},
      percent: 60,
      completeStatus: '',
      userId: '',
      logo_head: '',
      complete: false
    }
  },
  mounted () {
    this.time()
    this.getList()
  },
  methods: {
    getList () {
      getCompany().then(res => {
        if (res.data.logo === '' || res.data.logo === null) {
          this.logo_head = this.head
          this.Belonged = res.data.companyName
          this.Belonged = res.data.companyName
        } else {
          this.logo_head = process.env.BASE_API + '/file?fileUuid=' + res.data.logo
          this.Belonged = res.data.companyName
        }
      })
      getUser().then(res => {
        this.name = res.data.name
        localStorage.setItem('userId', res.data.id)
        getCompleteStatus(res.data.id).then((res) => {
          this.completeStatus = res.data
          // console.log(this.completeStatus)
        })
        getRank(res.data.id).then(res => {
          this.form = res.data
          this.form.dailyEffectiveDuration = timeDate(res.data.dailyEffectiveDuration)
        })
      })
      getStatisGroup().then(res => {
        this.statisGroup = res.data
        this.statisGroup.forEach(item => {
          item.percent = item.totalTaskCompleteCnt * 100 / item.totalTaskCnt
          // console.log(item.percent)
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
    },
    callphone () {
      this.$router.push({path: '/call/customer-random'})
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
  .wv-header .left[data-v-a5b8d5b6],.wv-header .wv-header-title[data-v-a5b8d5b6] {
    font-size: 36px;
    color: rgba(0, 0, 0, 1);
  }
  /*.weui-flex__item{*/
    /*margin-bottom: 79px;*/
  /*}*/
  .home_list{
    width:620px;
    height:702px;
    /*background:yellow;*/
    float:left;
    margin:3px 30px 0 3px;
    border-radius: 12px;
    box-shadow: 6px 4px 20px rgba(169, 169, 169, 0.4);
  }
  .home_list>li{
    float: left;
    list-style: none;
    width: 100%;
  }
  .home_content{
    width: 100%;
  }
  .swiper_page{
    width:92%;
    height:715px;
    margin:60px 0 0 60px;
    overflow:auto;
    -webkit-overflow-scrolling: touch
  }
  .progress_number{
    font-size: 64px;
    color: #222222;
    text-align: center;
  }
  .progress_text{
    font-size: 28px;
    color: #9c9c9c;
    text-align: center;
    margin-bottom: 79px;
  }
  .header_left{
    position: absolute;
    top: 30px;
    left: 39px;
    width: 20%;
    color: #000000;
    font-size: 26px;
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
    background-color: #ffffff;
  }
  .phone_button{
    width: 90%;
    height: 98px;
    background: linear-gradient(to right, #5d90f4 , #2f6be2);
    border-radius: 12px;
    font-size: 36px;
    text-align: center;
    line-height: 98px;
    color: #FFFFFF ;
    display: inherit;
    box-shadow: 0px 7px 29px 1px rgba(13,67,173,0.5);
    margin: 72px auto 0;
  }
  /*.home_name{*/
    /*font-size: 0.52rem;*/
    /*margin-bottom: 0.44rem;*/
  /*}*/
  /*.home_state{*/
    /*font-size: 0.48rem;*/
    /*font-weight: 100;*/
  /*}*/
  .home_nav{
    height: 80px;
    padding-top: 80px;
    /*background: #FFFFFF;*/
  }
  .home_number{
    font-size: 34px;
    text-align: center;
    color:#3570e4
    /*margin-top: 1.32rem;*/
    /*margin-bottom: 0.66rem;*/
  }
  .home_text{
    font-size: 24px;
    text-align: center;
    color: #171717;
    /*margin-bottom: 1.16rem;*/
  }
  .home_nav>div{
    float: left;
  }
  .home_progress{
    padding-top: 80px;
    /*height: 4.82rem;*/
    /*background: #FFFFFF;*/
    /*margin-top: 0.4rem;*/
  }
  .progress_title{
    width: 90%;
    height: 170px;
    line-height: 170px;
    margin: 0 auto;
    border-bottom: 0.5px solid rgba(111, 106, 106, 0.31);
    font-size: 32px;
  }
  .progress_title>p{
    float: left;
  }
  .progress_list{
    width: 90%;
    margin:0.78rem auto 0;
    /*background:#32CCBC;*/
    height: 0.5rem;
    border-radius: 10px;
  }
  .progress_time{
    font-size: 32px;
    color: #222222;
    font-weight: 200;
    width: 75%;
    margin: 60px auto;
  }
  /*.weui-progress__bar {*/
    /*height: 0.5rem!important;*/
    /*border-radius: 10px!important;*/
  /*}*/
  /*.weui-progress__inner-bar {*/
    /*background-color: #02B6DC!important;*/
    /*height: 0.5rem!important;*/
    /*border-radius: 10px!important;*/
  /*}*/
  .home_complete{
    z-index: 501;
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.61);
  }
  .complete_content{
    position: fixed;
    z-index: 501;
    width: 83%;
    max-width: 623px;
    top: 43%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    overflow: hidden;
    height: 706px;
    background: #ffffff;
    border-radius: 12px;
  }
</style>
