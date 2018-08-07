<template>
  <div class="page">
    <wv-header :title="'任务完成('+task.dailyTaskCompleteCnt +'/'+ task.dailyTaskCnt+')'" class="x-header bgcolor">
      <div class="btn-back" slot="left">
        <i class="iconfont icon-fanhui icon" @click="$router.push('/call')"></i>
      </div>
      <div class="btn-menu" slot="right">
        <p style="font-size: 0.56rem">{{task.dailyEffectiveDuration}}</p>
      </div>
    </wv-header>
    <div class="wv-content x-wrapper">
      <wv-flex :gutter="10">
        <wv-flex-item flex="3" style="margin-top: 0.272rem">
          <div class="placeholder details_left">
            <p style="position: absolute;left: 19px;font-size: 0.56rem;color: #CF2828;text-align: center;font-weight: 600" v-if="form.callCount">外呼
              {{form.callCount}}次，最近外呼时间：
              {{form.lastCallDate | moment('YYYY.MM.DD')}}</p>
            <p style="width: 2.5rem;margin:auto;padding-top: 16px">
              <img :src="company" alt="" style="max-width: 100%">
            </p>
            <p style="font-size: 0.64rem;text-align: center">{{form.contactName}}</p>
            <div class="inform">年龄：<small style="font-size: 100%;color: rgb(106, 107, 105)">
              {{form.age}}</small></div>
            <div class="inform">性别：<small style="font-size: 100%;color: rgb(106, 107, 105) ">
              {{form.genderText}}</small></div>
            <div class="inform">电话：<small style="font-size: 100%;color: rgb(106, 107, 105)">
              {{form.phoneNo}}</small></div>
          </div>
        </wv-flex-item>
        <wv-flex-item >
          <div class="placeholder details_right">
            <p class="photo_img" v-if="form.lastCallResult === '无人接听'">
              <img :src="photoImg">
            </p>
            <p class="photo_img" v-if="form.lastCallResult != '无人接听'">
              <img :src="photoImg1">
            </p>
            <p class="details_phone">{{form.lastCallResult || '未外呼'}}</p>
          </div>
          <div class="placeholder details_right">
            <p class="iconfont icon-personal-center icon_ju"></p>
            <p class="details_phone">{{form.productName}}</p>
          </div>
          <div class="placeholder details_right">
            <p class="iconfont icon-xiansuo icon_sou"></p>
            <p class="details_phone">{{form.source}}</p>
          </div>
        </wv-flex-item>
      </wv-flex>
      <div class="phone_details">
        <p class="phone_content">外呼话术：</p>
        <div class="phone_html">
          <p style="margin: 5px" v-html="form.salesTalk">{{form.salesTalk}}</p>
          <!--<textarea class="weui-cells" placeholder="" :rows="8" :show-counter="false"></textarea>-->
        </div>
      </div>
      <!--<div @click="times">计时<small>{{time2}}</small></div>-->
      <a :href="'tel:' + form.phoneNo" v-show="phoneShow === false" class="phone_button bgcolor" @click="times">
        <small class="iconfont icon-waihuquerenxuanzhong" style="font-size: 100%;"></small>开始外呼
      </a>
      <div class="phone_button bgcolor" v-show="phoneShow === true" @click="startCall">
        <small class="iconfont icon-waihuquerenxuanzhong" style="font-size: 100%;"></small>开始外呼
      </div>
    </div>
    <div class="Record" v-show="resultShow">
      <div class="Record_content">
        <div class="Record_title">外呼记录</div>
        <p class="Record_time" v-if="phoneShow === false">通话时长：{{callTime}}</p>
        <p class="Record_time" v-if="phoneShow === true">通话时长：{{callTime}}</p>
        <div  style="margin: 87%;margin: 0 auto;border-bottom: 1px solid #eae8e8;height: 4.5rem">
          <wv-flex>
            <wv-flex-item>
              <div class="placeholder" style="font-size: 0.56rem;text-align: center;margin-top: 0.5rem">外呼结果</div>
            </wv-flex-item>
            <wv-flex-item>
              <select name="select" v-model="history.result" class="Result_select">
                <option v-for="item in callResult"
                        :key="item.value"
                        :value="item.value"
                        style="font-size: 0.56rem;text-align: center">
                  {{item.label}}
                </option>
              </select>
            </wv-flex-item>
          </wv-flex>
          <wv-flex style="margin-top: 0.4rem">
            <wv-flex-item>
              <div class="placeholder" style="font-size: 0.56rem;text-align: center;margin-top: 0.5rem">下一步行动计划</div>
            </wv-flex-item>
            <wv-flex-item>
              <div>
                <select class="Result_select" v-model="history.status">
                  <option v-for="item in nextStepOptions"
                          :key="item.value"
                          :value="item.value"
                          style="font-size: 0.56rem;text-align: center">
                    {{item.label}}
                  </option>
                </select>
              </div>
            </wv-flex-item>
          </wv-flex>
        </div>
        <div class="word">
          <p @click="changeInfo" class="bgcolor">编辑</p>
        </div>
        <wv-flex>
          <wv-flex-item>
            <div class="placeholder" style="line-height: 2.5rem;text-align: center">{{form.contactName}}</div>
          </wv-flex-item>
          <wv-flex-item>
            <div class="placeholder Result_inform ">年龄：<small>{{form.age}}</small></div>
            <div class="placeholder Result_inform" style="margin-top: 0.78rem">性别：<small>{{form.genderText}}</small></div>
          </wv-flex-item>
        </wv-flex>
        <p style="font-size: 0.56rem;padding-left: 0.98rem;margin-top: 1.42rem">备注：</p>
        <textarea v-model="history.common" rows="5" placeholder="" class="Result_tex"></textarea>
        <div class="Result_button bgcolor" @click="submitCall">提交信息</div>
      </div>
    </div>
    <div class="information" v-show="inform">
      <div class="information_content">
        <div class="information_title">个人信息</div>
        <ul class="information_list">
          <li>
            <p class="list_title">姓名：</p>
            <p class="list_word">
              <input class="item-input" v-model="info.contactName">
            </p>
          </li>
          <li>
            <p class="list_title">性别：</p>
            <div class="list_word">
              <!--<div class="female">-->
                <!--<input type="radio" name="gender" value="LADY" v-model="info.gender"/>-->
                <!--<label for="female">女</label>-->
              <!--</div>-->
              <!--<div class="male">-->
                <!--<input type="radio" name="gender" value="GENTLEMAN" v-model="info.gender"/>-->
                <!--<label for="male">男</label>-->
              <!--</div>-->
              <label for="male" class="main">
                <input type="radio" name="gender" id="male" value="GENTLEMAN" v-model="info.gender">男
                <span class="test"></span>
              </label>
              <label for="female" class="main">
                <input type="radio" name="gender" id="female" value="LADY" v-model="info.gender">女
                <span class="test"></span>
              </label>
            </div>
          </li>
          <li>
            <p class="list_title">手机号：</p>
            <p class="list_word">
              <input type="number" class="item-input" v-model="info.mobileNo">
            </p>
          </li>
          <li>
            <p class="list_title">微信号：</p>
            <p class="list_word">
              <input type="text" class="item-input" v-model="info.wechatNo">
            </p>
          </li>
          <li>
            <p class="list_title">年龄：</p>
            <p class="list_word">
              <input class="item-input" v-model="info.age">
            </p>
          </li>
        </ul>
        <div class="information_button bgcolor" @click="updateInfo">保存</div>
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
</template>
<script>
import photoImg from '@/assets/images/photo.png'
import photoImg1 from '@/assets/images/phone_random.png'
import company from '@/assets/images/hand.png'
import phoneImg from '../../assets/images/phone.gif'
import thumbSmall from '@/assets/images/icon_tabbar.png'
import cancle from '@/assets/images/cancle.png'
import { getCall, getTaskHistory, updateOutboundName, getCallStatus, getRank, getCallscancle, getTaskList } from '@/api/api'
import { transformText, queryObj, parseTime } from '@/utils'
import { Toast } from 'we-vue'
import Vue from 'vue'
// import qs from 'qs'

