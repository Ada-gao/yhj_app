<template>
  <div class="page">
    <wv-header title="问题反馈" :fixed="false" background-color="#32CCBC">
      <div class="btn-back" slot="left">
        <i class="iconfont icon-fanhui" @click="$router.push('/profile')"></i>
      </div>
    </wv-header>
    <div class="feedback_content">
      <p style="font-size: 0.64rem;padding-left: 1rem">问题反馈:</p>
      <textarea rows="5" placeholder="请描述在使用过程中，在什么页面，什么功能上遇到的问题，字数不少于10个字，谢谢！" class="feedback_tex"></textarea>
    </div>
    <!--<div class="feedback_img">上传</div>-->
    <div @click="showActionsheet('ios')" class="feedback_upload">
      <img :src="topImg" style="max-width: 100%">
    </div>
    <div class="feedback_button">提交</div>
    <wv-actionsheet :type="type" :actions="actions" cancel-text="取消" v-model="sheetVisible"/>
  </div>
</template>
<script type="es6">
import topImg from '../../assets/images/top_img.png'
export default {
  data () {
    return {
      topImg,
      type: 'ios',
      sheetVisible: false,
      actions: []
    }
  },

  methods: {
    showActionsheet (type) {
      this.type = type
      this.sheetVisible = true
    },

    menuClick (key) {
      console.log(`menu ${key} clicked`)
    }
  },

  mounted () {
    this.actions = [
      {
        name: '拍摄新照片',
        key: 'menu1',
        method: () => {
          this.menuClick('menu1')
        }
      },
      {
        name: '从手机相册选择',
        key: 'menu2',
        method: () => {
          this.menuClick('menu2')
        }
      }
    ]
  }
}
</script>
<style>
.feedback_tex{
  width: 84%;
  margin: 0.3rem auto;
  display: inherit;
  border: 1px solid #818080;
  border-radius: 0.2rem;
  padding: .3rem;
  line-height: 1rem;
  background-color: whitesmoke;
  outline: none;
}
  .feedback_button{
    width: 87%;
    height: 1.6rem;
    line-height: 1.6rem;
    background: #32CCBC;
    font-size: 0.64rem;
    text-align: center;
    border-radius: 0.1rem;
    color: #ffffff;
    margin: 1rem auto 0;
  }
  .feedback_img{
    width: 2rem;
    height: 2rem;
    background-color: #ffffff;
  }
  .feedback_upload{
    width: 3.46rem;
    height: 3.16rem;
    margin: 1rem;
  }
</style>
