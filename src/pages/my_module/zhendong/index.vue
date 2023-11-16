<template>
  <view class="container" v-if="!isRelease">
    <view
      style="height: 500rpx; line-height: 500rpx"
      :animation="animation"
      class="oval"
    >
      <image
        mode="widthFix"
        src="http://xue.ccy1994.top/xiaochengxu/mini-tools/static/pages/my_module/zhendong/4.png"
        style="width: 100%"
      ></image>
    </view>

    <view
      style="
        text-align: center;
        display: flex;
        justify-content: center;
        margin-top: 200rpx;
      "
    >
      <view @tap="toCollect1" class="download" style="width: 35%; margin: 10px">
        <image
          src="http://xue.ccy1994.top/xiaochengxu/mini-tools/static/pages/my_module/zhendong/1.png"
          style="width: 120rpx; height: 120rpx"
          v-if="isCollect1 == false"
        ></image>
        <image
          src="http://xue.ccy1994.top/xiaochengxu/mini-tools/static/pages/my_module/zhendong/run.png"
          style="width: 120rpx; height: 120rpx"
          v-else-if="isCollect1 == true"
        ></image>
      </view>
      <view @tap="toCollect2" class="download" style="width: 35%; margin: 10px">
        <image
          src="http://xue.ccy1994.top/xiaochengxu/mini-tools/static/pages/my_module/zhendong/2.png"
          style="width: 120rpx; height: 120rpx"
          v-if="isCollect2 == false"
        ></image>
        <image
          src="http://xue.ccy1994.top/xiaochengxu/mini-tools/static/pages/my_module/zhendong/run.png"
          style="width: 120rpx; height: 120rpx"
          v-else-if="isCollect2 == true"
        ></image>
      </view>
      <view @tap="toCollect3" class="download" style="width: 35%; margin: 10px">
        <image
          src="http://xue.ccy1994.top/xiaochengxu/mini-tools/static/pages/my_module/zhendong/3.png"
          style="width: 120rpx; height: 120rpx"
          v-if="isCollect3 == false"
        ></image>
        <image
          src="http://xue.ccy1994.top/xiaochengxu/mini-tools/static/pages/my_module/zhendong/run.png"
          style="width: 120rpx; height: 120rpx"
          v-else-if="isCollect3 == true"
        ></image>
      </view>
    </view>
  </view>
</template>

