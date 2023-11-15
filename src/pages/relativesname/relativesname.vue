<template>
  <!-- #ifdef MP -->
  <view class="relativesname-wrapper">
    <view class="results">
      <view class="nick" v-if="reverseResult"
        >Ta称呼我：{{ reverseResult }}
      </view>
      <view
        :style="getHistoryStyle()"
        :class="`history${reverse ? ' gray' : ''}`"
      >
        {{ `我${history ? "的" : ""}${history}` }}
      </view>
      <view :class="`show${reverse ? '' : ' gray'}`">
        {{ show }}
      </view>
    </view>
    <view class="btns">
      <wd-button
        :disabled="
          disabled && !['back', 'empty', 'anti', 'result'].includes(value)
        "
        :key="value"
        :custom-class="`btn ${value}`"
        :plain="value === 'back' || value === 'empty'"
        size="large"
        :icon="value === 'anti' ? 'translate-bold' : false"
        :type="['back', 'empty', 'result'].includes(value) ? 'warning' : 'info'"
        class="btn"
        v-for="(value, callName) in calls"
        @click="calculate(value)"
        >{{ callName }}
        <text v-if="value === 'anti'">{{ gender === 1 ? "男" : "女" }}</text>
      </wd-button>
    </view>
  </view>
  <!-- #endif -->
  <!-- #ifndef MP -->
  <web-view src="http://xue.ccy1994.top/relationship/index.html" />
  <!-- #endif -->
</template>
<script setup>
// #ifdef MP
import relationship from "relationship.js";
import { ref } from "vue";
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";

const history = ref("");
const show = ref("");
const reverseResult = ref("");
const reverse = ref(false);
const disabled = ref(false);
const gender = ref(1);
const calls = {
  夫: "丈夫",
  妻: "妻子",
  退格: "back",
  清空: "empty",
  父: "父亲",
  母: "母亲",
  兄: "哥哥",
  弟: "弟弟",
  姐: "姐姐",
  妹: "妹妹",
  子: "儿子",
  女: "女儿",
  "我的性别：": "anti",
  "=": "result",
};

function getHistoryStyle() {
  let initialSize = 80;
  const historyLength = history.value.length;
  let size = initialSize - Math.floor(historyLength / 7) * 10;
  return `font-size:${
    reverse.value ? Math.min(size, 40) : Math.max(size, 28)
  }rpx;`;
}

function calculate(e) {
  switch (e) {
    case "empty":
      history.value = "";
      show.value = "";
      reverseResult.value = "";
      reverse.value = false;
      disabled.value = false;
      return 0;
    case "result":
      if (history.value !== "") {
        reverse.value = true;
      }
      return 0;
    case "anti":
      gender.value = 1 - gender.value;
      if (history.value === "") {
        return 0;
      }
      break;
    case "back":
      let old = history.value;
      let sp = old.split("的");
      if (sp.length === 1) {
        history.value = "";
        show.value = "";
        reverseResult.value = "";
        disabled.value = false;
        return 0;
      } else {
        sp.pop();
        history.value = sp.join("的");
      }
      reverse.value = false;
      disabled.value = false;
      break;
    default:
      reverse.value = false;
      history.value += history.value === "" ? e : "的" + e;
      break;
  }
  // history.value+=(history.value=="")?e:("的"+e);
  getResult();
}

function getResult() {
  const options = {
    text: history.value, //输入的文本
    // sex:0,			//自己的性别：0女性,1男性
    sex: gender.value,
    type: "default", //转换类型：'default'算称谓,'chain'算关系(此时reverse无效)
    reverse: false, //称呼方式：true对方称呼我,false我称呼对方
  };
  let result = relationship(options).join("/");
  show.value = result ? result : "再玩就玩坏了";
  if (result) {
    disabled.value = false;
    reverseResult.value = relationship({ ...options, reverse: true }).join("/");
  } else {
    reverseResult.value = "";
    disabled.value = true;
  }
}

const shareInfo = {
  url: "/pages/relativesname/relativesname",
  title: "亲戚称呼计算器",
};

onShareAppMessage(() => shareInfo);

onShareTimeline(() => shareInfo);
// #endif
</script>

<style lang="scss">
$btns-height: 528rpx;

.relativesname-wrapper.relativesname-wrapper.relativesname-wrapper {
  height: calc(100vh - var(--window-top));
  height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom));
  height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom));
  background: $uni-bg-color-grey;
  position: relative;

  .results {
    position: absolute;
    width: 100%;
    bottom: calc($btns-height);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .nick {
    width: 90%;
    text-align: right;
    margin-bottom: 200rpx;
    color: $uni-text-color-grey;
  }

  .history {
    color: $uni-text-color;
    //width: 600rpx;
    //margin-left: 150rpx;
    width: 80%;
    margin-left: 10%;
    margin-bottom: 16rpx;
    text-align: right;
    font-size: 80rpx;
    font-weight: bold;

    &.gray {
      color: $uni-text-color-grey;
      font-size: 40rpx;
      font-weight: normal;
    }
  }

  .show {
    width: 80%;
    margin-left: 10%;
    text-align: right;
    color: $uni-text-color;
    font-size: 80rpx;
    font-weight: bold;

    &.gray {
      font-size: 40rpx;
      font-weight: normal;
      color: $uni-text-color-grey;
    }
  }

  .btns {
    position: absolute;
    bottom: 0;
    box-sizing: border-box;
    padding: 40rpx 40rpx;
    height: $btns-height;

    .wd-button.btn {
      margin-left: 30rpx;
      width: 124rpx;
      margin-top: 30rpx;

      &.anti {
        width: 380rpx;
      }

      &.result {
        width: 200rpx;
      }
    }
  }
}
</style>
