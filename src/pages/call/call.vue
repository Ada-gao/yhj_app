<template>
  <div class="page">
    <wv-header title="任务列表" class="x-header bgcolor">
      <div class="btn-back header_left" slot="left" @click="$router.push('/home')">
        <i class="iconfont icon-fanhui size_i"></i>
        <p class="head_return">返回</p>
      </div>
    </wv-header>
    <div class="wv-content x-wrapper">
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
              <div class="placeholder iconfont icon-fanhui icon_left place" @click="getNetday"></div>
            </wv-flex-item>
          </wv-flex>
          <div class="call_nav">
            <p :class="{'active-tab': type==='dnf'}" @click="handleHand" class="tab-item">未完成 ({{handTotal}})</p>
            <p :class="{'active-tab': type==='finish'}" @click="handleFinish" class="tab-item">已完成 ({{finishTotal}})</p>
          </div>
        </div>
      </div>
      <div class="page-infinite-wrapper" v-show="content==='notFinish'">
        <div class="call_list" v-for="(item, index) in hList" :key="index" @click="todetails(item)">
          <p class="call_left">{{item.contactName}}</p>
          <p class="call_cont" style="text-align: right">{{item.lastCallResult}}</p>
          <p class="iconfont icon-fanhui call_right icon_left" style="color: #e9e9e9;font-size: 19px"></p>
        </div>
         <!--<wv-cell-swipe :title="item.contactName" is-link-->
                        <!--v-for="(item, index) in hList"-->
                        <!--:key="index"-->
                        <!--:to="{name: 'customer-details', params: item}">-->
         <!--</wv-cell-swipe>-->
         <div v-infinite-scroll="loadMore1" infinite-scroll-disabled="busy" infinite-scroll-distance="50">
         </div>
        <p class="loading-tips" v-show="floading" style="text-align: center">
          <wv-spinner type="snake" color="#444" :size="24"></wv-spinner>
        </p>
      </div>
      <div class="page-infinite-wrapper" v-show="content==='finish'">
        <div class="call_list" v-for="(item, index) in fList" :key="index" @click="todetails(item)">
          <p class="call_left">{{item.contactName}}</p>
          <p class="call_cont">{{item.lastCallResult}}</p>
          <p class="iconfont icon-fanhui call_right icon_left" style="color: #e9e9e9;font-size: 19px"></p>
        </div>
        <div v-infinite-scroll="loadMore2" infinite-scroll-disabled="busy2" infinite-scroll-distance="50"></div>
        <!--<wv-group title="">-->
          <!--<wv-cell-swipe :title="item.contactName" is-link-->
                         <!--v-for="(item, index) in fList"-->
                         <!--:key="index"-->
                         <!--:to="{name: 'customer-details', params: item}">-->
          <!--</wv-cell-swipe>-->
          <!--<div v-infinite-scroll="loadMore2" infinite-scroll-disabled="busy2" infinite-scroll-distance="50">-->
          <!--</div>-->
        <!--</wv-group>-->
        <p class="loading-tips" v-show="floading" style="text-align: center">
          <wv-spinner type="snake" color="#444" :size="24"></wv-spinner>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { getTaskList } from '@/api/api'
import { parseTime } from '@/utils'

