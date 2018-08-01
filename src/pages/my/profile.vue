<template>
  <div class="page">
    <wv-header title="我的" background-color="#32CCBC" class="x-header">
    </wv-header>
    <div class="wv-content_nav x-wrapper">
    <div class="profile_content">
      <div class="profile_head">
        <img :src="logo" alt="">
      </div>
      <p class="profile_name">{{dataInfrom.name}}</p>
      <p class="profile_company">{{company}}</p>
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
      <div class="button_return" @click="showDialog">退出登录</div>
    <!--</router-link>-->
    </div>
    <div class="details_return" v-show="details">
      <div class="detail_content">
        <div style="height: 4rem;line-height: 4rem;font-size: 18px;color: #333333;">您确定要退出吗？</div>
        <wv-flex>
          <wv-flex-item>
            <div class="placeholder button_out" @click="buttoneturn">确 定</div>
          </wv-flex-item>
          <wv-flex-item>
            <div class="placeholder button_out" @click="buttoncancel">取 消</div>
          </wv-flex-item>
        </wv-flex>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, getCompany, getRank } from '../../api/api'
// import { Dialog } from 'we-vue'
import thumbSmall from '@/assets/images/icon_tabbar.png'
import heads from '@/assets/images/hand.png'

export default {
  data () {
    return {
      dataInfrom: {},
      userId: '',
      company: '',
      form: {},
      rank: {},
      thumbSmall,
      heads,
      details: false,
      logo: ''
    }
  },
  mounted () {
    this.userData()
  },
  methods: {
    showDialog () {
      this.details = true
      // Dialog({
      //   title: title,
      //   message: '您确定要退出吗？',
      //   skin,
      //   showCancelButton: true
      // }).then(() => {
      //   this.$router.replace({path: '/login'})
      //   localStorage.removeItem('token')
      // }).catch(() => {
      // })
    },
    buttoneturn () {
      this.$router.replace({path: '/login'})
      localStorage.removeItem('token')
    },
    buttoncancel () {
      this.details = false
    },
    userData () {
      let user = localStorage.getItem('token')
      if (user) {
        getUser().then((res) => {
          this.dataInfrom = res.data
          this.userId = this.dataInfrom.id
          getCompany().then((res) => {
            if (res.data.logo === '') {
              this.logo = this.heads
            } else {
              this.logo = process.env.BASE_API + '/file/' + res.data.logo
              this.company = res.data.companyName
            }
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
            this.form.avgDuration = this.form.avgDuration.toFixed(1)
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
  .button_out{
    background-color: #31ccbc;
    color: #F0F0F0;
    width: 59%;
    margin: 0 auto;
    border-radius: 4px;
    font-size: 17px;
    height: 1.61rem;
    line-height: 1.61rem;
  }
  .details_return{
    z-index: 501;
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.61);
  }
  .detail_content{
    position: fixed;
    z-index: 501;
    width: 73%;
    max-width: 300px;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    overflow: hidden;
    height: 6.9rem;
    text-align: center;
    background: #ffffff;
    border-radius: 0.2rem;
    font-size: 0.8rem;
  }
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
    background-color: #ffffff;
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
    margin: 0.5rem auto 0;
    border-radius: 0.2rem;
    text-align: center;
    line-height: 1.6rem;
  }
</style>
