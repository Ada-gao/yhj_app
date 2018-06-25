<template>
  <div class="page">
    <wv-header title="问题反馈" :fixed="true" background-color="#32CCBC">
      <div class="btn-back" slot="left">
        <i class="iconfont icon-fanhui" @click="$router.push('/profile')"></i>
      </div>
    </wv-header>
    <div class="feedback_content">
      <p style="font-size: 0.64rem;padding-left: 1rem">问题反馈:</p>
      <textarea rows="13" placeholder="" class="feedback_tex"></textarea>
    </div>
    <!--<div class="feedback_img">上传</div>-->
    <wv-button type="default" @click="showActionsheet('ios')">iOS ActionSheet</wv-button>
    <div class="feedback_button">保存</div>
    <wv-actionsheet :type="type" title="<h3 style='color: red;'>一个大标题</h3><p>最多两行</p>" :actions="actions" cancel-text="取消" v-model="sheetVisible"/>
  </div>
  </div>
</template>
<script type="es6">
import { ActionSheet } from 'we-vue'
export default {
  data () {
    return {
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
        name: '示例菜单1',
        key: 'menu1',
        method: () => {
          this.menuClick('menu1')
        }
      },
      {
        name: '示例菜单2',
        key: 'menu2',
        method: () => {
          this.menuClick('menu2')
        }
      },
      {
        name: '示例菜单3',
        key: 'menu3',
        method: () => {
          this.menuClick('menu3')
        }
      }
    ]
  }
}
</script>
<style>
  .feedback_content{
    margin-top: 2rem;
  }
.feedback_tex{
  width: 84%;
  margin: 0.3rem auto;
  display: inherit;
  border: 1.5px solid #818080;
  border-radius: 0.2rem;
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
</style>
