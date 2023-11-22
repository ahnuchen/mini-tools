<template>
  <view class="qrcode-wrapper">
    <view v-if="!showCode">
      <wd-input
        custom-class="text"
        type="textarea"
        placeholder="请输入/粘贴链接或者文字"
        v-model="ipt"
      />
      <view class="btns">
        <wd-button type="info" :disabled="!ipt" @click="clear">清空</wd-button>
        <wd-button :disabled="!ipt" @click="geneCode">确定</wd-button>
      </view>
    </view>
    <view v-else>
      <view class="code-image">
        <tki-qrcode
          :background="bgColor"
          v-if="showCode"
          cid="qrcode1"
          ref="qrcode"
          :val="imgText"
          :size="360"
          :onval="true"
          :loadMake="true"
          @result="onRes"
          :usingComponents="true"
        />
      </view>
      <view class="btns">
        <wd-button @click="saveCode" type="success">保存图片</wd-button>
        <wd-button @click="clear">再生成一张</wd-button>
      </view>
    </view>
    <FloatBtn
      desc="二维码生成是一个专业、免费的二维码生成工具。它可以将域名、汉字、名字、英文生成二维码，通过可用通过该工具生成的二维码使用在各个场景中，适合程序员、运营名、产品等有二维码需求的用户进行使用"
    />
  </view>
</template>
<script setup lang="ts">
import { getCurrentInstance, ref } from "vue";
import tkiQrcode from "tki-qrcode/components/tki-qrcode/tki-qrcode.vue";
import { downloadFileByBase64 } from "@/utils";
import dayjs from "dayjs";
import FloatBtn from "@/components/FloatBtn.vue";
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";

const currentInstance = getCurrentInstance();

const ipt = ref("");
const imgText = ref("");
const showCode = ref(false);
const bgColor = ref("#fff");
const imageSrc = ref("");

function saveCode() {
  // #ifndef MP
  downloadFileByBase64(
    imageSrc.value,
    `二维码${dayjs().format("YYYYMMDDhhmmss")}.png`,
  );
  // #endif

  // #ifdef MP
  (currentInstance?.refs.qrcode as any)._saveCode();
  // #endif
}

function clear() {
  showCode.value = false;
  ipt.value = "";
  imgText.value = "";
}

function geneCode() {
  showCode.value = true;
  imgText.value = ipt.value;
}

function onRes(src: string) {
  imageSrc.value = src;
}

const shareInfo = {
  path: "/pages/qrcode/qrcode",
  title: "二维码生成工具",
};

onShareAppMessage(() => shareInfo);

onShareTimeline(() => shareInfo);
</script>

<style lang="scss">
.qrcode-wrapper {
  width: 90%;
  margin: 0 auto;
  padding: 40rpx 0;

  :global(.wd-input__textarea) {
    border-radius: $uni-border-radius-lg;
  }

  .text {
    border: 1px solid $uni-color-primary;
    border-radius: $uni-border-radius-lg;
    background: #fff;

    .wd-input__textarea-inner {
      height: 400rpx;
    }
  }

  .btns {
    display: flex;
    padding: 60rpx;
    justify-content: space-between;
  }

  .code-image {
    display: flex;
    width: 100%;
    height: 360rpx;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
}
</style>
