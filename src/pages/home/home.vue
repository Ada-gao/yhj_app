<template>
  <div class="page" style="background: #ffffff; position: absolute;">
    <wv-header title="闪电呼" class="x-header" background-color="#FFFFFF">
      <div class="btn-back header_left l40" slot="left">
        <i class="iconfont icon-wode" @click="$router.push('/profile')"></i>
      </div>
    </wv-header>
    <div class="wv-content x-wrapper">
      <div class="home_progress">
        <my-progress :percent="percent" :show-clear="false"></my-progress>
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
        <div v-if="!statisGroup.length" class="home_list default_list">
          <i class="iconfont icon-zanwushuju"></i>
          <p class="def_text1">暂无任务</p>
          <p class="def_text2">请联系管理员给您分配任务</p>
        </div>
        <div style="width:28090000px;" v-for="item in statisGroup" :key="item.taskGroupId">
          <div class="home_list">
            <div class="progress_title">
              <p style="width: 90%">{{item.productName}}</p>
              <p v-if="statisGroup.length > 1" class="iconfont icon-huadong" style=" color:#E9E9E9"></p>
            </div>
            <div class="flex_list">
              <div class="flex_item" style="text-align: left;">
                <div class="placeholder progress_number">{{item.totalTaskCnt}}<small style="font-size: 50%">个</small></div>
                <div class="placeholder progress_txt">客户总数</div>
              </div>
              <div class="flex_item" style="text-align: right;">
                <div class="placeholder progress_number">{{item.totalTaskCnt - item.totalTaskCompleteCnt}}<small style="font-size: 50%">个</small></div>
                <div class="placeholder progress_txt">剩余未呼</div>
              </div>
            </div>
            <div style="color: #9C9C9C;" class="task_list" @click="getTaskList(item.taskGroupId)">
              <p class="progress_time">计划完成时间：{{item.taskEndDate | moment('YYYY.MM.DD')}}</p>
              <p class="task_to">
                <span>点击查看任务列表</span>
                <i class="iconfont icon-gengduo" style="font-size: 18px;"></i>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="phone_button bgcolor" @click="callphone">
        <small class="iconfont icon-hujiao" style="font-size: 100%;"></small>开始外呼
      </div>
      <!--<a :href="packageUrl">ceh</a>-->
    </div>
    <div class="home_complete" v-show="completetoday">
      <div class="complete_content">
        <div class="task_img">
          <img v-bind:src="task">
        </div>
        <p class="task_title">今天的任务已完成！</p>
        <p class="task_txt">请继续加油哦</p>
        <div class="task_buttom" @click="completeTask"> 知道了</div>
      </div>
    </div>
    <!-- 版本升级 -->
    <div class="v_dialog" v-show="versionVisible">
      <div class="v_main">
        <div class="bgImg"></div>
        <!--<img class="img" src="../../assets/images/version.png" alt=""/>-->
        <div class="content">
          <div class="title">【新版本特性】</div>
          <pre class="v_list" v-html="promptText">
          </pre>
          <!--<ul class="v_list">-->
            <!--<li v-for="(item, index) in list" :key="index">-->
              <!--{{index + 1}}.{{item}}-->
            <!--</li>-->
          <!--</ul>-->
          <!--<wv-button class="v_btn" @click="updateVersion">立即升级</wv-button>-->
          <a :href="packageUrl" class="ves_buttom">立即升级</a>
        </div>
        <i class="iconfont icon-guanbi" v-if="versionClose" @click="closeVersion"></i>
      </div>
    </div>
  </div>
</template>

<script>
import thumbSmall from '../../assets/images/icon_tabbar.png'
import task from '@/assets/images/task.png'
import { getUser, getStatisGroup, getRank, getRandom, getLatestVersion } from '@/api/api'
import { timeDate, parseTime } from '@/utils'
import MyProgress from '@/components/progress'
import { Toast } from 'we-vue'
import Vue from 'vue'

