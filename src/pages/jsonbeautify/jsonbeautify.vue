<template>
  <view class="jsonbeautify-wrapper">
    <wd-input
      custom-class="jsonarea"
      type="textarea"
      placeholder="请输入json"
      v-model="value"
    />
    <view class="btns">
      <wd-button @click="format">格式化</wd-button>
      <wd-button @click="value = ''" type="info">清空</wd-button>
    </view>
    <wd-toast />
  </view>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "wot-design-uni";
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";

const value = ref("");
const message = useToast();

function format() {
  try {
    const parsedJson = JSON.parse(value.value);
    value.value = JSON.stringify(parsedJson, null, 2);
  } catch (e) {
    message.error(e.message);
  }
}

const shareInfo = {
  path: "/pages/jsonbeautify/jsonbeautify",
  title: "JSON美化工具",
};

onShareAppMessage(() => shareInfo);

onShareTimeline(() => shareInfo);
</script>

<style lang="scss">
.jsonbeautify-wrapper.jsonbeautify-wrapper {
  height: calc(100vh - var(--window-top));
  height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom));
  height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom));
  background: $uni-bg-color-grey;
  padding: 40rpx;

  .btns {
    display: flex;
    justify-content: space-between;
  }

  .jsonarea {
    height: 80vh;
  }
}
</style>
