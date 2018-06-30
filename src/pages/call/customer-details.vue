<template>
  <div class="page">
    <wv-header title="任务完成(15/20)" :fixed="true" background-color="#32CCBC">
      <div class="btn-back" slot="left">
        <i class="iconfont icon-fanhui" @click="$router.push('/call')"></i>
      </div>
      <div class="btn-menu" slot="right">
        <p style="font-size: 0.56rem">({{form.duration}}s)</p>
      </div>
    </wv-header>
    <wv-flex :gutter="10" style="margin-top: 2rem">
      <wv-flex-item flex="3" style="margin-top: 0.272rem">
        <div class="placeholder details_left">
          <p style="font-size: 0.56rem;color: #32CCBC;text-align: center">外呼次数
            {{form.callCount}}次，最近外呼时间：
            {{form.lastCallDate||'彗星撞地球'}}</p>
          <p style="width: 2.5rem;margin: 0 auto">
            <img :src="thumbSmall" style="max-width: 100%">
          </p>
          <p style="font-size: 0.64rem;text-align: center">{{form.contactName}}</p>
          <p class="inform">年龄：<small style="font-size: 100%;color: rgb(106, 107, 105)">
            {{form.age}}</small></p>
          <p class="inform">性别：<small style="font-size: 100%;color: rgb(106, 107, 105) ">
            {{form.genderText}}</small></p>
          <p class="inform">电话：<small style="font-size: 100%;color: rgb(106, 107, 105)">
            {{form.phoneNo}}</small></p>
        </div>
      </wv-flex-item>
      <wv-flex-item >
        <div class="placeholder details_right">
          <p class="photo_img">
            <img :src="photoImg">
          </p>
          <p class="details_phone">{{form.lastCallResult}}</p>
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
      <p class="phone_content">外呼话述：</p>
      <div class="phone_html">
        <p style="margin: 5px">{{form.salesTalk}}</p>
        <!--<textarea class="weui-cells" placeholder="" :rows="8" :show-counter="false"></textarea>-->
      </div>
      <div class="phone_button" @click="startCall">
        <small class="iconfont icon-waihuquerenxuanzhong" style="font-size: 100%;"></small>开始外呼
      </div>
    </div>
    <div class="Record" v-show="resultShow">
      <div class="Record_content">
        <div class="Record_title">外呼记录</div>
        <p class="Record_time">通话时长：2:37</p>
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
          <p @click="changeInfo">编辑</p>
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
        <div class="Result_button" @click="submitCall">提交信息</div>
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
              <div class="female">
                <input type="radio" name="gender" value="LADY" v-model="info.gender"/>
                <label for="female">女</label>
              </div>
              <div class="male">
                <input type="radio" name="gender" value="GENTLEMAN" v-model="info.gender"/>
                <label for="male">男</label>
              </div>
            </div>
          </li>
          <li>
            <p class="list_title">手机号：</p>
            <p class="list_word">
              <input class="item-input" v-model="info.phoneNo">
            </p>
          </li>
          <li>
            <p class="list_title">年龄：</p>
            <p class="list_word">
              <input class="item-input" v-model="info.age">
            </p>
          </li>
        </ul>
        <div class="information_button" @click="updateInfo">保存</div>
      </div>
    </div>
  </div>
</template>
<script>
import photoImg from '../../assets/images/photo.png'
import thumbSmall from '../../assets/images/icon_tabbar.png'
import { getCall, getRandom, getTaskHistory, updateOutboundName } from '@/api/api'
import { transformText, queryObj } from '@/utils'
// import qs from 'qs'

