<template>
  <view class="led-wrapper">
    <view class="text-area" @click="toggleShowActionSheet"
          :style="`color: ${activeColor};background: ${activeBgColor}`">
      <view class="text-roll-wrapper"
            :style="`font-size: ${size}upx;`">
        <view class="text-roll"
              :style="`animation-duration: ${animationDuration}s;${animationDuration === 0 ? 'animation-name:none;':''}`">
          <view v-if="checked" class="text-bounce">{{ textContent }}</view>
          <view v-else>{{ textContent }}</view>
        </view>
      </view>
    </view>
    <wd-popup :modal="false" :duration="200" v-model="showActionSheet" position="bottom" custom-style="height: 580upx;">
      <view class="action-content">
        <wd-tabs v-model="tab">
          <block v-for="(item, index) in ['常用语','字体','速度','颜色']" :key="index">
            <wd-tab :title="item">
              <view class="content" v-if="index === 0">
                <view class="tag" v-for="(item, index) in presetTexts" @click="setText(item)">{{ item }}</view>
              </view>
              <view class="content" v-if="index === 1">
                <view>字体大小</view>
                <wd-slider v-model="size" :min="150" :max="600"/>
                <view class="open-animate">
                  <view class="open-desc">律动效果{{ checked ? '开 ' : '关 ' }}</view>
                  <wd-switch v-model="checked"/>
                </view>

              </view>
              <view class="content" v-if="index === 2">
                <wd-slider v-model="speed" :min="0" :max="1000"/>
              </view>
              <view class="content" v-if="index === 3">
                <wd-divider>文字颜色</wd-divider>
                <view class="color-tags">
                  <view @click="setActiveColor(item)" :class="`color-tag${activeColor === item ? ' active-tag':''}`"
                        :style="`background:${item}`"
                        v-for="(item) in presetColors"></view>
                </view>
                <wd-divider>背景颜色</wd-divider>
                <view class="color-tags">
                  <view @click="setActiveBgColor(item)" :class="`color-tag${activeBgColor === item ? ' active-tag':''}`"
                        :style="`background:${item}`"
                        v-for="(item) in presetColors"></view>
                </view>
              </view>
            </wd-tab>
          </block>
        </wd-tabs>
        <view class="text-content">
          <wd-input clearable custom-class="ipt" v-model="customText" label="自定义文字" placeholder="请输入弹幕文字"/>
          <wd-button @click="setCustomText" size="small">完成</wd-button>
        </view>
      </view>
    </wd-popup>
    <FloatBtn
        desc="在线手持LED工具，可以让你在任何场合高效地展示文字、图片或动画等信息，让你可以自由地编写和展示内容。手持弹幕LED工具它也具有多种颜色和字体，可以满足不同用户的需求。这种工具在各种场合都适用，例如商户推广、婚礼庆典、演唱会、展览等活动，都可以通过它展示出更加生动、有效的内容。"/>
    <wd-toast/>
  </view>
</template>

<script setup lang="ts">
import FloatBtn from "@/components/FloatBtn.vue";
import {watch, ref} from "vue";
import {debounceFn} from "@/utils";
import {useToast} from 'wot-design-uni'

// text-shadow: ${colorReverse(activeColor)} -2upx -6upx,${colorReverse(activeBgColor)} 6upx 0px;
const toast = useToast()
const showActionSheet = ref(true)
const tab = ref(0)
const size = ref(250)
const speed = ref(500)
const checked = ref(true)
const animationDuration = ref(5)
const activeColor = ref('#ffffff')
const activeBgColor = ref('#000000')

const presetTexts = ['欢迎❤️欢迎', '🌹谢谢你🌹', '可以认识一下么？', '你好，盆友', '再见❤️我会想你的']
const textContent = ref(presetTexts[0])
const customText = ref(presetTexts[0])

const presetColors = [
  '#FF7F00',
  '#8B00FF',
  '#00ffff',
  '#000000',
  '#0000ff',
  '#ff00ff',
  '#808080',
  '#008000',
  '#00ff00',
  '#800000',
  '#000080',
  '#808000',
  '#800080',
  '#ff0000',
  '#c0c0c0',
  '#008080',
  '#ffffff',
  '#ffff00',
]

watch(speed, debounceFn(() => {
  if (speed.value === 0) {
    return animationDuration.value = 0
  } else {
    animationDuration.value = 10.1 - (speed.value / 100)
  }
}, 300))

function toggleShowActionSheet() {
  showActionSheet.value = !showActionSheet.value
}

function setActiveColor(color: string) {
  activeColor.value = color
}

function setActiveBgColor(color: string) {
  activeBgColor.value = color

}

function setText(text: string) {
  textContent.value = text
  customText.value = text
}


function setCustomText(text: string) {
  if (!customText.value) {
    return toggleShowActionSheet()
  }
  textContent.value = customText.value
  toggleShowActionSheet()
}


</script>

<style lang="scss">

@keyframes slide {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
}

@keyframes animateBounce {
  0%, 100% {
    text-shadow: -4upx -4upx 0 #0ff, 4upx 4upx 0 #f00;
  }
  25% {
    text-shadow: 4upx 4upx 0 #0ff, -4upx -4upx 0 #f00;
  }
  50% {
    text-shadow: 4upx -4upx 0 #0ff, 4upx -4upx 0 #f00;
  }
  75% {
    text-shadow: -4upx 4upx 0 #0ff, -4upx 4upx 0 #f00;
  }
}

.led-wrapper {
  display: flex;
  height: calc(100vh - var(--window-top));
  height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom));
  height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom));

  .text-area {
    position: relative;
    width: 100%;
    height: 100%;
    background: #000000;
    display: flex;
    align-items: center;
    justify-content: center;

    .text-roll-wrapper {
      display: block;
      //min-width: 100vh;
      text-align: left;
      height: 100vw;
      line-height: 100vw;
      white-space: nowrap;
      transform: rotate(90deg);
    }

    .text-roll {
      animation-duration: 3s;
      animation-timing-function: linear;
      animation-fill-mode: both;
      animation-iteration-count: infinite;
      animation-name: slide;
      animation-delay: 0s;
    }

    .text-bounce {
      animation: animateBounce 0.5s linear infinite;
    }
  }

  .action-content {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;

    .content {
      padding: 20upx 40upx;
    }

    .open-animate {
      display: flex;
      align-items: center;
      margin-top: 40upx;

      .open-desc {
        width: 200upx;
      }
    }

    .title {
      height: 50upx;
      line-height: 50upx;
      font-size: 26upx;
    }

    .tag {
      padding: 6upx 20upx;
      display: inline-block;
      float: left;
      background: #000000;
      margin-bottom: 20upx;
      color: #ff0000;
      margin-right: 10upx;
      border-radius: 8upx;
    }

    .color-tags {
      display: flex;
      height: 140upx;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      background: rgba(#000, 0.03);
      border-radius: 4upx;
    }

    .color-tag {
      width: 70upx;
      height: 40upx;
      margin-top: 8upx;

      &.active-tag {
        width: 84upx;
        height: 50upx;
      }
    }
  }

  .text-content {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;

    .ipt {
      width: 530upx;
    }
  }
}
</style>
