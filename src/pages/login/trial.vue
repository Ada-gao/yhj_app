<template>
  <div class="page">
    <wv-header class="x-header" title="申请体验" background-color="white" style="color:#02B6DC;">
      <div class="btn-back" slot="left" style="position: absolute;top: 7px;left: 0;width: 20%;">
        <i class="iconfont icon-fanhui size_i" @click="$router.push('/')" style="color:#959292"></i>
      </div>
    </wv-header>
    <div class="wv-content x-wrapper" style="background-color: #ffffff">
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
    <!--<input type="text" placeholder="公司名称" class="trial_company" v-model="companyName">-->
      <wv-input type="text" placeholder="公司名称" class="verification" v-model="companyName"></wv-input>
    <v-distpicker hide-area @province="onChangeProvince" @city="onChangeCity"></v-distpicker>
    <wv-flex :gutter="10" style="width: 96%;margin: 0 auto;">
      <wv-flex-item @click.native="industryPickerShow = true">
        <div class="placeholder">
          <input class="trial_company weui-input" placeholder="所属行业" :value="industryType | pickerValueFilter" onfocus="this.blur();" />
          <!--<input type="text" placeholder="所在地" class="trial_company" >-->
        </div>
      </wv-flex-item>
      <wv-flex-item @click.native="scalePickerShow = true">
        <div class="placeholder"></div>
        <input class="trial_company weui-input" placeholder="公司规模" :value="scales | pickerValueFilter" onfocus="this.blur();" />
      </wv-flex-item>
    </wv-flex>
    <p style="font-size: 0.6rem;margin: 1.18rem auto 0;width: 87%">联系人信息</p>
    <!--<input type="text" placeholder="联系人姓名" class="trial_company" v-model="contact">-->
      <wv-input type="text" placeholder="联系人姓名" class="verification" v-model="contact"></wv-input>
    <wv-input placeholder="请输入手机号" class="verification" v-model="mobile">
      <button v-show="show" class="weui-vcode-btn" slot="ft" @click="trialVerification" style="font-size: 0.6rem!important;">获取验证码</button>
      <button v-show="!show" class="weui-vcode-btn" slot="ft">{{count}}s</button>
    </wv-input>
    <!--<input type="tel" placeholder="请输入验证码" class="trial_company" v-model="verification">-->
      <wv-input type="tel" placeholder="请输入验证码" class="verification" v-model="verification"></wv-input>
    <p class="trial_footer">请如实填写申请信息，我们将于1个工作日内与您取得联系</p>
    <div class="trial_button bgcolor" @click="trialApply">申请体验</div>
    <wv-picker
      :visible.sync="industryPickerShow"
      v-model="industryType"
      :columns="industryColumns"
      @confirm="confirmIndustry"
    />
    <wv-picker
      :visible.sync="scalePickerShow"
      v-model="scales"
      :columns="scaleColumns"
      @confirm="confirmScale"
    />
    </div>
  </div>
</template>
<script>
import VDistpicker from 'v-distpicker'
import { Toast } from 'we-vue'
import { postTrial, postVerification, getIndustry, getOrg, postVerify } from '../../api/api'

