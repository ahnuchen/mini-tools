<template>
  <view class="page">
    <view class="mainBox">
      <view class="box">
        <picker @change="dateChange" mode="date">
          <view class="title">距离{{ goalDate }}</view>
        </picker>
        <view class="day">
          {{ day }}
          <text>天</text>
        </view>
      </view>
      <view id="countdown">
        <view id="tiles">
          <text>{{ hours }}</text>
          <text>{{ minutes }}</text>
          <text>{{ seconds }}</text>
        </view>
        <view class="labels">
          <view>时</view>
          <view>分</view>
          <view>秒</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      goalDate: "",
      date: "",
      day: "",
      hours: "",
      minutes: "",
      seconds: "",
      intervalId: 0,
    };
  },
  onLoad: function (t) {
    var e = new Date().getFullYear() + 1 + "/1/1";
    if (uni.getStorageSync("last")) {
      e = uni.getStorageSync("last");
    }
    this.setData({
      date: e,
      goalDate: this.formateDate(new Date(e)),
    });
    this.start();
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {
    clearInterval(this.intervalId);
  },
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {
    return {
      title: "日期倒计时",
      path: "/pages/my_module/countDown/countDown",
    };
  },
  onShareTimeline: function (t) {
    return {
      title: "日期倒计时",
      path: "/pages/my_module/countDown/countDown",
    };
  },
  methods: {
    start: function () {
      var that = this;
      var e = new Date(this.date);
      var a = e - new Date();
      this.formate(a);
      this.setData({
        intervalId: setInterval(function () {
          var a = e - new Date();
          that.formate(a);
        }, 1000),
      });
    },

    dateChange: function (t) {
      var e = t.detail.value.split("-").map(function (t) {
        return Number(t);
      });
      clearInterval(this.intervalId);
      this.setData({
        date: e[0] + "/" + e[1] + "/" + e[2],
        goalDate: e[0] + "年" + e[1] + "月" + e[2] + "日",
      });
      uni.setStorage({
        key: "last",
        data: e[0] + "/" + e[1] + "/" + e[2],
      });
      this.start();
    },

    formateDate: function () {
      var t =
        arguments.length > 0 && void 0 !== arguments[0]
          ? arguments[0]
          : new Date();
      return (
        t.getFullYear() + "年" + (t.getMonth() + 1) + "月" + t.getDate() + "日"
      );
    },

    formate: function (t) {
      this.setData({
        day: Math.floor(t / 86400000) + "",
        hours: Math.floor((t % 86400000) / 3600000) + "",
        minutes: Math.floor(((t % 86400000) % 3600000) / 60000) + "",
        seconds: Math.floor((((t % 86400000) % 3600000) % 60000) / 1000) + "",
      });
    },
  },
};
</script>
<style>
.mainBox,
.page {
  height: 100%;
}

.fixed-bottom {
  height: 15%;
}

.box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
}

.title {
  color: #ffeb3b;
  font-size: 75rpx;
  margin-top: 100rpx;
  text-decoration: underline;
}

.day {
  font-size: 300rpx;
  height: 500rpx;
  line-height: 500rpx;
}

.day text {
  font-size: 30rpx;
}

page {
  word-wrap: break-word;
  background: #353535;
  color: #eee;
  font:
    normal 19.5rpx/30rpx Arial,
    Helvetica,
    sans-serif;
}

#countdown {
  background: #222;
  background-image: -webkit-linear-gradient(top, #222, #333, #333, #222);
  border: 1.5rpx solid #111;
  border-radius: 7.5rpx;
  bottom: 300rpx;
  box-shadow: 0rpx 0rpx 12rpx rgba(0, 0, 0, 0.6);
  height: 180rpx;
  left: 0;
  margin: auto;
  padding: 36rpx 0;
  position: absolute;
  right: 0;
  text-align: center;
  width: 600rpx;
}

#countdown:before {
  border: 1.5rpx solid #111;
  border-bottom-left-radius: 9rpx;
  border-top-left-radius: 9rpx;
  left: -15rpx;
}

#countdown:after,
#countdown:before {
  background: #444;
  background-image: -webkit-linear-gradient(top, #555, #444, #444, #555);
  content: "";
  display: block;
  height: 97.5rpx;
  position: absolute;
  top: 72rpx;
  width: 12rpx;
}

#countdown:after {
  border: 1.5rpx solid #111;
  border-bottom-right-radius: 9rpx;
  border-top-right-radius: 9rpx;
  right: -15rpx;
}

#countdown #tiles {
  position: relative;
  z-index: 1;
}

#countdown #tiles > text {
  background-color: #ddd;
  background-image: -webkit-linear-gradient(top, #bbb, #eee);
  border-radius: 4.5rpx;
  border-top: 1.5rpx solid #fff;
  box-shadow: 0rpx 0rpx 18rpx rgba(0, 0, 0, 0.7);
  color: #111;
  display: inline-block;
  font:
    700 72rpx Droid Sans,
    Arial,
    sans-serif;
  margin: 0 10.5rpx;
  max-width: 138rpx;
  padding: 27rpx 0;
  position: relative;
  text-align: center;
  width: 138rpx;
}

#countdown #tiles > text:before {
  background: #111;
  content: "";
  display: block;
  height: 19.5rpx;
  left: -4.5rpx;
  padding: 0 4.5rpx;
  position: absolute;
  top: 41%;
  width: 100%;
  z-index: -1;
}

#countdown #tiles > text:after {
  background: #eee;
  border-top: 1.5rpx solid #333;
  content: "";
  display: block;
  height: 1.5rpx;
  left: 0;
  position: absolute;
  top: 48%;
  width: 100%;
}

#countdown .labels {
  bottom: 17rpx;
  height: 37.5rpx;
  position: absolute;
  text-align: center;
  width: 100%;
}

#countdown .labels view {
  color: #07c160;
  display: inline-block;
  font:
    700 22.5rpx Droid Sans,
    Arial,
    sans-serif;
  text-align: center;
  text-shadow: 1.5rpx 1.5rpx 0rpx #000;
  text-transform: uppercase;
  width: 153rpx;
}
</style>