// getTaskStatisticsDaily
export default {
  components: {
    MyProgress
  },
  data () {
    return {
      thumbSmall,
      task,
      form: {},
      Belonged: '',
      name: '',
      statisGroup: [],
      percent: '',
      userId: '',
      logo_head: '',
      complete: false,
      Leftover: 0,
      sionVisible: false,
      completetoday: false,
      devicePlatform: '',
      packageUrl: '',
      versionClose: true,
      promptText: '',
      versionVisible: false
    }
  },
  created () {
    this.devicePlatform = Vue.cordova.device.platform
    /* global cordova */
    let _this = this
    if (this.devicePlatform === 'Android') {
      cordova.getAppVersion.getVersionCode(function (version) {
        _this.versions = version
        _this.versionApp(_this.versions)
      })
    }
    // 获取当前移动设备已经安装的版本
    // const devicePlatform = Vue.cordova.device.platform
    // // alert(devicePlatform)
    // if (devicePlatform !== 'ios' || devicePlatform !== 'Android') {
    //   this.versionVisible = false
    // } else {
    //   this.versionVisibleShow = sessionStorage.getItem('versionVisible')
    //   // alert(this.versionVisibleShow)
    //   if (!this.versionVisibleShow) {
    //     // alert('没有' + this.versionVisible)
    //     this.versionVisible = true
    //     sessionStorage.setItem('versionVisible', this.versionVisible)
    //   } else if (this.versionVisibleShow) {
    //     // alert('有' + this.versionVisible)
    //     this.versionVisible = false
    //   }
    // }
  },
  mounted () {
    this.getList()
    // this.versionApp(10)
    // setTimeout(, 2000)
  },
  methods: {
    getList () {
      getUser().then(res => {
        this.name = res.data.name
        localStorage.setItem('userId', res.data.id)
        getRank(res.data.id).then(res => {
          this.form = res.data
          this.form.dailyEffectiveDuration = timeDate(res.data.dailyEffectiveDuration)
          // this.percent = 60
          this.percent = this.form.dailyTaskCompleteCnt * 100 / this.form.dailyTaskCnt || 0
          this.completeshow = sessionStorage.getItem('completetoday')
          if (!this.completeshow) {
            if (this.percent === 100) {
              this.completetoday = true
              sessionStorage.setItem('completetoday', this.completetoday)
            }
          }
        })
      })
      getStatisGroup().then(res => {
        this.statisGroup = res.data || []
        this.statisGroup.forEach(item => {
          item.percent = item.totalTaskCompleteCnt * 100 / item.totalTaskCnt
          // console.log(item.percent)
        })
      })
    },
    selected (route) {
      return this.$router.currentRoute.path === route
    },
    callphone () {
      getRandom().then(res => {
        let randomData = res.data
        this.$router.push({path: '/call/customer-random/1', query: randomData})
      }).catch(() => {
        Toast({
          duration: 1000,
          message: '当前无任务分配',
          type: 'text'
        })
      })
      // this.$router.push({path: '/call/customer-random/1'})
    },
    getTaskList (groupId) {
      this.$router.push({name: 'call', params: {groupId}})
    },
    closeVersion () {
      this.versionVisible = false
      // localStorage.setItem('versionRemark', this.versionVisible)
    },
    updateVersion () {
      this.versionVisible = false
      // const devicePlatform = Vue.cordova.device.platform
      // if (devicePlatform === 'iOS') {
      //   console.log('去 AppStore 下载...')
      // } else {
      //   console.log('去应用宝下载...')
      // }
    },
    completeTask () {
      this.completetoday = false
    },
    versionApp (versions) {
      getLatestVersion(versions).then(res => {
        this.packageUrl = res.data.packageUrl
        if (res.data) {
          // 弹出升级框
          this.versionVisible = true
          this.packageUrl = res.data.packageUrl
          this.promptText = res.data.promptText
          let updateDeadline = parseTime(res.data.updateDeadline, '{y}-{m}-{d}')
          let timeToday = parseTime(new Date(), '{y}-{m}-{d}')
          if (res.data.promptType === 'Force') { // 强制升级
            this.versionClose = false
          } else if (res.data.promptType === 'Recommend' && updateDeadline !== timeToday) { // 推荐升级
            this.versionClose = true
          } else if (updateDeadline === timeToday) { // 推荐升级限制时间已到
            this.versionClose = false
          }
        } else {
          this.versionVisible = false
        }
      }).catch((error) => {
        alert(error)
      })
    }
  }
}
</script>

