<template>
  <div class="page">
    <div class="page__hd">
      <h1 class="page__title">云呼叫</h1>
    </div>

    <wv-search-bar placeholder="搜索客户" v-model="keyword" :result="filterResult">
      <wv-group v-show="keyword">
        <wv-cell v-for="customer in filterResult" :key="customer.name" :title="title(customer.name, customer.mobile)" >
          <i class="icon-scrollvertical iconfont"  slot="icon"/>
        </wv-cell>
      </wv-group>
    </wv-search-bar>

    <wv-group :title="title(user.name, user.mobile)" v-for="user in users" :key="user.id">
      <wv-cell v-for="customer in user.customers" :key="customer.name" v-on:click='triggerCall(user, customer)' class="cell-big-thumb">
        <div slot="icon" style="position: relative;margin-right: 10px;">
          <img :src="thumb" style="width: 50px; height: 50px;display: block">
        </div>
        <template slot="bd">
          <p>{{ customer.name }}</p>
          <p style="font-size: 13px;color: #888888;">VIP客户({{ mobileTail(customer.mobile) }})</p>
        </template>
      </wv-cell>
    </wv-group>

    <wv-popup :visible.sync="popupVisible" height="100%">
      <div class="container">
       <img :src="thumb" class="round">
       <div class="text-gradient">请先接听来电，随后将自动呼叫对方</div>
       <div class="callend">
         <img :src="callEnd"  class="callimg" v-on:click='popupVisible = false'>
       </div>
      </div>
    </wv-popup>
    <wv-footer class="footer-copyright" text="Copyright © 2018 上海甦翔投资咨询有限公司"/>
  </div>
</template>

<script>
import logoImg from '../assets/images/logo.png'
// import axios from 'axios'
import thumb from '../assets/images/eythumb.png'
import callEnd from '../assets/images/ic_call_end.png'

export default {
  data () {
    return {
      logoImg,
      users: [],
      keyword: '',
      popupVisible: false,
      thumb,
      callEnd
    }
  },
  methods: {
    triggerCall: function (callFrom, callTo) {
      console.log('Call customer:')
      console.log(callTo)
      // let vm = this
      // vm.popupVisible = true
      // axios.get('/api/call/' + callFrom.mobile + '/' + callTo.mobile)
      //   .then(function (response) {
      //     console.log(response)
      //   })
      //   .catch(function (error) {
      //     console.log(error)
      //   })
    },
    title: function (name, mobile) {
      return name + '(' + this.mobileTail(mobile) + ')'
    },
    mobileTail: function (mobile) {
      if (mobile.length >= 11) {
        mobile = mobile.substring(mobile.length - 4, mobile.length)
      }
      return mobile
    }
  },
  created: function () {
    // var vm = this
    // axios.get('/api/users')
    //   .then(function (response) {
    //     vm.users = response.data
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //   })
  },
  mounted () {
  },
  computed: {
    filterResult () {
      var allCustomers = []
      this.users.map(user => {
        allCustomers = allCustomers.concat(user.customers)
      })
      return allCustomers.filter(value => new RegExp(this.keyword, 'i').test(value.name))
    }
  }
}
</script>

<style scoped lang="scss">
  .logo {
    display: block;
    margin: 0 auto;
    width: 75px;
  }

  .page__hd {
    padding: 25px;

    .page__title {
      text-align: center;
      font-size: 20px;
      font-weight: 400;
    }
  }

  .page {
    margin-bottom: 0;
  }

  .cell-icon {
    display: block;
    margin-right: 5px;
    color: #2196f3;
    overflow: hidden;
    font-size: 20px;
    width: 25px;
    text-align: center;
  }

  .container {
    text-align: center;
  }
  .callend {
    display: block;
    position: absolute;
    bottom: 20px;
    margin: 0;
    padding: 0;
    width: 100%
  }
  .round {
    border-radius: 50%;
    border: 2px solid #73AD21;
    width: 150px;
    height: 150px;
    margin-top: 40px;
  }
  .callimg {
    border-radius: 50%;
    border: 2px solid #d81e06;
    padding:20px;
    width:50px;
  }
  .fixed {
    display: block;
    width: 50px;
    height: 50px;
    margin-left: auto;
    margin-right:auto;
  }

  .text-gradient {
    position: relative;
    z-index:2;
    display: inline-block;
    color: black;
    font-size: 20px;
    background-image: -webkit-linear-gradient(left, #147B96, #E6D205 25%, #147B96 50%, #E6D205 75%, #147B96);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-background-size: 200% 100%;
    -webkit-animation: masked-animation 2s infinite linear;
  }
  @-webkit-keyframes masked-animation {
    0% { background-position: 0 0;}
    100% { background-position: -100% 0;}
  }

  img {
    margin-left: auto;
    margin-right:auto;
    display:block;
  }
</style>