<script>
getApp();
export default {
  data() {
    return {
      isRelease: true,
      an: false,
      botton: false,
      timer: "",
      timer1: "",
      timer2: "",
      timer3: "",
      isCollect1: false,
      isCollect2: false,
      isCollect3: false,
      bottonStatus: "",
      animation: "",
    };
  },
  onLoad: function (t) {
    this.onLoadClone3389(t);
  },
  onUnload() {
    this.pauseBtn();
  },
  onShareAppMessage: function (t) {
    return {
      title: "震动",
      path: "/pages/my_module/zhendong/index",
    };
  },
  onShareTimeline: function (t) {
    return {
      title: "震动",
      path: "/pages/my_module/zhendong/index",
    };
  },
  methods: {
    onLoadClone3389: function (t) {
      this.setData({
        isRelease: getApp().globalData.isRelease,
      });
      uni.setKeepScreenOn({
        keepScreenOn: true,
      });
      this.setData({
        bottonStatus: "关",
      });
    },

    toCollect1: function () {
      var t = this.isCollect1;
      console.log(t);
      if (0 == t) {
        this.isCollect1 = true;
        this.isCollect2 = false;
        this.isCollect3 = false;
        clearTimeout(this.timer2);
        clearTimeout(this.timer3);
        if (0 == this.an) {
          (this.an = true),
            this.anFun(),
            this.setData({
              bottonStatus: "开",
            });
        }
        this.setData({
          isCollect1: this.isCollect1,
          isCollect2: this.isCollect2,
          isCollect3: this.isCollect3,
        });
        this.startBtn1();
      } else {
        this.isCollect1 = false;
        this.setData({
          isCollect1: this.isCollect1,
        });
        this.pauseBtn();
        uni.redirectTo({
          url: "index?id=1",
        });
      }
    },

    toCollect2: function () {
      var t = this.isCollect2;
      console.log(t);
      if (0 == t) {
        (this.isCollect2 = true),
          (this.isCollect1 = false),
          (this.isCollect3 = false),
          clearTimeout(this.timer1),
          clearTimeout(this.timer3),
          0 == this.an &&
            ((this.an = true),
            this.anFun(),
            this.setData({
              bottonStatus: "开",
            })),
          this.setData({
            isCollect1: this.isCollect1,
            isCollect2: this.isCollect2,
            isCollect3: this.isCollect3,
          }),
          this.startBtn2();
      } else {
        (this.isCollect2 = false),
          this.setData({
            isCollect2: this.isCollect2,
          }),
          this.pauseBtn(),
          uni.redirectTo({
            url: "index?id=1",
          });
      }
    },

    toCollect3: function () {
      var t = this.isCollect3;
      console.log(t);
      0 == t
        ? ((this.isCollect3 = true),
          (this.isCollect1 = false),
          (this.isCollect2 = false),
          clearTimeout(this.timer1),
          clearTimeout(this.timer2),
          0 == this.an &&
            ((this.an = true),
            this.anFun(),
            this.setData({
              bottonStatus: "开",
            })),
          this.setData({
            isCollect1: this.isCollect1,
            isCollect2: this.isCollect2,
            isCollect3: this.isCollect3,
          }),
          this.startBtn3())
        : ((this.isCollect3 = false),
          this.setData({
            isCollect3: this.isCollect3,
          }),
          this.pauseBtn(),
          uni.redirectTo({
            url: "index?id=1",
          }));
    },

    vibrate: function (t) {
      var that = this;
      console.log(that.botton);
      if (1 == that.botton) {
        that.botton = false;
        that.setData({
          bottonStatus: "关",
        });
        that.pauseBtn();
        uni.redirectTo({
          url: "index?id=1",
        });
      } else {
        that.botton = true;
        var i = uni.createAnimation({
          duration: 500,
          timingFunction: "ease",
        });
        that.animation = i;
        var o = true;
        setInterval(
          function () {
            o
              ? (i.translateX(5).step(), (o = !o))
              : (i.translateX(-5).step(), (o = !o));
            that.setData({
              animation: i.export(),
            });
          }.bind(that),
          100,
        );
        that.setData({
          bottonStatus: "开",
        });
        that.startBtn();
      }
    },

    anFun: function () {
      var that = this;
      var a = uni.createAnimation({
        duration: 500,
        timingFunction: "ease",
      });
      that.animation = a;
      var i = true;
      setInterval(
        function () {
          i
            ? (a.translateX(5).step(), (i = !i))
            : (a.translateX(-5).step(), (i = !i));
          that.setData({
            animation: a.export(),
          });
        }.bind(that),
        100,
      );
    },

    startBtn: function () {
      console.log("开始按钮");
      this.Countdown();
    },

    startBtn1: function () {
      console.log("开始按钮");
      this.Countdown1();
    },

    Countdown1: function () {
      var that = this;
      this.timer1 = setTimeout(function () {
        console.log("----Countdown----");
        uni.vibrateLong();
        that.Countdown1();
      }, 600);
    },

    startBtn2: function () {
      console.log("开始按钮");
      this.Countdown2();
    },

    Countdown2: function () {
      var that = this;
      this.timer2 = setTimeout(function () {
        console.log("----Countdown----");
        uni.vibrateLong();
        that.Countdown2();
      }, 400);
    },

    startBtn3: function () {
      console.log("开始按钮");
      this.Countdown3();
    },

    Countdown3: function () {
      var that = this;
      this.timer3 = setTimeout(function () {
        console.log("----Countdown----");
        uni.vibrateLong();
        that.Countdown3();
      }, 300);
    },

    pauseBtn: function () {
      console.log("暂停按钮");
      clearTimeout(this.timer);
      clearTimeout(this.timer1);
      clearTimeout(this.timer2);
      clearTimeout(this.timer3);
      this.onLoadClone3389({});
    },

    Countdown: function () {
      var that = this;
      this.timer = setTimeout(function () {
        console.log("----Countdown----");
        uni.vibrateLong();
        that.Countdown();
      }, 350);
    },
  },
};
</script>
<style>
.userinfo {
  align-items: center;
  display: flex;
  flex-direction: column;
}

.userinfo-avatar {
  border-radius: 50%;
  height: 128rpx;
  margin: 20rpx;
  width: 128rpx;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 200px;
}

.oval {
  width: 100%;
}

.circle {
  border: 0 solid #fff;
  border-radius: 500px;
  height: 30px;
  width: 30px;
}

.adContainer {
  width: 100%;
}
</style>
