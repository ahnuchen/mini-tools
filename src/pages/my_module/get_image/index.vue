<template>
  <view class="container" v-if="!isRelease">
    <!-- <ad unit-id="{{bannerUnitId}}" ad-intervals="30"></ad> -->
    <view class="container image">
      <image class="image" :src="imageSrc" mode="aspectFit"></image>
    </view>
    <view class="btns_view">
      <button class="btn cartoon" data-id="3" @tap="getPic">卡通</button>
      <button class="btn cartoon_people" data-id="4" @tap="getPic">
        卡通人
      </button>
      <button class="btn scenery" data-id="2" @tap="getPic">风景</button>
      <!-- <button class="btn dog" data-id="1" bindtap="getPic">一条狗</button>
    <button class="btn cat" data-id="0" bindtap="getPic">一只猫</button> -->
    </view>
    <button
      v-if="imageSrc != ''"
      class="btn_save"
      type="primary"
      @tap="saveImage"
    >
      保存到相册
    </button>
  </view>
</template>

<script>
// app.js

export default {
  data() {
    return {
      isRelease: true,
      bannerUnitId: getApp().globalData.bannerUnitId,
      title: "随机一张图",
      imageSrc: "",
    };
  },
  onShareAppMessage: function () {},
  onShareTimeline: function () {},
  onLoad() {
    this.setData({
      isRelease: getApp().globalData.isRelease,
    });
    console.log("onLoad---");
    uni.setNavigationBarTitle({
      title: this.title,
    });
    this.downloadFile(3);
  },
  methods: {
    launchAppError(e) {
      console.log(e.detail.errMsg);
    },

    saveImage() {
      let _this = this;
      if (_this.imageSrc == "") {
        uni.showToast({
          title: "请先上传图片!",
          icon: "none",
        });
        return;
      }
      uni.saveImageToPhotosAlbum({
        filePath: _this.imageSrc,
        fail(err) {
          uni.showToast({
            title: err.errMsg,
            icon: "none",
          });
        },
      });
    },

    getPic(event) {
      let type = event.currentTarget.dataset.id;
      this.downloadFile(type);
    },

    downloadFile(type) {
      let _this = this;
      uni.showLoading({
        title: "加载中...",
      });
      let url = "";
      if (type == 3) {
        url =
          "https://img.xjh.me/random_img.php?type=bg&ctype=nature&return=302";
      } else if (type == 4) {
        url = "https://img.xjh.me/random_img.php?type=bg&ctype=acg&return=302";
      } else if (type == 2) {
        url = "https://api.btstu.cn/sjbz/api.php";
      }
      const filePath =
        getApp().globalData.cacheFileDir +
        "/" +
        "RandomPic_" +
        new Date().getTime() +
        ".jpg";
      uni.downloadFile({
        url: url,
        filePath: filePath,
        success(res) {
          if (res.statusCode === 200) {
            _this.setData({
              imageSrc: res.filePath,
            });
          }
        },
        complete() {
          uni.hideLoading();
        },
      });
    },
  },
};
</script>
<style>
.container {
  display: flex;
  flex-direction: column;
  padding: 5rpx;
}

.image {
  width: 100%;
  max-height: 320px;
  margin-bottom: 5px;
}

.btn {
  margin-bottom: 10px;
  margin: 0 25px;
}

.btn_save {
  width: 94%;
  margin: 20rpx;
}

/*分割线样式*/
.line {
  background: #e0e3da;
  width: 100%;
  margin-top: 4px;
  height: 2rpx;
}

.btns_view {
  display: flex;
  justify-content: center;
}

.btn {
  color: #fff;
  font-size: 22rpx;
}

.cat {
  background-color: violet;
}

.dog {
  background-color: tomato;
}

.scenery {
  background-color: palevioletred;
}

.cartoon {
  background-color: purple;
}

.cartoon_people {
  background-color: slateblue;
}
</style>
