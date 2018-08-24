<template>
  <div class="page">
    <wv-header title="外呼记录" class="x-header" background-color="#FFFFFF">
    </wv-header>
    <div class="x-wrapper">
      <div class="record_info">
        <p class="infor_title">客户信息</p>
        <div class="info_list">
          <p class="info_left">姓名</p>
          <input class="info_cont" placeholder="蓝色妖姬">
          <p class="iconfont icon-fanhui info_right"></p>
        </div>
        <div class="info_list">
          <p class="info_left">电话</p>
          <input class="info_cont" placeholder="13661876489">
          <p class="iconfont icon-fanhui info_right"></p>
        </div>
        <div class="info_list">
          <p class="info_left">微信</p>
          <input class="info_cont" placeholder="2446075450">
          <p class="iconfont icon-fanhui info_right"></p>
        </div>
        <div class="info_list">
          <p class="info_left">备注</p>
          <input class="info_cont" placeholder="有意向购买产品">
          <p class="iconfont icon-fanhui info_right"></p>
        </div>
      </div>
      <div class="info_text">
        <div class="info_txt">外呼话术</div>
        <div class="info_html"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
.record_info{
  width: 100%;
  height: 570px;
  background: #ffffff;
  margin-top: 100px;
  box-shadow: 6px 4px 20px rgba(219,219,219,0.3);
}
  .infor_title{
    width: 86%;
    margin: 0 auto;
    height: 93px;
    line-height: 93px;
    font-size: 32px;
  }
  .info_list{
    width: 86%;
    margin: 0 auto;
    border-bottom: 1px solid #e9e9e9;
    height: 109px;
  }
.info_list>p,.info_cont{
  float: left;
  height: 93px;
  line-height: 93px;
}
  .info_left{
    font-size: 28px;
    width: 20%;
    color: #323232;
  }
  .info_cont{
    width: 68%;
    text-align: right;
    color: #000000;
    outline: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0)
  }
  .info_right{
    color:#e9e9e9;
    font-size: 39px;
    width: 10%;
    transform:rotate(180deg);
    -ms-transform:rotate(180deg);
    -moz-transform:rotate(180deg);
    -webkit-transform:rotate(180deg);
    -o-transform:rotate(180deg);
  }
 input::-webkit-input-placeholder{
   color: #000000;
 }
  .info_text{
    width: 100%;
    height: 558px;
    box-shadow: 6px 4px 20px rgba(219,219,219,0.3);
    background: #ffffff;
    margin-top: 30px;
  }
  .info_txt{
    width: 86%;
    margin: 0 auto;
    padding-top: 30px;
    padding-bottom: 27px;
  }
  .info_html{
    width: 86%;
    margin: 0 auto;
    color: #252525;
    font-size: 28px;
  }
</style>
