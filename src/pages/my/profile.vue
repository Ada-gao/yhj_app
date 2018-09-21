<template>
  <div class="page">
    <wv-header title="我的" class="x-header bgcolor">
      <div class="btn-back header_left" slot="left" @click="$router.push('/home')">
        <i class="iconfont icon-fanhui size_i"></i>
        <p class="head_return">返回</p>
      </div>
    </wv-header>
    <div class="wv-content x-wrapper">
    <div class="profile_content bgcolor">
      <div class="profile_head">
        <img v-bind:src="imgSrc" alt="">
      </div>
      <p class="profile_name">{{dataInfrom.name}}</p>
      <p class="profile_company">{{company}}</p>
      <wv-flex :gutter="10" style="width: 90%;margin:auto;border-bottom: 0.5px solid rgba(233,233,233,1)">
        <wv-flex-item>
          <div class="placeholder task_number">{{form.totalDuration || 0 +'分'}}</div>
          <!--<div class="placeholder task_number1" v-if="form.totalDuration === null || form.totalDuration === ''">0分</div>-->
          <div class="placeholder task_text">总通话时长</div>
        </wv-flex-item>
        <wv-flex-item>
          <div class="placeholder task_number">{{form.totalTaskCompleteCnt || 0}}个</div>
          <!-- <div class="placeholder task_number" v-if="form.totalTaskCompleteCnt === null">0个</div> -->
          <div class="placeholder task_text">总任务完成数</div>
        </wv-flex-item>
        <wv-flex-item>
          <div class="placeholder task_number">{{form.avgDuration || 0}}秒</div>
          <!--<div class="placeholder task_number3" v-if="form.avgDuration ===null">0秒</div>-->
          <div class="placeholder task_text">平均通话时长</div>
        </wv-flex-item>
      </wv-flex>
      <wv-flex :gutter="10">
        <wv-flex-item style="border-left: 1px solid grey" class="profile_progress">
          <div class="placeholder" style="border-right: 0.5px solid rgba(233,233,233,1)">
            <div class="progress_number1">{{form.rate || 0}}%</div>
            <div class="progress_text">外呼完成率</div>
          </div>
        </wv-flex-item>
        <wv-flex-item class="profile_progress">
          <div class="placeholder">
            <div class="progress_number2">第{{form.rank || ' '}}名</div>
            <div class="progress_text">今日团队排名</div>
          </div>
        </wv-flex-item>
      </wv-flex>
    </div>
      <div class="profile_list">
        <div style="border-bottom: 0.5px solid #E9E9E9">
          <router-link class="clearfix" :to="{path:'/my/feedback'}">
            <i class="iconfont icon-wenti profile_nav profile_wenti"></i>
            <p class="profile_nav" style="color: rgba(50,50,50,1);">问题反馈</p>
            <i class="iconfont icon-fanhui profile_icon" style="color: #DBDBDB;float: right"></i>
          </router-link>
        </div>
        <div>
          <router-link class="clearfix" :to="{path:'/my/relevant'}">
            <i class="iconfont icon-guanyu profile_nav profile_guan"></i>
            <p class="profile_nav" style="color: rgba(50,50,50,1);">关于闪电呼</p>
            <i class="iconfont icon-fanhui profile_icon" style="color:#DBDBDB;float: right"></i>
          </router-link>
        </div>
      </div>
    <!--<router-link to="/login">-->
      <div class="button_return bgcolor" @click="showDialog('ios')">退出</div>
    <!--</router-link>-->
    </div>
    <!--<div class="details_return" v-show="details">-->
      <!--<div class="detail_content">-->
        <!--<div style="height: 4rem;line-height: 4rem;font-size: 18px;color: #333333;">您确定要退出吗？</div>-->
        <!--<wv-flex>-->
          <!--<wv-flex-item>-->
            <!--<div class="placeholder button_out bgcolor" @click="buttoneturn">确 定</div>-->
          <!--</wv-flex-item>-->
          <!--<wv-flex-item>-->
            <!--<div class="placeholder button_out bgcolor" @click="buttoncancel">取 消</div>-->
          <!--</wv-flex-item>-->
        <!--</wv-flex>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
import { getUser, getCompany, getRank } from '../../api/api'
import { Dialog } from 'we-vue'
import wenti from '@/assets/images/profile_wenti.png'
import guanyu from '@/assets/images/profile_guanyu.png'
import heads from '../../assets/images/user_login.png'
import { timeDate } from '@/utils'

