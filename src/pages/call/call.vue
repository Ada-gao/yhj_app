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
            <div class="placeholder iconfont icon-fanhui place" @click="getPrevday"></div>
          </wv-flex-item>
          <wv-flex-item flex="5">
            <div class="placeholder call_year">{{ dateTime | moment('YYYY年MM月DD日')}}</div>
          </wv-flex-item>
          <wv-flex-item flex="3">
            <div class="placeholder iconfont icon-fanhui icon_jian place" @click="getNetday"></div>
          </wv-flex-item>
        </wv-flex>
        <div class="call_nav">
          <p @click="completeShow" ref="complete" class="call_complete">未完成 (29)</p>
          <p @click="notShow" ref="not" class="not">已完成 (30)</p>
        </div>
      </div>
    </div>
      <div class="page-infinite-wrapper" v-show="content==false">
        <wv-group title="" infinite-scroll-distance="50">
          <wv-cell-swipe title="小阿西未完成" is-link to="/call/details-y"></wv-cell-swipe>
          <wv-cell-swipe title="小阿西" is-link to="/call/details-y"></wv-cell-swipe>
          <wv-cell-swipe title="小阿西" is-link to="/call/details-y"></wv-cell-swipe>
          <wv-cell-swipe title="小阿西" is-link to="/call/details-y"></wv-cell-swipe>
          <wv-cell-swipe title="小阿西" is-link to="/call/details-y"></wv-cell-swipe>
          <wv-cell-swipe title="小阿西" is-link to="/call/details-y"></wv-cell-swipe>
          <wv-cell-swipe title="小阿西" is-link to="/call/details-y"></wv-cell-swipe>
          <wv-cell-swipe title="小阿西" is-link to="/call/details-y"></wv-cell-swipe>
          <wv-cell-swipe title="小阿西" is-link to="/call/details-y"></wv-cell-swipe>
          <wv-cell-swipe title="小阿西" is-link to="/call/details-y"></wv-cell-swipe>
          <wv-cell-swipe title="小阿西" is-link to="/call/details-y"></wv-cell-swipe>
        </wv-group>
        <p class="loading-tips">
          <wv-spinner type="snake" color="#444" :size="24"></wv-spinner>
        </p>
      </div>

      <div class="page-infinite-wrapper" v-show="content==true">
        <wv-group title="" infinite-scroll-distance="50">
          <wv-cell-swipe title="小阿西已完成" is-link to="/call/details-y"></wv-cell-swipe>
          <wv-cell-swipe title="小阿西" is-link to="/call/details-y"></wv-cell-swipe>
          <wv-cell-swipe title="小阿西" is-link to="/call/details-y"></wv-cell-swipe>
          <wv-cell-swipe title="小阿西" is-link to="/call/details-y"></wv-cell-swipe>
          <wv-cell-swipe title="小阿西" is-link to="/call/details-y"></wv-cell-swipe>
          <wv-cell-swipe title="小阿西" is-link to="/call/details-y"></wv-cell-swipe>
          <wv-cell-swipe title="小阿西" is-link to="/call/details-y"></wv-cell-swipe>
          <wv-cell-swipe title="小阿西" is-link to="/call/details-y"></wv-cell-swipe>
          <wv-cell-swipe title="小阿西" is-link to="/call/details-y"></wv-cell-swipe>
          <wv-cell-swipe title="小阿西" is-link to="/call/details-y"></wv-cell-swipe>
          <wv-cell-swipe title="小阿西" is-link to="/call/details-y"></wv-cell-swipe>
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
      content: false,
      guigeSpan: '-1',
      perDiv: null,
      dateTime: '',
      Date: new Date()
      // moment
      // not: true
    }
  },
  methods: {
    completeShow () {
      this.content = false
      this.$refs.complete.style.background = '#32CCBC'
      this.$refs.complete.style.color = ''
      this.$refs.not.style.color = '#b7b7b7'
      this.$refs.not.style.background = '#FFFFFF'
    },
    notShow () {
      this.content = true
      this.$refs.complete.style.background = '#FFFFFF'
      this.$refs.complete.style.color = '#b7b7b7'
      this.$refs.not.style.color = '#FFFFFF'
      this.$refs.not.style.background = '#32CCBC'
    },
    time () {
      var nowdate = this.Date
      var y = nowdate.getFullYear()
      var m = nowdate.getMonth() + 1
      var d = nowdate.getDate()
      if (m < 10) {
        m = '0' + m
      }
      if (d < 10) {
        d = '0' + d
      }
      this.dateTime = y + '-' + m + '-' + d
    },
    getNetday () {
      let str = this.dateTime
      let times = this.Date
      var a = times.getFullYear()
      var b = times.getMonth() + 1
      var c = times.getDate()
      if (b < 10) {
        b = '0' + b
      }
      if (c < 10) {
        c = '0' + c
      }
      times = a + '-' + b + '-' + c
      if (this.dateTime === times) {
      } else {
        str = new Date(str)
        str = +str + 1000 * 60 * 60 * 24
        str = new Date(str)
        var y = str.getFullYear()
        var m = str.getMonth() + 1
        var d = str.getDate()
        if (m < 10) {
          m = '0' + m
        }
        if (d < 10) {
          d = '0' + d
        }
        this.dateTime = y + '-' + m + '-' + d
      }
    },
    getPrevday () {
      let str = this.dateTime
      var year = str.substring(0, 4)
      var month = str.substring(5, 7)
      var day = str.substring(8, 10)
      var today = new Date(year, month - 1, day)
      var milliseconds = today.getTime() - 1000 * 60 * 60 * 24
      var yesterday = new Date()
      yesterday.setTime(milliseconds)
      var strYear = yesterday.getFullYear()
      var strDay = yesterday.getDate()
      var strMonth = yesterday.getMonth() + 1
      if (strMonth < 10) {
        strMonth = '0' + strMonth
      }
      if (strDay < 10) {
        strDay = '0' + strDay
      }
      this.dateTime = strYear + '-' + strMonth + '-' + strDay
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
    this.time()
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

<style lang="scss">
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
  .call_complete{
    background: #32CCBC;
    border-radius: 3px;
    color: white
  }
  .not{
    border-radius: 3px;
  }
  .call_year{
    font-size: 0.56rem;
    text-align: center;
  }
  .place{
    width: 22%;
    margin: 0 auto;
    color: #32CCBC;
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
