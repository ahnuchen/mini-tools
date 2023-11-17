<template>
  <view
    class="page"
    style="display: flex; flex-direction: column; align-items: center"
  >
    <image
      mode="aspectFit"
      src="http://xue.ccy1994.top/xiaochengxu/mini-tools/images_mockup.jpg"
      style="height: 700rpx"
    ></image>
    <view class="btn-area">
      <button @tap="showActions" class="butss">选择图片</button>
    </view>
    <view class="text">
      <text
        >让您轻松的把截图套上手机壳，支持iPhone，华为，小米，OPPO,
        三星，Watch等设备哦！更多机型持续更新中...
      </text>
    </view>
    <wd-action-sheet
      v-model="show"
      :actions="actions"
      @close="close"
      @select="select"
    />
  </view>
</template>

<script>
export default {
  data() {
    return {
      msg: "",
      img: "",
      actions: [
        {
          name: "拍照",
        },
        {
          name: "从相册选择",
        },
        {
          name: "从聊天记录选择",
        },
      ],
      show: false,
    };
  },
  onShareTimeline: function () {
    return {
      title: "推荐使用潮人截图、壁纸分享必备小程序",
      imageUrl:
        "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/images-share.png",
    };
  },
  onShareAppMessage: function () {
    return {
      path: "/pages/my_module/phoneAlbum/index",
      title: "推荐使用潮人截图、壁纸分享必备小程序",
      desc: "让您轻松的把截图套上手机壳，再分享截图、壁纸或者App给好友呢！",
      imageUrl:
        "https://xue.ccy1994.top/xiaochengxu/mini-tools/static/images/images-share.png",
    };
  },
  onLoad: function (a) {
    this.onLoadClone3389(a);
  },
  methods: {
    onLoadClone3389: function (a) {
      var that = this;
    },
    showActions: function () {
      this.setData({
        show: true,
      });
    },
    close: function () {
      this.setData({
        show: false,
      });
    },

    select: function ({ item, index }) {
      switch (index) {
        case 0:
          {
            this.chooseFromPhoto();
          }
          break;
        case 1:
          {
            this.chooseFromAlbum();
          }
          break;
        case 2:
          {
            this.chooseFromMessageFile();
          }
          break;
        default: {
          this.chooseFromAlbum();
        }
      }
    },

    chooseFromAlbum: function (e) {
      var that = this;
      uni.chooseImage({
        count: 1,
        sourceType: ["album"],
        success: that.onChooseSuccess,
      });
    },

    chooseFromPhoto: function (e) {
      var that = this;
      uni.chooseImage({
        sourceType: ["camera"],
        count: 1,
        success: that.onChooseSuccess,
      });
    },

    chooseFromMessageFile: function (e) {
      var that = this;
      uni.chooseMessageFile({
        type: "image",
        count: 1,
        success: that.onChooseSuccess,
      });
    },
    onChooseSuccess: function (e) {
      var that = this;
      for (var t = 0; t < (e.tempFilePaths || e.tempFiles).length; t++) {
        let fileInfo = (e.tempFilePaths || e.tempFiles)[t];
        if (typeof fileInfo !== "string") {
          fileInfo = fileInfo.path;
        }
        uni.hideLoading();
        uni.getImageInfo({
          src: fileInfo,
          success: function (n) {
            var o = n.height / n.width;
            that.goIndex(n.width, n.height, o, n.path);
          },
        });
      }
    },

    goIndex: function (e, n, o, t) {
      uni.navigateTo({
        url:
          "/pages/my_module/phoneAlbum/display/index?pic=" +
          t +
          "&k=" +
          o +
          "&width=" +
          e +
          "&height=" +
          n,
      });
    },

    goAbout: function () {
      uni.navigateTo({
        url: "/pages/about/about",
      });
    },

    paytome: function () {
      uni.previewImage({
        urls: [""],
        success: function (e) {},
      });
    },

    showinte: function () {
      // var that = this;
      // let InterstitialAd;
      // if (that.appConfig.ad.wxinter) {
      //   if (uni.createInterstitialAd) {
      //     InterstitialAd = uni.createInterstitialAd({
      //       adUnitId: that.appConfig.ad.wxinter,
      //     });
      //     InterstitialAd.onLoad(() => {});
      //     InterstitialAd.offClose();
      //     InterstitialAd.offError();
      //     InterstitialAd.onError((err) => {});
      //     InterstitialAd.onClose(() => {});
      //   }
      //   // 在适合的场景显示插屏广告
      //   if (InterstitialAd) {
      //     if (that.appConfig.ad.insetgp == 1) {
      //       that.inadset = setInterval(() => {
      //         InterstitialAd.show().catch((err) => {
      //           console.error(err);
      //         });
      //       }, that.appConfig.ad.wxinsettime * 1000);
      //     } else {
      //       setTimeout(() => {
      //         InterstitialAd.show().catch((err) => {
      //           console.error(err);
      //         });
      //       }, that.appConfig.ad.wxinsettime * 1000);
      //     }
      //   }
      // }
    },
  },
};
</script>
<style>
.btn-area button {
  background-color: #ff4444;
  color: #fff;
  font-size: 32rpx;
  font-weight: 400;
  height: 96rpx;
  line-height: 96rpx;
  width: 640rpx;
}

.btn-area button:hover {
  background-color: #ff4444;
  color: #fff;
}

.contact-button {
  align-items: center;
  border: none;
  border-radius: 0;
  color: rgba（125，0，0，0 0.1）;
  display: flex;
  font-size: 28rpx;
  font-weight: 300;
  height: 32rpx;
  list-style: none;
  margin: 0rpx 0rpx 20rpx;
  outline: none;
  padding: 0rpx;
}

.contact-button::after {
  border: none;
  color: rgba（125，0，0，0）;
}

.text {
  color: #7e8f8f;
  font-size: 24rpx;
  margin-left: 60rpx;
  margin-right: 52rpx;
  margin-top: 54rpx;
}

.weui-footer {
  align-items: center;
  bottom: 240rpx;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.weui-footer__link {
  color: #586c94;
  font-size: 72rpx;
  margin: 0 0.62em;
}
</style>