<style lang="scss">
  .icon-wode{
    font-size: 60px;
  }
  .wv-header .left[data-v-a5b8d5b6],.wv-header .wv-header-title[data-v-a5b8d5b6] {
    font-size: 36px;
    color: rgba(0, 0, 0, 1);
  }

  .home_list{
    width:620px;
    height:702px;
    /*background:yellow;*/
    float:left;
    margin:3px 30px 0 3px;
    border-radius: 12px;
    box-shadow: 6px 3px 20px rgba(169, 169, 169, 0.4);
    padding-left: 60px;
    padding-right: 60px;
    box-sizing: border-box;
  }
  .home_list>li{
    float: left;
    list-style: none;
    width: 100%;
  }
  .default_list {
    text-align: center;
    font-weight: 100;
    .iconfont {
      font-size: 204px;
      color: #f2f2f2;
      margin-top: 117px;
      display: inline-block;
    }
    .def_text1 {
      color: #c2c2c2;
      font-size: 32px;
    }
    .def_text2 {
      color: #d3d3d3;
      font-size: 24px;
    }
  }
  .home_content{
    width: 100%;
  }
  .swiper_page{
    width:92%;
    height:715px;
    margin:60px 0 0 64px;
    overflow:auto;
    -webkit-overflow-scrolling: touch
  }
  .progress_number{
    font-size: 64px;
    color: #222222;
    text-align: center;
  }
  .progress_txt{
    font-size: 28px;
    color: #9c9c9c;
    text-align: center;
    // margin-bottom: 79px;
  }
  .phone_button{
    width: 82%;
    height: 98px;
    background: linear-gradient(to right, #5d90f4 , #2f6be2);
    border-radius: 12px;
    font-size: 34px;
    text-align: center;
    line-height: 98px;
    color: #FFFFFF ;
    display: inherit;
    box-shadow: 0px 7px 29px 1px rgba(13,67,173,0.5);
    margin: 72px auto 0;
  }
  .home_nav{
    height: 80px;
    padding-top: 57px;
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
    width: 85%;
    /*height: 20px;*/
    margin: 20px auto 0
    /*padding-top: 5px;*/
    /*height: 4.82rem;*/
    /*background: #FFFFFF;*/
    /*margin-top: 0.4rem;*/
  }
  .progress_title{
    // width: 90%;
    height: 170px;
    line-height: 170px;
    box-sizing: border-box;
    // margin: 0 auto;
    border-bottom: 0.5px solid rgba(111, 106, 106, 0.31);
    font-size: 32px;
  }
  .progress_title>p{
    float: left;
  }
  .flex_list {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #E9E9E9;
    height: 258px;
    box-sizing: border-box;
    .flex_item {
      margin-top: 44px;
      margin-bottom: 44px;
    }
  }
  .progress_time{
    font-size: 32px;
    color: #222222;
    font-weight: 200;
    margin-top: 60px;
    // width: 75%;
    // margin: 60px auto;
  }
  .task_list {
    // display: flex;
    // justify-content: space-between;
    // height: 34px;
    // line-height: 34px;
    .task_to {
      // display: flex;
      // justify-content: space-between;
      margin-top: 38px;
      position: relative;
      span {
        font-size: 24px;
      }
      i {
        font-size: 34px;
        position: absolute;
        top: -0;
        right: 0;
      }
    }
  }
  .weui-progress__bar {
    height: 16px!important;
    border-radius: 10px!important;
    background-color: #3570e4!important;
  }
  .weui-progress__inner-bar {
    background-color: #ebebeb!important;
    height: 16px!important;
    border-radius: 10px!important;
  }
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
  .task_img{
    width: 40%;
    margin: 40px auto 20px;
  }
  .task_img>img{
    max-width: 100%;
  }
  .task_title{
    color: #316DE3;
    font-size: 36px;
    text-align: center;
  }
  .task_txt{
    text-align: center;
    color: #909090;
    font-size: 26px;
    margin: 39px auto 86px;
  }
  .task_buttom{
    width: 80%;
    margin: 0 auto;
    height: 98px;
    line-height: 98px;
    color: #ffffff;
    text-align: center;
    font-size: 36px;
    border-radius:12px;
    box-shadow:0px 7px 29px 1px rgba(13,67,173,0.5);
    background: linear-gradient(to right, #5d90f4 , #2f6be2);
  }
  .l40 {
    left: 40px;
  }
  .v_dialog {
    width: 100%;
    height: 100%;
    background-color: #353535c7;
    position: relative;
    z-index: 999;
    .iconfont {
      position: absolute;
      bottom: -20%;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      font-size: 60px;
    }
    .v_main {
      width: 618px;
      // height: 650px;
      background-color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 20px;
      padding-bottom: 34px;
      // padding-left: 67px;
      // padding-right: 65px;
      // box-sizing: border-box;
      // background: url('../../assets/images/version.png') 50% no-repeat;
      // background-position: 0 0;
      // background-size: contain;
      .bgImg {
        width: 100%;
        height: 230px;
        background: url('../../assets/images/version.png') 50% no-repeat;
        background-size: cover;
        border-radius: 20px 20px 0 0;
      }
      .img {
        width: 100%;
        border-radius: 21px 21px 0 0;
      }
      .content {
        width: 477px;
        margin: 0 auto;
        .v_title {
          color: #313131;
          font-size: 29px;
        }
        .v_list {
          color: #757575;
          font-size: 26px;
          white-space: pre-wrap;
          overflow-wrap: break-word;
          width: 93%;
          margin: 0 auto;
          font-family: -webkit-body;
        }
        .ves_buttom {
          background: linear-gradient(to right, #5D90F4, #2F6BE2);
          color: #fff;
          border-radius: 50px;
          margin-top: 43px;
          display: block;
          text-align: center;
          height: 90px;
          line-height: 90px;
        }
      }
    }
  }
</style>
