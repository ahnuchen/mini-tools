<template>
  <view class="wraper">
    <wd-sidebar :model-value="active" custom-class="sidebar" @change="handleChange">
      <wd-sidebar-item custom-class="side-item" v-for="(item, index) in categories" :key="index" :value="index"
                       :label="item.label" :icon="item.icon"/>
    </wd-sidebar>
    <scroll-view class="scroll-content" scroll-y scroll-with-animation :scroll-top="scrollTop" :throttle="false"
                 @scroll="onScroll">
      <view v-for="(item, index) in categories" :key="index" class="category">
        <wd-cell-group :title="item.title" border>
          <wd-cell v-for="(cell, index) in item.items" :key="index" :title="cell.title" :label="cell.label || ''"
                   :is-link="!!cell.url" :to="cell.url">
          </wd-cell>
        </wd-cell-group>
      </view>
    </scroll-view>
    <wd-message-box/>
  </view>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {getRect, isArray} from 'wot-design-uni/components/common/util'


const active = ref<number>(0)
const scrollTop = ref<number>(0)
const itemScrollTop = ref<number[]>([])

const subCategories = new Array(24).fill({
  title: '标题文字',
  label: '这是描述这是描述',
  url: '/pages/qrcode/index'
}, 0, 24)
const categories = ref([
  {
    label: '图片工具',
    title: '图片工具',
    icon: 'thumb-up',
    items: [
      {
        title: '二维码生成',
        label: '将文字或者链接转换成二维码',
        url: '/pages/qrcode/index'
      }
    ]
  },
  {
    label: '分二',
    title: '标题二',
    icon: 'qrcode',
    items: subCategories
  },
  {
    label: '三',
    title: '标题三',
    icon: 'location',
    items: subCategories.slice(0, 18)
  },
  {
    label: '分类四',
    title: '标题四',
    icon: 'ie',
    items: subCategories.slice(0, 21)
  },
  {
    label: '分类五',
    title: '标题五',
    icon: 'github-filled',
    items: subCategories
  },
  {
    label: '分类六',
    title: '标题六',
    icon: 'chrome',
    items: subCategories.slice(0, 18)
  },
  {
    label: '分类七',
    title: '标题七',
    icon: 'android',
    items: subCategories
  }
])

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
.wraper.wraper.wraper {
  display: flex;
  height: calc(100vh - var(--window-top));
  height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom));
  height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom));

  .sidebar {
    width: 230upx;

    .side-item {
      justify-content: flex-start;
    }
  }

}

.scroll-content {
  flex: 1;
  background: #fff;
}

</style>
