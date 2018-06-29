<template>
  <div class="page">
    <wv-header title="我的" :fixed="false" background-color="#32CCBC" class="x-header">
    </wv-header>
    <div class="profile_content">
      <div class="profile_head">
      </div>
      <p class="profile_name">{{dataInfrom.name}}</p>
      <p class="profile_company">{{companyName}}</p>
    </div>
    <div style="background: #FFFFFF;margin-top: 0.4rem;height: 8.16rem">
    <wv-flex :gutter="10" style="width: 90%;margin:auto;border-bottom: 1px solid #D2D2D2">
      <wv-flex-item>
        <div class="placeholder task_number">1200分</div>
        <div class="placeholder task_text">总通话时长</div>
      </wv-flex-item>
      <wv-flex-item>
        <div class="placeholder task_number">699个</div>
        <div class="placeholder task_text">总任务完成数</div>
      </wv-flex-item>
      <wv-flex-item>
        <div class="placeholder task_number">50秒</div>
        <div class="placeholder task_text">平均通话时长</div>
      </wv-flex-item>
    </wv-flex>
    <wv-flex :gutter="10">
      <wv-flex-item style="border-left: 1px solid grey">
        <div class="placeholder" style="border-right: 1px solid #979797">
          <div class="placeholder progress_number">98%</div>
          <div class="placeholder progress_text">外呼完成率</div>
        </div>
      </wv-flex-item>
      <wv-flex-item>
        <div class="placeholder">
          <div class="placeholder progress_number">第一名</div>
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
      <div class="button_return" @click="showDialog('ios')">退出登陆</div>
    <!--</router-link>-->
  </div>
</template>

<script>
import { getUser, getCompany, getSales } from '../../api/api'
import { Dialog } from 'we-vue'

export default {
  data () {
    return {
      dataInfrom: {},
      userId: '',
      companyName: ''
    }
  },
  mounted () {
    this.userData()
  },
  methods: {
    showDialog (skin, title) {
      Dialog({
        title: title,
        message: '您确定要退出闪电呼吗？',
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
          if (this.dataInfrom.companyId !== '') {
            getCompany(this.dataInfrom.companyId).then((res) => {
              this.companyName = res.data.companyName
              this.userId = this.dataInfrom.id
            })
          }
          getSales(this.userId).then((res) => {
            console.log(res)
          })
        })
        // getTaskStatistics().then((res) => {
        //   // console.log(res)
        // })
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
    background: rebeccapurple;
    margin: 0 auto;
    border-radius: 50%;
    box-shadow:rgba(238, 233, 233, 0.34) 0px 0px 0px 5px;
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
