<template>
  <div class="page customer_random">
    <wv-header class="x-header" style="background-color: rgba(33, 41, 44, 0)">
      <div class="btn-back header_left" slot="left">
        <i class="iconfont icon-fanhui size_c" @click="backHandle">返回</i>
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
          <!-- <div class="random_title">
            <p class="l"></p>
            <p style="height: 30px;line-height: 30px;margin-left: 8px;">外呼话术</p>
          </div> -->
          <h5 class="random_tit">外呼话术</h5>
          <div style="clear: both" v-html="form.salesTalk">{{form.salesTalk}}</div>
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
  </div>
</template>
<script>
import company from '@/assets/images/hand.png'
import phoneImg from '../../assets/images/phone.gif'
import cancle from '@/assets/images/cancle.png'
import { getCall, getCallscancle, getRandom } from '@/api/api'
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
      conversationState: false,
      type: '',
      groupId: ''
    }
  },
  created () {
    // this.nextStepOptions = queryObj.nextStep
    // this.callResult = queryObj.callResult
    // this.teskData()
    this.type = this.$route.params.type
    this.groupId = this.$route.params.groupId
    if (Object.keys(this.$route.query).length) {
      this.form = this.$route.query
    } else {
      this.getRandom(this.groupId)
    }
  },
  mounted () {
    let devicePlatform = Vue.cordova.device.platform
    // if (devicePlatform !== 'Android') {
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
      })
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
    backHandle () {
      if (this.type === '1') {
        this.$router.push('/home')
      } else {
        this.$router.push({name: 'call', params: {groupId: this.groupId}})
        // this.$router.push({path: '/call/' + this.groupId})
      }
    },
    getRandom (groupId = '') { // 随机获取客户
      let params = {
        groupId: groupId
      }
      getRandom(params).then(res => {
        this.form = res.data
      })
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
    margin: 30px auto 0;
    background-color: #ffffff;
    border-radius: 6px;
    padding: 38px 45px;
    box-sizing: border-box;
  }
  // .l{
  //   width: 6px;
  //   height: 30px;
  //   background-color: #2f6be2;
  // }
  // .random_title{
  //   height: 30px;
  //   line-height: 30px;
  //   font-size: 32px;
  //   padding: 20px 0 10px 20px;
  // }
  // .random_title>p{
  //   float: left;
  // }
  .random_tit {
    font-size: 32px;
    position: relative;
    &::before {
      // display: inline-block;
      position: absolute;
      left: -3%;
      top: 10px;
      content: '';
      width: 6px;
      height: 30px;
      background-color: #2f6be2;
      // margin-right: 10px;
      // vertical-align: inherit;
    }
  }
  .main{
    display: inline-block;
  }
  .main input{
    display: none;
  }
  // .test{
  //   box-sizing: border-box;
  //   position: relative;
  //   display: inline-block;
  //   width: 16px;
  //   height: 16px;
  //   border: 2px solid #02B6DC;
  //   border-radius: 50%;
  //   float: left;
  //   margin: 4px 10px 0;
  //   padding: 2px;
  //   background-clip: content-box;
  // }
  input:checked + span {
    background: #02B6DC;
  }
  // .weui-toast{
  //   min-height: 5em;
  // }
  // .weui-toast__content{
  //   font-size: 0.6rem;
  // }
  .wv-header-title{
    font-size: 19px;
  }
  // .details_left{
  //   width: 100%;
  //   height: 9.28rem;
  //   background: white;
  //   /*margin-top: 0.272rem;*/
  //   border-radius: 0.1rem;
  // }
  // .details_right{
  //   width: 100%;
  //   background: white;
  //   height: 2.9rem;
  //   margin: 0.272rem 0 0;
  //   border-radius: 0.1rem;
  // }
  // .inform{
  //   width: 57%;
  //   font-size: 0.56rem;
  //   /* padding-left: 3.38rem; */
  //   margin: 0.42rem 29% 0;
  // }
  // .photo_img{
  //   width: 0.88rem;
  //   margin: 0 auto;
  //   padding-top: 0.3rem;
  // }
  // .photo_img>img{
  //   max-width: 100%;
  // }
  // .icon_ju{
  //   width: 0.88rem;
  //   margin: 0 auto;
  //   font-size: 0.85rem;
  //   color: #CF2828;
  //   padding-top: 0.3rem;
  // }
  // .details_phone{
  //   font-size: 0.56rem;
  //   text-align: center;
  // }
  // .icon_sou{
  //   width: 0.88rem;
  //   margin: 0 auto;
  //   font-size: 0.85rem;
  //   color: #3A99FC;
  //   padding-top: 0.3rem;
  // }
  // .phone_details{
  //   width: 100%;
  //   height: 10.34rem;
  //   background: #FFFFFF;
  //   margin-top: 0.4rem;
  // }
  // .phone_html{
  //   width: 92%;
  //   height: 8.34rem;
  //   margin: 0 auto;
  //   border-radius: 0.2rem;
  //   border: 1.5px solid #DEDEDE;
  //   font-size: 0.52rem;
  //   color: #666666;
  // }
  // .phone_content{
  //   font-size: 0.6rem;
  //   width: 92%;
  //   margin: 0 auto;
  //   padding: 0.2rem 0;
  // }
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
  // .Record,
  // .information,
  .details_loading{
    z-index: 501;
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.61);
  }
  // .Record_content{
  //   position: fixed;
  //   z-index: 501;
  //   width: 87%;
  //   max-width: 317px;
  //   top: 50%;
  //   left: 50%;
  //   -webkit-transform: translate(-50%,-50%);
  //   transform: translate(-50%,-50%);
  //   overflow: hidden;
  //   height: 22.34rem;
  //   /*margin:2.16rem  auto 0;*/
  //   background: #FFFFFF;
  //   border-radius: 0.2rem;
  // }
  // .information_content{
  //   position: fixed;
  //   z-index: 501;
  //   width: 87%;
  //   max-width: 300px;
  //   top: 50%;
  //   left: 50%;
  //   -webkit-transform: translate(-50%,-50%);
  //   transform: translate(-50%,-50%);
  //   overflow: hidden;
  //   height: 11.34rem;
  //   background: #ffffff;
  //   border-radius: 0.2rem;
  // }
  // .details_content{
  //   position: fixed;
  //   z-index: 501;
  //   width: 50%;
  //   max-width: 300px;
  //   top: 50%;
  //   left: 50%;
  //   -webkit-transform: translate(-50%,-50%);
  //   transform: translate(-50%,-50%);
  //   overflow: hidden;
  //   height: 5rem;
  //   line-height: 5rem;
  //   text-align: center;
  //   background: #ffffff;
  //   border-radius: 0.2rem;
  //   font-size: 0.8rem;
  //   color: #32CCBC;
  // }
  // .Record_title,.information_title{
  //   width: 95%;
  //   height: 1.72rem;
  //   margin: 0 auto;
  //   line-height: 1.72rem;
  //   font-size: 0.64rem;
  //   text-align: center;
  //   border-bottom: 1px solid #eae8e8;
  // }
  // .Record_time{
  //   width: 100%;
  //   text-align: center;
  //   font-size: 0.6rem;
  //   color: #02B6DC;
  //   margin-top: 0.36rem;
  // }
  // .Result_select{
  //   width: 80%;
  //   border: 1px solid #ccc;
  //   // height: 0.8rem;
  //   // border-radius: 0.2rem;
  //   outline: none;
  //   -webkit-appearance: none;
  // }
  // .word{
  //   width: 100%;
  //   clear: both;
  //   height: 2rem;
  // }
  // .word>p{
  //   float: right;
  //   height: 1rem;
  //   width: 2rem;
  //   line-height: 1rem;
  //   font-size: 0.56rem;
  //   color: #FFFFFF;
  //   text-align: center;
  //   border-radius: 0.2rem;
  //   margin: 0.9rem  0.44rem 0;
  // }
  // .Result_inform{
  //   font-size: 0.56rem;
  // }
  // .Result_tex{
  //   width: 84%;
  //   margin: 0.3rem auto;
  //   display: inherit;
  //   border: 1.5px solid #818080;
  //   border-radius: 0.2rem;
  //   padding: 5px;
  //   box-sizing: border-box;
  //   outline: none;
  // }
  // .Result_button{
  //   width: 87%;
  //   height: 1.6rem;
  //   margin: 1.26rem auto 0;
  //   line-height:1.6rem;
  //   font-size: 0.56rem;
  //   text-align: center;
  //   border-radius: 0.2rem;
  //   color: #ffffff;
  // }
  // .information_list{
  //   width: 87%;
  //   margin: 0 auto;
  // }
  // .information_list>li{
  //   height: 1.3rem;
  //   list-style: none;
  // }
  // .information_list>li>p{
  //   float: left;
  //   height: 1.3rem;
  //   line-height: 1.3rem;
  //   font-size: 0.56rem;
  // }
  // .item-input{
  //   width: 100%;
  //   border: 1px solid grey;
  //   height: 0.8rem;
  //   border-radius: 0.2rem;
  //   outline: none;
  //   -webkit-appearance: none;
  //   -webkit-tap-highlight-color: rgba(0,0,0,0)
  // }
  // .list_title{
  //   width: 30%;
  // }
  // .list_word{
  //   width: 70%;
  //   float: left;
  //   font-size: 0.64rem;
  // }
  // .information_button{
  //   width: 87%;
  //   height: 1.6rem;
  //   line-height: 1.6rem;
  //   font-size: 0.64rem;
  //   text-align: center;
  //   border-radius: 0.1rem;
  //   color: #ffffff;
  //   margin: 1rem auto 0;
  // }
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
    // margin: 4rem auto 0;
    margin: 40px auto 0;
  }
  .phone>img,.phone_hand>img,.phone_cancle>img{
    max-width: 100%;
  }
  .phone_txt{
    text-align: center;
    color: #dee2ed;
    font-size: 17px;
  }
  // .head_name{
  //   text-align: center;
  //   width: 5rem;
  //   margin: 0 auto;
  //   white-space: nowrap;
  //   text-overflow: ellipsis;
  //   -o-text-overflow: ellipsis;
  //   overflow: hidden;
  // }
</style>
