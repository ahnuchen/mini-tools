<template>
  <view class="carnumber-wrapper">
    <wd-sidebar
      :model-value="active"
      custom-class="sidebar"
      @change="handleChange"
    >
      <wd-sidebar-item
        custom-class="side-item"
        v-for="(item, index) in areas"
        :key="item.key"
        :value="index"
        :label="item.title"
      />
    </wd-sidebar>
    <scroll-view
      class="scroll-content"
      scroll-y
      scroll-with-animation
      :scroll-top="scrollTop"
      :throttle="false"
      @scroll="onScroll"
      enable-back-to-top
    >
      <view v-for="(item, index) in areas" :key="index" class="category">
        <wd-cell-group :title="item.title" border>
          <wd-cell
            v-for="(cell, index) in item.items"
            :key="index"
            :value="cell.title"
            :title="cell.label"
          >
          </wd-cell>
        </wd-cell-group>
      </view>
    </scroll-view>
    <FloatBtn
      desc="车牌在线查询工具，它提供全国各地车牌的序号，用户可以根据车牌查询用具快速了解车牌号属于的省市。同时，应用程序界面简洁易用，操作相对方便，非常适合车主使用"
    />
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import areas from "./areas";
import { getRect, isArray } from "wot-design-uni/components/common/util";
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";

const active = ref<number>(0);
const scrollTop = ref<number>(0);
const itemScrollTop = ref<number[]>([]);

onMounted(() => {
  getRect(".category", true).then((rects) => {
    if (isArray(rects)) {
      itemScrollTop.value = rects.map((item) => item.top || 0);
      scrollTop.value = rects[active.value].top || 0;
    }
  });
});

function handleChange({ value }: any) {
  active.value = value;
  scrollTop.value = itemScrollTop.value[value];
}

function onScroll(e) {
  const { scrollTop } = e.detail;
  const threshold = 50; // 下一个标题与顶部的距离
  if (scrollTop < threshold) {
    active.value = 0;
    return;
  }
  const index = itemScrollTop.value.findIndex(
    (top) => top > scrollTop && top - scrollTop <= threshold,
  );
  if (index > -1) {
    active.value = index;
  }
}

const shareInfo = {
  path: "/pages/carnumber/carnumber",
  title: "车牌归属地查询",
};

onShareAppMessage(() => shareInfo);

onShareTimeline(() => shareInfo);
</script>

<style lang="scss">
.carnumber-wrapper.carnumber-wrapper.carnumber-wrapper {
  display: flex;
  height: calc(100vh - var(--window-top));
  height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom));
  height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom));

  .sidebar {
    width: 250rpx;

    .side-item {
      justify-content: flex-start;
      font-size: 32rpx;
    }
  }

  .scroll-content {
    flex: 1;
    background: #fff;
  }
}
</style>
