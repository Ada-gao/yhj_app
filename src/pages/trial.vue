<template>
  <div class="page" style="position: absolute;top:2rem">
    <wv-header class="trial_header" title="申请体验" :fixed="true" background-color="white" style="color:#32CCBC;">
      <div class="btn-back" slot="left">
        <i class="iconfont icon-fanhui" @click="$router.push('/')" style="color:black"></i>
      </div>
    </wv-header>
    <div class="trial_title">
      我们提供免费体验活动，您可以在此提交申请。申
      请成功后，将由我们专属服务人员为你安排预约。
    </div>
    <wv-flex :gutter="10" style="margin-top: 0.6rem">
      <wv-flex-item>
        <div class="placeholder trial_icon iconfont icon-chanpinzhanshi"></div>
        <div class="placeholder trial_text">产品展示</div>
      </wv-flex-item>
      <wv-flex-item>
        <div class="placeholder trial_icon iconfont icon-chanpinpeizhi"></div>
        <div class="placeholder trial_text">产品配置</div>
      </wv-flex-item>
      <wv-flex-item>
        <div class="placeholder trial_icon iconfont icon-mianfeitiyan"></div>
        <div class="placeholder trial_text">免费体检</div>
      </wv-flex-item>
    </wv-flex>
    <p style="font-size: 0.6rem;margin: 1.18rem auto 0;width: 87%">公司信息</p>
    <input type="text" placeholder="公司名称" class="trial_company" v-model="companyName">
    <v-distpicker hide-area @province="onChangeProvince" @city="onChangeCity"></v-distpicker>
    <!--<wv-flex :gutter="10" style="width: 96%;margin: 0 auto;">-->
      <!--<wv-flex-item >-->
        <!--<div class="placeholder task_number">-->
          <!--&lt;!&ndash;<input class="trial_company weui-input" placeholder="所在地" :value="ticket | pickerValueFilter" />&ndash;&gt;-->
          <!--<v-distpicker hide-area></v-distpicker>-->
        <!--</div>-->
      <!--</wv-flex-item>-->
      <!--<wv-flex-item @click.native="regionPickerShow = true">-->
        <!--<div class="placeholder task_number"></div>-->
        <!--<input class="trial_company weui-input" placeholder="区域" :value="region | pickerValueFilter" />-->
      <!--</wv-flex-item>-->
    <!--</wv-flex>-->
    <wv-flex :gutter="10" style="width: 96%;margin: 0 auto;">
      <wv-flex-item @click.native="industryPickerShow = true">
        <div class="placeholder task_number">
          <input class="trial_company weui-input" placeholder="所属行业" :value="industry | pickerValueFilter" />
          <!--<input type="text" placeholder="所在地" class="trial_company" >-->
        </div>
      </wv-flex-item>
      <wv-flex-item @click.native="scalePickerShow = true">
        <div class="placeholder task_number"></div>
        <input class="trial_company weui-input" placeholder="公司规模" :value="scale | pickerValueFilter" />
      </wv-flex-item>
    </wv-flex>
    <p style="font-size: 0.6rem;margin: 1.18rem auto 0;width: 87%">联系人信息</p>
    <input type="text" placeholder="联系人姓名" class="trial_company" v-model="contact">
    <wv-input placeholder="请输入手机号" class="verification" v-model="mobile">
      <button class="weui-vcode-btn" slot="ft" @click="trialVerification">获取验证码</button>
    </wv-input>
    <input type="tel" placeholder="请输入验证码" class="trial_company" v-model="verification">
    <p class="trial_footer">请如实填写申请信息，我们将于1个工作日内与您取得联系</p>
    <div class="trial_button">申请体验</div>
    <wv-picker
      :visible.sync="industryPickerShow"
      v-model="industry"
      :columns="industryColumns"
      @confirm="confirmIndustry"
    />
    <wv-picker
      :visible.sync="scalePickerShow"
      v-model="scale"
      :columns="scaleColumns"
      @confirm="confirmScale"
    />
  </div>
</template>
<script>
import VDistpicker from 'v-distpicker'
import { postTrial } from '../api/api'
import { postVerification } from '../api/api'
export default {
  components: { VDistpicker },
  data () {
    return {
      companyName: '',
      companyProvince: '',
      companyCity: '',
      contact: '',
      orgZize: '',
      mobile: '',
      verification: '',
      industryValue: [],
      scaleValue: [],
      ticketPickerShow: false,
      regionPickerShow: false,
      industryPickerShow: false,
      scalePickerShow: false,
      ticket: [''],
      region: [''],
      industry: [''],
      scale: [''],
      fruit: [{name: 'Apple', age: 1}],
      industryColumns: [
        {
          values: [
            '',
            '销售',
            '餐饮',
            '保洁',
            '房地产',
            '自由职业'
          ],
          defaultIndex: 2
        }
      ],
      scaleColumns: [
        {
          values: [
            '',
            '10-15',
            '15-20',
            '20-50',
            '50-100',
            '100-1000',
            '1000-1500',
            '1500-2000',
            '2000-5000'
          ],
          defaultIndex: 2
        }
      ]
    }
  },
  methods: {
    onChangeProvince (province) {
      this.province = province.value
    },
    onChangeCity (city) {
      this.city = city.value
    },
    trialApply () {
      let params = {
        companyName: this.companyName,
        companyProvince: this.companyProvince,
        companyCity: this.companyCity,
        contact: this.contact,
        mobile: this.mobile,
        orgZize: this.orgZize,
        status: 0
      }
   /* postTrial(params).then(res => {

      }) */
    },
    trialVerification () {
      let mobilePhone = {mobile:this.mobile}
      postVerification(mobilePhone).then(res => {
        console.log(res)
      })
    },
    confirmIndustry (picker) {
      this.industry = picker.getValues()
    },
    confirmScale (picker) {
      this.industry = picker.getValues()
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
<style scoped>
  .trial_title{
    width: 80%;
    margin:auto;
    font-size: 13px;
  }
  .trial_icon{
    margin: 0 auto;
    width: 1.32rem;
    font-size: 1.32rem;
    color: #32CCBC;
  }
  .trial_text{
    font-size: 0.48rem;
    text-align: center;
  }
  .trial_company{
    width: 87%;
    margin: 0.42rem auto 0;
    display: block;
    height: 1.2rem;
    border-radius: 0.2rem;
    border: 1px solid gainsboro;
    padding-left: 0.2rem;
    outline:none;
    font-size: 0.48rem;
    background: white;
  }
  .verification{
    width: 87%;
    margin: 0.4rem auto 0;
    border-radius: 0.2rem;
    border: 1px solid gainsboro;
    background: white;
    height: 1.2rem;
    font-size: 0.5rem;
    padding: 0 0 0 0.2rem;
  }
  .weui-vcode-btn, .weui-vcode-img{
    height: 0.5rem;
    line-height: 0.5rem;
  }
  .trial_footer{
    font-size: 0.50rem;
    color: #666666;
    text-align: center;
    margin-top: 0.44rem;
  }
  .trial_button{
    width: 90%;
    margin: 1.2rem auto 0;
    height: 1.76rem;
    background: #32CCBC;
    color: white;
    text-align: center;
    line-height: 1.76rem;
    font-size: 0.72rem;
    border-radius: 0.2rem;
  }
  .distpicker-address-wrapper{
    width: 100%;
    margin: 0 auto;
  }
</style>
