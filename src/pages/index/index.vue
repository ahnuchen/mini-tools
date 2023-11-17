<template>
  <view class="index-wrapper">
    <wd-grid
      clickable
      :gutter="10"
      square
      :column="4"
      v-for="cat in categories"
    >
      <view class="cat-title">{{ cat.label }}</view>
      <wd-grid-item
        use-icon-slot
        :text="item.title"
        :url="item.url"
        v-for="item in cat.items"
        :key="item.url"
        icon-size="52rpx"
      >
        <template #icon>
          <view class="icon">
            <image :src="item.icon || '/static/logo.png'" />
          </view>
          <!--          <image class="slot-img" :src="item.icon || '/static/logo.png'" />-->
        </template>
      </wd-grid-item>
    </wd-grid>
  </view>
</template>

<script lang="ts" setup>
import { categories } from "@/pages/index/categories";
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";

const shareInfo = {
  path: "/pages/index/index",
  title: "帮大忙工具箱",
  desc: "亲戚计算，手持弹幕，二维码生成",
};

onShareAppMessage(() => shareInfo);

onShareTimeline(() => shareInfo);

function jump(to: string) {
  console.log(`%c jump`, "color: pink;font-size:20px;background:black;");
  uni.navigateTo({
    url: to,
  });
}
</script>
<style lang="scss">
.index-wrapper.index-wrapper.index-wrapper {
  height: calc(100vh - var(--window-top));
  height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom));
  height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom));
  overflow-y: auto;
  padding-bottom: 40rpx;
  -webkit-overflow-scrolling: touch;
  background: $uni-bg-color-grey;
  //background: #88bfa2;
  padding-top: 20rpx;

  .cat-wrapper {
    width: 100%;
    box-sizing: border-box;
    padding: 0 30rpx;
    margin: 20rpx auto 0;

    &::after {
      content: " ";
      clear: both;
      display: block;
    }
  }

  .cat-title {
    font-size: 28rpx;
    color: $uni-text-color-grey;
    margin-bottom: 20rpx;
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
    width: 50rpx;
    height: 50rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .detail {
    height: 100rpx;
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
    word-break: break-all;
  }
}
</style>
