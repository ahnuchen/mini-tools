<template>
  <!-- #ifdef MP -->
  <view class="relativesname-wrapper">
    <div class="history">
      {{ history }}
    </div>
    <div class="show">
      {{ show }}
    </div>
    <div class="btns">
      <wd-button type="primary" class="btn" v-for="(value,callName) in calls" @click="calculate(value)">{{
          callName
        }}
      </wd-button>
    </div>
  </view>
  <!-- #endif -->
  <!-- #ifndef MP -->
  <web-view src="http://xue.ccy1994.top/relationship/index.html"/>
  <!-- #endif -->
</template>

<script setup>

// #ifdef MP
import relationship from "relationship.js"
import {ref} from "vue";

const title = ref('亲属关系计算机')
const history = ref("")
const show = ref("")
const calls = {
  "夫": "丈夫",
  "妻": "妻子",
  "返回": "back",
  "清空": "empty",
  "父": "父亲",
  "母": "母亲",
  "兄": "哥哥",
  "弟": "弟弟",
  "姐": "姐姐",
  "妹": "妹妹",
  "子": "儿子",
  "女": "女儿",
  "互查": "anti",
  "=": "result"
}

function calculate(e) {
  let anti = false;
  switch (e) {
    case "empty":
      history.value = "";
      show.value = "";
      return 0;
    case "result":
      return 0;
    case "anti":
      anti = true;
      break;
    case "back":
      let old = history.value;
      let sp = old.split("的");
      if (sp.length > 1) {
        console.log(sp);
        sp.splice(-1, 1);
        console.log(sp);
      } else {
        history.value = "";
        show.value = "";
        return 0;
      }
      if (sp.length > 1) {
        sp = sp.join("的");
        console.log(sp);
        history.value = sp;
      } else {
        history.value = sp[0];
        show.value = sp[0];
        return 0;
      }
      break;
    default:
      history.value += (history.value === "") ? e : ("的" + e);
      break;
  }
  // history.value+=(history.value=="")?e:("的"+e);
  const options = {
    text: history.value,		//输入的文本
    // sex:0,			//自己的性别：0女性,1男性
    type: 'default',		//转换类型：'default'算称谓,'chain'算关系(此时reverse无效)
    reverse: anti		//称呼方式：true对方称呼我,false我称呼对方
  };
  let result = relationship(options).join("/");
  console.log(result)
  show.value = result ? result : "计算器已经被你玩坏了哟!";
}

// #endif
</script>

<style lang="scss">

</style>
