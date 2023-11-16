<template>
  <view v-if="!isRelease">
    <view>
      <button @tap="showActions" class="button" hoverClass="button-hover">
        选择图片
      </button>
      <image
        class="image"
        v-if="!(isChoose == true ? false : true)"
        :src="img"
        :style="
          'width:' + showInfo.width + 'px;height:' + showInfo.height + 'px'
        "
      ></image>
      <view
        class="choose"
        v-if="!(isChoose == true ? false : true)"
        :style="
          'width:' + showInfo.width + 'px;height:' + showInfo.height + 'px'
        "
      >
        <view
          @tap="previewImage"
          :class="
            'choose-module ' + (index % 2 == 0 ? 'choose-module-odd' : '')
          "
          :data-index="index"
          :style="
            'width:' +
            showInfo.width / 3 +
            'px;height:' +
            showInfo.height / 3 +
            'px;line-height:' +
            showInfo.height / 3 +
            'px;'
          "
          v-for="(item, index) in [0, 1, 2, 3, 4, 5, 6, 7, 8]"
          :key="index"
        >
          {{ index + 1 }}
        </view>
      </view>
      <canvas
        :canvasId="canvasInfo.id"
        class="canvas"
        :style="
          'width:' +
          canvasInfo.width +
          'px;height:' +
          canvasInfo.height +
          'px;position:absolute;top:' +
          (showInfo.height + systemInfo.height) +
          'px;left:0;'
        "
      ></canvas>
    </view>
    <!-- <ad unit-id="{{bannerUnitId}}" ad-intervals="30" style="position: fixed; bottom: 50rpx;" /> -->
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
      isRelease: true,
      bannerUnitId: getApp().globalData.bannerUnitId,
      canvasInfo: {
        id: "mycanvas",
        width: 320,
        height: 568,
      },
      showInfo: {
        width: 320,
        height: 568,
      },
      systemInfo: {
        width: 320,
        height: 568,
      },
      img: "",
      isChoose: false,
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
  onLoad: function (t) {
    this.setData({
      isRelease: getApp().globalData.isRelease,
    });
    var that = this;
    uni.getSystemInfo({
      success: function (t) {
        that.setData({
          "systemInfo.width": t.windowWidth,
          "systemInfo.height": t.windowHeight,
        });
      },
    });
  },
  onShareAppMessage: function (t) {
    return {
      title: "帮大忙工具箱--九宫格切图",
      path: "/pages/my_module/cuttingNine/cuttingNine",
    };
  },
  onShareTimeline: function () {},
  methods: {
    imageToCanvas: function (t) {
      var that = this;
      var i = that.canvasInfo;
      var s = uni.createCanvasContext(i.id, that);
      s.drawImage(t, 0, 0, i.width, i.height);
      s.draw();
    },

    cutImage: function (t) {
      var that = this;
      uni.getImageInfo({
        src: t,
        success: function (i) {
          var s = i.width;
          var a = i.height;
          uni.getSystemInfo({
            success: function (i) {
              that.setData({
                "systemInfo.width": i.windowWidth,
                "systemInfo.height": i.windowHeight,
                "canvasInfo.width": s,
                "canvasInfo.height": a,
                "showInfo.width": i.windowWidth,
                "showInfo.height": (i.windowWidth / s) * a,
              });
              that.imageToCanvas(t);
            },
          });
        },
      });
    },

    previewImage: function (t) {
      var that = this;
      var i = that.canvasInfo;
      var s = t.currentTarget.dataset.index;
      uni.canvasToTempFilePath(
        {
          canvasId: i.id,
          x: ((s % 3) * i.width) / 3,
          y: (parseInt(s / 3) * i.height) / 3,
          width: i.width / 3,
          height: i.height / 3,
          success: function (t) {
            console.log("成功路径： " + t.tempFilePath);
            var e = [];
            e.push(t.tempFilePath);
            uni.previewImage({
              urls: e,
            });
          },
        },
        that,
      );
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
        that.setData({
          img: fileInfo,
          isChoose: true,
        });
        that.cutImage(fileInfo);
        uni.showToast({
          title: "点击图片预览,再长按即可保存!",
          icon: "none",
        });
      }
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

.image {
  display: block;
  box-sizing: border-box;
  overflow: hidden;
  position: absolute;
  top: 140rpx;
  left: 0;
  z-index: 99;
}

.choose {
  display: block;
  box-sizing: border-box;
  overflow: hidden;
  position: absolute;
  top: 140rpx;
  left: 0;
  z-index: 100;
}

.choose-module {
  box-sizing: border-box;
  overflow: hidden;
  float: left;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1rpx dashed #ffffff;
  text-align: center;
  color: #ffffff;
  font-size: 40rpx;
}

.choose-module-oddc {
  background-color: rgba(251, 114, 160, 0.8);
}

.canvas {
  z-index: 1;
  display: block;
  box-sizing: border-box;
  overflow: hidden;
  opacity: 0;
}

.button {
  appearance: none;
  box-sizing: border-box;
  width: 700rpx;
  font-size: 30rpx;
  margin: 20rpx 25rpx;
  background-color: #0bc15f;
  border-radius: 4rpx;
  text-align: center;
  height: 100rpx;
  line-height: 100rpx;
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
</style>
