<template>
  <div class="page">
    <wv-header title="任务列表" :fixed="true" background-color="#32CCBC">
      <div class="btn-back" slot="left">
        <i class="iconfont icon-fanhui" @click="$router.push('/')"></i>
      </div>
    </wv-header>
    <div class="call_content">
      <div class="call_time">
        <wv-flex :gutter="10">
          <wv-flex-item flex="3">
            <div class="placeholder iconfont icon-fanhui place"></div>
          </wv-flex-item>
          <wv-flex-item flex="5">
            <div class="placeholder call_year">2018年6月20日</div>
          </wv-flex-item>
          <wv-flex-item flex="3">
            <div class="placeholder iconfont icon-fanhui icon_jian place"></div>
          </wv-flex-item>
        </wv-flex>
        <div class="call_nav">
          <p style="background: #32CCBC;border-radius: 3px;color: white">未完成 (29)</p>
          <p>已完成 (30)</p>
        </div>
      </div>
    </div>

    <div class="page-infinite-wrapper" ref="wrapper">
      <wv-group title="" infinite-scroll-distance="50">
        <wv-cell-swipe title="小阿西" is-link to="/details-y"></wv-cell-swipe>
        <wv-cell-swipe title="小阿西" is-link to="/details-y"></wv-cell-swipe>
        <wv-cell-swipe title="小阿西" is-link to="/details-y"></wv-cell-swipe>
        <wv-cell-swipe title="小阿西" is-link to="/details-y"></wv-cell-swipe>
        <wv-cell-swipe title="小阿西" is-link to="/details-y"></wv-cell-swipe>
        <wv-cell-swipe title="小阿西" is-link to="/details-y"></wv-cell-swipe>
        <wv-cell-swipe title="小阿西" is-link to="/details-y"></wv-cell-swipe>
        <wv-cell-swipe title="小阿西" is-link to="/details-y"></wv-cell-swipe>
        <wv-cell-swipe title="小阿西" is-link to="/details-y"></wv-cell-swipe>
        <wv-cell-swipe title="小阿西" is-link to="/details-y"></wv-cell-swipe>
        <wv-cell-swipe title="小阿西" is-link to="/details-y"></wv-cell-swipe>
      </wv-group>
      <p class="loading-tips">
        <wv-spinner type="snake" color="#444" :size="24"></wv-spinner>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  /*  triggerCall: function (callFrom, callTo) {
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
    } */
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
  /*  filterResult () {
      var allCustomers = []
      this.users.map(user => {
        allCustomers = allCustomers.concat(user.customers)
      })
      return allCustomers.filter(value => new RegExp(this.keyword, 'i').test(value.name))
    } */
  }
}
</script>

<style scoped lang="scss">
  .call_content{
    margin-top: 2rem;
  }
  .call_time{
    height: 4.24rem;
    width: 100%;
    background: #FFFFFF;
    /*position: absolute;*/
    /*top: 1.8rem;*/
    padding-top: 0.8rem;
  }
  .icon_jian{
    color:#32CCBC;
    transform:rotate(180deg);
    -ms-transform:rotate(180deg);
    -moz-transform:rotate(180deg);
    -webkit-transform:rotate(180deg);
    -o-transform:rotate(180deg);
  }
  .call_year{
    font-size: 0.56rem;
    text-align: center;
  }
  .place{
    width: 22%;
    margin: 0 auto;
  }
  .call_nav{
    width: 66%;
    height: 1.064rem;
    margin: 1.16rem auto 0;
    line-height: 1.064rem;
    border: 1px solid gainsboro;
    border-radius: 4px;
    color: gray;
  }
  .call_nav>p{
    width: 50%;
    text-align: center;
    font-size: 0.48rem;
    float: left;
  }
</style>
