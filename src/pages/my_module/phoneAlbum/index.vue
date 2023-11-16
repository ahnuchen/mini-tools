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
      <button @tap="goAlbum" class="butss">选择图片</button>
    </view>
    <view class="text">
      <text
        >让您轻松的把截图套上手机壳，支持iPhone，华为，小米，OPPO,
        三星，Watch等设备哦！更多机型持续更新中...
      </text>
    </view>
  </view>
  <!-- <view style="margin-top:10px ;" wx:if="{{appConfig.ad.wxcustom}}">
  <ad-custom unit-id="{{appConfig.ad.wxcustom}}"></ad-custom>
</view> -->
</template>

<script>
export default {
  data() {
    return {
      msg: "",
      img: "",
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
      path: "/pagesA/pages/album/index",
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

    goAlbum: function () {
      var that = this;
      uni.chooseImage({
        count: that.count,
        // 默认3
        sizeType: ["original", "compressed"],
        // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"],
        // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths[0];
          uni.hideLoading();
          uni.getImageInfo({
            src: tempFilePaths,
            success: function (n) {
              var o = n.height / n.width;
              that.goIndex(n.width, n.height, o, n.path);
            },
          });
        },
      });
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
      var that = this;
      let InterstitialAd;
      if (that.appConfig.ad.wxinter) {
        if (uni.createInterstitialAd) {
          InterstitialAd = uni.createInterstitialAd({
            adUnitId: that.appConfig.ad.wxinter,
          });
          InterstitialAd.onLoad(() => {});
          InterstitialAd.offClose();
          InterstitialAd.offError();
          InterstitialAd.onError((err) => {});
          InterstitialAd.onClose(() => {});
        }
        // 在适合的场景显示插屏广告
        if (InterstitialAd) {
          if (that.appConfig.ad.insetgp == 1) {
            that.inadset = setInterval(() => {
              InterstitialAd.show().catch((err) => {
                console.error(err);
              });
            }, that.appConfig.ad.wxinsettime * 1000);
          } else {
            setTimeout(() => {
              InterstitialAd.show().catch((err) => {
                console.error(err);
              });
            }, that.appConfig.ad.wxinsettime * 1000);
          }
        }
      }
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
