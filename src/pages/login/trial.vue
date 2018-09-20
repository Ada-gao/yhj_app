<template>
  <div class="page">
    <wv-header class="x-header" title="申请体验" background-color="white" style="color:#02B6DC;">
      <div class="btn-back header_left" slot="left">
        <i class="iconfont icon-fanhui size_i" @click="$router.push('/')" style="color:#959292"></i>
      </div>
    </wv-header>
    <div class="wv-content x-wrapper">
      <div class="trial_nav bgcolor">
        <div class="trial_title">
          我们提供免费体验活动，您可以在此提交申请。申
          请成功后，将由我们专属服务人员为你安排预约。
        </div>
        <wv-flex :gutter="10">
          <wv-flex-item>
            <div class="placeholder trial_icon iconfont icon-chanpinzhanshi"></div>
            <div class="placeholder trial_text">产品展示</div>
          </wv-flex-item>
          <wv-flex-item>
            <div class="placeholder trial_icon iconfont icon-chanpinpeizhi"></div>
            <div class="placeholder trial_text">产品配置</div>
          </wv-flex-item>
          <wv-flex-item>
            <div class="placeholder trial_icon iconfont icon-mianfei"></div>
            <div class="placeholder trial_text">免费体验</div>
          </wv-flex-item>
        </wv-flex>
      </div>
      <div class="trial_info bgcolor">
        <p class="company_title">公司信息</p>
        <div class="info_list">
          <input placeholder="请输入公司名称" class="input_size" v-model="companyName" maxlength="20" />
        </div>
        <wv-flex-item @click.native="addressPickerShow = true">
          <div class="placeholder info_list">
            <input class="weui-input input_size" placeholder="请选择公司所在地" :value="address | pickerValueFilter" onfocus="this.blur();" />
            <p class="iconfont icon-fanhui icon_right info_icon"></p>
          </div>
        </wv-flex-item>
        <wv-flex-item @click.native="industryPickerShow = true">
          <div class="placeholder info_list">
            <input class="weui-input input_size" placeholder="请选择所属行业" :value="industryType | pickerValueFilter" onfocus="this.blur();" />
            <p class="iconfont icon-fanhui icon_right info_icon"></p>
          </div>
        </wv-flex-item>
        <wv-flex-item @click.native="scalePickerShow = true" >
          <div class="placeholder info_list">
            <input class="weui-input input_size" placeholder="请选择公司规模" :value="scales | pickerValueFilter" onfocus="this.blur();"/>
            <p class="iconfont icon-fanhui icon_right info_icon"></p>
          </div>
        </wv-flex-item>
      </div>
      <div></div>
      <div class="trial_verification bgcolor">
        <p class="company_title">联系人信息</p>
        <div class="info_list">
          <input placeholder="请输入联系人姓名" class="input_size" v-model="contact" maxlength="10" />
          <!--<p class="iconfont icon-fanhui icon_right info_icon"></p>-->
        </div>
        <div class="info_list">
          <input type="tel" placeholder="请输入联系人电话" class="input_size" v-model="mobile" maxlength="11"/>
          <!--<p class="iconfont icon-fanhui icon_right info_icon"></p>-->
        </div>
        <div class="info_lists">
          <input type="tel" placeholder="输入验证码" class="input_size" v-model="verification" />
          <button v-show="show" class="weui-vcode-btn" slot="ft" @click="trialVerification">获取验证码</button>
          <button v-show="!show" class="weui-vcode-btn" slot="ft">{{count}}s</button>
        </div>
      </div>
    <div class="trial_button" @click="trialApply">申请体验</div>
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
      <wv-picker
        :visible.sync="addressPickerShow"
        v-model="address"
        ref="addressPicker"
        :columns="addressColumns"
        :visible-item-count="5"
        @change="onAddressChange"
        @confirm="confirmAddress"
      />
    </div>
  </div>
