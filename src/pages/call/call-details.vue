<template>
  <div class="page">
    <wv-header title="外呼记录" class="x-header" background-color="#FFFFFF">
    </wv-header>
    <div class="details_record">
      <div class="details_list">
        <p class="details_left"><small style="font-size: 100%;color: #ffffff;">*</small>通话时长</p>
        <p class="details_cont">{{callTimes}}</p>
        <p class="details_right"></p>
      </div>
      <div class="details_list">
        <p class="details_left"><small style="font-size: 100%;color: red;">*</small> 外呼结果</p>
        <wv-cell class="details_cont" :value="results.label"  @click.native="resultsPickerShow = true" />
        <!--<wv-cell :value="ticket | pickerValueFilter" @click.native="ticketPickerShow = true" />-->
        <p class="iconfont icon-fanhui details_right"></p>
      </div>
      <div class="details_list">
        <p class="details_left"><small style="font-size: 100%;color: red;">*</small> 下一步行动计划</p>
        <wv-cell class="details_cont" :value="action.label" @click.native="actionPickerShow = true" />
        <p class="iconfont icon-fanhui details_right"></p>
      </div>
    </div>
    <div class="details_info">
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
    <div class="details_button" @click="submitCall">
      提交
    </div>
    <wv-picker
      :visible.sync="resultsPickerShow"
      :columns="resultsColumns"
      value-key="label"
      @confirm="confirmResults"
    />
    <wv-picker
      :visible.sync="actionPickerShow"
      :columns="actionColumns"
      value-key="label"
      @confirm="confirmAction"
    />
  </div>
</template>

<script>
import { getTaskHistory, getCallStatus, updateOutboundName, getTaskList } from '@/api/api'
import { timeDate } from '@/utils'
export default {
  data () {
    return {
      value: '',
      callTime: '',
      callTimes: '',
      callId: '',
      actionValue: [],
      resultsPickerShow: false,
      actionPickerShow: false,
      results: [{label: '进一步跟进', value: 'BUSYING'}],
      action: ['继续拨打'],
      resultsColumns: [
        {
          values: [
            {label: '占线', value: 'BUSYING'},
            {label: '未外呼', value: 'NOT_CALL'},
            {label: '无人接听', value: 'NO_ANSWER'},
            {label: '无意向拒绝', value: 'REFUSE'},
            {label: '进一步跟进', value: 'FOLLOW'}
          ]
        }
      ],
      actionColumns: [
        {
          values: [
            {label: '再次外呼', value: 'CALL_AGAIN'},
            {label: '放弃外呼', value: 'GIVE_UP'},
            {label: '继续跟进', value: 'FLLOW'}
          ]
        }
      ],
      history: {
        result: 'NOT_CALL',
        status: 'CALL_AGAIN',
        actualCallStartDate: '',
        acutalCallEndDate: '',
        outboundTaskId: ''
      }
    }
  },
  created () {
    this.form = this.$route.query.form
    this.value = this.$route.query.value
    let phones = this.form.phoneNo.substring(4, 5)
    if (phones === '*') {
      this.callId = this.$route.query.callId
      getCallStatus(this.callId).then((res) => {
        this.callTime = res.data
        this.callTimes = timeDate(this.callTime.duration)
      })
    } else {
      this.callTime = this.$route.query.callTime
      this.callTimes = timeDate(this.callTime.duration)
      // alert('电话状态：' + this.callTime + '，通话时长：' + this.callTime.duration + '，开始时间：' + this.callTime.start + '，结束时间：' + this.callTime.end)
    }
    // alert('电话状态：' + this.form + '，通话时长：' + this.form.duration + '，开始时间：' + this.form.startDate + '，结束时间：' + this.form.endDate)
  },
  methods: {
    confirmResults (picker) {
      this.results = picker.getValues()[0]
      this.history.result = this.results.value
    },
    confirmAction (picker) {
      this.action = picker.getValues()[0]
      this.history.status = this.action.value
    },
    submitCall () {
      // let _this = this
      let params = {
        contactName: this.form.contactName,
        gender: this.form.gender,
        mobileNo: this.form.mobileNo,
        wechatNo: this.form.wechatNo,
        age: this.form.age,
        common: ''
      }
      this.history.actualCallStartDate = new Date(this.callTime.start)
      this.history.acutalCallEndDate = new Date(this.callTime.end)
      this.history.outboundTaskId = this.form.taskId
      getTaskHistory(this.history).then(res => {
        this.$router.push({path: '/home'})
      }).catch(() => {
        alert('外呼结果保存失败')
      })
      updateOutboundName(this.form.outboundNameId, params).then(res => {
        if (this.value === 'random') {
          this.$router.push({path: '/call/customer-random'})
        } else if (this.value === 'details') {
          getTaskList('dnf', this.listQuery1).then(res => {
            let data = res.data.content[0]
            this.$router.push({name: 'customer-details', params: data})
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .details_record{
    width: 100%;
    height: 370px;
    background: #ffffff;
    margin-top: 100px;
    box-shadow: 6px 4px 20px rgba(219,219,219,0.3);
  }
  .details_title{
    width: 86%;
    margin: 0 auto;
    height: 93px;
    line-height: 93px;
    font-size: 32px;
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
  .details_list{
    width: 86%;
    margin: 0 auto;
    border-bottom: 1px solid #e9e9e9;
    height: 109px;
  }
  .details_list>p,.details_cont{
    float: left;
    height: 93px;
    line-height: 93px;
  }
  .details_left{
    font-size: 28px;
    width: 34%;
    color: #323232;
  }
  .details_cont{
    width: 58%;
    text-align: right;
    color: #000000;
    outline: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    padding: 0!important;
  }
  .details_right{
    color:#e9e9e9;
    font-size: 39px;
    width: 6%;
    transform:rotate(180deg);
    -ms-transform:rotate(180deg);
    -moz-transform:rotate(180deg);
    -webkit-transform:rotate(180deg);
    -o-transform:rotate(180deg);
  }
  input::-webkit-input-placeholder{
    color: #000000;
  }
  .details_info{
    width: 100%;
    height: 670px;
    background: #ffffff;
    margin-top: 30px;
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
  .details_button{
    width: 90%;
    height: 88px;
    line-height: 88px;
    margin: 100px auto 0;
    color: #ffffff;
    font-size: 36px;
    text-align: center;
    background: linear-gradient(to right, #5d90f4 , #2f6be2);
    box-shadow: 0px 7px 29px 1px rgba(13,67,173,0.3);
    border-radius: 6px;
  }
  .weui-cell__ft{
    color: #000000!important;
  }
</style>
