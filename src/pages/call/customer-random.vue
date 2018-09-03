<template>
  <div class="page customer_random">
    <wv-header class="x-header" style="background-color: rgba(33, 41, 44, 0)">
      <div class="btn-back header_left" slot="left">
        <i class="iconfont icon-fanhui size_c" @click="$router.push('/call')">返回</i>
      </div>
    </wv-header>
    <div class="x-wrapper" style="width: 100%">
      <div class="random_bgimg" >
        <!--<img :src="photoImg">-->
      </div>
      <div class="random_content">
        <div class="random_top">
          <p class="random_list random_one"><small class="random_txt">任务名称：</small><small>{{form.taskName}}</small></p>
          <p class="random_list"><small class="random_txt">客户姓名：</small><small>{{form.contactName}}</small></p>
          <p class="random_list"><small class="random_txt">客户电话：</small><small>{{form.phoneNo}}</small></p>
          <hr class="hr">
          <wv-flex :gutter="10" style="width: 100%;">
            <wv-flex-item>
              <div class="placeholder random_nav random_pro">外呼状态</div>
              <div class="placeholder random_nav iconfont icon-boda1"></div>
              <div class="placeholder random_nav co">未外呼</div>
            </wv-flex-item>
            <wv-flex-item>
              <div class="placeholder random_nav random_pro">产品名称</div>
              <div class="placeholder random_nav iconfont icon-chanpin"></div>
              <div class="placeholder random_nav cr">{{form.productName}}</div>
            </wv-flex-item>
            <wv-flex-item>
              <div class="placeholder random_nav random_pro">线索来源</div>
              <div class="placeholder random_nav iconfont icon-xiansuo1"></div>
              <div class="placeholder random_nav cr">{{form.source}}</div>
            </wv-flex-item>
          </wv-flex>
          <a :href="'tel:' + phoneNumber" v-show="phoneShow === false" class="random_button bgcolor" @click="phoneTimes">
            <small class="iconfont icon-hujiao" style="font-size: 100%;"></small>立即拨打
          </a>
          <div class="random_button" v-show="phoneShow === true" @click="startCall">
            <small class="iconfont icon-hujiao" style="font-size: 100%;"></small>立即拨打
          </div>
        </div>
        <div class="random_bottom">
          <div class="random_title">
            <p class="l"></p>
            <p style="height: 30px;line-height: 30px;margin-left: 8px;">外呼话术</p>
          </div>
          <div style="padding: 0px 0 7px 23px;clear: both" v-html="form.salesTalk">{{form.salesTalk}}</div>
        </div>
        </div>
      <div class="details_loading" v-show="details" style="background-color: #191919">
      <div class="phone_hand">
      <img :src="company">
      </div>
      <p class="phone_txt">{{form.contactName}}</p>
      <p class="phone_txt">{{form.phoneNo}}</p>
      <div class="phone">
      <img :src="phoneImg">
      </div>
      <div class="phone_cancle" @click="callsCancle">
      <img :src="cancle">
      </div>
      <!--<p class="details_content">正在连接 请稍等...</p>-->
      </div>
    </div>
    <!--<wv-header :title="'任务完成('+task.dailyTaskCompleteCnt +'/'+ task.dailyTaskCnt+')'" class="x-header bgcolor">-->
      <!--<div class="btn-back" slot="left" style="position: absolute;top: 7px;left: 0;width: 20%;">-->
        <!--<i class="iconfont icon-fanhui size_i" @click="$router.push('/call')"></i>-->
      <!--</div>-->
      <!--<div class="btn-menu" slot="right">-->
        <!--<p style="font-size: 0.56rem">{{task.dailyEffectiveDuration}}</p>-->
      <!--</div>-->
    <!--</wv-header>-->
    <!--<div class="wv-content x-wrapper">-->
      <!--<wv-flex :gutter="10">-->
        <!--<wv-flex-item flex="3" style="margin-top: 0.272rem">-->
          <!--<div class="placeholder details_left">-->
            <!--&lt;!&ndash;<p style="font-size: 0.56rem;color: #32CCBC;text-align: center;font-weight: 600;position: absolute;left: 19px;" v-if="form.callCount">外呼&ndash;&gt;-->
              <!--&lt;!&ndash;{{form.callCount}}次，最近外呼时间：&ndash;&gt;-->
              <!--&lt;!&ndash;{{form.lastCallDate | moment('YYYY.MM.DD')}}</p>&ndash;&gt;-->
            <!--<p style="width: 2.5rem;margin:auto;padding-top: 16px">-->
              <!--<img :src="company" alt="" style="max-width: 100%">-->
            <!--</p>-->
            <!--<p style="font-size: 0.64rem;text-align: center">{{form.contactName}}</p>-->
            <!--<div class="inform">年龄：<small style="font-size: 100%;color: rgb(106, 107, 105)">-->
              <!--{{form.age}}</small></div>-->
            <!--<div class="inform">性别：<small style="font-size: 100%;color: rgb(106, 107, 105) ">-->
              <!--{{form.genderText}}</small></div>-->
            <!--<div class="inform">电话：<small style="font-size: 100%;color: rgb(106, 107, 105)">-->
              <!--{{form.phoneNo}}</small></div>-->
          <!--</div>-->
        <!--</wv-flex-item>-->
        <!--<wv-flex-item >-->
          <!--<div class="placeholder details_right">-->
            <!--<p class="photo_img" v-if="form.lastCallResult === '无人接听'">-->
              <!--<img :src="photoImg">-->
            <!--</p>-->
            <!--<p class="photo_img" v-if="form.lastCallResult != '无人接听'">-->
              <!--<img :src="photoImg1">-->
            <!--</p>-->
            <!--<p class="details_phone">{{form.lastCallResult || '未外呼'}}</p>-->
          <!--</div>-->
          <!--<div class="placeholder details_right">-->
            <!--<p class="iconfont icon-personal-center icon_ju"></p>-->
            <!--<p class="details_phone">{{form.productName}}</p>-->
          <!--</div>-->
          <!--<div class="placeholder details_right">-->
            <!--<p class="iconfont icon-xiansuo icon_sou"></p>-->
            <!--<p class="details_phone">{{form.source}}</p>-->
          <!--</div>-->
        <!--</wv-flex-item>-->
      <!--</wv-flex>-->
      <!--<div class="phone_details">-->
        <!--<p class="phone_content">外呼话术：</p>-->
        <!--<div class="phone_html">-->
          <!--<p style="margin: 5px" v-html="form.salesTalk">{{form.salesTalk}}</p>-->
          <!--&lt;!&ndash;<textarea class="weui-cells" placeholder="" :rows="8" :show-counter="false"></textarea>&ndash;&gt;-->
        <!--</div>-->
      <!--</div>-->
      <!--&lt;!&ndash;<div @click="times">计时<small>{{time2}}</small></div>&ndash;&gt;-->
      <!--<a :href="'tel:' + phoneNumber" v-show="phoneShow === false" class="phone_button bgcolor" @click="phoneTimes">-->
        <!--<small class="iconfont icon-waihuquerenxuanzhong" style="font-size: 100%;"></small>开始外呼-->
      <!--</a>-->
      <!--<div class="phone_button bgcolor" v-show="phoneShow === true" @click="startCall">-->
        <!--<small class="iconfont icon-waihuquerenxuanzhong" style="font-size: 100%;"></small>开始外呼-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="Record" v-show="resultShow">-->
      <!--<div class="Record_content">-->
        <!--<div class="Record_title">外呼记录</div>-->
        <!--<p class="Record_time" v-if="phoneShow === false">通话时长：{{callTime}}</p>-->
        <!--<p class="Record_time" v-if="phoneShow === true">通话时长：{{callTime}}</p>-->
        <!--<div  style="margin: 87%;margin: 0 auto;border-bottom: 1px solid #eae8e8;height: 4.5rem">-->
          <!--<wv-flex>-->
            <!--<wv-flex-item>-->
              <!--<div class="placeholder" style="font-size: 0.56rem;text-align: center;margin-top: 0.5rem">外呼结果</div>-->
            <!--</wv-flex-item>-->
            <!--<wv-flex-item>-->
              <!--<select name="select" v-model="history.result" class="Result_select">-->
                <!--<option v-for="item in callResult"-->
                        <!--:key="item.value"-->
                        <!--:value="item.value"-->
                        <!--style="font-size: 0.56rem;text-align: center">-->
                  <!--{{item.label}}-->
                <!--</option>-->
              <!--</select>-->
            <!--</wv-flex-item>-->
          <!--</wv-flex>-->
          <!--<wv-flex style="margin-top: 0.4rem">-->
            <!--<wv-flex-item>-->
              <!--<div class="placeholder" style="font-size: 0.56rem;text-align: center;margin-top: 0.5rem">下一步行动计划</div>-->
            <!--</wv-flex-item>-->
            <!--<wv-flex-item>-->
              <!--<div>-->
                <!--<select class="Result_select" v-model="history.status">-->
                  <!--<option v-for="item in nextStepOptions"-->
                          <!--:key="item.value"-->
                          <!--:value="item.value"-->
                          <!--style="font-size: 0.56rem;text-align: center">-->
                    <!--{{item.label}}-->
                  <!--</option>-->
                <!--</select>-->
              <!--</div>-->
            <!--</wv-flex-item>-->
          <!--</wv-flex>-->
        <!--</div>-->
        <!--<div class="word">-->
          <!--<p @click="changeInfo" class="bgcolor">编辑</p>-->
        <!--</div>-->
        <!--<wv-flex>-->
          <!--<wv-flex-item>-->
            <!--<div class="placeholder head_name">{{form.contactName}}</div>-->
          <!--</wv-flex-item>-->
          <!--<wv-flex-item>-->
            <!--<div class="placeholder Result_inform ">年龄：<small>{{form.age}}</small></div>-->
            <!--<div class="placeholder Result_inform" style="margin-top: 0.78rem">性别：<small>{{form.genderText}}</small></div>-->
          <!--</wv-flex-item>-->
        <!--</wv-flex>-->
        <!--<p style="font-size: 0.56rem;padding-left: 0.98rem;margin-top: 1.42rem">备注：</p>-->
        <!--<textarea v-model="history.common" rows="5" placeholder="" class="Result_tex"></textarea>-->
        <!--<div class="Result_button bgcolor" @click="submitCall">提交信息</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="information" v-show="inform">-->
      <!--<div class="information_content">-->
        <!--<div class="information_title">个人信息</div>-->
        <!--<ul class="information_list">-->
          <!--<li>-->
            <!--<p class="list_title">姓名：</p>-->
            <!--<p class="list_word">-->
              <!--<input class="item-input" v-model="info.contactName" maxlength="12">-->
            <!--</p>-->
          <!--</li>-->
          <!--<li>-->
            <!--<p class="list_title">性别：</p>-->
            <!--<div class="list_word">-->
              <!--&lt;!&ndash;<div class="female">&ndash;&gt;-->
                <!--&lt;!&ndash;<input type="radio" name="gender" value="LADY" v-model="info.gender"/>&ndash;&gt;-->
                <!--&lt;!&ndash;<label for="female">女</label>&ndash;&gt;-->
              <!--&lt;!&ndash;</div>&ndash;&gt;-->
              <!--&lt;!&ndash;<div class="male">&ndash;&gt;-->
                <!--&lt;!&ndash;<input type="radio" name="gender" value="GENTLEMAN" v-model="info.gender"/>&ndash;&gt;-->
                <!--&lt;!&ndash;<label for="male">男</label>&ndash;&gt;-->
              <!--&lt;!&ndash;</div>&ndash;&gt;-->
              <!--<label for="male" class="main">-->
                <!--<input type="radio" name="gender" id="male" value="GENTLEMAN" v-model="info.gender">男-->
                <!--<span class="test"></span>-->
              <!--</label>-->
              <!--<label for="female" class="main">-->
                <!--<input type="radio" name="gender" id="female" value="LADY" v-model="info.gender">女-->
                <!--<span class="test"></span>-->
              <!--</label>-->
            <!--</div>-->
          <!--</li>-->
          <!--<li>-->
            <!--<p class="list_title">手机号：</p>-->
            <!--<p class="list_word">-->
              <!--<input class="item-input" v-model="info.mobileNo" maxlength="11" type="tel">-->
            <!--</p>-->
          <!--</li>-->
          <!--<li>-->
            <!--<p class="list_title">微信号：</p>-->
            <!--<p class="list_word">-->
              <!--<input class="item-input" v-model="info.wechatNo">-->
            <!--</p>-->
          <!--</li>-->
          <!--<li>-->
            <!--<p class="list_title">年龄：</p>-->
            <!--<p class="list_word">-->
              <!--<input class="item-input" v-model="info.age">-->
            <!--</p>-->
          <!--</li>-->
        <!--</ul>-->
        <!--<div class="information_button bgcolor" @click="updateInfo">保存</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="details_loading" v-show="details" style="background-color: #191919">-->
      <!--<div class="phone_hand">-->
        <!--<img :src="company">-->
      <!--</div>-->
      <!--<p class="phone_txt">{{form.contactName}}</p>-->
      <!--<p class="phone_txt">{{form.phoneNo}}</p>-->
      <!--<div class="phone">-->
        <!--<img :src="phoneImg">-->
      <!--</div>-->
      <!--<div class="phone_cancle" @click="callsCancle">-->
        <!--<img :src="cancle">-->
      <!--</div>-->
      <!--&lt;!&ndash;<p class="details_content">正在连接 请稍等...</p>&ndash;&gt;-->
    <!--</div>-->
    <!--<div class="details_return" v-show="detailsreturn">-->
      <!--<div class="detail_contents">-->
        <!--<div style="height: 4rem;line-height: 4rem;font-size: 18px;color: #333333;">当前无任务分配</div>-->
        <!--<wv-flex>-->
          <!--<wv-flex-item>-->
            <!--<div class="placeholder button_outs bgcolor" @click="buttoneturn">确 定</div>-->
          <!--</wv-flex-item>-->
        <!--</wv-flex>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>
