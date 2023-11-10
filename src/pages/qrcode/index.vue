<template>
  <view class="wrapper">
    二维码生成
    <wd-input type="textarea" placeholder="请输入链接或者文字" v-model="ipt"/>
    <wd-button type="default" :disabled="!ipt" @click="clear">清空</wd-button>
    <wd-button :disabled="!ipt" @click="geneCode">确定</wd-button>
    <tki-qrcode v-if="showCode" cid="qrcode1" ref="qrcode" :val="imgText" :size="200" :onval="true" :loadMake="true"
                :usingComponents="true"/>

  </view>
</template>
<script setup lang="ts">
import {ref} from "vue";
import tkiQrcode from 'tki-qrcode/components/tki-qrcode/tki-qrcode.vue'


const ipt = ref('')
const imgText = ref('')
const showCode = ref(false)

function clear() {
  showCode.value = false
  ipt.value = ''
  imgText.value = ''
}

function geneCode() {
  showCode.value = true
  imgText.value = ipt.value
}
</script>

<style scoped>
.wrapper {
  width: 90%;
  margin: 0 auto;
  padding: 40upx 0;
}
</style>