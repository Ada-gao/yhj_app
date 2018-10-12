<template>
  <div class="page">
    <wv-header title="问题反馈" class="x-header bgcolor">
      <div class="btn-back header_left" slot="left" @click="$router.push('/profile')">
        <i class="iconfont icon-fanhui size_i"></i>
        <p class="head_return">返回</p>
      </div>
    </wv-header>
    <div class="x-wrapper wv-content">
      <div class="feedback_content">
        <textarea class="feedback_tex" rows="5" v-model="content" maxlength="100" placeholder="请输入您要反馈的问题...."></textarea>
        <div class="feedback_imglist">
          <p class="feedback_img" v-for="item in imgList" :key="item.id">
            <img :src="item">
          </p>
          <p class="feedback_add iconfont icon-tianjia" @click="showActionsheet('ios')"></p>
        </div>
      </div>
    <!--<div class="feedback_content">-->
      <!--<p style="font-size: 0.6rem;padding-left: 1rem;margin-top: 1rem">问题反馈:</p>-->
      <!--<textarea rows="5" v-model="content" placeholder="请描述在使用过程中，在什么页面，什么功能上遇到的问题，字数不少于10个字，谢谢！" class="feedback_tex"></textarea>-->
    <!--</div>-->
    <!--&lt;!&ndash;<div class="feedback_img">上传</div>&ndash;&gt;-->
    <!--<div style="width: 88%;height: 3rem;margin: 1rem auto;">-->
      <!--<div class="feedback_uploadimg" v-for="item in imgList" :key="item.id">-->
         <!--&lt;!&ndash;&ndash;&gt;-->
        <!--<img :src="item" style="border-radius: 4px;max-width: 100%;height: 3rem;"/>-->
      <!--</div>-->
      <!--<div @click="showActionsheet('ios')" class="feedback_upload">-->
        <!--<img :src="topImg">-->
      <!--</div>-->
    <!--</div>-->
    <div class="feedback_button" @click="onImgdata">提交</div>
    <wv-actionsheet :type="type" :actions="actions" cancel-text="取消" v-model="sheetVisible"/>
    </div>
  </div>
</template>
<script>
import topImg from '../../assets/images/top_img.png'
// import Vue from 'vue'
import { Toast } from 'we-vue'
import { postUpload, postFeedback } from '../../api/api'
import Vue from 'vue'

export default {
  data () {
    return {
      topImg,
      type: 'ios',
      sheetVisible: false,
      actions: [],
      onSuccess: '',
      onFail: '',
      imgList: [],
      imgUrl: [],
      content: ''
    }
  },

  methods: {
    showActionsheet (type) {
      this.type = type
      this.sheetVisible = true
    },
    dataURLtoFile (imgData, filename) {
      let arr = imgData.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bstr = window.atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      let blob = new Blob([u8arr], {type: mime})
      blob.lastModifiedDate = new Date()
      blob.name = filename
      return blob
    },
    upLoad (imageURI) {
      let file = this.dataURLtoFile('data:image/jpeg;base64,' + imageURI, 'test.jpeg')
      let formData = new FormData()
      formData.append('file', file)
      postUpload(formData).then((res) => {
        this.imgUrl.push(res.data)
        this.imgList.push('data:image/jpeg;base64,' + imageURI)
      }).catch((message) => {
      })
    },
    menuClick (key) {
      let vm = this
      let sourceType = Vue.cordova.camera.PictureSourceType.CAMERA
      if (key === 'PHOTOLIBRARY') {
        sourceType = Vue.cordova.camera.PictureSourceType.PHOTOLIBRARY
      }
      let cameraOptions = {
        quality: 50,
        sourceType: sourceType,
        allowEdit: true,
        destinationType: navigator.camera.DestinationType.DATA_URL,
        saveToPhotoAlbum: true,
        encodingType: navigator.camera.EncodingType.JPEG
      }
      Vue.cordova.camera.getPicture(cameraSuccess, cameraError, cameraOptions)
      function cameraSuccess (imageURI) {
        if (vm.imgList.length >= 5) {
          Toast.text({
            duration: 1000,
            message: '最多只能上传5张图片'
          })
        } else {
          vm.upLoad(imageURI)
        }
      }
      function cameraError (message) {
        // alert('error to take picture:' + message)
      }
    },
    onImgdata () {
      if (this.content === '') {
        Toast.text({
          duration: 1000,
          message: '内容不能为空！'
        })
      } else {
        postFeedback(this.imgUrl, this.content).then((res) => {
          if (res.status === 200) {
            Toast.text({
              duration: 1000,
              message: '提交成功'
            })
            setTimeout(() => {
              this.$router.push({path: '/profile'})
            }, 1500)
          }
        }).catch(() => {
          Toast.text({
            duration: 1000,
            message: '失败'
          })
        })
      }
    }
  },

  mounted () {
    this.actions = [
      {
        name: '拍摄新照片',
        key: 'menu1',
        method: () => {
          this.menuClick('CAMERA')
        }
      },
      {
        name: '从手机相册选择',
        key: 'menu2',
        method: () => {
          this.menuClick('PHOTOLIBRARY')
        }
      }
    ]
  }
}
</script>
<style lang="scss">
  .feedback_content{
    width: 100%;
    /*height: 500px;*/
    background-color: #ffffff;
    /*margin-top: 100px;*/
    box-shadow: 6px 4px 20px rgba(219,219,219,0.3);
    padding: 46px 40px;
    box-sizing: border-box;
  }
  .feedback_tex{
    width: 100%;
    // margin:0 auto;
    // display: inherit;
    border: 0px solid;
    line-height: 40px;
    background-color: #ffffff;
    -webkit-tap-highlight-color:transparent;
    outline: none;
    font-size: 28px;
  }
  .feedback_add{
    width: 150px;
    height: 150px;
    border: 1px solid gainsboro;
    text-align: center;
    line-height: 150px;
    font-size: 50px;
    color: gainsboro;
  }
  .feedback_img{
    width: 150px;
    height: 150px;
  }
  .feedback_img>img{
    max-width: 100%;
    max-height: 100%;
  }
  .feedback_imglist{
    height: 300px;
  }
  .feedback_imglist>p{
    float: left;
    margin: 5px;
  }
  .feedback_button{
    width: 87%;
    height: 90px;
    line-height: 90px;
    font-size: 28px;
    text-align: center;
    border-radius: 6px;
    color: #ffffff;
    margin: 60px auto 0;
    background: linear-gradient(to right, #5d90f4 , #2f6be2);
    box-shadow: 0px 7px 29px 1px rgba(13,67,173,0.5);
  }
</style>
