<template>
  <div class="page">
    <wv-header title="我的" :fixed="false" background-color="#1ab310">
      <div class="btn-back" slot="left">
        <i class="iconfont icon-back" @click="$router.push('/')"></i>
      </div>
    </wv-header>
    <div class="profile_content">
      <div class="top">
        <wv-flex :gutter="10">
          <wv-flex-item flex="3">
            <div class="placeholder" style="padding: 1rem">
              <p style="font-size: 1.2rem">销售ABC <small style="font-size:0.8rem">销售总监</small> </p>
              <p style="font-size: 0.8rem">上海甦翔投资咨询有限公司</p>
            </div>
          </wv-flex-item>
          <wv-flex-item>
            <div class="placeholder profile_head">头像</div>
          </wv-flex-item>
        </wv-flex>
      </div>
      <div class="center">
        <wv-flex :gutter="10" style="margin-top: 6%">
        <wv-flex-item>
          <div class="placeholder content_list">总通话时长</div>
          <div class="placeholder content_time">1200分钟</div>
        </wv-flex-item>
        <wv-flex-item>
          <div class="placeholder content_list">总任务完成数</div>
          <div class="placeholder content_time">80分钟</div>
        </wv-flex-item>
        <wv-flex-item>
          <div class="placeholder content_list">平均通话时长</div>
          <div class="placeholder content_time">1000秒</div>
        </wv-flex-item>
      </wv-flex>
      </div>
      <div class="bot">
        <wv-flex :gutter="10" style="margin-top: 6%">
          <wv-flex-item>
            <div class="placeholder bot_list">外呼完成率</div>
            <div class="placeholder bot_list">90%</div>
          </wv-flex-item>
          <wv-flex-item>
            <div class="placeholder bot_list">今日团队排名</div>
            <div class="placeholder bot_list">1</div>
          </wv-flex-item>
        </wv-flex>
      </div>
    </div>
    <router-link to="/land">
      <wv-button type="primary">退出登陆</wv-button>
    </router-link>
  </div>
</template>

<script>
import thumb from '../assets/images/wevue_placeholder.png'
import thumbSmall from '../assets/images/icon_tabbar.png'

export default {
  data () {
    return {
      thumb,
      thumbSmall
    }
  }
}
</script>

<style scoped lang="scss">
  .cell-icon {
    display: block;
    width: 20px;
    margin-right: 5px;
  }
  .return_land{
  width:90%;
  }
  .profile_content{
    width: 93%;
    height:17rem;
    margin: 4% auto 0;
    border-radius: 10px;
    background-color: #efeded;
  }
  .top{
    height: 33%;

  }
  .center{
    height: 33%;
    border-bottom: 1.5px solid gainsboro;
    border-top: 1.5px solid gainsboro;
  }
  .bot{
    height: 33%;
  }
  .profile_head{
    border-radius: 50%;
    border: 1px solid grey;
    width: 77%;
    height: 3.9rem;
    line-height: 3.9rem;
    text-align: center;
    margin-top: 14%;
  }
  .content_list{
    text-align: center;
    font-size: 0.8rem;
  }
  .content_time{
    text-align: center;
    font-size: 1rem;
  }
  .bot_list{
    text-align: center;
    font-size: 0.8rem;
  }
</style>