export default {
  data () {
    return {
      photoImg,
      thumbSmall,
      resultShow: false,
      inform: false,
      selected: '',
      from: '18221835843',
      to: '15623598264',
      form: {},
      nextStepOptions: [],
      callResult: [],
      history: {
        result: 'FOLLOW',
        status: 'CALL_AGAIN',
        actualCallStartDate: new Date('2018-06-28').getTime(),
        acutalCallEndDate: new Date().getTime(),
        outboundTaskId: ''
      },
      info: {}
    }
  },
  created () {
    this.nextStepOptions = queryObj.nextStep
    this.callResult = queryObj.callResult
    this.form = this.$route.params
    this.getRandom()

    this.form.lastCallResult = transformText(queryObj.callResult, this.form.lastCallResult)
    this.form.genderText = transformText(queryObj.gender, this.form.gender)
  },
  methods: {
    startCall () {
      // console.log(this.form.outboundNameId)
      getCall(this.form.outboundNameId).then(res => {
        // console.log(res)
        this.resultShow = true
      })
    },
    getRandom () {
      // let createTime = parseTime(new Date(), '{y}-{m}-{d}')
      getRandom().then(res => {
        this.form = res.data
        this.form.lastCallResult = transformText(queryObj.callResult, this.form.lastCallResult)
        this.form.genderText = transformText(queryObj.gender, this.form.gender)
      })
    },
    submitCall () {
      this.resultShow = false
      this.history.outboundTaskId = this.form.taskId
      let _this = this
      getTaskHistory(this.history).then(res => {
        // console.log(res)
        let data = res.data
        _this.form.lastCallResult = transformText(queryObj.callResult, data.result)
        console.log(_this.form.lastCallResult)
      })
    },
    changeInfo () {
      this.inform = true
      this.resultShow = false
      this.info = this.form
    },
    updateInfo () {
      this.inform = false
      this.resultShow = true
      let params = {
        contactName: this.info.contactName,
        gender: this.info.gender,
        phoneNo: this.info.phoneNo,
        age: this.info.age
      }
      updateOutboundName(this.info.outboundNameId, params).then(res => {
        let data = res.data
        this.form.contactName = data.contactName
        this.form.age = data.age
        this.form.phoneNo = data.phoneNo
        this.form.gender = data.gender
        this.form.genderText = transformText(queryObj.gender, this.form.gender)
      })
    }
  }
}
</script>
<style lang="scss">
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
    margin: 0.272rem 0 ;
    border-radius: 0.1rem;
  }
  .inform{
    width: 50%;
    font-size: 0.56rem;
    /* padding-left: 3.38rem; */
    margin: 0.42rem auto 0;
  }
  .photo_img{
    width: 0.88rem;
    margin: 0 auto;
  }
  .photo_img>img{
    max-width: 100%;
  }
  .icon_ju{
    width: 0.88rem;
    margin: 0 auto;
    font-size: 0.85rem;
    color: #CF2828;

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
  }
  .phone_details{
    width: 100%;
    height: 10.34rem;
    background: #FFFFFF;
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
    margin: 0.38rem auto;
  }
  .phone_button{
    width: 90%;
    margin: 0.76rem auto 0;
    height: 1.64rem;
    background: #32CCBC ;
    border-radius: 0.2rem;
    font-size: 0.62rem;
    text-align: center;
    line-height: 1.64rem;
    color: #FFFFFF ;
  }
  .Record,.information{
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
    max-width: 300px;
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
    height: 10.34rem;
    background: #ffffff;
    border-radius: 0.2rem;
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
    color: #32CCBC;
    margin-top: 0.36rem;
  }
  .Result_select{
    width: 80%;
    border: 1px solid #ccc;
    // height: 0.8rem;
    // border-radius: 0.2rem;
    outline: none;
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
    background: #32CCBC ;
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
  }
  .Result_button{
    width: 87%;
    height: 1.6rem;
    margin: 1.26rem auto 0;
    line-height:1.6rem;
    background: #32CCBC;
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
    background: #32CCBC;
    font-size: 0.64rem;
    text-align: center;
    border-radius: 0.1rem;
    color: #ffffff;
    margin: 1rem auto 0;
  }
  input[type="radio"] {
    // content: "\a0"; /*不换行空格*/
    // display: inline-block;
    // vertical-align: middle;
    font-size: 14px;
    // width: 1em;
    // height: 1em;
    margin-right: .4em;
    // border-radius: 50%;
    // border: 1px solid #32CCBC;
    // text-indent: .15em;
    line-height: 1;
    // margin-right: 5px;
  }
  input[type="radio"]:checked {
    background-color: #32CCBC;
    background-clip: content-box;
    padding: .2em;
  }
  input[type="radio"] {
    // position: absolute;
    clip: rect(0, 0, 0, 0);
  }
  .female,.male{
    // float: left;
    width: 40%;
    display: inline-block;
  }
</style>
