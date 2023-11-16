<template>
  <view class="images" v-if="!isRelease">
    <view
      @tap="changePreview"
      class="preview-image"
      :data-src="item.url"
      :style="
        'background-image:url(' +
        item.url +
        ');background-repeat:no-repeat;background-size:100% auto;'
      "
      v-for="(item, index) in imageInfo"
      :key="index"
    >
      <view @tap.stop.prevent="removeImage" class="remove" :data-index="index"
        >移除{{ index + 1 }}
      </view>
    </view>
    <view
      @tap="showActions"
      class="select-image"
      hoverClass="select-image-hover"
      >选择图片
    </view>
    <view class="bottom-tab">
      <view @tap="goToPage" class="tabBtn" data-direction="horizontal"
        >横向拼接
      </view>
      <view @tap="goToPage" class="tabBtn" data-direction="vertical"
        >竖向拼接
      </view>
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
      isRelease: true,
      bannerUnitId: getApp().globalData.bannerUnitId,
      imageInfo: [],
      imageUrls: [],
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
  onLoad() {
    this.setData({
      isRelease: getApp().globalData.isRelease,
    });
  },
  onReady: function () {},
  onShareAppMessage: function () {
    return {
      title: "帮大忙工具箱--图片拼接",
      path: "/pages/my_module/screenshotConnect/screenshotConnect",
    };
  },
  onShareTimeline: function () {},
  methods: {
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

    onChooseSuccess: function (e) {
      var that = this;
      for (var t = 0; t < (e.tempFilePaths || e.tempFiles).length; t++) {
        let fileInfo = (e.tempFilePaths || e.tempFiles)[t];
        if (typeof fileInfo !== "string") {
          fileInfo = fileInfo.path;
        }
        that.getImageInfo(fileInfo);
      }
    },

    chooseFromAlbum: function (e) {
      var that = this;
      uni.chooseImage({
        count: 9,
        sourceType: ["album"],
        success: that.onChooseSuccess,
      });
    },

    chooseFromPhoto: function (e) {
      var that = this;
      uni.chooseImage({
        sourceType: ["camera"],
        count: 9,
        success: that.onChooseSuccess,
      });
    },

    chooseFromMessageFile: function (e) {
      var that = this;
      uni.chooseMessageFile({
        type: "image",
        count: 9,
        success: that.onChooseSuccess,
      });
    },

    getImageInfo: function (e) {
      var that = this;
      uni.getImageInfo({
        src: e,
        success: function (t) {
          var n = that.imageInfo;
          var i = that.imageUrls;
          var s = new Object();
          s.url = e;
          s.width = t.width;
          s.height = t.height;
          n.push(s);
          i.push(e);
          that.setData({
            imageInfo: n,
            imageUrls: i,
          });
        },
      });
    },

    changePreview: function (e) {
      var that = this;
      uni.previewImage({
        current: e.currentTarget.dataset.src,
        urls: that.imageUrls,
      });
    },

    removeImage: function (e) {
      var that = this;
      var t = that.imageInfo;
      var n = that.imageUrls;
      var i = e.currentTarget.dataset.index;
      t.splice(i, 1);
      n.splice(i, 1);
      that.setData({
        imageInfo: t,
        imageUrls: n,
      });
    },

    goToPage: function (e) {
      var that = this;
      var t = e.currentTarget.dataset.direction;
      if (void 0 == that.imageInfo[1]) {
        uni.showToast({
          title: "至少要选两张图！",
          icon: "none",
        });
      } else {
        uni.navigateTo({
          url:
            "./showImage?imageInfo=" +
            JSON.stringify(that.imageInfo) +
            "&direction=" +
            t,
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
}

.preview-image,
.select-image {
  display: block;
  box-sizing: border-box;
  width: 210rpx;
  height: 370rpx;
  overflow: hidden;
  margin-top: 30rpx;
  margin-left: 30rpx;
  box-shadow: 0rpx 0rpx 20rpx rgba(0, 0, 0, 0.2);
  float: left;
  position: relative;
}

.select-image {
  background-color: #0bc15f;
  color: #ffffff;
  text-align: center;
  line-height: 370rpx;
}

.remove {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 24rpx;
  width: 80rpx;
  height: 40rpx;
  line-height: 40rpx;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #f8678d;
  color: #ffffff;
  text-align: center;
  box-shadow: -4rpx 4rpx 10rpx rgba(0, 0, 0, 0.2);
}

.bottom-tab {
  position: fixed;
  z-index: 2;
  bottom: 0;
  left: 0;
  font-size: 30rpx;
  width: 750rpx;
  overflow: hidden;
  box-sizing: border-box;
  color: #ffffff;
  text-align: center;
  box-shadow: 0rpx -4rpx 10rpx rgba(0, 0, 0, 0.2);
}

.tabBtn {
  width: 375rpx;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  float: left;
}

.tabBtn:nth-child(1) {
  background-color: green;
}

.tabBtn:nth-child(2) {
  background-color: orangered;
}

.tabBtn:active,
.select-image-hover {
  background-color: #000000;
}
</style>
