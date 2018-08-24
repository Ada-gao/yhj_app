<template>
  <div class="page">
    <wv-header title="外呼记录" class="x-header" background-color="#FFFFFF">
    </wv-header>
    <div class="details_record">
      <div class="details_list">
        <p class="details_left"><small style="font-size: 100%;color: #ffffff;">*</small>通话时长</p>
        <p class="details_cont">2分21秒</p>
        <p class="details_right"></p>
      </div>
      <div class="details_list">
        <p class="details_left"><small style="font-size: 100%;color: red;">*</small> 外呼结果</p>
        <wv-cell class="details_cont" :value="results | pickerValueFilter" @click.native="resultsPickerShow = true" />
        <!--<wv-cell :value="ticket | pickerValueFilter" @click.native="ticketPickerShow = true" />-->
        <p class="iconfont icon-fanhui details_right"></p>
      </div>
      <div class="details_list">
        <p class="details_left"><small style="font-size: 100%;color: red;">*</small> 下一步行动计划</p>
        <wv-cell class="details_cont" :value="action | pickerValueFilter" @click.native="actionPickerShow = true" />
        <p class="iconfont icon-fanhui details_right"></p>
      </div>
    </div>
    <div class="record_info">
      <p class="infor_title">客户信息</p>
      <div class="info_list">
        <p class="info_left">姓名</p>
        <input class="info_cont" placeholder="蓝色妖姬">
        <p class="iconfont icon-fanhui info_right"></p>
      </div>
      <div class="info_list">
        <p class="info_left">电话</p>
        <input class="info_cont" placeholder="13661876489">
        <p class="iconfont icon-fanhui info_right"></p>
      </div>
      <div class="info_list">
        <p class="info_left">微信</p>
        <input class="info_cont" placeholder="2446075450">
        <p class="iconfont icon-fanhui info_right"></p>
      </div>
      <div class="info_list">
        <p class="info_left">备注</p>
        <input class="info_cont" placeholder="有意向购买产品">
        <p class="iconfont icon-fanhui info_right"></p>
      </div>
    </div>
    <div class="details_button">
      提交
    </div>
    <wv-picker
      :visible.sync="resultsPickerShow"
      v-model="results"
      :columns="resultsColumns"
      @confirm="confirmResults"
    />
    <wv-picker
      :visible.sync="actionPickerShow"
      v-model="action"
      :columns="actionColumns"
      @confirm="confirmAction"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      resultsValue: [],
      actionValue: [],
      resultsPickerShow: false,
      actionPickerShow: false,
      results: ['汽车票'],
      action: ['继续拨打'],
      resultsColumns: [
        {
          values: [
            '汽车票',
            '飞机票',
            '火车票',
            '轮船票',
            '其它'
          ],
          label: [
            'BUSYING'
          ],
          defaultIndex: 2
        }
      ],
      actionColumns: [
        {
          values: [
            '汽车票',
            '飞机票',
            '火车票',
            '轮船票',
            '其它'
          ],
          label: [
            'BUSYING'
          ],
          defaultIndex: 2
        }
      ]
    }
  },
  methods: {
    confirmResults (picker) {
      this.ticket = picker.getValues()
      console.log(picker)
    },
    confirmAction (picker) {
      this.action = picker.getValues()
      console.log(picker)
    }
  },
  filters: {
    pickerValueFilter (val) {
      if (Array.isArray(val)) {
        return val.toString()
      } else {
        return '请选择'
      }
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
  .record_info{
    width: 100%;
    height: 570px;
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
