<template>
  <view>
    <view id="numbers">
      <view id="header">
        <input @blur="setNum1" maxlength="4" type="number" :value="num1" />
        <text class="text1">~</text>
        <input @blur="setNum2" maxlength="4" type="number" :value="num2" />
      </view>
      <view id="result">{{ result }}</view>
    </view>
    <view @tap.stop.prevent="start" v-if="!hideBtn" id="btn-start">摇</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      num1: 1,
      num2: 100,
      result: "?",
      hideBtn: false,
    };
  },
  onLoad: function (a) {
    this.timer = null;
    this.t = 50;
    this.count = 0;
    if (uni.getStorageSync("num1")) {
      this.setData({
        num1: uni.getStorageSync("num1"),
      });
    }
    if (uni.getStorageSync("num2")) {
      this.setData({
        num2: uni.getStorageSync("num2"),
      });
    }
  },
  onHide: function () {
    clearInterval(this.timer);
    this.t = 50;
    this.count = 0;
  },
  onShareAppMessage: function () {
    return {
      title: "随机数字",
      path: "/pages/my_module/randomNum/randomNum",
    };
  },
  onShareTimeline: function (t) {
    return {
      title: "随机数字",
      path: "/pages/my_module/randomNum/randomNum",
    };
  },
  methods: {
    setNum1: function (t) {
      var a = 0;
      if (t.detail.value) {
        a = parseInt(t.detail.value);
      }
      this.setData({
        num1: a,
      });
      uni.setStorageSync("num1", a);
    },

    setNum2: function (t) {
      var a = 0;
      if (t.detail.value) {
        a = parseInt(t.detail.value);
      }
      this.setData({
        num2: a,
      });
      uni.setStorageSync("num2", a);
    },

    start: function () {
      clearTimeout(this.timer);
      this.setData({
        hideBtn: true,
      });
      this.roll();
    },

    roll: function () {
      var t;
      var a;
      if (this.num1 < this.num2) {
        a = this.num1;
        t = this.num2;
      } else {
        a = this.num2;
        t = this.num1;
      }
      var n = a + Math.round(Math.random() * (t - a));
      this.setData({
        result: n,
        hideBtn: false,
      });
    },
  },
};
</script>
<style>
#numbers {
  height: 650rpx;
  position: absolute;
  top: 20%;
  width: 100%;
}

.text1 {
  color: #fff;
}

button[plain] {
  border: 0;
  width: 80px;
}

#header {
  display: flex;
  flex-direction: row;
  font-size: 50rpx;
  justify-content: space-between;
  left: 50%;
  line-height: 150rpx;
  margin-left: -300rpx;
  position: absolute;
  top: 0;
  width: 600rpx;
}

#header input {
  border-radius: 100rpx;
  height: 150rpx;
  line-height: 150rpx;
  width: 150rpx;
}

#header input,
#result {
  background-color: #fff;
  color: #b9a387;
  text-align: center;
}

#result {
  border-radius: 250rpx;
  bottom: 0;
  font-size: 150rpx;
  height: 500rpx;
  line-height: 500rpx;
  margin-left: -250rpx;
  margin-top: -250rpx;
  width: 500rpx;
}

#btn-start,
#result {
  left: 50%;
  position: absolute;
}

#btn-start {
  background-color: #fff;
  border-radius: 75rpx;
  bottom: 9%;
  color: #b9a387;
  font-size: 53rpx;
  height: 150rpx;
  line-height: 150rpx;
  margin-left: -75rpx;
  text-align: center;
  width: 150rpx;
}

page {
  background-color: #454545;
  height: 100%;
}

.icon-back2 {
  height: 64rpx;
  left: 40rpx;
  position: absolute;
  top: 100rpx;
  width: 64rpx;
  z-index: 9999;
}

.help {
  bottom: 60rpx;
  height: 60rpx;
  position: absolute;
  right: 10rpx;
  width: 60rpx;
}

button {
  background: transparent;
  border-radius: 0;
  padding: 0;
}

button::after,
button::before {
  display: none;
}

.cu-modal {
  backface-visibility: hidden;
  background: rgba(0, 0, 0, 0.6);
  bottom: 0;
  left: 0;
  opacity: 0;
  outline: 0;
  perspective: 2000rpx;
  pointer-events: none;
  position: fixed;
  right: 0;
  text-align: center;
  top: 0;
  transform: scale(1.185);
  transition: all 0.3s ease-in-out 0s;
  z-index: 1110;
}

.cu-modal::before {
  content: "\200B";
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}

.cu-modal.show {
  opacity: 1;
  overflow-x: hidden;
  overflow-y: auto;
  pointer-events: auto;
  transform: scale(1);
  transition-duration: 0.3s;
}

.cu-dialog {
  background-color: #f8f8f8;
  border-radius: 10rpx;
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
  overflow: hidden;
  position: relative;
  vertical-align: middle;
  width: 700rpx;
}

.cu-modal.bottom-modal::before {
  vertical-align: bottom;
}

.cu-modal.bottom-modal .cu-dialog {
  border-radius: 0;
  width: 100%;
}

.cu-modal.bottom-modal {
  margin-bottom: -1000rpx;
}

.cu-modal.bottom-modal.show {
  margin-bottom: 0;
}

.cu-modal.drawer-modal {
  display: flex;
  transform: scale(1);
}

.cu-modal.drawer-modal .cu-dialog {
  border-radius: 0;
  height: 100%;
  margin: initial;
  min-width: 0rpx;
  transition-duration: 0.3s;
}

.cu-modal.drawer-modal.justify-start .cu-dialog {
  transform: translateX(-100%);
}

.cu-modal.drawer-modal.justify-end .cu-dialog {
  transform: translateX(100%);
}

.cu-modal.drawer-modal.show .cu-dialog {
  transform: translateX(0);
}

.cu-modal .cu-dialog > .cu-bar:first-child .action {
  margin-right: 0;
  min-height: 100rpx;
  min-width: 100rpx;
}
</style>
