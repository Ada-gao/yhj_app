<template>
  <div class="page">
    <wv-header title="问题反馈" background-color="#32CCBC" class="x-header">
      <div class="btn-back" slot="left">
        <i class="iconfont icon-fanhui" @click="$router.push('/profile')"></i>
      </div>
    </wv-header>
    <div class="wv-content x-wrapper">
    <div class="feedback_content">
      <p style="font-size: 0.6rem;padding-left: 1rem;margin-top: 1rem">问题反馈:</p>
      <textarea rows="5" v-model="content" placeholder="请描述在使用过程中，在什么页面，什么功能上遇到的问题，字数不少于10个字，谢谢！" class="feedback_tex"></textarea>
    </div>
    <!--<div class="feedback_img">上传</div>-->
    <div style="width: 88%;height: 3rem;margin: 1rem auto;">
      <div class="feedback_uploadimg" v-for="item in imgList" :key="item.id">
         <!---->
        <img :src="item" style="border-radius: 4px;max-width: 100%"/>
      </div>
      <div @click="showActionsheet('ios')" class="feedback_upload">
        <img :src="topImg">
      </div>
    </div>
    <div class="feedback_button" @click="onImgdata">提交</div>
    <wv-actionsheet :type="type" :actions="actions" cancel-text="取消" v-model="sheetVisible"/>
    </div>
  </div>
</template>
<script type="es6">
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
      alert(formData)
      alert(file)
      postUpload(formData).then((res) => {
        this.imgUrl.push(res.data)
      }).catch((message) => {
        alert(message)
      })
    },
    menuClick (key) {
      // console.log(`menu ${key} clicked`)
      // let vm = this
      let sourceType = Vue.cordova.camera.PictureSourceType.CAMERA
      if (key === 'PHOTOLIBRARY') {
        sourceType = Vue.cordova.camera.PictureSourceType.PHOTOLIBRARY
      }
      let cameraOptions = {
        quality: 100,
        sourceType: sourceType,
        allowEdit: true,
        destinationType: navigator.camera.DestinationType.DATA_URL,
        saveToPhotoAlbum: false,
        encodingType: navigator.camera.EncodingType.JPEG
      }
      Vue.cordova.camera.getPicture(cameraSuccess, cameraError, cameraOptions)
      function cameraSuccess (imageURI) {
        alert('')
        // if (vm.imgList.length >= 5) {
        //   Toast.text({
        //     duration: 1000,
        //     message: '最多只能上传5张图片'
        //   })
        // } else {
        //   vm.imgList.push('data:image/jpeg;base64,' + imageURI)
        //   vm.upLoad(imageURI)
        // }
      }
      function cameraError (message) {
        alert('error to take picture:' + message)
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
            alert(this.imgUrl)
            this.$router.push({path: '/profile'})
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
          // let cameraOptions = {
          //   quality: 50,
          //   sourceType: 1,
          //   allowEdit: true,
          //   targetWidth: 80,
          //   targetHeight: 80,
          //   destinationType: navigator.camera.DestinationType.DATA_URL,
          //   saveToPhotoAlbum: false,
          //   encodingType: navigator.camera.EncodingType.JPEG
          // }
          // Vue.cordova.camera.getPicture(cameraSuccess, cameraError, cameraOptions)
          // function cameraSuccess (imgData) {
          //   if (_that.imgList.length >= 5) {
          //     Toast.text({
          //       duration: 1000,
          //       message: '最多只能上传5张图片'
          //     })
          //   } else {
          //     _that.imgList.push('data:image/jpeg;base64,' + imgData)
          //     _that.upLoad(imgData)
          //   }
          // }
          // function cameraError () {
          //   Toast.text({
          //     duration: 1000,
          //     message: '上传失败，请稍后重试...'
          //   })
          // }
          this.menuClick('CAMERA')
        }
      },
      {
        name: '从手机相册选择',
        key: 'menu2',
        method: () => {
          // let cameraOptions = {
          //   destinationType: navigator.camera.DestinationType.DATA_URL,
          //   sourceType: 0,
          //   quality: 50,
          //   allowEdit: true,
          //   targetWidth: 80,
          //   targetHeight: 80
          // }
          // Vue.cordova.camera.getPicture(cameraSuccess, cameraError, cameraOptions)
          // function cameraSuccess (imgData) {
          //   if (_that.imgList.length >= 5) {
          //     Toast.text({
          //       duration: 1000,
          //       message: '最多只能上传5张图片'
          //     })
          //   } else {
          //     _that.imgList.push('data:image/jpeg;base64,' + imgData)
          //     _that.upLoad(imgData)
          //   }
          // }
          // function cameraError () {
          // }
          this.menuClick('PHOTOLIBRARY')
        }
      }
    ]
  }
}
</script>
<style lang="scss">
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
    margin: 5rem auto 0;
  }
  .feedback_img{
    width: 2rem;
    height: 2rem;
    background-color: #ffffff;
  }
  .feedback_upload{
    width: 3.46rem;
    height: 3.16rem;
    float: left;
  }
  .feedback_uploadimg{
    float: left;
    width: 20%;
    margin-right: 0.2rem;
  }
  .feedback_upload>img{
    max-width: 100%;
  }
  .weui-toast_text .weui-toast__content[data-v-4af60de0]{
    font-size: .6em;
  }
</style>
