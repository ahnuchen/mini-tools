<template>
  <view class="after-navber">
    <view>
      <view class="top">
        {{ speed }}
        <text style="font-size: 35rpx">kb/s</text>
      </view>
      <view class="bar">你的网速为：{{ speedAsMb }} mb/s</view>
      <view class="bar">速度相当于：{{ speedAsType }}</view>
      <view class="bar">手机品牌：{{ systemInfo.mobilePhone }}</view>
      <view class="bar">手机型号：{{ systemInfo.mobileModel }}</view>
      <view class="bar">系统版本：{{ systemInfo.systemVersion }}</view>
      <view class="bar">网络类型：{{ systemInfo.networkType }}</view>
      <view class="bar">微信版本：{{ systemInfo.wechatVersion }}</view>
      <view class="bar1">请多测试几次较为准确</view>
      <view @tap="startSpeedMeasure" class="button" hoverClass="button-hover"
        >重新测速
      </view>
    </view>

    <!-- <view style="width: 92%;margin: 20rpx auto;">
    <ad unit-id="{{bannerUnitId}}" ad-intervals="30"></ad>
  </view> -->
  </view>
</template>

<script>
var app = getApp();
export default {
  data() {
    return {
      bannerUnitId: getApp().globalData.bannerUnitId,
      speed: 0,
      speedAsMb: 0,
      speedAsType: "0M宽带",
      testUrl: "https://apps.bdimg.com/libs/angular.js/1.4.6/angular.min.js",
      size: 143,
      speedTypeList: [
        {
          name: "0M宽带",
          min: 0,
          max: 77,
        },
        {
          name: "1M宽带",
          min: 77,
          max: 128,
        },
        {
          name: "2M宽带",
          min: 154,
          max: 256,
        },
        {
          name: "3M宽带",
          min: 231,
          max: 384,
        },
        {
          name: "4M宽带",
          min: 307,
          max: 512,
        },
        {
          name: "6M宽带",
          min: 462,
          max: 620,
        },
        {
          name: "8M宽带",
          min: 614,
          max: 1024,
        },
        {
          name: "12M宽带",
          min: 922,
          max: 1536,
        },
        {
          name: "20M宽带",
          min: 1537,
          max: 2560,
        },
        {
          name: "30M宽带",
          min: 2561,
          max: 3840,
        },
        {
          name: "50M宽带",
          min: 3841,
          max: 6400,
        },
        {
          name: "100M宽带",
          min: 7680,
          max: 12800,
        },
      ],
      systemInfo: {
        mobilePhone: "锤子",
        mobileModel: "R10 plus",
        systemVersion: "Smartisan OS",
        networkType: "4G",
        wechatVersion: "6.6.6",
      },
    };
  },
  onLoad: function (e) {
    this.startSpeedMeasure();
  },
  onShow: function () {
    app.globalData.pages = getCurrentPages();
  },
  onShareAppMessage: function (e) {
    return {
      title: "网速测试工具",
      path: "/pages/my_module/networkSpeed/networkSpeed",
    };
  },
  onShareTimeline: function (e) {
    return {
      title: "网速测试工具",
      path: "/pages/my_module/networkSpeed/networkSpeed",
    };
  },
  methods: {
    startSpeedMeasure: function (e) {
      var that = this;
      that.getSystemInfo();
      that.getSpeed(that.testUrl, 1692);
    },

    getSpeed: function (e, n) {
      var that = this;
      var s = n;
      var a = new Date();
      var o = 0;
      uni.showLoading({
        title: "测速中....",
        mask: true,
      });
      uni.downloadFile({
        url: e,
        success: function (e) {
          var n = new Date();
          o = Math.round((1000 * s) / (n - a));
          console.log("start:" + a + "\nend:" + n + "\nspeed:" + o);
          that.setData({
            speed: o,
          });
          that.speedConversion(o);
          uni.hideLoading();
        },
        fail: function (e) {
          uni.hideLoading();
          uni.showToast({
            title: "恭喜你，遇到bug了",
            icon: "none",
          });
        },
      });
    },

    getSystemInfo: function (e) {
      var that = this;
      uni.getSystemInfo({
        success: function (e) {
          console.log(e);
          that.setData({
            "systemInfo.mobilePhone": e.brand,
            "systemInfo.mobileModel": e.model,
            "systemInfo.systemVersion": e.system,
            "systemInfo.wechatVersion": e.version,
          });
        },
        fail: function (e) {
          console.log("get system info fail!!!");
        },
      });
      uni.getNetworkType({
        success: function (e) {
          that.setData({
            "systemInfo.networkType": e.networkType,
          });
        },
        fail: function (e) {
          that.setData({
            "systemInfo.networkType": "无法获取",
          });
        },
      });
    },

    speedConversion: function (e) {
      var that = this;
      var t = that.speedTypeList;
      var s = "0M宽带";
      var a = (e / 1024).toFixed(2);
      that.setData({
        speedAsMb: a,
      });
      for (var o = 0; o < t.length; o++) {
        if (e >= t[o].min) {
          s = t[o].name;
        }
      }
      that.setData({
        speedAsType: s,
      });
    },
  },
};
</script>
<style>
page {
  background-color: #eee;
  color: #757575;
  font-size: 30rpx;
  height: 100% ；;
  margin: 0;
  padding: 0;
  width: 100%;
}

.top {
  background-color: #4ac05e;
  box-sizing: border-box;
  color: #fff;
  font-size: 80rpx;
  font-weight: 700;
  height: 240rpx;
  line-height: 240rpx;
  text-align: center;
  width: 750rpx;
}

.bar {
  background-color: #fff;
  font-size: 30rpx;
  padding-left: 30rpx;
}

.bar,
.bar1 {
  box-shadow: 0rpx 2rpx 2rpx rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  height: 80rpx;
  line-height: 80rpx;
  margin-top: 15rpx;
  overflow: hidden;
  width: 750rpx;
}

.bar1 {
  font-size: 28rpx;
  text-align: center;
}

.bar:active {
  box-shadow: 0rpx 2rpx 10rpx rgba(0, 0, 0, 0.3);
}

.bar:active,
.button {
  background-color: #42bd56;
  color: #fff;
}

.button {
  border-radius: 100rpx;
  box-shadow: 2rpx 2rpx 2rpx rgba(0, 0, 0, 0.2);
  font-size: 30rpx;
  height: 100rpx;
  line-height: 100rpx;
  margin: 25rpx;
  text-align: center;
  width: 700rpx;
}

.button-hover {
  background-color: #02cb6d;
  color: #fff;
}
</style>
