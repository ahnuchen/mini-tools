<template>
  <view class="flag-wrapper">
    <!-- pages/guoqing/guoqing.wxml -->
    <view
      class="hot-biz"
      style="width: 90%; border-radius: 10px; margin-bottom: 15px"
    >
      <view class="hot-top">
        <view class="tx">火爆</view>
      </view>
      <view class="hot-item-list">
        <scroll-view scroll-x>
          <view class="hot-biz-list">
            <view class="item" v-for="(item, index) in list" :key="index">
              <image
                @tap="selectImg"
                :data-id="item"
                :data-src="'../../../static/images/hat' + item + '.png'"
                :src="'../../../static/images/hat' + item + '.png'"
                mode="aspectFill"
              ></image>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>

    <view class="canvas-view">
      <view style="width: 150px; margin-left: 20px; border: 2px solid #ffffff">
        <canvas canvas-id="shareImg" style="width: 150px"></canvas>
      </view>

      <!-- 预览区域 -->
      <view class="canvas-view-right">
        <button @tap="showActions" class="btn">选择头像</button>
        <button @tap="save" class="btn" :disabled="!hasUserInfo">
          保存头像
        </button>
        <button open-type="share" @tap="handleShare" class="btn">
          分享好友
        </button>
      </view>
    </view>
    <!-- <view style="width: 95%;margin: 20rpx auto;">
<ad unit-id="{{videoUnitId}}" ad-type="video" ad-theme="white" ad-intervals="30"></ad>
</view> -->
    <wd-action-sheet
      v-model="show"
      :actions="actions"
      @close="close"
      @select="select"
    />
  </view>
</template>

<script>
// pages/guoqing/guoqing.js
const ctx = uni.createCanvasContext("shareImg");
const app = getApp();
export default {
  data() {
    return {
      isRelease: true,
      title: "国旗头像",
      videoUnitId: getApp().globalData.videoUnitId,
      prurl: "",
      defaultImg: 0,
      avatarUrl: "",
      hasUserInfo: false,
      list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
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
  onLoad: function (options) {
    this.setData({
      isRelease: getApp().globalData.isRelease,
    });
    uni.setNavigationBarTitle({
      title: this.title,
    });
    this.initCanvas(this.defaultImg);
  },
  onShareAppMessage: function () {
    return {
      title: "领取你的国庆专属头像",
      success: function (res) {},
      fail: function (res) {},
    };
  },
  onShareTimeline() {},
  methods: {
    selectImg: function (e) {
      var current = e.target.dataset.id;
      this.setData({
        defaultImg: current,
        prurl: "",
      });
      if (this.avatarUrl != "") {
        this.drawImg(this.avatarUrl);
      } else {
        this.initCanvas(this.defaultImg);
      }
    },

    // 初始化
    initCanvas(index) {
      let that = this;
      //主要就是计算好各个图文的位置
      let num = 150;
      //清除后重画
      ctx.clearRect(0, 0, num, num);
      ctx.drawImage(`../../../static/images/hat${index}.png`, 0, 0, num, num);
      ctx.stroke();
      ctx.draw(false, () => {
        uni.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: num,
          height: num,
          destWidth: 960,
          destHeight: 960,
          canvasId: "shareImg",
          success: function (res) {
            that.setData({
              prurl: res.tempFilePath,
            });
          },
          fail: function (res) {},
        });
      });
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
    onChooseSuccess(res) {
      let that = this;
      let fileInfo = (res.tempFilePaths || res.tempFiles)[0];
      if (typeof fileInfo !== "string") {
        fileInfo = fileInfo.path;
      }
      that.setData({
        avatarUrl: fileInfo,
        hasUserInfo: true,
      });
      that.drawImg(that.avatarUrl);
    },

    drawImg(avatarUrl) {
      let that = this;
      console.log("-- drawImg --");
      let promiseImg = new Promise(function (resolve, reject) {
        uni.getImageInfo({
          src: avatarUrl,
          success: function (res) {
            console.log("promiseImg", res);
            resolve(res);
          },
        });
      });
      var index = that.defaultImg;
      let promiseDefaultImg = new Promise(function (resolve, reject) {
        uni.getImageInfo({
          src: `../../../static/images/hat${index}.png`,
          success: function (res) {
            console.log("promiseDefaultImg", res);
            resolve(res);
          },
        });
      });
      Promise.all([promiseImg, promiseDefaultImg]).then((res) => {
        console.log("Promise.all", res);
        //主要就是计算好各个图文的位置
        let num = 150;
        ctx.drawImage(res[0].path, 0, 0, num, num);
        ctx.drawImage("../../../" + res[1].path, 0, 0, num, num);
        ctx.stroke();
        ctx.draw(false, () => {
          uni.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: num,
            height: num,
            destWidth: 960,
            destHeight: 960,
            canvasId: "shareImg",
            success: function (res) {
              console.log("---canvasToTempFilePath---");
              console.log(res);
              that.setData({
                prurl: res.tempFilePath,
              });
              uni.hideLoading();
            },
            fail: function (res) {
              uni.hideLoading();
            },
          });
        });
      });
    },

    handleShare: function () {
      this.onShareAppMessage();
    },

    save: function () {
      var that = this;
      if (!that.prurl) {
        uni.showToast({
          title: "请先生成头像!",
        });
        return;
      }
      uni.saveImageToPhotosAlbum({
        filePath: that.prurl,
        success(res) {
          uni.showToast({
            title: "已保存",
            mask: true,
          });
        },
      });
    },
  },
};
</script>
<style lang="scss">
/* pages/guoqing/guoqing.wxss */
.flag-wrapper.flag-wrapper {
  height: calc(100vh - var(--window-top));
  height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom));
  height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom));
  background: #607d8b;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
}

.header {
  width: 315px !important;
  height: 125px !important;
}

.canvas-view {
  width: 100%;
  align-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.canvas-view-right {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.btn {
  background-color: $uni-color-primary;
  border-radius: 10rpx;
  color: #ffffff;
  width: 130px !important;
  height: 40px !important;
  font-size: 32rpx;
  height: 50rpx;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  margin-right: 20px;
}

/* list公共 */
.hot-biz {
  margin-top: 10px;
  background: #fff;
}

.hot-biz .tx {
  font-size: 15px;
  margin-left: 10px;
  padding: 9px 0;
  font-weight: 700;
  color: #ff5651;
}

.hot-top {
  display: flex;
}

/* 热门壁纸 */
.hot-item-list {
  margin: 0 auto;
  width: 94%;
  margin-bottom: 20px;
  align-items: center;
}

.hot-biz-list {
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  /* flex-wrap: wrap; */
}

.hot-biz-list .item {
  width: 50px;
  flex-direction: column;
  align-items: center;
  height: 50px;
  padding-right: 8px;
}

.hot-biz-list image {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin: 0 auto;
  display: block;
  border: 1px solid rgb(235, 235, 245);
}

/* end */
</style>
