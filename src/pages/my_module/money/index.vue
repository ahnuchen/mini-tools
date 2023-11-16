<template>
  <view class="container">
    <view class="money">
      <image
        style="height: 100rpx; width: 100rpx"
        src="http://xue.ccy1994.top/xiaochengxu/mini-tools/static/pages/my_module/money/money.png"
      ></image>
    </view>
    <view class="money1">我的金币</view>
    <view class="money21">
      <view class="money-icon">$</view>
      <view class="money2">{{ filters.toFix(num, 2) }}</view>
    </view>
    <!-- <view class="money3">转入金币></view> -->
    <view class="padding flex flex-direction">
      <button class="bg-green" open-type="share">分享好友</button>
      <button class="bg-grey" @tap="toast">转出金币</button>
    </view>
    <!-- <view style="display: flex;flex-direction: row;"> -->
    <!-- <view class="money6">常见问题</view> -->
    <view class="money5">本服务由本小程序提供,仅供娱乐</view>
    <!-- </view> -->
  </view>
</template>
<script module="filters" lang="wxs" src="../../utils/filter.wxs"></script>
<script>
export default {
  data() {
    return {
      setInter: "",
      title: "插电充钱",
      num: 100, //起始值
    };
  },
  onShareAppMessage: function () {},
  onShareTimeline: function () {},
  onShow() {
    uni.setNavigationBarTitle({
      title: this.title,
    });
    try {
      let money = uni.getStorageSync("wx_money");
      this.setData({
        num: money ? money : 100,
      });
    } catch (e) {
      console.log("CatchClause", e);
      console.log("CatchClause", e);
    }
    this.time();
  },
  onUnload() {
    try {
      uni.setStorageSync("wx_money", this.num);
    } catch (e) {
      console.log("CatchClause", e);
      console.log("CatchClause", e);
    }
    clearInterval(this.setInter);
  },
  methods: {
    time() {
      var _this = this;
      _this.setInter = setInterval(function () {
        uni.getBatteryInfo({
          success(res) {
            if (res.isCharging == true) {
              var numVal = _this.num + Math.floor(Math.random() * 100) / 100;
              _this.setData({
                num: numVal,
              });
            }
          },
        });
      }, 300);
    },

    toast() {
      uni.showToast({
        title: "仅供娱乐!",
        icon: "none",
      });
    },
  },
};
</script>
<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
}

.money {
  padding-top: 250rpx;
}

.money1 {
  padding-top: 20rpx;
}

.money-icon {
  font-size: 80rpx;
}

.money2 {
  font-weight: 560;
  font-size: 80rpx;
}

.money21 {
  display: flex;
  flex-direction: row;
  padding-top: 20rpx;
  padding-bottom: 30rpx;
  font-size: 65rpx;
}

.money3 {
  color: orange;
}

.money4 {
  color: blue;
}

.money5 {
  color: #b2b0b1;
  position: fixed;
  bottom: 55rpx;
  font-size: 30rpx;
}

.money6 {
  color: #636e8e;
  position: fixed;
  bottom: 70rpx;
  font-size: 28rpx;
}

.padding {
  padding-top: 300rpx;
  width: 370rpx;
}

.bg-green {
  background-color: #c3272b;
  color: #fff;
  margin-bottom: 20rpx;
}

.bg-grey {
  background-color: #eaeaea;
  color: #0bbc61;
}

page {
  height: 100%;
  background-color: white;
}
</style>
