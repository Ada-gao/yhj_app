<template>
  <div class="page" style="background: #FFFFFF;position: absolute;top: 0;left: 0;right: 0;bottom: 0">
    <div class="LOGO">
      <div class="logo_img">
        <i class="iconfont icon-tonghuashijian"></i>
      </div>
    </div>
    <p class="title_one">闪电呼</p>
    <p class="title_two">快如闪电，一击即中!</p>
    <!--<wv-group>-->
      <!--<wv-input placeholder="请输入账号" v-model="account"></wv-input>-->
      <!--<wv-input placeholder="请输入密码" v-model="password"></wv-input>-->
    <!--</wv-group>-->
    <div class="user_login" style="margin-top: 8.5%">
      <i class="iconfont icon-geren11" style="color: #CECECE;float: left;font-size: 26px"></i>
        <input class="user_input" placeholder="请输入账号" v-model="account" autocapitalize="off" autocorrect="off"/>
    </div>
    <div class="user_login" style="margin-top: 4.4%">
      <i class="iconfont icon-suotou-moren" style="color: #CECECE;float: left;font-size: 26px;clear: both"></i>
      <input :type="inputType" class="pass_input" placeholder="请输入密码" v-model="password"/>
      <i v-if="asee==true" class="iconfont icon-biyan" style="color: #32CCBC;float: right;font-size: 26px" @click="iconSee"></i>
      <i v-if="asee==false" class="iconfont icon-zhengyan" style="color: #32CCBC;float: right;font-size: 26px" @click="iconSee"></i>
    </div>
    <div class="land" @click="login">
        登录
      </div>
    <div class="login_Application" @click="$router.push('/login/trial')">申请体验</div>
  </div>
</template>
<script type="es6">
import { requestLogin, getUsers } from '../../api/api'
import thumbSmall from '../../assets/images/icon_tabbar.png'
import { Dialog, Toast } from 'we-vue'

export default {
  data () {
    return {
      thumbSmall,
      account: '',
      password: '',
      asee: true,
      inputType: 'password'
    }
  },
  methods: {
    login: function () {
      let loginParams = {username: this.account, password: this.password}
      if (this.account === '' || this.password === '') {
        Toast.text({
          duration: 1000,
          message: '账号或密码不能为空！'
        })
      } else {
        requestLogin(loginParams).then(res => {
          localStorage.setItem('token', res.data.token)
          let user = localStorage.getItem('token')
          if (user) {
            getUsers().then((res) => {
              console.log(res.data.authorities[0])
              if (res.data.authorities[0].authority !== 'ROLE_SALE') {
                Toast.text({
                  duration: 1000,
                  message: '该账号没有权限!'
                })
              } else {
                this.$router.push({path: '/home'})
              }
            })
          }
        }).catch(() => {
          Dialog({message: '请检查账号或密码是否正确'})
        })
      }
    },
    iconSee: function () {
      if (this.asee === true) {
        this.asee = false
        this.inputType = 'tel'
      } else if (this.asee === false) {
        this.asee = true
        this.inputType = 'password'
      }
    }
  }
}
</script>
<style lang="scss">
 .LOGO{
   width: 2.6rem;
   height: 2.6rem;
   margin: 0 auto;
   padding: 34% 0 0;
 }
  .logo_img{
    max-width: 100%;
  }
  .title_one{
    text-align: center;
    font-size: 20px;
    font-size: 0.64rem;
    color: #A3A3A3 ;
  }
  .title_two{
    text-align: center;
    font-size: 0.64rem;
    color: #A3A3A3 ;
    margin-top: 0.48rem;
  }
  .land{
    width: 13rem;
    height: 1.76rem;
    color: white;
    text-align: center;
    line-height: 1.76rem;
    background: #32CCBC;
    border-radius: 0.2rem;
    margin: 13% auto;
    font-size: 20px;
  }
  .icon_user{
    width: 8%;
    float: left;
    padding: 10px 0;
  }
  .icon_user>img{
    max-width: 100%;
  }
  /*.weui-cell{*/
    /*padding: 10px 7px!important;*/
  /*}*/
  .user_login{
    width: 79%;
    border-bottom: 1px solid #e5e3e3;
    margin: 0 auto;
  }
  .login_Application{
    width: 100%;
    font-size: 17px;
    color: #A3A3A3;
    text-align: center;
    font-family: PingFangSC-Regular;
  }
  .user_input{
    height: 1.5rem;
    font-size: 0.6rem;
    border: 0;
    margin-left: 0.5rem;
    width: 80%;
    outline:none;
    background: #ffffff;
    outline: none;
  }
  .pass_input{
    height: 1.5rem;
    font-size: 0.6rem;
    border: 0;
    margin-left: 0.5rem;
    width: 73%;
    outline:none;
    background: #ffffff;
  }
  .user_login>div{
    float: left;
  }
  .logo_img{
    position: relative;
    height: 2.4rem;
    border: 0.04rem solid #32CCBC;
    border-radius: 50%;
  }
  .icon-tonghuashijian{
    position: absolute;
    top: -7px;
    left: 8px;
    font-size: 1.9rem;
    color: #32CCBC;
  }
 .weui-toast_text .weui-toast__content[data-v-4af60de0]{
   font-size: .6em;
 }
</style>