export default {
  data () {
    return {
      dataInfrom: {},
      userId: '',
      company: '',
      form: {},
      rank: {},
      wenti,
      guanyu,
      imgSrc: heads,
      details: false
    }
  },
  mounted () {
    this.userData()
  },
  methods: {
    showDialog (skin) {
      // this.details = true
      Dialog({
        title: '温馨提示',
        message: '您确定要退出吗？',
        skin,
        showCancelButton: true
      }).then(() => {
        this.$router.replace({path: '/login'})
        localStorage.removeItem('token')
        localStorage.removeItem('completetoday')
      }).catch(() => {
      })
    },
    buttoneturn () {
      this.$router.replace({path: '/login'})
      localStorage.removeItem('token')
      localStorage.removeItem('completetoday')
    },
    buttoncancel () {
      this.details = false
    },
    userData () {
      let user = localStorage.getItem('token')
      if (user) {
        getUser().then((res) => {
          this.dataInfrom = res.data
          this.userId = this.dataInfrom.id
          getCompany().then((res) => {
            this.company = res.data.companyName
          })
          // getSales(this.userId).then((res) => {
          //   this.form = res.data
          //   if (this.form.totalTaskCompleteCnt === null || this.form.totalTaskCompleteCnt === 0) {
          //     this.form.rate = 0
          //   } else {
          //     this.form.rate = parseInt(this.form.totalTaskCompleteCnt / this.form.totalTaskCnt * 100)
          //   }
          // })
          getRank(this.userId).then((res) => {
            this.form = res.data
            this.form.avgDuration = this.form.avgDuration ? this.form.avgDuration.toFixed(1) : null
            if (this.form.totalTaskCompleteCnt === null || this.form.totalTaskCompleteCnt === 0) {
              this.form.rate = 0
            } else {
              this.form.rate = parseInt(this.form.totalTaskCompleteCnt / this.form.totalTaskCnt * 100)
            }
            if (res.data.length === 0) {
              let ranks = {
                rank: 0
              }
              this.form = ranks
            } else {
              this.form = res.data
            }
            if (this.form.totalDuration !== '' || this.form.totalDuration !== 0) {
              this.form.totalDuration = timeDate(this.form.totalDuration)
              // this.form.totalDuration = tota.toFixed(1)
            }
            // console.log(this.rank)
          })
        })
      } else if (!user || user === '') {
        this.$router.replace({path: '/login'})
      }
    }
  }
}
</script>

<style lang="scss">
  .weui-cell{
    padding: 30px 40px !important;
    font-size: 28px;
    color: rgba(50,50,50,1);
  }
  // .button_out{
  //   color: #F0F0F0;
  //   width: 59%;
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
  // .detail_content{
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
  .wv-header .wv-header-title[data-v-a5b8d5b6]{
    font-size:36px;
    color: #000000;
  }
  .profile_content{
    width: 100%;
    /*height: 760px;*/
    /*background-color: #32CCBC;*/
    padding-top: 35px;
    /*margin-top: 2rem;*/
  }
  .profile_head{
    width: 170px;
    height: 170px;
    // background: rebeccapurple;
    margin: auto;
    /*border-radius: 50%;*/
    /*box-shadow:rgba(238, 233, 233, 0.34) 0px 0px 0px 5px;*/
    /*overflow: hidden;*/
    /*background-color: #ffffff;*/
    img {
      width: 170px;
      height: 170px;
    }
  }
  .profile_name{
    width: 100%;
    height: 34px;
    font-size: 36px;
    color: rgba(50,50,50,1);
    text-align: center;
    margin-top: 40px;
  }
  .profile_company{
    width: 100%;
    height: 23px;
    font-size: 24px;
    color: rgba(156,156,156,1);
    text-align: center;
    margin-top: 20px;
  }
  .profile_progress{
    margin: 61px 0;
  }
  /*.placeholder{*/
    /*text-align: center;*/
  /*}*/
  .task_number{
    font-size: 36px;
    color: rgba(58,116,230,1);
    margin-top: 80px;
    // margin-top: 1.02rem;
    text-align: center;
    /*font-weight: bold;*/
  }
  .task_text{
    font-size: 24px;
    /*margin-top: 19px;*/
    margin-bottom: 60px;
    text-align: center;
    color:rgba(156,156,156,1)
  }
  .progress_number1,.progress_number2{
    font-size: 36px;
    /*margin: 63px 0;*/
    text-align: center;
    /*font-weight: bold;*/
  }
  .progress_number1{
    color: rgba(119,209,96,1);
  }
  .progress_number2{
    color: rgba(243,104,88,1);
  }
  .progress_text{
    font-size: 24px;
    /*margin-bottom: 60px;*/
    color:rgba(156,156,156,1);
    text-align: center;
    /*margin-bottom: 1.12rem;*/
  }
  .button_return{
    width: 100%;
    height: 98px;
    font-size: 32px;
    color: rgba(58,116,230,1);
    margin: 30px auto 0;
    text-align: center;
    line-height: 98px;
  }
  .profile_list{
    height: 240px;
    width: 100%;
    background-color: #FFFFFF;
    margin-top: 30px;
  }
  .profile_list>div{
    width: 90%;
    height: 120px;
    line-height: 120px;
    background-color: #FFFFFF;
    margin: 0 auto;
    /*padding: 50%;*/
  }
  .profile_list>div>p{
    /*height: 48px;*/
    /*line-height: 48px;*/
  }
  .profile_nav{
    float: left;
  }
  .profile_icon{
    /*line-height: 4.82rem;*/
    font-size: 34px;
    color:#32CCBC;
    transform:rotate(180deg);
    -ms-transform:rotate(180deg);
    -moz-transform:rotate(180deg);
    -webkit-transform:rotate(180deg);
    -o-transform:rotate(180deg);
  }
  .profile_wenti {
    color: #FFBE24;
    width: 10%;
    font-size: 45px
  }
  .profile_guan{
    color: #2F6BE2;
    width: 10%;
    font-size: 45px
  }
</style>
