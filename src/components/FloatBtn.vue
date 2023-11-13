<template>
  <view>
    <view class="float-btn" @click="showDesc">
      <wd-icon name="help-circle" size="44upx"></wd-icon>
    </view>
    <wd-message-box></wd-message-box>
  </view>

</template>
<script setup lang="ts">
import {useMessage} from 'wot-design-uni'

const message = useMessage()
const props = defineProps({
  desc: {
    type: String,
    default: ''
  }
})

function showDesc() {
  message.alert({
    title: '工具介绍',
    msg: props.desc,
    confirmButtonText: '我知道了',
  })
}

</script>

<style lang="scss">
.float-btn {
  position: fixed;
  bottom: 90upx;
  right: 40upx;
}
</style>