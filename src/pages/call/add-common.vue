<template>
  <div class="page">
    <wv-header title="备注" class="x-header" background-color="#FFFFFF">
      <div class="btn-back header_left" slot="left" @click="backHandle">
        <i class="iconfont icon-fanhui size_i"></i>
        <p class="head_return">返回</p>
      </div>
    </wv-header>
    <div class="wv-content x-wrapper">
      <wv-group class="group">
        <wv-textarea placeholder="请输入备注信息...." :rows="3" v-model="common" :max-length="100">{{form.common}}}</wv-textarea>
      </wv-group>
      <wv-button type="default" class="Addcommon" @click="subCommon">提交</wv-button>
    </div>
  </div>
</template>
<script>
import { putAddCommon } from '@/api/api'
import { Toast } from 'we-vue'

export default {
  data () {
    return {
      form: {},
      type: '',
      groupId: undefined,
      common: ''
    }
  },
  created () {
    this.form = this.$route.query.form
    this.type = this.$route.query.type
    this.groupId = this.$route.query.groupId
    this.common = this.form.common
    // console.log(this.groupId)
  },
  methods: {
    backHandle () {
      this.$router.push({path: '/call/customer-random/' + this.type + '/' + this.groupId, query: this.form})
    },
    subCommon () {
      putAddCommon(this.form.taskId, this.common).then((res) => {
        Toast.text({
          duration: 1000,
          message: '提交成功'
        })
        this.form.common = res.data.common
        setTimeout(() => {
          this.$router.push({path: '/call/customer-random/' + this.type + '/' + this.groupId, query: this.form})
        }, 1000)
      }).catch(() => {
        Toast.text({
          duration: 1000,
          message: '修改失败，请重新提交'
        })
      })
    }
  }
}
</script>

<style>
  .Addcommon{
    background: linear-gradient(to right, #5d90f4 , #2f6be2);
    box-shadow: 0px 7px 29px 1px rgba(13,67,173,0.5);
    margin-top: 100px;
    color: #ffffff;
  }
  .group>.weui-cells{
    margin-top: 20px;
  }
 .weui-textarea{
    height: 300px;
  }
  .group{
    box-shadow:6px 4px 20px rgba(219,219,219,0.3);
  }
</style>
