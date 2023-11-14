<template>
  <view class="index-wrapper">
    <wd-sidebar :model-value="active" custom-class="sidebar" @change="handleChange">
      <wd-sidebar-item custom-class="side-item" v-for="(item, index) in categories" :key="index" :value="index"
                       :label="item.label" :icon="item.icon"/>
    </wd-sidebar>
    <scroll-view class="scroll-content" scroll-y scroll-with-animation :scroll-top="scrollTop" :throttle="false"
                 @scroll="onScroll">
      <view v-for="(item, index) in categories" :key="index" class="category">
        <wd-cell-group :title="item.title" border>
          <wd-cell v-for="(cell, index) in item.items" :key="index" :title="cell.title"
                   :is-link="!!cell.url" :to="cell.url">
          </wd-cell>
        </wd-cell-group>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {getRect, isArray} from 'wot-design-uni/components/common/util'
import {categories} from "@/pages/index/categories";


const active = ref<number>(0)
const scrollTop = ref<number>(0)
const itemScrollTop = ref<number[]>([])


onMounted(() => {
  getRect('.category', true).then((rects) => {
    if (isArray(rects)) {
      itemScrollTop.value = rects.map((item) => item.top || 0)
      scrollTop.value = rects[active.value].top || 0
    }
  })
})

function handleChange({value}: any) {
  active.value = value
  scrollTop.value = itemScrollTop.value[value]
}

function onScroll(e) {
  const {scrollTop} = e.detail
  const threshold = 50 // 下一个标题与顶部的距离
  if (scrollTop < threshold) {
    active.value = 0
    return
  }
  const index = itemScrollTop.value.findIndex((top) => top > scrollTop && top - scrollTop <= threshold)
  if (index > -1) {
    active.value = index
  }
}
</script>
<style lang="scss">
.index-wrapper.index-wrapper.index-wrapper {
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
