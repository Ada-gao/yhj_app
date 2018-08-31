<template>
  <div class="page">
    <wv-header title="外呼记录" class="x-header" background-color="#FFFFFF">
    </wv-header>
    <div class="wv-content x-wrapper">
      <div class="record_info">
        <p class="infor_title">客户信息</p>
        <div class="info_list">
          <p class="info_left">姓名</p>
          <input class="info_cont" :placeholder="form.contactName" v-model="form.contactName">
          <p class="iconfont icon-fanhui info_right"></p>
        </div>
        <div class="info_list">
          <p class="info_left">电话</p>
          <input class="info_cont" :placeholder="form.phoneNo" v-model="form.phoneNo">
          <p class="iconfont icon-fanhui info_right"></p>
        </div>
        <div class="info_list">
          <p class="info_left">微信</p>
          <input class="info_cont" :placeholder="form.wechatNo" v-model="form.wechatNo">
          <p class="iconfont icon-fanhui info_right"></p>
        </div>
        <div class="info_lists">
          <p class="info_left" style="margin-top: 10px">备注</p>
          <textarea rows="5" :placeholder="form.common" class="record_txt" v-model="form.common"></textarea>
        </div>
      </div>
      <div class="info_text">
        <div class="info_txt">外呼话术</div>
        <div class="info_html" v-html="form.salesTalk">{{form.salesTalk}}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  data () {
    return {
      callid: '',
      form: {},
      phoneShow: '',
      value: ''
    }
  },
  created () {
    this.form = this.$route.query.form
    this.callid = this.$route.query.callId
    this.value = this.$route.query.value
    let phones = this.form.phoneNo.substring(4, 5)
    if (phones === '*') {
      this.phoneShow = true
    } else {
      this.phoneShow = false
    }
    // this.callid = this.$route.params.callid
    // alert(this.callid)
  },
  mounted () {
    let devicePlatform = Vue.cordova.device.platform
    if (devicePlatform === 'Android') {
      window.CallListener.addListener((state) => {
        if (state === 1) {
          if (this.phoneShow === false) {
            window.CallListener.getCallInfo((info) => {
              this.$router.push({path: '/call/call-details', query: {form: this.form, callTime: info, value: this.value}})
              // alert('电话状态：' + state + '，通话时长：' + info.duration + '，开始时间：' + info.startDate + '，结束时间：' + info.endDate)
              // this.callTime = timeDate(info.duration)
              // this.history.actualCallStartDate = info.startDate
              // this.history.acutalCallEndDate = info.endDate
            }, this.form.phoneNo)
          } else {
            this.$router.push({path: '/call/call-details', query: {form: this.form, callId: this.callid, value: this.value}})
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.record_info{
  width: 100%;
  height: 660px;
  background: #ffffff;
  margin-top: 20px;
  box-shadow: 6px 4px 20px rgba(219,219,219,0.3);
}
  .infor_title{
    width: 86%;
    margin: 0 auto;
    height: 93px;
    line-height: 93px;
    font-size: 32px;
  }
  .info_list{
    width: 86%;
    margin: 0 auto;
    border-bottom: 1px solid #e9e9e9;
    height: 109px;
  }
  .record_txt{
    width: 100%;
    margin: 0 auto;
    border: 2px solid #e9e9e9;
    border-radius: 6px;
    outline: none;
  }
  .info_lists{
    width: 86%;
    margin: 0 auto;
    font-size: 28px;
  }
.info_list>p,.info_cont{
  float: left;
  height: 93px;
  line-height: 93px;
}
  .info_left{
    font-size: 28px;
    width: 20%;
    color: #323232;
  }
  .info_cont{
    width: 68%;
    text-align: right;
    color: #000000;
    outline: none;
    border: 0;
    -webkit-tap-highlight-color: rgba(0,0,0,0)
  }
  .info_right{
    color:#e9e9e9;
    font-size: 39px;
    width: 10%;
    transform:rotate(180deg);
    -ms-transform:rotate(180deg);
    -moz-transform:rotate(180deg);
    -webkit-transform:rotate(180deg);
    -o-transform:rotate(180deg);
  }
 input::-webkit-input-placeholder{
   color: #000000;
 }
  .info_text{
    width: 100%;
    height: 558px;
    box-shadow: 6px 4px 20px rgba(219,219,219,0.3);
    background: #ffffff;
    margin-top: 30px;
  }
  .info_txt{
    width: 86%;
    margin: 0 auto;
    padding-top: 30px;
    padding-bottom: 27px;
  }
  .info_html{
    width: 86%;
    margin: 0 auto;
    color: #252525;
    font-size: 28px;
  }
</style>
