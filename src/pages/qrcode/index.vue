<template>
  <view class="qrcode-wrapper">
    <view v-if="!showCode">
      <wd-input custom-class="text" type="textarea" placeholder="请输入/粘贴链接或者文字" v-model="ipt"/>
      <view class="btns">
        <wd-button type="warning" :disabled="!ipt" @click="clear">清空</wd-button>
        <wd-button :disabled="!ipt" @click="geneCode">确定</wd-button>
      </view>
    </view>
    <view v-else>
      <view class="code-image">
        <tki-qrcode :background='bgColor' v-if="showCode" cid="qrcode1" ref="qrcode" :val="imgText"
                    :size="360"
                    :onval="true"
                    :loadMake="true"
                    @result="onRes"
                    :usingComponents="true"/>
      </view>
      <view class="btns">
        <wd-button @click="saveCode" type="success">保存图片</wd-button>
        <wd-button @click="clear">再生成一张</wd-button>
      </view>
    </view>

  </view>
</template>
<script setup lang="ts">
import {getCurrentInstance, ref} from "vue";
import tkiQrcode from 'tki-qrcode/components/tki-qrcode/tki-qrcode.vue'
import {downloadFileByBase64} from "@/utils";
import dayjs from "dayjs";

const currentInstance = getCurrentInstance()

const ipt = ref('')
const imgText = ref('')
const showCode = ref(false)
const bgColor = ref('#fff')
const imageSrc = ref('')


function saveCode() {
  // #ifndef MP
  downloadFileByBase64(imageSrc.value, `二维码${dayjs().format('YYYYMMDDhhmmss')}.png`);
  // #endif

  // #ifdef MP
  (currentInstance?.refs.qrcode as any)._saveCode();
  // #endif
}

function clear() {
  showCode.value = false
  ipt.value = ''
  imgText.value = ''
}


function geneCode() {
  showCode.value = true
  imgText.value = ipt.value
}

function onRes(src: string) {
  imageSrc.value = src
}

</script>

<style lang="scss">
.qrcode-wrapper {
  width: 90%;
  margin: 0 auto;
  padding: 40upx 0;

  :global(.wd-input__textarea) {
    border-radius: $uni-border-radius-lg;
  }

  .text {
    border: 1px solid $uni-color-primary;
    border-radius: $uni-border-radius-lg;
    background: #fff;
  }


  .btns {
    display: flex;
    padding: 60upx;
  }

  .code-image {
    display: flex;
    width: 100%;
    height: 360upx;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
}
</style>