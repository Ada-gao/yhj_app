<template>
  <div class="page">
    <wv-header title="我的" :fixed="false" background-color="#32CCBC" class="x-header">
    </wv-header>
    <div class="profile_content">
      <div class="profile_head">
        <img :src="company.logo" alt="">
      </div>
      <p class="profile_name">{{dataInfrom.name}}</p>
      <p class="profile_company">{{company.companyName}}</p>
    </div>
    <div style="background: #FFFFFF;margin-top: 0.4rem;height: 8.16rem">
    <wv-flex :gutter="10" style="width: 90%;margin:auto;border-bottom: 1px solid #D2D2D2">
      <wv-flex-item>
        <div class="placeholder task_number" v-if="form.totalDuration !== null">{{form.totalDuration}}分</div>
        <div class="placeholder task_number" v-if="form.totalDuration === null || form.totalDuration === ''">0分</div>
        <div class="placeholder task_text">总通话时长</div>
      </wv-flex-item>
      <wv-flex-item>
        <div class="placeholder task_number" v-if="form.totalTaskCompleteCnt !== null">{{form.totalTaskCompleteCnt}}个</div>
        <div class="placeholder task_number" v-if="form.totalTaskCompleteCnt === null">0个</div>
        <div class="placeholder task_text">总任务完成数</div>
      </wv-flex-item>
      <wv-flex-item>
        <div class="placeholder task_number" v-if="form.avgDuration!==null">{{form.avgDuration}}秒</div>
        <div class="placeholder task_number" v-if="form.avgDuration ===null">0秒</div>
        <div class="placeholder task_text">平均通话时长</div>
      </wv-flex-item>
    </wv-flex>
    <wv-flex :gutter="10">
      <wv-flex-item style="border-left: 1px solid grey">
        <div class="placeholder" style="border-right: 1px solid #979797">
          <div class="placeholder progress_number">{{form.rate}}%</div>
          <div class="placeholder progress_text">外呼完成率</div>
        </div>
      </wv-flex-item>
      <wv-flex-item>
        <div class="placeholder">
          <div class="placeholder progress_number">第{{form.rank}}名</div>
          <div class="placeholder progress_text">今日团队排名</div>
        </div>
      </wv-flex-item>
    </wv-flex>
    </div>
    <div style="margin-top: 0.4rem;background: #FFFFFF">
      <wv-cell title="问题反馈" value="" is-link to="/my/feedback" style="font-size: 0.56rem"></wv-cell>
      <wv-cell title="关于闪电呼" value="" is-link to="/my/relevant" style="font-size: 0.56rem"></wv-cell>
    </div>
    <!--<router-link to="/login">-->
      <div class="button_return" @click="showDialog('ios')">退出登录</div>
    <!--</router-link>-->
  </div>
</template>

<script>
import { getUser, getCompany, getRank } from '../../api/api'
import { Dialog } from 'we-vue'
import thumbSmall from '@/assets/images/icon_tabbar.png'

export default {
  data () {
    return {
      dataInfrom: {},
      userId: '',
      company: {},
      form: {},
      rank: {},
      thumbSmall
    }
  },
  mounted () {
    this.userData()
  },
  methods: {
    showDialog (skin, title) {
      Dialog({
        title: title,
        message: '您确定要退出吗？',
        skin,
        showCancelButton: true
      }).then(() => {
        this.$router.replace({path: '/login'})
        localStorage.removeItem('token')
      }).catch(() => {
      })
    },
    userData () {
      let user = localStorage.getItem('token')
      if (user) {
        getUser().then((res) => {
          this.dataInfrom = res.data
          this.userId = this.dataInfrom.id
          getCompany().then((res) => {
            this.company = res.data
          })
          // getSales(this.userId).then((res) => {
          //   this.form = res.data
          //   if (this.form.totalTaskCompleteCnt === null || this.form.totalTaskCompleteCnt === 0) {
          //     this.form.rate = 0
          //   } else {
          //     this.form.rate = parseInt(this.form.totalTaskCompleteCnt / this.form.totalTaskCnt * 100)
          //   }
          // })
          getRank(this.userId).then((res) => {
            console.log(res)
            this.form = res.data
            if (this.form.totalTaskCompleteCnt === null || this.form.totalTaskCompleteCnt === 0) {
              this.form.rate = 0
            } else {
              this.form.rate = parseInt(this.form.totalTaskCompleteCnt / this.form.totalTaskCnt * 100)
            }
            if (res.data.length === 0) {
              let ranks = {
                rank: 0
              }
              this.form = ranks
            } else {
              this.form = res.data
            }
            // console.log(this.rank)
          })
        })
      } else if (!user || user === '') {
        this.$router.replace({path: '/login'})
      }
    }
  }
}
</script>

<style lang="scss">
  .wv-header .wv-header-title[data-v-a5b8d5b6]{
    font-size: 0.72rem;
  }
  .profile_content{
    width: 100%;
    height: 6.28rem;
    background-color: #32CCBC;
    padding-top: 2%;
    /*margin-top: 2rem;*/
  }
  .profile_head{
    width: 3rem;
    height: 3rem;
    // background: rebeccapurple;
    margin: 0 auto;
    border-radius: 50%;
    box-shadow:rgba(238, 233, 233, 0.34) 0px 0px 0px 5px;
    overflow: hidden;
    img {
      width: 3rem;
      height: 3rem;
    }
  }
  .profile_name{
    width: 100%;
    height: 1rem;
    font-size: 0.72rem;
    color: #FFFFFF;
    text-align: center;
    margin-top: 0.48rem;
  }
  .profile_company{
    width: 100%;
    height: 0.74rem;
    font-size: 0.52rem;
    color: #FFFFFF;
    text-align: center;
    margin-top: 0.48rem;
  }
  /*.placeholder{*/
    /*text-align: center;*/
  /*}*/
  .task_number{
    font-size: 0.64rem;
    color: #02A2D1;
    margin-top: 1.02rem;
    text-align: center;
  }
  .task_text{
    font-size: 0.52rem;
    margin-top: 0.66rem;
    margin-bottom: 0.83rem;
    text-align: center;
  }
  .progress_number{
    font-size: 0.6rem;
    color: #32CCBC;
    margin-top: 1.07rem;
    text-align: center;
  }
  .progress_text{
    font-size: 0.52rem;
    margin-bottom: 1.12rem;
    text-align: center;
    /*margin-bottom: 1.12rem;*/
  }
  .button_return{
    width: 90%;
    height: 1.6rem;
    font-size: 0.64rem;
    color: #FFFFFF;
    background: #32CCBC;
    margin: 1rem auto 0;
    border-radius: 0.2rem;
    text-align: center;
    line-height: 1.6rem;
  }
</style>
