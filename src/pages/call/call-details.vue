<template>
  <div class="page">
    <wv-header title="外呼记录" class="x-header" background-color="#FFFFFF">
    </wv-header>
    <div class="wv-content x-wrapper">
      <div class="details_record">
        <div class="details_list">
          <p class="result_left"><small style="font-size: 100%;color: #ffffff;">*</small>通话时长</p>
          <p class="details_cont">{{callTimes}}</p>
        </div>
        <div class="details_list">
          <p class="result_left"><small style="font-size: 100%;color: red;">*</small> 外呼结果</p>
          <wv-cell class="details_cont" :value="results.label"  @click.native="resultsPickerShow = true" />
          <!--<wv-cell :value="ticket | pickerValueFilter" @click.native="ticketPickerShow = true" />-->
          <p class="iconfont icon-fanhui result_right"></p>
        </div>
        <div class="details_list">
          <p class="result_left"><small style="font-size: 100%;color: red;">*</small> 下一步行动计划</p>
          <wv-cell class="details_cont" :value="action.label" @click.native="actionPickerShow = true" />
          <p class="iconfont icon-fanhui result_right"></p>
        </div>
      </div>
      <div class="details_info">
        <p class="infor_title">客户信息</p>
        <div class="info_list">
          <p class="info_left">姓名</p>
          <input class="info_cont" v-model="form.contactName" maxlength="20">
          <p class="iconfont icon-fanhui info_right"></p>
        </div>
        <div class="info_list">
          <p class="info_left">电话</p>
          <input class="info_cont" v-model="form.phoneNo" maxlength="11">
          <p class="iconfont icon-fanhui info_right"></p>
        </div>
        <div class="info_list">
          <p class="info_left">微信</p>
          <input class="info_cont" v-model="form.wechatNo" maxlength="20">
          <p class="iconfont icon-fanhui info_right"></p>
        </div>
        <div class="info_lists">
          <p class="infos_left">备注</p>
          <textarea rows="5" class="record_txt" v-model="form.common" maxlength="100"></textarea>
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
  </div>
</template>