export default {
  data () {
    return {
      content: 'notFinish',
      guigeSpan: '-1',
      perDiv: null,
      createTime: parseTime(new Date(), '{y}-{m}-{d}'),
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
        type: 'dnf'
        // createTime: ''
      },
      listQuery2: {
        pageIndex: 0,
        pageSize: 10,
        type: 'finish'
        // createTime: ''
      },
      call: 1,
      groupId: undefined,
      taskList: []
    }
  },
  methods: {
    getList1 (flag) {
      // console.log('这是未完成')
      this.floading = true
      this.listQuery1.createTime = this.createTime
      getTaskList(this.groupId, this.listQuery1).then(res => {
        let data = res.data.content
        this.taskList = data
        this.taskforlist()
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
    getList2 (flag) {
      this.floading = true
      // type = type || this.type
      this.listQuery2.createTime = this.createTime
      getTaskList(this.groupId, this.listQuery2).then(res => {
        let data = res.data.content
        this.taskList = data
        this.taskforlist()
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
      this.busy = false
      this.listQuery1.pageIndex++
      this.getList1(true)
    },
    loadMore2 () {
      // console.log('这是已完成加载')
      this.busy2 = false
      this.listQuery2.pageIndex++
      this.getList2(true)
    },
    handleHand () {
      this.type = 'dnf'
      this.content = 'notFinish'
      this.listQuery1.pageIndex = 0
      this.busy2 = true
      this.busy = false
      this.getList1()
    },
    handleFinish () {
      this.type = 'finish'
      this.content = 'finish'
      this.busy2 = false
      this.busy = true
      this.listQuery2.pageIndex = 0
      this.getList2()
    },
    getNetday () {
      // let today = parseTime(new Date(), '{y}-{m}-{d}')
      // if (this.createTime === today) return false
      this.listQuery1.pageIndex = 0
      this.listQuery2.pageIndex = 0
      let day1 = new Date(this.createTime)
      day1.setDate(day1.getDate() + 1)
      this.createTime = parseTime(day1, '{y}-{m}-{d}')
      this.getList1()
      this.getList2()
    },
    getPrevday () {
      this.listQuery1.pageIndex = 0
      this.listQuery2.pageIndex = 0
      let day1 = new Date(this.createTime)
      day1.setDate(day1.getDate() - 1)
      this.createTime = parseTime(day1, '{y}-{m}-{d}')
      this.getList1()
      this.getList2()
    },
    todetails (item) {
      sessionStorage.setItem('createTime', this.createTime)
      // this.$router.push({name: 'customer-details', params: item})
      this.$router.push({path: '/call/customer-random/0/' + this.groupId, query: item})
    },
    taskforlist () {
      this.taskList.forEach(item => {
        if (item.lastCallResult === 'NOT_CALL') {
          item.lastCallResult = '未外呼'
        } else if (item.lastCallResult === 'NOT_EXIST') {
          item.lastCallResult = '空号'
        } else if (item.lastCallResult === 'UNCONNECTED') {
          item.lastCallResult = '未接通'
        } else if (item.lastCallResult === 'CONNECTED') {
          item.lastCallResult = '已接通'
        }
      })
    }
  },
  created () {
    console.log(this.$route)
    this.groupId = this.$route.params ? this.$route.params.groupId : undefined
  },
  mounted () {
    if (this.groupId) {
      this.getList1()
      this.getList2(false)
    }
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
  /*.call_content{*/
   /*padding-top: 80px;*/
  /*}*/
  .call_time{
    height: 190px;
    width: 100%;
    background: #FFFFFF;
    padding-top: 70px;
    /*position: absolute;*/
    /*top: 1.8rem;*/
  }
  .call_list{
    clear: both;
    width: 78%;
    height: 93px;
    margin: 0 auto;
    border-bottom: 1px solid rgba(233,233,233,1);
  }
  .call_list>p{
    height: 93px;
    line-height: 93px;
    float: left;
  }
  .call_left{
    width: 67%;
    font-size: 32px;
    /*overflow: hidden;*/
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    overflow: hidden;
  }
  .call_cont{
    width: 23%;
    font-size: 26px;
    color: #1473ed;
  }
  .call_right{
    width: 10%;
  }
  .icon_left{
    color:#02B6DC;
    transform:rotate(180deg);
    -ms-transform:rotate(180deg);
    -moz-transform:rotate(180deg);
    -webkit-transform:rotate(180deg);
    -o-transform:rotate(180deg);
  }
  .call_year{
    font-size: 32px;
    /*font-weight: bold;*/
    text-align: center;
    font-family: sans-serif;
  }
  .place{
    width: 22%;
    margin: 0 auto;
    color: #2f6be2;
    font-size: 33px;
  }
  .call_nav{
    width: 77%;
    height: 64px;
    margin: 59px auto 0;
    border: 2px solid #e9e9e9;
    border-radius: 4px;
    color: gray;
    font-size: 0;
  }
  .call_nav>p{
    width: 50%;
    text-align: center;
    font-size: 28px;
    float: left;
    border-radius: 3px;
    height: 63px;
    line-height: 63px;
  }
  .page-infinite-wrapper {
    padding-bottom: 60px;
    background: #ffffff;
  }
  .active-tab {
    background: linear-gradient(to right, #5d90f4 , #2f6be2)!important;
    color: #FFFFFF!important;
  }
  .tab-item {
    background-color: #fff;
    color: #b7b7b7;
  }
</style>
