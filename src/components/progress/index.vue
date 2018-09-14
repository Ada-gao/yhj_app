<template>
  <div class="weui-progress">
    <i class="icon" :style="{left: percent - 7 + '%'}"></i>
    <div class="weui-progress__bar">
      <div class="weui-progress__inner-bar js_progress" :style="{width: 100- percent + '%'}" />
    </div>
    <span v-if="showClear" class="weui-progress__opr">
      <i class="weui-icon-cancel" @click="onCancelClick" />
    </span>
  </div>
</template>

<script>
// import { create } from 'we-vue/src/utils'

export default {
  name: 'MyProgress',
  props: {
    percent: {
      type: [Number, String]
    },
    showClear: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    onCancelClick (event) {
      event.preventDefault()
      this.$emit('cancel', this)
    }
  }
}
</script>

<style scoped lang="scss">
.weui-progress {
  position: relative;
  .icon {
    background: url('../../assets/images/chidou.png') center center no-repeat;
    background-size: cover;
    position: absolute;
    top: 0;
    transform: translateY(-40%);
    font-size: 50px;
    width: 50px;
    height: 50px;
    /*color: #2F6BE2;*/
  }
  .weui-progress__bar {
    background-color: #ebebeb!important;
    .weui-progress__inner-bar {
      // border-radius: 10px!important;
      background-color: #5C8FF2!important;
      position: absolute;
      right: 0;
    }
  }
}
</style>
