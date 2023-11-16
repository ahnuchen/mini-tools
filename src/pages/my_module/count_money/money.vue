<template>
  <view class="container" v-if="!isRelease">
    <view class="title" style="color: #333">
      <text style="margin-left: 20rpx">{{ "时间: " + time + "s" }}</text>
      <text style="margin-right: 20rpx">
        我有
        <text style="color: orangered">{{ 100 * money }}</text>
        元
      </text>
    </view>
    <view style="width: 100%">
      <swiper
        @change="moreMoney"
        :circular="true"
        style="width: 100%; height: 1200rpx"
      >
        <swiper-item style="text-align: center">
          <image
            mode="widthFix"
            src="http://xue.ccy1994.top/xiaochengxu/mini-toolshttp://xue.ccy1994.top/xiaochengxu/mini-tools/static/pages/my_module/count_money/rmb.jpg"
            style="width: 70%"
          ></image>
        </swiper-item>
        <swiper-item style="text-align: center">
          <image
            mode="widthFix"
            src="http://xue.ccy1994.top/xiaochengxu/mini-toolshttp://xue.ccy1994.top/xiaochengxu/mini-tools/static/pages/my_module/count_money/rmb.jpg"
            style="width: 70%"
          ></image>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isRelease: true,
      wxad: [],
      money: 1,
      time: 0,
      components: {},
      props: {},
    };
  },
  onLoad: function (t) {
    this.setData({
      isRelease: getApp().globalData.isRelease,
    });
    var that = this;
    setInterval(function () {
      that.setData({
        time: that.time + 1,
      });
    }, 1000);
    uni.showToast({
      title: "玩法介绍:左右滑动",
      icon: "none",
      duration: 2000,
    });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {
    return {
      title: "数钱",
      path: "/pages/my_module/count_money/money",
    };
  },
  onShareTimeline: function (n) {
    return {
      title: "数钱",
      path: "/pages/my_module/count_money/money",
    };
  },
  methods: {
    moreMoney: function () {
      console.log(123);
      var that = this;
      that.setData({
        money: that.money + 1,
      });
    },
  },
};
</script>
<style>
page {
  background-color: #63c0b4;
}

.title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 30rpx auto;
  width: 100%;
}
</style>