export default {
  components: { VDistpicker },
  data () {
    return {
      show: true,
      count: '',
      timer: null,
      companyName: '',
      companyProvince: '',
      companyCity: '',
      contact: '',
      industry: '',
      orgSize: '',
      mobile: '',
      verification: '',
      industryValue: [],
      scaleValue: [],
      industryPickerShow: false,
      scalePickerShow: false,
      industryType: [''],
      scales: [''],
      fruit: [{name: 'Apple', age: 1}],
      industryColumns: [
        {
          values: [
            ''
          ],
          defaultIndex: 2
        }
      ],
      scaleColumns: [
        {
          values: [
            ''
          ],
          defaultIndex: 2
        }
      ]
    }
  },
  mounted () {
    this.Industry()
    this.Scale()
  },
  methods: {
    onChangeProvince (province) {
      this.companyProvince = province.value
    },
    onChangeCity (city) {
      if (this.companyProvince === '台湾省') {
        city.value = '台湾'
      }
      this.companyCity = city.value
    },
    // 提交申请体验
    trialApply () {
      if (this.companyProvince === '台湾省') {
        this.companyCity = '台湾'
      }
      let params = {
        companyName: this.companyName,
        companyProvince: this.companyProvince,
        companyCity: this.companyCity,
        contact: this.contact,
        mobile: this.mobile,
        industry: null,
        industryType: this.industry,
        orgSize: this.orgSize,
        status: 0
      }
      console.log(params)
      if (this.mobile === '' || this.mobile.length < 11) {
        Toast({
          duration: 1000,
          message: '请检查手机号是否有误',
          type: 'text'
        })
      } else if (this.companyName === '' || this.contact === '' || this.companyProvince === '' || this.companyCity === '' || this.industry === '' || this.orgSize === '') {
        Toast({
          duration: 2000,
          message: '请完善所有信息',
          type: 'text'
        })
      } else {
        postVerify(this.mobile, this.verification).then((res) => {
          if (res.data === '失败') {
            Toast({
              duration: 1000,
              message: '验证码输入有误。',
              type: 'text'
            })
          } else {
            postTrial(params).then(res => {
              if (res.status === 200) {
                Toast.success('提交成功')
                this.$router.push({path: '/login'})
              }
            })
          }
        }).catch(() => {
          Toast({
            duration: 1000,
            message: '验证码验证失败。',
            type: 'text'
          })
        })
      }
    },
    // 发送验证码
    trialVerification: function () {
      let mobilePhone = this.mobile
      const TIME_COUNT = 60
      if (this.mobile === '' || this.mobile.length < 11) {
        Toast({
          duration: 1000,
          message: '请检查手机号是否有误',
          type: 'text'
        })
      } else {
        if (!this.timer) {
          this.count = TIME_COUNT
          this.show = false
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--
            } else {
              this.show = true
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000)
        }
        postVerification(mobilePhone).then(res => {
        }).catch(() => {
          Toast({
            duration: 1000,
            message: '验证码发送失败，请稍后重试。',
            type: 'text'
          })
        })
      }
    },
    confirmIndustry (picker) {
      this.industryType = picker.getValues()
      console.log(this.industryType)
      this.industry = this.industryType[0]
    },
    confirmScale (picker) {
      this.scales = picker.getValues()
      this.orgSize = this.scales[0]
      console.log(this.scales)
    },
    // 获取行业
    Industry () {
      getIndustry().then((res) => {
        res.data.map((item) => {
          this.industryColumns[0].values.push(item.name)
        })
      })
    }, // 获取行业规模
    Scale () {
      getOrg().then((res) => {
        res.data.map((item) => {
          this.scaleColumns[0].values.push(item.label)
        })
      })
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
  .wv-header .wv-header-title[data-v-a5b8d5b6]{
    font-size: 0.65rem;
  }
  .weui-toast_text .weui-toast__content[data-v-4af60de0]{
    font-size: 0.7rem;
  }
  .weui-vcode-btn{
    color: #02B6DC;
  }
  .trial_title{
    width: 80%;
    margin:auto;
    font-size: 13px;
  }
  .trial_icon{
    margin: 0 auto;
    width: 1.32rem;
    font-size: 1.32rem;
    color: #02B6DC;
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
    outline: none
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
  .trial_Prompt{
    font-size: 0.8rem;
  }
  .distpicker-address-wrapper select{
    padding: 0!important;
    width: 41% !important;
    font-size: 0.56rem!important;
    height: 1.2rem!important;
    margin-left: 0.8rem!important;
    outline: none!important;
    background-color: white!important;
    -webkit-appearance: none;
  }
</style>