export default {
  data () {
    return {
      photoImg,
      photoImg1,
      company,
      thumbSmall,
      phoneImg,
      cancle,
      resultShow: false,
      inform: false,
      details: false,
      selected: '',
      // from: '13053108821',
      // to: '13661876489',
      form: {},
      nextStepOptions: [],
      callResult: [],
      history: {
        result: 'FOLLOW',
        status: 'CALL_AGAIN',
        actualCallStartDate: '',
        acutalCallEndDate: '',
        outboundTaskId: ''
      },
      info: {},
      listQuery1: {
        pageIndex: 0,
        pageSize: 10
        // createTime: ''
      },
      createTime: parseTime(new Date(), '{y}-{m}-{d}'),
      callSid: '',
      duration: '',
      task: {},
      callStatus: false,
      callTime: {},
      phoneNumber: '',
      phoneShow: true,
      counts: '',
      time1: ''
    }
  },
  created () {
    this.nextStepOptions = queryObj.nextStep
    this.callResult = queryObj.callResult
    this.form = this.$route.params
    console.log(this.form)
    // this.pageNumber = this.$route.params.call
    this.form.lastCallResult = transformText(queryObj.callResult, this.form.lastCallResult)
    this.form.genderText = transformText(queryObj.gender, this.form.gender)
    let phones = this.form.phoneNo.substring(4, 5)
    if (phones === '*') {
      this.phoneShow = true
    } else {
      this.phoneShow = false
    }
    this.teskData()
  },
  mounted () {
    // console.log('customer-detail vue page mounted.')
    // Vue.cordova.backgroundMode.on('activate', () => { // 监听是否后台运行
    //   console.log('Now app is running in background.')
    //   alert('后台')
    // })

    Vue.cordova.backgroundMode.on('deactivate', () => { // 监听是否前台台运行
      console.log('Now app is running in foreground.前台运行')
      if (this.callStatus === true) {
        this.details = false
        this.resultShow = true
        this.callDate()
      } else if (this.phoneShow === false) {
        this.details = false
        this.resultShow = true
        clearInterval(this.timeInterval)
        this.history.acutalCallEndDate = new Date()
        this.callDate()
      }
    })
    // document.addEventListener('deviceready', () => {
    //   document.addEventListener('pause', () => {
    //     if (this.callStatus === true) {
    //       this.details = false
    //       this.resultShow = true
    //       this.callDate()
    //     }
    //     // alert('resume')
    //   }, false)
    // }, false)
  },
  methods: {
    dateTime (time) {
      let theTime = parseInt(time)
      let theTime1 = 0
      if (theTime > 60) {
        theTime1 = parseInt(theTime / 60)
        theTime = parseInt(theTime % 60)
      }
      var result = parseInt(theTime) + '秒'
      if (theTime1 > 0) {
        result = parseInt(theTime1) + '分' + result
      }
      return result
      // this.callTime.duration
    },
    times () {
      this.timeInterval = setInterval(() => {
        if (this.counts >= 60) {
          this.time1++
          this.counts = 1
        }
        this.counts++
        this.callTime = this.time1 + ':' + this.counts
      }, 1000)
      this.history.actualCallStartDate = new Date()
    },
    startCall () {
      getCall(this.form.outboundNameId).then(res => {
        this.callSid = res.data.callSid
        if (this.callSid === null) {
          Toast.fail({
            duration: 2000,
            message: '无法外呼，请联系管理员...'
          })
          this.details = false
        } else {
          this.details = true
          this.callStatus = true
        }
      })
    },
    getRandom () {
      this.listQuery1.createTime = this.createTime
      getTaskList('dnf', this.listQuery1).then((res) => {
        console.log(res.data)
        this.form = res.data.content[0]
        this.form.lastCallResult = transformText(queryObj.callResult, this.form.lastCallResult)
        this.form.genderText = transformText(queryObj.gender, this.form.gender)
        let phones = this.form.phoneNo.substring(4, 5)
        if (phones === '*') {
          this.phoneShow = true
        } else {
          this.phoneShow = false
        }
      }).catch(() => {
        this.form.lastCallDate = 0
      })
    },
    submitCall () {
      this.callStatus = false
      this.resultShow = false
      this.history.outboundTaskId = this.form.taskId
      let _this = this
      if (this.phoneShow === false) {
        // this.history.acutalCallEndDate = new Date()
        getTaskHistory(this.history).then(res => {
          let data = res.data
          _this.form.lastCallResult = transformText(queryObj.callResult, data.result)
          console.log(this.form.taskId)
          this.form.lastCallResult = transformText(queryObj.callResult, this.form.lastCallResult)
          this.form.genderText = transformText(queryObj.gender, this.form.gender)
          this.getRandom()
          this.teskData()
          // console.log(_this.form.lastCallResult)
        })
      } else {
        getCallStatus(this.callSid).then((res) => {
          console.log(res)
          _this.history.actualCallStartDate = res.data.start
          _this.history.acutalCallEndDate = res.data.end
          getTaskHistory(this.history).then(res => {
            let data = res.data
            _this.form.lastCallResult = transformText(queryObj.callResult, data.result)
            console.log(this.form.taskId)
            this.form.lastCallResult = transformText(queryObj.callResult, this.form.lastCallResult)
            this.form.genderText = transformText(queryObj.gender, this.form.gender)
            this.getRandom()
            this.teskData()
            // console.log(_this.form.lastCallResult)
          })
        })
      }
    },
    callDate () {
      getCallStatus(this.callSid).then((res) => {
        this.callTime = this.dateTime(res.data.duration)
        // this.callTime.duration
      })
    },
    changeInfo () {
      this.inform = true
      this.resultShow = false
      this.info = this.form
    },
    updateInfo () {
      let params = {
        contactName: this.info.contactName,
        gender: this.info.gender,
        mobileNo: this.info.mobileNo,
        wechatNo: this.info.wechatNo,
        age: this.info.age
      }
      updateOutboundName(this.info.outboundNameId, params).then(res => {
        this.inform = false
        this.resultShow = true
        let data = res.data
        this.form.contactName = data.contactName
        this.form.age = data.age
        this.form.gender = data.gender
        this.form.genderText = transformText(queryObj.gender, this.form.gender)
      })
    },
    teskData () {
      let userId = localStorage.getItem('userId')
      getRank(userId).then(res => {
        this.task = res.data
        let theTime = parseInt(res.data.dailyEffectiveDuration)
        let theTime1 = 0
        if (theTime > 60) {
          theTime1 = parseInt(theTime / 60)
          theTime = parseInt(theTime % 60)
        }
        let result = parseInt(theTime)
        if (theTime1 > 0) {
          result = parseInt(theTime1) + ':' + result
        }
        this.task.dailyEffectiveDuration = result
        // if (this.task.dailyTaskCompleteCnt)
      }).catch((res) => {
        this.task.dailyTaskCompleteCnt = 0
        this.task.dailyTaskCnt = 0
        this.dailyEffectiveDuration = 0
      })
    },
    callsCancle () {
      getCallscancle(this.callSid).then(() => {
        this.details = false
      })
    }
  }
}
</script>
<style lang="scss">

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
    overflow: hidden;
    overflow-y: scroll;
  }
  .phone_content{
    font-size: 0.6rem;
    width: 92%;
    margin: 0 auto;
    padding: 0.2rem 0;
  }
  .phone_button{
    width: 90%;
    margin: 0.76rem auto 0;
    height: 1.64rem;
    /*background: #32CCBC ;*/
    border-radius: 0.2rem;
    font-size: 0.62rem;
    text-align: center;
    line-height: 1.64rem;
    color: #FFFFFF ;
    display: inherit;
  }
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
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-appearance: none
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
  /*input[type="radio"] {*/
    /*// content: "\a0"; !*不换行空格*!*/
    /*// display: inline-block;*/
    /*// vertical-align: middle;*/
    /*font-size: 14px;*/
    /*// width: 1em;*/
    /*// height: 1em;*/
    /*margin-right: .4em;*/
    /*border-radius: 50%;*/
    /*border: 1px solid #32CCBC;*/
    /*text-indent: .15em;*/
    /*line-height: 1;*/
    /*// margin-right: 5px;*/
  /*}*/
  /*input[type="radio"]:checked {*/
    /*background-color: #32CCBC;*/
    /*background-clip: content-box;*/
    /*padding: .2em;*/
  /*}*/
  /*input[type="radio"] {*/
    /*// position: absolute;*/
    /*clip: rect(0, 0, 0, 0);*/
  /*}*/
  /*.female,.male{*/
    /*// float: left;*/
    /*width: 40%;*/
    /*display: inline-block;*/
  /*}*/
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
</style>
