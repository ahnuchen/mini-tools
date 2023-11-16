<template>
  <view>
    <!-- <ad unit-id="{{bannerUnitId}}" ad-intervals="30" /> -->
    <button @tap="chooseImage" class="button" hoverClass="button-hover">
      扫描或选择图片
    </button>
    <view class="result" v-if="result">
      <view class="showResult">
        <span style="color: #0bc15f">扫描结果为：</span>
        {{ result }}
      </view>
      <button @tap="copy" class="button" hoverClass="button-hover">复制</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      bannerUnitId: getApp().globalData.bannerUnitId,
      result: "",
    };
  },
  onLoad: function (t) {},
  onShareAppMessage: function (t) {
    return {
      title: "帮大忙工具箱--二维码转字符",
      path: "/pages/my_module/scanQrcode/scanQrcode",
    };
  },
  onShareTimeline: function () {},
  methods: {
    chooseImage: function (t) {
      var that = this;
      uni.scanCode({
        success: function (t) {
          console.log("扫描结果为：" + t.result);
          uni.showToast({
            title: "扫描成功",
            icon: "success",
          });
          that.setData({
            result: t.result,
          });
        },
        fail: function (t) {
          uni.showToast({
            title: "没有扫描到二维码!",
            icon: "none",
          });
        },
      });
    },

    copy: function (t) {
      var that = this;
      uni.setClipboardData({
        data: that.result,
        success: function (t) {
          uni.showToast({
            title: "已复制",
            icon: "none",
          });
        },
      });
    },
  },
};
</script>
<style>
page {
  padding: 0;
  margin: 0;
  font-size: 30rpx;
  color: #757575;
  background-color: #eeeeee;
  width: 100%;
  height: 100% ；;
}

.button {
  appearance: none;
  box-sizing: border-box;
  width: 720rpx;
  font-size: 30rpx;
  margin: 20rpx 15rpx;
  background-color: #0bc15f;
  border-radius: 4rpx;
  text-align: center;
  height: 80rpx;
  line-height: 80rpx;
  color: #ffffff;
  border: none;
}

.button::after {
  border: none;
}

.button-hover {
  background-color: #000000;
  color: #ffffff;
}

.result {
  overflow: hidden;
  clear: both;
}

.showResult {
  background-color: #ffffff;
  width: 720rpx;
  min-height: 240rpx;
  line-height: 80rpx;
  font-size: 30rpx;
  box-sizing: border-box;
  padding: 30rpx;
  margin: 20rpx 15rpx;
  border: none;
  box-shadow: 2rpx 2rpx 2rpx rgba(0, 0, 0, 0.2);
  word-wrap: break-word;
  word-break: break-all;
}
</style>
