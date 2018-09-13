<template>
  <div class="page" style="background: #858585">
    <div class="login_bgimg"></div>
    <div class="login_content">
      <img class="logoImg" :src="logoSrc" alt="">
      <!-- <img class="logoImg" src="@/assets/images/login_logo.png" alt=""> -->
      <p class="logoText">快如闪电，一击即中</p>
      <div class="user_account">
        <div class="user_login user_user ignore">
          <i class="iconfont icon-zhanghao login_icon"></i>
          <input class="user_input" placeholder="请输入账号" v-model="account" autocapitalize="off" autocorrect="off"/>
        </div>
        <div class="user_login" style="margin-top: 4.4%">
          <i class="iconfont icon-mima login_icon"></i>
          <input :type="inputType" class="pass_input" placeholder="请输入密码" v-model="password"/>
          <i v-if="asee==true" class="iconfont icon-yincang login_iconright" @click="iconSee"></i>
          <i v-if="asee==false" class="iconfont icon-yincang1 login_iconright" @click="iconSee"></i>
        </div>
        <wv-button class="land" @click="login" :is-loading="isLoading">登录</wv-button>
      </div>
      <div class="login_Application" @click="$router.push('/login/trial')">申请体验</div>
    </div>
    <!--<div class="LOGO">-->
      <!--<div class="logo_img">-->
        <!--<i class="iconfont icon-tonghuashijian"></i>-->
      <!--</div>-->
    <!--</div>-->
    <!--<p class="title_one appcolor">闪电呼</p>-->
    <!--<p class="title_two appcolor">快如闪电，一击即中!</p>-->
    <!--&lt;!&ndash;<wv-group>&ndash;&gt;-->
      <!--&lt;!&ndash;<wv-input placeholder="请输入账号" v-model="account"></wv-input>&ndash;&gt;-->
      <!--&lt;!&ndash;<wv-input placeholder="请输入密码" v-model="password"></wv-input>&ndash;&gt;-->
    <!--&lt;!&ndash;</wv-group>&ndash;&gt;-->
    <!--<div class="user_login" style="margin-top: 8.5%">-->
      <!--<i class="iconfont icon-geren11" style="color: #CECECE;float: left;font-size: 26px"></i>-->
        <!--<input class="user_input" placeholder="请输入账号" v-model="account" autocapitalize="off" autocorrect="off"/>-->
    <!--</div>-->
    <!--<div class="user_login" style="margin-top: 4.4%">-->
      <!--<i class="iconfont icon-suotou-moren" style="color: #CECECE;float: left;font-size: 26px;clear: both"></i>-->
      <!--<input :type="inputType" class="pass_input" placeholder="请输入密码" v-model="password"/>-->
      <!--<i v-if="asee==true" class="iconfont icon-biyan" style="color: #02B6DC;float: right;font-size: 26px" @click="iconSee"></i>-->
      <!--<i v-if="asee==false" class="iconfont icon-zhengyan" style="color: #02B6DC;float: right;font-size: 26px" @click="iconSee"></i>-->
    <!--</div>-->
    <!--<div class="land bgcolor" @click="login">-->
        <!--登录-->
      <!--</div>-->
    <!--<div class="login_Application" @click="$router.push('/login/trial')">申请体验</div>-->
  </div>
</template>
<script>
import { requestLogin, getUsers } from '../../api/api'
// import thumbSmall from '../../assets/images/background image.jpg'
import logoSrc from '../../assets/images/login_logo.png'
import { Toast } from 'we-vue'

export default {
  data () {
    return {
      detailsreturn: false,
      account: '',
      password: '',
      asee: true,
      inputType: 'password',
      isLoading: false,
      logoSrc,
      logoSrc1: 'static/images/login_logo.png'
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
          this.isLoading = true
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
                this.isLoading = false
              }
            })
          }
        }).catch(() => {
          Toast.text({
            duration: 1000,
            message: '请检查账号或密码是否有误'
          })
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
  .login_bgimg{
    width: 100%;
    background: url('../../assets/images/bgimage.jpg') center center no-repeat;
    background-size: cover;
    position: absolute;
    top: 0;
    bottom: 0;
  }
  .login_content{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    background: #00000066;
    padding-left: 52px;
    padding-right: 52px;
    box-sizing: border-box;
    input::-webkit-input-placeholder {
      color: #DADADA;
    }
    .logoImg {
      width: 87px;
      margin-top: 162px;
      margin-left: 50%;
      transform: translateX(-50%);
    }
    .logoText {
      color: #DADADA;
      text-align: center;
      font-weight: lighter;
    }
  }
  .login_title{
    font-size: 30px;
    color: #EAEAEA;
    margin-top: 293px;
  }
  .user_user{
    // padding-top: 492px;
    padding-top: 198px;
  }
//  .LOGO{
//    width: 2.6rem;
//    height: 2.6rem;
//    margin: 0 auto;
//    padding: 34% 0 0;
//  }
//   .logo_img{
//     max-width: 100%;
//   }
  // .title_one{
  //   text-align: center;
  //   font-size: 20px;
  //   font-size: 0.64rem;
  // }
  // .title_two{
  //   text-align: center;
  //   font-size: 0.64rem;
  //   margin-top: 0.48rem;
  // }
  .land{
    // width: 90%!important;
    height: 88px;
    color: #FFFFFF;;
    text-align: center;
    line-height: 88px;
    border-radius: 4px;
    margin: 100px auto 0;
    font-size: 36px;
    background: #3772E5;
  }
  .icon_user{
    width: 8%;
    float: left;
    padding: 10px 0;
  }
  .icon_user>img{
    max-width: 100%;
  }
  .login_iconright{
    color: #DADADA;
    // float: right;
    font-size: 30px
  }
  .login_icon{
    color: #CECECE;
    // float: left;
    font-size: 40px
  }
  /*.weui-cell{*/
    /*padding: 10px 7px!important;*/
  /*}*/
  .user_login{
    // width: 79%;
    border-bottom: 1px solid #cecece;
    // margin: 0 auto;
  }
  .login_Application{
    /*position: fixed;*/
    margin: 180px auto 0;
    width: 90%;
    font-size: 28px;
    color: #DADADA;
    text-align: right;
    font-family: PingFangSC-Regular;
  }
  .user_input{
    height: 80px;
    font-size: 32px;
    border: 0;
    margin-left: 24px;
    width: 80%;
    background: rgba(140, 140, 140, 0);
    outline: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    color: #fff;
  }
  .pass_input{
    height: 80px;
    font-size: 32px;
    border: 0;
    margin-left: 24px;
    width: 73%;
    outline:none;
    background: rgba(140, 140, 140, 0);
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    color: #fff;
  }
  input::-webkit-input-placeholder{
    font-size: 32px;
    color: #cecece;
    font-weight: 100;
  }
  .user_login>div{
    float: left;
  }
  // .logo_img{
  //   position: relative;
  //   height: 2.4rem;
  //   border: 0.04rem solid #02B6DC;
  //   border-radius: 50%;
  // }
  // .icon-tonghuashijian{
  //   position: absolute;
  //   top: -7px;
  //   left: 8px;
  //   font-size: 1.9rem;
  //   color: #02B6DC;
  // }
   .weui-toast_text .weui-toast__content[data-v-4af60de0]{
     font-size: 26px;
   }
</style>
