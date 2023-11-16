<template>
  <view>
    <view class="view_input">
      <input
        class="input"
        placeholder="请输入ip地址,例如:255.255.255.255"
        :value="name"
        @input="bindKeyInput"
      />
      <button class="button_search" type="primary" @tap="bindTap">查询</button>
    </view>
    <view class="items">
      <view class="item">
        <view>目标:</view>
        <text class="item_value" selectable>{{ item.ip }}</text>
      </view>
      <view class="item">
        <view>ip归属:</view>
        <text class="item_value" selectable>{{ item.src }}</text>
      </view>
      <!-- <view class="item">
    <view>经纬度:</view>
    <text class="item_value" selectable>{{item.latLong}}
    </text>
  </view> -->
    </view>
    <!-- <ad unit-id="{{bannerUnitId}}" ad-intervals="30" style="position: fixed; bottom: 50rpx;"></ad> -->
  </view>
</template>

<script>
// pages/my_module/ip_info/index.js
export default {
  data() {
    return {
      title: "ip信息",
      bannerUnitId: getApp().globalData.bannerUnitId,
      name: "",
      item: {
        ip: "",
        src: "",
        latLong: "",
      },
    };
  },
  onLoad(options) {
    uni.setNavigationBarTitle({
      title: this.title,
    });
    this.getItem();
  },
  methods: {
    bindKeyInput(e) {
      this.setData({
        name: e.detail.value,
      });
    },

    bindTap() {
      let _this = this;
      if (!_this.name && _this.name.length > 20) {
        uni.showToast({
          title: "太长了!",
          icon: "none",
        });
        return;
      }
      _this.setData({
        item: {},
      });
      this.getItem();
    },

    getItem() {
      let _this = this;
      uni.showLoading({
        title: "加载中...",
      });
      uni.request({
        url:
          "https://whois.pconline.com.cn/ipJson.jsp?json=true&ip=" + _this.name,
        success: (res) => {
          console.log(res);
          uni.hideLoading();
          if (res.statusCode == 200) {
            _this.setData({
              item: {
                ip: res.data["ip"],
                src: res.data["addr"],
              },
            });
          } else {
            uni.showToast({
              title: "服务器繁忙,请稍后再试!",
              icon: "none",
            });
          }
        },
        fail: (res) => {
          uni.showToast({
            title: "网络繁忙,请稍后再试!",
            icon: "none",
          });
        },
      });
    },
  },
};
</script>
<style>
/* pages/my_module/ip_info/index.wxss */

.view_input {
  width: 96%;
  margin-bottom: 10rpx;
  margin-top: 10rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10rpx auto;
}

.input {
  width: 80%;
  border-radius: 10rpx;
  border: 2rpx solid green;
  height: 65rpx;
  font-size: 24rpx;
  padding: 5rpx 10rpx;
  margin: 5rpx auto;
}

.button_search {
  width: 120rpx;
  margin-left: 10rpx;
  font-size: 30rpx;
}

.items {
  margin: 10rpx 20rpx;
  background-color: #fff;
  padding: 15rpx;
  border-radius: 15rpx;
}

.item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 36rpx;
  text-align: center;
  align-items: center;
  padding: 15rpx;
}

.item_value {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: green;
  text-align: center;
  align-items: center;
  font-size: 26rpx;
}
</style>
