<template>
  <view>
    <form @submit="createDanmu">
      <!-- <ad unit-id="{{bannerUnitId}}" ad-intervals="30"></ad> -->
      <input
        class="input"
        name="content"
        placeholder="请填上弹幕内容"
        value=""
      />
      <view class="section">
        <view class="section_title">速度</view>
        <slider
          showValue
          activeColor="#0BC15F"
          blockSize="15"
          class="section_input"
          max="10"
          min="1"
          name="speed"
          value="7"
        ></slider>
      </view>
      <view class="section">
        <view class="section_title">字体大小</view>
        <slider
          showValue
          activeColor="#0BC15F"
          blockSize="15"
          class="section_input"
          max="200"
          min="15"
          name="fontSize"
          value="100"
        ></slider>
      </view>
      <view class="section">
        <view class="section_title">字体颜色</view>
        <picker
          @change="selectFontColor"
          class="picker"
          name="fontColor"
          :range="color_array"
          :value="font_color_index"
        >
          <view class="section_input"
            >当前选择：{{ color_array[font_color_index] }}</view
          >
        </picker>
      </view>
      <view class="section">
        <view class="section_title">背景颜色</view>
        <picker
          @change="selectBgColor"
          class="picker"
          name="bgColor"
          :range="color_array"
          :value="bg_color_index"
        >
          <view class="section_input"
            >当前选择：{{ color_array[bg_color_index] }}</view
          >
        </picker>
      </view>
      <view class="section">
        <view class="section_title">字体方向</view>
        <radio-group color="#0BC15F" name="direction">
          <label class="radio">
            <radio color="#0BC15F" value="leftToRight"></radio>
            从左往右
          </label>
          <label class="radio">
            <radio :checked="true" color="#0BC15F" value="rightToLeft"></radio>
            从右往左
          </label>
        </radio-group>
      </view>
      <view>
        <button class="button" formType="submit" hoverClass="button-hover">
          生成弹幕
        </button>
      </view>
    </form>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isRelease: true,
      bannerUnitId: getApp().globalData.bannerUnitId,
      color_array: ["白", "黑", "红", "橙", "黄", "绿", "青", "蓝", "紫"],
      font_color_index: 0,
      bg_color_index: 1,
    };
  },
  onLoad() {
    this.setData({
      isRelease: getApp().globalData.isRelease,
    });
  },
  onShareAppMessage: function (o) {
    return {
      title: "帮大忙工具箱--手持弹幕",
      path: "/pages/my_module/danmu/danmu",
    };
  },
  onShareTimeline: function () {},
  methods: {
    selectFontColor: function (o) {
      this.setData({
        font_color_index: o.detail.value,
      });
    },

    selectBgColor: function (o) {
      this.setData({
        bg_color_index: o.detail.value,
      });
    },

    createDanmu: function (o) {
      var e = o.detail.value;
      var t = e.content;
      (t && "" != t) || (t = "请输入弹幕内容");
      console.log(e);
      uni.navigateTo({
        url:
          "show_danmu?content=" +
          t +
          "&speed=" +
          e.speed +
          "&fontSize=" +
          e.fontSize +
          "&fontColor=" +
          e.fontColor +
          "&bgColor=" +
          e.bgColor +
          "&direction=" +
          e.direction,
      });
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

.input {
  background-color: #ffffff;
  width: 720rpx;
  height: 120rpx;
  line-height: 120rpx;
  font-size: 30rpx;
  box-sizing: border-box;
  padding: 0 30rpx;
  margin: 20rpx 15rpx;
  border: none;
  box-shadow: 2rpx 2rpx 2rpx rgba(0, 0, 0, 0.2);
}

.section {
  box-sizing: border-box;
  width: 720rpx;
  margin: 0 15rpx;
  margin-top: 15rpx;
  background-color: #ffffff;
  border: none;
  padding: 15rpx 30rpx;
  box-shadow: 0 1rpx 1rpx rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.section_title {
  box-sizing: border-box;
  font-size: 24rpx;
}

.section_input {
  text-align: center;
  box-sizing: border-box;
}

.radio {
  width: 330rpx;
  height: 80rpx;
  line-height: 80rpx;
  box-sizing: border-box;
  overflow: hidden;
  float: left;
}

.picker {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  box-sizing: border-box;
  overflow: hidden;
}

.button {
  appearance: none;
  box-sizing: border-box;
  width: 700rpx;
  font-size: 30rpx;
  margin: 0 25rpx;
  margin-top: 20rpx;
  background-color: #0bc15f;
  border-radius: 4rpx;
  text-align: center;
  height: 100rpx;
  line-height: 100rpx;
  color: #ffffff;
  border: none;
}

.button::after {
  border: none;
}

.button-hover {
  background-color: #000000;
  color: #ffffff;
}
</style>
