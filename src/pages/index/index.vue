<template>
  <view class="index-wrapper">
    <view class="cat-wrapper" v-for="cat in categories">
      <view class="cat-title">{{ cat.label }}</view>
      <view class="cat-items">
        <view @click="jump(item.url)" class="cat-item" v-for="item in cat.items">
          <view class="icon">
            <image :src="item.icon || '/static/logo.png'"/>
          </view>
          <view class="detail">
            <view class="title">{{ item.title }}</view>
            <view class="desc">{{ item.shortDesc }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import {categories} from "@/pages/index/categories";


function jump(to: string) {
  uni.navigateTo({
    url: to
  })
}

</script>
<style lang="scss">
.index-wrapper.index-wrapper.index-wrapper {
  height: calc(100vh - var(--window-top));
  height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom));
  height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom));
  background: $uni-bg-color-grey;
  //background: #88bfa2;
  padding-top: 20rpx;

  .cat-wrapper {
    width: 100%;
    box-sizing: border-box;
    padding: 0 30rpx;
    margin: 20rpx auto 0;

    &::after {
      content: ' ';
      clear: both;
      display: block;
    }
  }

  .cat-title {
    font-size: 28rpx;
    color: $uni-text-color;
  }

  .cat-item {
    display: inline-flex;
    width: 330rpx;
    border-radius: 20rpx;
    height: 140rpx;
    align-items: center;
    float: left;
    background-color: #ffffff;
    box-sizing: border-box;
    padding: 20rpx;
    margin-left: 30rpx;
    margin-top: 20rpx;

    &:nth-child(2n - 1) {
      margin-left: 0;
    }
  }

  .icon {
    width: 70rpx;
    height: 70rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .detail {
    height: 96rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    margin-left: 18rpx;
  }

  .title {
    height: 40rpx;
    font-size: 24rpx;
  }

  .desc {
    height: 80rpx;
    flex: 1;
    font-size: 22rpx;
    color: #999999;
    overflow: hidden;
  }

}


</style>
