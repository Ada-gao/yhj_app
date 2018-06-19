<template>
  <div class="page">
    <div class="LOGO">
      <img :src="thumbSmall" class="logo_img">
    </div>
    <p class="title_one">闪 电 呼</p>
    <p class="title_two">快如闪电，一击即中</p>
    <wv-group>
      <wv-input placeholder="请输入账号" v-model="account"></wv-input>
      <wv-input placeholder="请输入密码" v-model="password"></wv-input>
    </wv-group>
    <router-link to="/profile">
    <wv-button type="warn" class="land" @click="login">
        登陆
      </wv-button>
    </router-link>
  </div>
</template>
<script>
import { requestLogin } from '../api/api'
import thumbSmall from '../assets/images/icon_tabbar.png'
export default{
  data () {
    return {
      thumbSmall,
      account: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      let loginParams = {username: this.account, password: this.password}
      requestLogin(loginParams).then(res => {
        console.log(res.data.token)
        localStorage.setItem('token', res.data.token)
        this.$router.push({path: '/home'})
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
<style scoped lang="scss">
 .LOGO{
   width: 14%;
   height: 20%;
   margin: 0 auto;
   padding: 34% 0 0;
 }
  .logo_img{
    max-width: 100%;
  }
  .title_one{
    text-align: center;
    font-size: 20px;
  }
  .title_two{
    text-align: center;
  }
</style>
