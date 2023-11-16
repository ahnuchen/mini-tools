<template>
  <view>
    <page
      @tap.native="change"
      :class="
        changeColor == 0
          ? 'blackPage'
          : changeColor == 1
            ? 'orangePage'
            : 'whitePage'
      "
    >
      <view class="clock" :style="'padding-top:' + height + 'px;'">
        <view class="displayTime" :style="'transform:' + diretion + ';'">
          <text class="hourAndMin">{{ time }}</text>
          <text class="sec">{{ sec }}</text>
        </view>
      </view>
    </page>
  </view>
</template>

<script>
var app = getApp();
export default {
  data() {
    return {
      time: "22:42",
      sec: "13",
      height: 0,
      width: 0,
      diretion: "rotate(90deg)",
      flag: true,
      changeColor: 0,
      display: "",
      test: "",
    };
  },
  onLoad: function (t) {
    let screenHeight = uni.getSystemInfoSync().screenHeight;
    this.setData({
      height: (screenHeight - 220) / 2,
      width: screenHeight,
    });
  },
  onReady: function () {},
  onShow: function () {
    var that = this;
    that.displayTime(that);
    that.display = setInterval(that.displayTime, 1000, that);
    that.test = setInterval(that.testState, 500);
  },
  onHide: function () {
    clearInterval(this.display);
    clearInterval(this.test);
    uni.stopAccelerometer();
  },
  onUnload: function () {
    clearInterval(this.display);
    clearInterval(this.test);
    uni.stopAccelerometer();
  },
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function (t) {
    return {
      title: "全屏时钟",
      path: "/pages/index/index",
    };
  },
  onShareTimeline: function (t) {
    return {
      title: "全屏时钟",
      path: "/pages/index/index",
    };
  },
  methods: {
    change: function () {
      var that = this;
      if (0 == that.changeColor) {
        that.setData({
          changeColor: 1,
        });
      } else {
        if (1 == that.changeColor) {
          that.setData({
            changeColor: 2,
          });
        } else if (2 == that.changeColor) {
          that.setData({
            changeColor: 0,
          });
        }
      }
    },

    testState: function () {
      var that = this;
      var e = Date.now();
      uni.startAccelerometer();
      uni.onAccelerometerChange(function (a) {
        var n = Date.now();
        if (!(n - e < 500)) {
          e = n;
          var i = 57.3 * Math.atan2(-a.x, Math.sqrt(a.y * a.y + a.z * a.z));
          Math.atan2(a.y, a.z);
          console.log(i);
          if ((i > -1 && i <= 180) || (i > -360 && i < -180) || -0 == i) {
            if (1 == that.flag) {
              return;
            }
            if (0 == that.flag) {
              that.setData({
                diretion: "rotate(90deg)",
              });
            }
            that.setData({
              flag: true,
            });
          } else if ((i < -1 && i >= -180) || (i > 180 && i < 360)) {
            if (0 == that.flag) {
              return;
            }
            if (1 == that.flag) {
              that.setData({
                diretion: "rotate(-90deg)",
              });
            }
            that.setData({
              flag: false,
            });
          }
        }
      });
    },

    displayTime: function (t) {
      var e;
      var a = new Date();
      var n = a.getHours();
      var i = a.getMinutes();
      var o = a.getSeconds();
      if (n < 10) {
        n = "0" + n;
      }
      if (i < 10) {
        i = "0" + i;
      }
      if (o < 10) {
        o = "0" + o;
      }
      e = n + ":" + i;
      t.time = e;
      t.sec = o;
      this.setData({
        time: e,
        sec: o,
      });
    },
  },
};
</script>
<style>
page {
  background-color: #000;
}

.blackPage {
  color: #fff;
}

.whitePage {
  color: #39b54a;
}

.orangePage {
  color: #ffb54a;
}

.clock {
  font-family: 微软雅黑;
  margin: 0;
  padding: 0;
}

.displayTime {
  align-items: center;
  display: flex;
  justify-content: center;
}

.hourAndMin {
  font-size: 350rpx;
  margin-left: -50rpx;
}

.sec {
  font-size: 80rpx;
  margin-left: 30rpx;
  margin-top: 200rpx;
}
</style>
