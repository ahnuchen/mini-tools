<template>
  <page-meta
    :page-style="`overflow:${showActionSheet ? 'hidden' : 'visible'};`"
  ></page-meta>
  <view class="led-wrapper">
    <view
      class="text-area"
      @click="toggleShowActionSheet"
      :style="`color: ${activeColor};background: ${activeBgColor}`"
    >
      <view class="text-roll-wrapper" :style="`font-size: ${size}rpx;`">
        <view
          class="text-roll"
          :style="`animation-duration: ${animationDuration}s;${
            animationDuration === 0 || !slideOn ? 'animation-name:none;' : ''
          }`"
        >
          <view v-if="bounced" class="text-bounce">{{ textContent }}</view>
          <view v-else>{{ textContent }}</view>
        </view>
      </view>
    </view>
    <wd-popup
      lock-scroll
      custom-class="setting"
      :modal="false"
      :duration="200"
      v-model="showActionSheet"
      position="bottom"
      custom-style="height: 580rpx;"
    >
      <view class="action-content">
        <wd-tabs v-model="tab">
          <block
            v-for="(item, index) in ['常用语', '字体/滚动', '颜色']"
            :key="index"
          >
            <wd-tab :title="item">
              <view class="content" v-if="index === 0">
                <view
                  class="tag"
                  v-for="(item, index) in presetTexts"
                  @click="setText(item)"
                  >{{ item }}
                </view>
              </view>
              <view class="content" v-if="index === 1">
                <view>字体大小</view>
                <slider
                  :value="size"
                  max="600"
                  min="50"
                  active-color="#4d80f0"
                  background-color="#d1d1d1"
                  @change="sliderSizeChange"
                  show-value
                />

                <view>滚动速度</view>
                <slider
                  :value="speed"
                  max="100"
                  min="0"
                  active-color="#4d80f0"
                  background-color="#d1d1d1"
                  @change="sliderSpeedChange"
                  show-value
                />
                <wd-row>
                  <wd-col :span="12">
                    <view class="open-animate">
                      <view class="open-desc"
                        >律动效果{{ bounced ? "开 " : "关 " }}
                      </view>
                      <wd-switch v-model="bounced" />
                    </view>
                  </wd-col>
                  <wd-col :span="12">
                    <view class="open-animate">
                      <view class="open-desc"
                        >滚动{{ slideOn ? "开 " : "关 " }}
                      </view>
                      <wd-switch v-model="slideOn" />
                    </view>
                  </wd-col>
                </wd-row>
              </view>
              <view class="content" v-if="index === 2">
                <wd-divider>文字颜色</wd-divider>
                <view class="color-tags">
                  <view
                    @click="setActiveColor(item)"
                    :class="`color-tag${
                      activeColor === item ? ' active-tag' : ''
                    }`"
                    :style="`background:${item}`"
                    v-for="item in presetColors"
                  ></view>
                </view>
                <wd-divider>背景颜色</wd-divider>
                <view class="color-tags">
                  <view
                    @click="setActiveBgColor(item)"
                    :class="`color-tag${
                      activeBgColor === item ? ' active-tag' : ''
                    }`"
                    :style="`background:${item}`"
                    v-for="item in presetColors"
                  ></view>
                </view>
              </view>
            </wd-tab>
          </block>
        </wd-tabs>
        <view class="text-content">
          <wd-input
            clearable
            custom-class="ipt"
            v-model="customText"
            label="自定义文字"
            placeholder="请输入弹幕文字"
          />
          <wd-button @click="setCustomText" size="small">完成</wd-button>
        </view>
      </view>
    </wd-popup>
    <FloatBtn
      desc="在线手持LED工具，可以让你在任何场合高效地展示文字、图片或动画等信息，让你可以自由地编写和展示内容。手持弹幕LED工具它也具有多种颜色和字体，可以满足不同用户的需求。这种工具在各种场合都适用，例如商户推广、婚礼庆典、演唱会、展览等活动，都可以通过它展示出更加生动、有效的内容。"
    />
  </view>
</template>

<script setup lang="ts">
import FloatBtn from "@/components/FloatBtn.vue";
import { ref, watch } from "vue";
import { debounceFn } from "@/utils";
import { onLoad, onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";

// text-shadow: ${colorReverse(activeColor)} -2rpx -6rpx,${colorReverse(activeBgColor)} 6rpx 0px;
const showActionSheet = ref(true);
const tab = ref(0);
const size = ref(250);
const speed = ref(50);
const bounced = ref(true);
const slideOn = ref(true);
const animationDuration = ref(5);
const activeColor = ref("#ffffff");
const activeBgColor = ref("#000000");

const presetTexts = [
  "欢迎❤️欢迎",
  "🌹谢谢你🌹",
  "可以认识一下么？",
  "你好，盆友",
  "再见❤️我会想你的",
  "分享给朋友，显示相同弹幕",
];
const textContent = ref(presetTexts[0]);
const customText = ref(presetTexts[0]);

interface QueryObj {
  size: string;
  speed: string;
  bounced: "1" | "0";
  slideOn: "1" | "0";
  activeColor: string;
  activeBgColor: string;
  textContent: string;
}

onLoad((e) => {
  if (!e) {
    return false;
  }
  let query = e as QueryObj;
  if (query.size) {
    size.value = Number(query.size);
  }
  if (query.speed) {
    speed.value = Number(query.speed);
  }
  if (query.bounced) {
    bounced.value = query.bounced === "1";
  }
  if (query.slideOn) {
    slideOn.value = query.slideOn === "1";
  }
  if (query.activeColor) {
    activeColor.value = "#" + query.activeColor;
  }
  if (query.activeBgColor) {
    activeBgColor.value = "#" + query.activeBgColor;
  }
  if (query.textContent) {
    textContent.value = query.textContent;
    showActionSheet.value = false;
  }
});

const presetColors = [
  "#FF7F00",
  "#8B00FF",
  "#00ffff",
  "#000000",
  "#0000ff",
  "#ff00ff",
  "#808080",
  "#008000",
  "#00ff00",
  "#800000",
  "#000080",
  "#808000",
  "#800080",
  "#ff0000",
  "#c0c0c0",
  "#008080",
  "#ffffff",
  "#ffff00",
];

watch(
  speed,
  debounceFn(() => {
    if (speed.value === 0) {
      return (animationDuration.value = 0);
    } else {
      animationDuration.value = 10.1 - speed.value / 10;
    }
  }, 300),
);

function sliderSizeChange(event: any): any {
  size.value = event.detail.value;
}

function sliderSpeedChange(event: any): any {
  speed.value = event.detail.value;
}

function toggleShowActionSheet() {
  showActionSheet.value = !showActionSheet.value;
}

function setActiveColor(color: string) {
  activeColor.value = color;
}

function setActiveBgColor(color: string) {
  activeBgColor.value = color;
}

function setText(text: string) {
  textContent.value = text;
  customText.value = text;
}

function setCustomText(text: string) {
  if (!customText.value) {
    return toggleShowActionSheet();
  }
  textContent.value = customText.value;
  toggleShowActionSheet();
}

const getShareInfo = () => {
  const queryString = `?size=${size.value}&speed=${speed.value}&bounced=${
    bounced.value ? "1" : "0"
  }&slideOn=${slideOn.value ? "1" : "0"}&activeColor=${activeColor.value.slice(
    1,
  )}&activeBgColor=${activeBgColor.value.slice(1)}&textContent=${
    textContent.value
  }`;
  return {
    path: `/pages/led/led${queryString}`,
    title: "手持弹幕led",
  };
};

onShareAppMessage(() => getShareInfo());

onShareTimeline(() => getShareInfo());
</script>

<style lang="scss">
.led-wrapper.led-wrapper.led-wrapper {
  display: flex;
  height: calc(100vh - var(--window-top));
  height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom));
  height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom));

  @keyframes slide {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(-100%);
    }
  }

  @keyframes animateBounce {
    0%,
    100% {
      text-shadow:
        -4rpx -4rpx 0 #0ff,
        4rpx 4rpx 0 #f00;
    }
    25% {
      text-shadow:
        4rpx 4rpx 0 #0ff,
        -4rpx -4rpx 0 #f00;
    }
    50% {
      text-shadow:
        4rpx -4rpx 0 #0ff,
        4rpx -4rpx 0 #f00;
    }
    75% {
      text-shadow:
        -4rpx 4rpx 0 #0ff,
        -4rpx 4rpx 0 #f00;
    }
  }

  .setting.setting.setting {
    background-color: rgba(#666666, 0.4);

    div,
    view,
    text {
      background-color: transparent;
      color: #ffffff;
    }
  }

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
      padding: 20rpx 40rpx;
    }

    .open-animate {
      display: flex;
      align-items: center;
      margin-top: 40rpx;

      .open-desc {
        width: 200rpx;
      }
    }

    .title {
      height: 50rpx;
      line-height: 50rpx;
      font-size: 26rpx;
    }

    .tag.tag.tag.tag {
      padding: 6rpx 20rpx;
      display: inline-block;
      float: left;
      background: #000000;
      margin-bottom: 20rpx;
      color: #ffffff;
      margin-right: 10rpx;
      border-radius: 8rpx;
    }

    .color-tags {
      display: flex;
      height: 140rpx;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      background: rgba(#000, 0.03);
      border-radius: 4rpx;
    }

    .color-tag {
      width: 70rpx;
      height: 40rpx;
      margin-top: 8rpx;

      &.active-tag {
        width: 84rpx;
        height: 50rpx;
      }
    }
  }

  .text-content {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;

    .ipt {
      width: 530rpx;
      color: #ffffff;

      input {
        color: #ffffff;
      }
    }
  }
}
</style>