<script>
import { getTaskHistory, getCallStatus, updateOutboundName, getTaskList, getRandom, getCallMoney, postMessage } from '@/api/api'
import { timeDate, conversionTime } from '@/utils'
import { Toast } from 'we-vue'
export default {
  data () {
    return {
      groupId: undefined,
      callTime: {},
      callTimes: '',
      callId: '',
      userInfor: JSON.parse(localStorage.getItem('userInfor')),
      actionValue: [],
      resultsPickerShow: false,
      actionPickerShow: false,
      results: [],
      action: [],
      resultsColumns: [
        {
          values: [
            {label: '未外呼', value: 'NOT_CALL'},
            {label: '空号', value: 'NOT_EXIST'},
            {label: '未接通', value: 'UNCONNECTED'},
            {label: '已接通', value: 'CONNECTED'}
          ]
        }
      ],
      actionColumns: [
        {
          values: [
            {label: '再次外呼', value: 'CALL_AGAIN'},
            {label: '放弃外呼', value: 'GIVE_UP'},
            {label: '继续跟进', value: 'FOLLOW'}
          ]
        }
      ],
      history: {
        result: '',
        status: '',
        actualCallStartDate: '',
        acutalCallEndDate: '',
        outboundTaskId: '',
        common: ''
      },
      listQuery1: {
        pageIndex: 0,
        pageSize: 3,
        type: 'dnf',
        createTime: sessionStorage.getItem('createTime')
        // createTime: ''
      }
    }
  },
  created () { // 挂断电话后的行为
    // console.log(this.$route.query)
    this.form = this.$route.query.form
    this.groupId = this.$route.query.groupId
    let phones = this.form.phoneNo.substring(4, 5)
    if (phones === '*') {
      this.callId = this.$route.query.callId
      // alert(this.callId)
      getCallStatus(this.callId).then((res) => {
        this.callTime = res.data
        this.callTimes = timeDate(this.callTime.duration)
        // this.callTime.start = parseTime(res.data.start, '{y}-{m}-{d} {hh}:{mm}:{ss}')
        // this.callTime.end = parseTime(res.data.end, '{y}-{m}-{d} {hh}:{mm}:{ss}')
        // console.log('时间' + this.callTime.start)
        this.getCallHistory(this.callTime.duration)
      }).catch(() => {
        // alert('call时间获取')
      })
    } else {
      this.callTime = this.$route.query.callTime
      this.callTimes = timeDate(this.callTime.duration)
      this.callTime.start = conversionTime(this.callTime.start)
      this.callTime.end = conversionTime(this.callTime.end)
      this.getCallHistory(this.callTime.duration)
    }
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
      if (this.history.result === '' || this.history.status === '') {
        Toast.text({
          duration: 2000,
          message: '标星为必填项'
        })
      } else {
        let params = {
          contactName: this.form.contactName,
          gender: this.form.gender,
          mobileNo: this.form.mobileNo,
          wechatNo: this.form.wechatNo,
          age: this.form.age
        }
        this.history.actualCallStartDate = new Date(this.callTime.start)
        this.history.acutalCallEndDate = new Date(this.callTime.end)
        // alert(this.history.actualCallStartDate)
        this.history.outboundTaskId = this.form.taskId
        this.history.callType = this.form.phoneNo.indexOf('*') > -1 ? 'THIRD_PLATFORM' : 'NATIVE'
        this.history.common = this.form.common
        getTaskHistory(this.history).then(res => {
          this.customerInfor(params)
        })
      }
    },
    customerInfor (params) {
      updateOutboundName(this.form.outboundNameId, params).then(res => {
        this.goMessage()
        Toast.success('提交成功')
        if (this.groupId === undefined) {
          getRandom().then(res => {
            let randomData = res.data
            this.$router.push({path: '/call/customer-random/1', query: randomData})
          }).catch(() => {
            this.$router.push({path: '/home'})
          })
        } else {
          // TODO
          // listQuery1 参数来源？
          getTaskList(this.groupId, this.listQuery1).then(res => {
            let data = res.data.content[0]
            if (!res.data.content[0]) {
              this.$router.push({name: 'call', params: {groupId: this.groupId}})
            } else {
              this.$router.push({path: '/call/customer-random/0/' + this.groupId, query: data})
            }
          })
        }
      })
    },
    getCallHistory (duration) {
      let params = {
        callType: this.form.phoneNo.indexOf('*') > -1 ? 'THIRD_PLATFORM' : 'NATIVE',
        clientId: this.form.outboundNameId,
        clientName: this.form.contactName,
        duration: duration,
        phoneNum: this.form.phoneNo,
        saleId: this.userInfor.id
      }
      // console.log('callType：' + params.callType + 'clientId：' + params.clientId + 'clientName：' + params.clientName + 'duration：' + params.duration + 'phoneNum：' + params.phoneNum + 'saleId：' + params.saleId)
      getCallMoney(params).then(res => {
        // console.log('挂断保存成功')
      }).catch(() => {
        console.log('挂断提交时间失败')
      })
    },
    goMessage () {
      // alert(this.userInfor.companyId + ',' + this.form.outboundNameId + ',' + this.userInfor.username + ',' + this.form.contactName)
      postMessage(this.userInfor.companyId, this.form.outboundNameId, this.userInfor.username, this.form.contactName).then(res => {
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
    margin-top: 20px;
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
    outline: none !important;
    padding: 3px;
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
    clear: both;
  }
  .details_list>p{
    height: 109px;
    line-height: 109px;
    float: left;
  }
  .result_left{
    font-size: 28px;
    width: 40%;
    color: #323232;
    height: 109px;
    line-height: 109px;
  }
  .details_cont{
    width: 50%;
    float: left;
    height: 109px;
    text-align: right;
    color: #000000;
    outline: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    padding: 0!important;
    border: 0!important;
  }
  .result_right{
    color:#e9e9e9;
    font-size: 39px;
    width: 8%;
    transform:rotate(180deg);
    -ms-transform:rotate(180deg);
    -moz-transform:rotate(180deg);
    -webkit-transform:rotate(180deg);
    -o-transform:rotate(180deg);
  }
  /*input::-webkit-input-placeholder{*/
    /*color: #000000;*/
  /*}*/
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
    height: 70px;
    line-height: 70px;
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
    height: 109px;
    /*line-height: 93px;*/
  }
  .infos_left{
    font-size: 28px;
    width: 20%;
    color: #323232;
    margin-top: 10px
  }
  .info_left{
    line-height: 109px;
    font-size: 28px;
    width: 20%;
    color: #323232;
  }
  .info_cont{
    width: 68%;
    text-align: right;
    color: #000000;
    font-size: 28px;
    outline: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0)
  }
  .info_right{
    color:#e9e9e9;
    line-height: 109px;
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
    margin: 30px auto 0;
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
  .weui-cell:before{
    border: 0!important;
  }
</style>