<script>
import company from '@/assets/images/hand.png'
import phoneImg from '../../assets/images/phone.gif'
import cancle from '@/assets/images/cancle.png'
import { getCall, getCallscancle } from '@/api/api'
// import { transformText, queryObj, timeDate } from '@/utils'
import { Toast } from 'we-vue'
// import { CallListener } from '@CallListener'
import Vue from 'vue'
// import qs from 'qs'

export default {
  data () {
    return {
      company,
      phoneImg,
      cancle,
      details: false,
      detailsreturn: false,
      form: {},
      // nextStepOptions: [],
      // callResult: [],
      callSid: '',
      // callStatus: false,
      phoneNumber: '',
      phoneShow: true,
      conversationState: false
    }
  },
  created () {
    // this.nextStepOptions = queryObj.nextStep
    // this.callResult = queryObj.callResult
    // this.teskData()
    this.form = this.$route.query.form
  },
  mounted () {
    let devicePlatform = Vue.cordova.device.platform
    if (devicePlatform === 'Android') {
      //     /* 监听电话状态（1空闲、2响铃、3通话） */
      window.CallListener.addListener((state) => {
        if (state === 3) {
          if (this.phoneShow === false) {
            this.$router.push({path: '/call/call-record', query: {form: this.form, value: 'random'}})
          } else {
            this.$router.push({path: '/call/call-record', query: {form: this.form, callId: this.callSid, value: 'random'}})
          }
        } else if (state === 2) {
          this.details = false
        }
        // else if (state === 1) {
        //   if (this.phoneShow === false) {
        //     this.details = false
        //     this.resultShow = true
        //     /* 获取通话时长（单位秒） */
        //     window.CallListener.getCallInfo((info) => {
        //       // alert('电话状态：' + state + '，通话时长：' + info.duration + '，开始时间：' + info.startDate + '，结束时间：' + info.endDate)
        //       this.callTime = timeDate(info.duration)
        //       this.history.actualCallStartDate = info.startDate
        //       this.history.acutalCallEndDate = info.endDate
        //     }, '13661876489')
        //   } else {
        //     this.callDate()
        //     this.details = false
        //     this.resultShow = true
        //   }
        // } else {
        //   Toast.text({
        //     duration: 3000,
        //     message: '电话状态：' + state
        //   })
        // }
      })
    }
    // else if (devicePlatform === 'ios') {
    //   Vue.cordova.backgroundMode.on('deactivate', () => { // 监听是否前台台运行
    //     // console.log('Now app is running in foreground.')
    //     if (this.callStatus === true) {
    //       this.details = false
    //       this.resultShow = true
    //       this.callDate()
    //     } else if (this.phoneShow === false) {
    //       this.details = false
    //       this.resultShow = true
    //       clearInterval(this.timeInterval)
    //       this.history.acutalCallEndDate = new Date()
    //       this.callDate()
    //     }
    //   })
    // }
  },
  methods: {
    phoneTimes () {
      this.conversationState = true
    },
    startCall () {
      this.conversationState = true
      this.details = true
      getCall(this.form.outboundNameId).then(res => {
        this.callSid = res.data.callSid
        if (this.callSid === null) {
          Toast.fail({
            duration: 2000,
            message: '无法外呼，请联系管理员...'
          })
          this.details = false
        }
      })
    },
    getRandom () {
      // let createTime = parseTime(new Date(), '{y}-{m}-{d}')
      // getRandom().then(res => {
      //   this.form = res.data
      //   this.phoneNumber = this.form.phoneNo
      //   // this.form.lastCallResult = transformText(queryObj.callResult, this.form.lastCallResult)
      //   // this.form.genderText = transformText(queryObj.gender, this.form.gender)
      //   let phones = this.form.phoneNo.substring(4, 5)
      //   if (phones === '*') {
      //     this.phoneShow = true
      //   } else {
      //     this.phoneShow = false
      //   }
      // }).catch(() => {
      //   this.detailsreturn = true
      // })
    },
    // submitCall () {
    //   this.conversationState = false
    //   // this.callStatus = false
    //   this.resultShow = false
    //   this.history.outboundTaskId = this.form.taskId
    //   let _this = this
    //   this.counts = 0
    //   if (this.phoneShow === false) {
    //     getTaskHistory(this.history).then(res => {
    //     })
    //   } else {
    //     getCallStatus(this.callSid).then((res) => {
    //       _this.history.actualCallStartDate = res.data.start
    //       _this.history.acutalCallEndDate = res.data.end
    //       getTaskHistory(this.history).then(res => {
    //       })
    //     })
    //   }
    //   this.getRandom()
    //   // this.teskData()
    // },
    // callDate () {
    //   getCallStatus(this.callSid).then((res) => {
    //     this.callTime = timeDate(res.data.duration)
    //     // alert(this.callTime)
    //     // this.callTime.duration
    //   })
    // },
    // changeInfo () {
    //   this.inform = true
    //   this.resultShow = false
    //   this.info = this.form
    // },
    // updateInfo () {
    //   let params = {
    //     contactName: this.info.contactName,
    //     gender: this.info.gender,
    //     mobileNo: this.info.mobileNo,
    //     wechatNo: this.info.wechatNo,
    //     age: this.info.age
    //   }
    //   updateOutboundName(this.info.outboundNameId, params).then(res => {
    //     this.inform = false
    //     this.resultShow = true
    //     let data = res.data
    //     this.form.contactName = data.contactName
    //     this.form.age = data.age
    //     this.form.gender = data.gender
    //     this.form.genderText = transformText(queryObj.gender, this.form.gender)
    //   })
    // },
    // teskData () {
    //   let userId = localStorage.getItem('userId')
    //   getRank(userId).then(res => {
    //     this.task = res.data
    //     // let theTime = parseInt(res.data.dailyEffectiveDuration)
    //     // let theTime1 = 0
    //     // if (theTime > 60) {
    //     //   theTime1 = parseInt(theTime / 60)
    //     //   theTime = parseInt(theTime % 60)
    //     // }
    //     // let result = parseInt(theTime)
    //     // if (theTime1 > 0) {
    //     //   result = parseInt(theTime1) + ':' + result
    //     // }
    //     this.task.dailyEffectiveDuration = this.timeDate(res.data.dailyEffectiveDuration)
    //     // if (this.task.dailyTaskCompleteCnt)
    //   }).catch((res) => {
    //     this.task.dailyTaskCompleteCnt = 0
    //     this.task.dailyTaskCnt = 0
    //     this.dailyEffectiveDuration = 0
    //   })
    // },
    callsCancle () {
      getCallscancle(this.callSid).then(() => {
        this.details = false
      })
    },
    buttoneturn () {
      this.detailsreturn = false
      this.$router.replace({path: '/call'})
    }
  }
}
</script>
<style lang="scss">
  .random_content{
    position: fixed;
    top:327px;
    width: 100%;
    /*margin: auto;*/
  }
  .random_bgimg{
    width: 100%;
    height: 420px;
    background: url('../../assets/images/callimg.png') center center no-repeat;
    background-size: cover;
  }
  .random_bgimg>img{
    max-width: 100%;
  }
  .random_top{
    position: relative;
    width: 95%;
    margin: auto;
    height: 546px;
    background-color: white;
    border-radius: 6px;
  }
  .random_list{
    color:#252525;
    font-size: 32px;
    margin: auto;
    width: 90%;
  }
  .random_one{
    padding-top: 35px;
  }
  .random_txt{
    color:#505050;
  }
  .random_nav{
    text-align: center;
    font-size: 24px;
  }
  .random_pro{
    color:#939393;
  }
  .icon-boda1,.icon-chanpin,.icon-xiansuo1{
    font-size: 48px;
  }
  .icon-chanpin,.icon-xiansuo1,.cr{
    color:#2f6be2;
  }
  .icon-boda1,.co{
    color:#ff393e;
  }
  .hr{
    width: 90%;
    margin: 40px auto;
    border: 1px solid #e9e9e9!important;
  }
  .random_button{
    position: absolute;
    bottom: 0 ;
    width: 100%;
    height: 98px;
    background: linear-gradient(to right, #5d90f4 , #2f6be2);
    border-radius:0 0 6px 6px;
    font-size: 36px;
    text-align: center;
    line-height: 98px;
    color: #FFFFFF ;
    display: inherit;
  }
  .random_bottom{
    width: 95%;
    margin:30px auto 0;
    background-color: #ffffff;
    border-radius: 6px;
  }
  .l{
    width: 6px;
    height: 30px;
    background-color: #2f6be2;
  }
  .random_title{
    height: 30px;
    line-height: 30px;
    font-size: 32px;
    padding: 20px 0 10px 20px;
  }
  .random_title>p{
    float: left;
  }

  .main{
    display: inline-block;
  }
  .main input{
    display: none;
  }
  .test{
    box-sizing: border-box;
    position: relative;
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid #02B6DC;
    border-radius: 50%;
    float: left;
    margin: 4px 10px 0;
    padding: 2px;
    background-clip: content-box;
  }
  input:checked + span {
    background: #02B6DC;
  }
  .weui-toast{
    min-height: 5em;
  }
  .weui-toast__content{
    font-size: 0.6rem;
  }
  .wv-header-title{
    font-size: 19px;
  }
  .details_left{
    width: 100%;
    height: 9.28rem;
    background: white;
    /*margin-top: 0.272rem;*/
    border-radius: 0.1rem;
  }
  .details_right{
    width: 100%;
    background: white;
    height: 2.9rem;
    margin: 0.272rem 0 0;
    border-radius: 0.1rem;
  }
  .inform{
    width: 57%;
    font-size: 0.56rem;
    /* padding-left: 3.38rem; */
    margin: 0.42rem 29% 0;
  }
  .photo_img{
    width: 0.88rem;
    margin: 0 auto;
    padding-top: 0.3rem;
  }
  .photo_img>img{
    max-width: 100%;
  }
  .icon_ju{
    width: 0.88rem;
    margin: 0 auto;
    font-size: 0.85rem;
    color: #CF2828;
    padding-top: 0.3rem;

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
    padding-top: 0.3rem;
  }
  .phone_details{
    width: 100%;
    height: 10.34rem;
    background: #FFFFFF;
    margin-top: 0.4rem;
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
    margin: 0 auto;
    padding: 0.2rem 0;
  }
  // .phone_button{
  //   width: 90%;
  //   margin: 0.76rem auto 0;
  //   height: 1.64rem;
  //   border-radius: 0.2rem;
  //   font-size: 0.62rem;
  //   text-align: center;
  //   line-height: 1.64rem;
  //   color: #FFFFFF ;
  //   display: inherit;
  // }
  .Record,.information,.details_loading{
    z-index: 501;
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.61);
  }
  .Record_content{
    position: fixed;
    z-index: 501;
    width: 87%;
    max-width: 317px;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    overflow: hidden;
    height: 22.34rem;
    /*margin:2.16rem  auto 0;*/
    background: #FFFFFF;
    border-radius: 0.2rem;
  }
  .information_content{
    position: fixed;
    z-index: 501;
    width: 87%;
    max-width: 300px;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    overflow: hidden;
    height: 11.34rem;
    background: #ffffff;
    border-radius: 0.2rem;
  }
  .details_content{
    position: fixed;
    z-index: 501;
    width: 50%;
    max-width: 300px;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    overflow: hidden;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
    background: #ffffff;
    border-radius: 0.2rem;
    font-size: 0.8rem;
    color: #32CCBC;
  }
  .Record_title,.information_title{
    width: 95%;
    height: 1.72rem;
    margin: 0 auto;
    line-height: 1.72rem;
    font-size: 0.64rem;
    text-align: center;
    border-bottom: 1px solid #eae8e8;
  }
  .Record_time{
    width: 100%;
    text-align: center;
    font-size: 0.6rem;
    color: #02B6DC;
    margin-top: 0.36rem;
  }
  .Result_select{
    width: 80%;
    border: 1px solid #ccc;
    // height: 0.8rem;
    // border-radius: 0.2rem;
    outline: none;
    -webkit-appearance: none;
  }
  .word{
    width: 100%;
    clear: both;
    height: 2rem;
  }
  .word>p{
    float: right;
    height: 1rem;
    width: 2rem;
    line-height: 1rem;
    font-size: 0.56rem;
    color: #FFFFFF;
    text-align: center;
    border-radius: 0.2rem;
    margin: 0.9rem  0.44rem 0;
  }
  .Result_inform{
    font-size: 0.56rem;
  }
  .Result_tex{
    width: 84%;
    margin: 0.3rem auto;
    display: inherit;
    border: 1.5px solid #818080;
    border-radius: 0.2rem;
    padding: 5px;
    box-sizing: border-box;
    outline: none;
  }
  .Result_button{
    width: 87%;
    height: 1.6rem;
    margin: 1.26rem auto 0;
    line-height:1.6rem;
    font-size: 0.56rem;
    text-align: center;
    border-radius: 0.2rem;
    color: #ffffff;
  }
  .information_list{
    width: 87%;
    margin: 0 auto;
  }
  .information_list>li{
    height: 1.3rem;
    list-style: none;
  }
  .information_list>li>p{
    float: left;
    height: 1.3rem;
    line-height: 1.3rem;
    font-size: 0.56rem;
  }
  .item-input{
    width: 100%;
    border: 1px solid grey;
    height: 0.8rem;
    border-radius: 0.2rem;
    outline: none;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0)
  }
  .list_title{
    width: 30%;
  }
  .list_word{
    width: 70%;
    float: left;
    font-size: 0.64rem;
  }
  .information_button{
    width: 87%;
    height: 1.6rem;
    line-height: 1.6rem;
    font-size: 0.64rem;
    text-align: center;
    border-radius: 0.1rem;
    color: #ffffff;
    margin: 1rem auto 0;
  }
  /*.button_outs{
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
  }*/
  .phone_cancle{
    width: 18%;
    margin: 20% auto;
  }
  .phone_hand{
    width: 30%;
    margin: 4rem auto 0;
  }
  .phone>img,.phone_hand>img,.phone_cancle>img{
    max-width: 100%;
  }
  .phone_txt{
    text-align: center;
    color: #dee2ed;
    font-size: 17px;
  }
  .head_name{
    text-align: center;
    width: 5rem;
    margin: 0 auto;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
