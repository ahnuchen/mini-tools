<template>
  <view
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-left: 20rpx;
      padding-right: 20rpx;
      margin-top: 90rpx;
      justify-content: center;
    "
  >
    <icon size="80" type="success"></icon>
    <text style="margin-bottom: 60rpx; margin-top: 40rpx; color: gray"
      >已保存至相册
    </text>
    <button @tap="goAlbum" class="btn-area" style="margin-top: 0rpx">
      再来一张
    </button>
    <button
      class="btn-area btn-share"
      openType="share"
      style="margin-top: 48rpx"
    >
      分享好友
    </button>
    <!-- <view style="margin-top:48rpx">
      <ad-custom unit-id="adunit-6af8aa93e20539e2" ></ad-custom>
    </view> -->
  </view>
</template>

<script>
var n = null;
export default {
  data() {
    return {};
  },
  onLoad: function (o) {
    this.onLoadClone3389(o);
  },
  onReady: function () {},
  onShow: function () {
    n.show().catch(function (n) {
      console.error(n);
    });
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {
    return {
      path: "/pages/my_module/phoneAlbum/index",
      title: "潮人截图、壁纸分享必备小程序",
      desc: "让您轻松的把截图套上手机壳，再分享截图、壁纸或者App给好友呢！",
      imageUrl:
        "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/images-share.png",
    };
  },
  methods: {
    onLoadClone3389: function (o) {
      if (uni.createInterstitialAd) {
        (n = uni.createInterstitialAd({
          adUnitId: "adunit-46faf356d01e8f5d",
        })).onLoad(function () {
          console.log("onLoad event emit");
        });
        n.onError(function (n) {
          console.log("onError event emit", n);
        });
        n.onClose(function (n) {
          console.log("onClose event emit", n);
        });
      }
    },

    goAlbum: function () {
      uni.navigateBack({
        delta: 2,
      });
    },
  },
};
</script>
<style>
.btn-area {
  font-size: 32rpx;
  font-weight: 400;
  height: 96rpx;
  line-height: 96rpx;
  width: 232rpx;
}

.btn-area,
.btn-area :hover {
  background-color: #0bc15f;
  color: #fff;
}

.btn-share {
  background-color: red;
  color: #fff !important;
  font-size: 32rpx;
  font-weight: 400;
  line-height: 96rpx;
  width: 232rpx;
}
</style>