</template>
<script>
import VDistpicker from 'v-distpicker'
import { Toast } from 'we-vue'
import { postTrial, postVerification, getIndustry, getOrg, postVerify } from '../../api/api'
import chinaAreaData from 'china-area-data'
const provinces = Object.values(chinaAreaData[86])
// 获取某一省下的市
const getCities = (province) => {
  let provinceCode
  for (let i in chinaAreaData[86]) {
    if (province === chinaAreaData[86][i]) {
      provinceCode = i
      break
    }
  }
  return typeof chinaAreaData[provinceCode] === 'object' ? Object.values(chinaAreaData[provinceCode]) : []
}

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
      addressPickerShow: false,
      industryType: [''],
      scales: [''],
      address: [],
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
      ],
      addressColumns: [
        {
          values: provinces
        },
        {
          values: getCities('北京市')
        }
      ]
    }
  },
  mounted () {
    this.Industry()
    this.Scale()
  },
  methods: {
    onAddressChange (picker, addressValues, slotIndex) {
      if (slotIndex === 0) {
        let cities = getCities(addressValues[0])
        console.log(cities)
        if (addressValues[0] === '台湾省') {
          cities = ['市辖区']
        }
        picker.setColumnValues(1, cities)
      }
    },
    confirmAddress (picker) {
      this.address = picker.getValues()
      this.companyProvince = this.address[0]
      // console.log(this.companyProvince)
      this.companyCity = this.address[1]
    },
    trialApply () {
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
      this.industry = this.industryType[0]
    },
    confirmScale (picker) {
      this.scales = picker.getValues()
      this.orgSize = this.scales[0]
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

<style lang="scss" scoped>
  .wv-header .wv-header-title[data-v-a5b8d5b6]{
    font-size: 36px;
    // font-size: 0.65rem;
  }
  .weui-cell{
    padding: 0 !important;
  }
  /*.weui-toast_text .weui-toast__content[data-v-4af60de0]{*/
    /*font-size: 0.7rem;*/
  /*}*/
  .weui-vcode-btn{
    width: 29%;
    height: 48px;
    line-height: 48px;
    border: 1px solid #3772E5;
    color: #3772E5;
    margin-top: 33px;
    border-radius: 6px;
    font-size: 28px;
  }
  .trial_nav{
    width: 100%;
    height: 282px;
    padding-top: 39px;
  }
  .trial_title{
    width: 85%;
    margin:auto;
    font-size: 28px;
  }
  .trial_icon{
    margin: 0 auto;
    width: 33%;
    font-size: 75px;
    color: #3772E5;
  }
  .trial_text{
    font-size: 24px;
    text-align: center;
  }
  .trial_info{
    width: 100%;
    height: 550px;
    margin-top: 20px;
  }
  .company_title{
    font-size: 32px;
    padding: 40px 0 0 41px;
  }
  .info_list,.info_lists{
    width: 85%;
    height: 109px;
    margin: 0 auto;
    border-bottom: 1px solid #E9E9E9; /*no*/
    line-height: 109px;
  }
  .info_lists>button{
    float: left;
  }
  .info_lists>input{
    display: inline-block;
    float: left;
    width: 69%;
    height: 101px;
    line-height: 101px;
  }
  .input_size{
    font-size: 28px;
    border: 0 !important;
    outline: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  input::-webkit-input-placeholder{
    color: #E9E9E9;
  }
  .info_list>input{
    display: inline-block;
    float: left;
    width: 88%;
    height: 54px;
    margin-top: 32px;
    line-height: 54px;
  }
  .info_list>p{
    float: left;
    width: 10%;
  }
  .info_icon{
    font-size: 30px;
    color: #E9E9E9;
  }
  .trial_verification{
    width: 100%;
    height: 440px;
    margin-top: 20px;
    box-shadow:6px 4px 20px rgba(219,219,219,0.3)
  }
  .trial_button{
    width: 90%;
    margin: 40px auto 39px;
    height: 88px;
    color: white;
    text-align: center;
    line-height: 88px;
    font-size: 36px;
    border-radius: 6px;
    background: linear-gradient(to right, #5d90f4 , #2f6be2);
    box-shadow:0px 7px 29px 1px rgba(13,67,173,0.3);
  }
  .distpicker-address-wrapper select{
    padding: 0!important;
    width: 49% !important;
    font-size: 28px!important;
    height: 101px!important;
    outline: none!important;
    background-color: white!important;
    -webkit-appearance: none;
    border: 0!important;
    border-bottom: 1px solid #E9E9E9!important;
  }
</style>
