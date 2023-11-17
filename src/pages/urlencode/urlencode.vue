<template>
  <view class="urlencode-wrapper">
    <wd-input type="textarea" v-model="value" placeholder="请输入..." />
    <view class="btns">
      <wd-button icon="arrow-thin-down" @click="onEncode">encode</wd-button>
      <wd-button icon="arrow-thin-down" @click="onDecode">decode</wd-button>
      <wd-button icon="arrow-thin-up" @click="empty" type="info"
        >清空
      </wd-button>
    </view>
    <view class="btns">
      <wd-button icon="arrow-thin-up" @click="onEncode2">encode</wd-button>
      <wd-button icon="arrow-thin-up" @click="onDecode2">decode</wd-button>
      <wd-button icon="arrow-thin-down" @click="empty2" type="info"
        >清空
      </wd-button>
    </view>
    <wd-input custom-class="second" type="textarea" v-model="decodedValue" />
  </view>
</template>
<script setup>
import { ref } from "vue";
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";

const value = ref("");
const decodedValue = ref("");

function onEncode() {
  decodedValue.value = encodeURIComponent(value.value);
}

function onDecode() {
  decodedValue.value = decodeURIComponent(value.value);
}

function empty() {
  value.value = "";
}

function onEncode2() {
  value.value = encodeURIComponent(decodedValue.value);
}

function onDecode2() {
  value.value = decodeURIComponent(decodedValue.value);
}

function empty2() {
  decodedValue.value = "";
}

const shareInfo = {
  path: "/pages/urlencode/urlencode",
  title: "url编码解码",
};

onShareAppMessage(() => shareInfo);

onShareTimeline(() => shareInfo);
</script>

<style lang="scss">
.urlencode-wrapper.urlencode-wrapper.urlencode-wrapper {
  height: calc(100vh - var(--window-top));
  height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom));
  height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom));
  background: $uni-bg-color-grey;
  padding: 40rpx;

  .btns {
    display: flex;
    justify-content: space-between;
    margin-top: 30rpx;
  }

  .second {
    margin-top: 30rpx;
  }
}
</style>
