<template>
  <view>
    <!-- <ad unit-id="{{bannerUnitId}}" ad-intervals="30"></ad> -->
    <view v-if="!hidden" style="opacity: 0">
      <canvas
        canvasId="draw"
        :style="'width:' + canvasWidth + 'px;height:' + canvasHeight + 'px'"
      ></canvas>
    </view>
    <view class="tips">小提示：点击图片预览,再长按即可保存!</view>
    <view class="image-box" :style="'height:' + showImage.height + 'px;'">
      <image
        @tap="previewImage"
        class="image"
        :src="showImage.url"
        :style="
          'width:' + showImage.width + 'px;height:' + showImage.height + 'px'
        "
      ></image>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      bannerUnitId: getApp().globalData.bannerUnitId,
      imageInfo: [],
      direction: "vertical",
      canvasWidth: 0,
      canvasHeight: 0,
      systemHeight: 0,
      systemWidth: 0,
      showImage: {
        url: "",
        width: 0,
        height: 0,
      },
      hidden: false,
    };
  },
  onShareAppMessage: function () {},
  onShareTimeline: function () {},
  onLoad: function (t) {
    var that = this;
    that.setData({
      imageInfo: JSON.parse(t.imageInfo),
      direction: t.direction,
    });
    uni.getSystemInfo({
      success: function (t) {
        that.setData({
          systemWidth: t.windowWidth,
          systemHeight: t.windowHeight,
        });
      },
    });
    console.log(that.imageInfo);
    uni.showLoading({
      title: "处理中...",
      mask: true,
    });
    that.connectImage();
  },
  methods: {
    connectImage: function () {
      var that = this;
      var e = uni.createCanvasContext("draw", that);
      var a = 0;
      var i = 0;
      var h = that.imageInfo;
      if ("vertical" == that.direction) {
        a = that.systemWidth;
        for (var n = 0, s = 0; n < h.length; n++) {
          i += s = (h[n].height * a) / h[n].width;
        }
        that.setData({
          canvasWidth: a,
          canvasHeight: i,
        });
        for (var n = 0, s = 0, o = 0; n < h.length; n++) {
          s = (h[n].height * a) / h[n].width;
          if (n > 0) {
            o += (h[n - 1].height * a) / h[n - 1].width;
          }
          e.drawImage(h[n].url, 0, o, a, s);
        }
      } else {
        i = that.systemHeight;
        for (var n = 0, g = 0; n < h.length; n++) {
          a += g = (h[n].width * i) / h[n].height;
        }
        that.setData({
          canvasWidth: a,
          canvasHeight: i,
        });
        for (var n = 0, g = 0, d = 0; n < h.length; n++) {
          g = (h[n].width * i) / h[n].height;
          if (n > 0) {
            d += (h[n - 1].width * i) / h[n - 1].height;
          }
          e.drawImage(h[n].url, d, 0, g, i);
        }
      }
      e.draw();
      setTimeout(function (e) {
        uni.canvasToTempFilePath(
          {
            canvasId: "draw",
            success: function (e) {
              console.log(e.tempFilePath);
              that.setData({
                "showImage.url": e.tempFilePath,
                hidden: true,
              });
              that.setShowImage(e.tempFilePath);
              uni.hideLoading();
            },
          },
          that,
        );
      }, 500);
    },

    previewImage: function (t) {
      var that = this;
      var a = [];
      a.push(that.showImage.url);
      uni.previewImage({
        current: a[0],
        urls: a,
      });
    },

    setShowImage: function (t) {
      var that = this;
      var a = that.direction;
      var i = 0;
      var h = 0;
      uni.getSystemInfo({
        success: function (n) {
          uni.getImageInfo({
            src: t,
            success: function (t) {
              if ("vertical" == a) {
                s = 0.93;
                i = n.windowWidth * s;
                h = (n.windowWidth / t.width) * t.height * s;
              } else {
                var s = 0.5;
                h = n.windowHeight * s;
                i = (n.windowHeight / t.height) * t.width * s;
              }
              that.setData({
                "showImage.width": i,
                "showImage.height": h,
              });
            },
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

.tips {
  box-sizing: border-box;
  width: 700rpx;
  margin: 25rpx;
  border-radius: 4rpx;
  background-color: #0bc15f;
  color: #ffffff;
  min-height: 100rpx;
  line-height: 100rpx;
  font-size: 30rpx;
  padding-left: 30rpx;
  box-shadow: 0rpx 0rpx 20rpx rgba(0, 0, 0, 0.2);
}

.image-box {
  width: 700rpx;
  margin: 25rpx;
  border-radius: 4rpx;
  overflow-x: scroll;
  overflow-y: hidden;
  box-shadow: 0rpx 0rpx 20rpx rgba(0, 0, 0, 0.2);
}

.image {
  display: block;
  margin: 0 auto;
}
</style>
