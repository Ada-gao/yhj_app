<template>
  <div class="page">
    <wv-header title="任务列表" :fixed="false" background-color="#32CCBC" class="x-header">
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
            <div class="placeholder call_year">{{ createTime | moment('YYYY年MM月DD日')}}</div>
          </wv-flex-item>
          <wv-flex-item flex="3">
            <div class="placeholder iconfont icon-fanhui icon_jian place" @click="getNetday"></div>
          </wv-flex-item>
        </wv-flex>
        <div class="call_nav">
          <p :class="{'active-tab': type==='dnf'}" @click="handleHand" class="tab-item">未完成 ({{handTotal}})</p>
          <p :class="{'active-tab': type==='finish'}" @click="handleFinish" class="tab-item">已完成 ({{finishTotal}})</p>
        </div>
      </div>
    </div>
    <div class="page-infinite-wrapper" v-show="content==false">
      <wv-group title="">
        <wv-cell-swipe :title="item.contactName" is-link
          v-for="(item, index) in hList"
          :key="index"
          to="/call/details-y">
        </wv-cell-swipe>
        <div v-infinite-scroll="loadMore1" infinite-scroll-disabled="busy" infinite-scroll-distance="50">
          ...
        </div>
      </wv-group>
      <p class="loading-tips" v-show="floading" style="text-align: center">
        <wv-spinner type="snake" color="#444" :size="24"></wv-spinner>
      </p>
    </div>

    <div class="page-infinite-wrapper" v-show="content==true">
      <wv-group title="">
        <wv-cell-swipe :title="item.contactName" is-link
          v-for="(item, index) in fList"
          :key="index"
          :to="{name: 'details-y', params: item}">
        </wv-cell-swipe>
        <div v-infinite-scroll="loadMore2" infinite-scroll-disabled="busy2" infinite-scroll-distance="50">
          ...
        </div>
      </wv-group>
      <p class="loading-tips" v-show="floading" style="text-align: center">
        <wv-spinner type="snake" color="#444" :size="24"></wv-spinner>
      </p>
    </div>
  </div>
</template>
<script>
import { getTaskList } from '@/api/api'

export default {
  data () {
    return {
      content: false,
      guigeSpan: '-1',
      perDiv: null,
      createTime: '2018-06-28',
      Date: new Date(),
      type: 'dnf',
      handTotal: 0,
      finishTotal: 0,
      hList: [],
      fList: [],
      floading: false,
      busy: false,
      busy2: true,
      listQuery1: {
        pageIndex: 0,
        pageSize: 10,
        createTime: '2018-06-28'
      },
      listQuery2: {
        pageIndex: 0,
        pageSize: 10,
        createTime: '2018-06-28'
      }
    }
  },
  methods: {
    getList1 (flag) {
      console.log('这是未完成')
      this.floading = true
      getTaskList(this.type, this.listQuery1).then(res => {
        let data = res.data.content
        if (flag) {
          // 多次加载
          this.hList = this.hList.concat(data)
          if (data.length === 0) {
            this.busy = true
          } else {
            this.busy = false
          }
        } else {
          this.hList = data
          this.handTotal = res.data.totalElements
        }
        this.floading = false
      })
    },
    getList2 (flag, type) {
      console.log('这是已完成')
      this.floading = true
      type = type || this.type
      getTaskList(type, this.listQuery2).then(res => {
        let data = res.data.content
        if (flag) {
          // 多次加载
          this.fList = this.fList.concat(data)
          if (data.length === 0) {
            this.busy2 = true
          } else {
            this.busy2 = false
          }
        } else {
          this.fList = data
          this.finishTotal = res.data.totalElements
        }
        this.floading = false
      })
    },
    loadMore1 () {
      console.log('这是未完成加载')
      this.busy = false
      this.listQuery1.pageIndex++
      this.getList1(true)
    },
    loadMore2 () {
      console.log('这是已完成加载')
      this.busy2 = false
      this.listQuery2.pageIndex++
      this.getList2(true)
    },
    handleHand () {
      this.type = 'dnf'
      this.content = false
      this.listQuery1.pageIndex = 0
      this.busy2 = true
      this.busy = false
      this.getList1()
    },
    handleFinish () {
      this.type = 'finish'
      this.content = true
      this.busy2 = false
      this.busy = true
      this.listQuery2.pageIndex = 0
      this.getList2()
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
      this.createTime = y + '-' + m + '-' + d
    },
    getNetday () {
      let str = this.createTime
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
      if (this.createTime === times) {
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
        this.createTime = y + '-' + m + '-' + d
      }
      this.getList()
    },
    getPrevday () {
      let str = this.createTime
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
      this.createTime = strYear + '-' + strMonth + '-' + strDay
      this.getList()
    }
  },
  created () {
    this.getList1()
    this.getList2(false, 'finish')
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

<style scoped lang="scss">
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
  .page-infinite-wrapper {
    padding-bottom: 60px;
  }
  .active-tab {
    background-color: #32CCBC!important;
    color: #FFFFFF!important;
  }
  .tab-item {
    background-color: #fff;
    color: #b7b7b7;
  }
</style>
