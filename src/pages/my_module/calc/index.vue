<template>
  <view>
    <!-- template对应的原始代码，为保证正常显示，已对其进行隐藏。 -->
    <block name="calculator-key" v-if="false">
      <button
        :hover-start-time="5"
        :hover-stay-time="20"
        hover-class="hover-shadow"
        :data-key="'key-clear'"
        :class="'calculator-key ' + 'key-clear'"
      >
        {{ clearDisplay ? "C" : "AC" }}
      </button>
    </block>

    <view class="calculator">
      <view class="calculator-display">
        <view class="content">{{ showValue }}</view>
      </view>
      <view class="calculator-keypad">
        <view class="input-keys">
          <view class="function-keys" @tap.stop.prevent="onTapFunction">
            <!-- parse <template is="calculator-key" :data="className: 'key-clear', display: clearDisplay ? 'C' : 'AC'"/> -->
            <block name="calculator-key">
              <button
                :hover-start-time="5"
                :hover-stay-time="20"
                hover-class="hover-shadow"
                :data-key="'key-clear'"
                :class="'calculator-key ' + 'key-clear'"
              >
                {{ clearDisplay ? "C" : "AC" }}
              </button>
            </block>
            <!-- parse <template is="calculator-key" :data="className: 'key-sign', display: '+/-'"/> -->
            <block name="calculator-key" v-if="false">
              <button
                :hover-start-time="5"
                :hover-stay-time="20"
                hover-class="hover-shadow"
                :data-key="'key-clear'"
                :class="'calculator-key ' + 'key-clear'"
              >
                {{ clearDisplay ? "C" : "AC" }}
              </button>
            </block>
            <!-- parse <template is="calculator-key" :data="className: 'key-percent', display: '%'"/> -->
            <block name="calculator-key" v-if="false">
              <button
                :hover-start-time="5"
                :hover-stay-time="20"
                hover-class="hover-shadow"
                :data-key="'key-clear'"
                :class="'calculator-key ' + 'key-clear'"
              >
                {{ clearDisplay ? "C" : "AC" }}
              </button>
            </block>
          </view>
          <view class="digit-keys" @tap.stop.prevent="onTapNum">
            <!-- parse <template is="calculator-key" :data="className: 'key-0', display: '0'"/> -->
            <block name="calculator-key" v-if="false">
              <button
                :hover-start-time="5"
                :hover-stay-time="20"
                hover-class="hover-shadow"
                :data-key="'key-clear'"
                :class="'calculator-key ' + 'key-clear'"
              >
                {{ clearDisplay ? "C" : "AC" }}
              </button>
            </block>
            <!-- parse <template is="calculator-key" :data="className: 'key-dot', display: '●'"/> -->
            <block name="calculator-key" v-if="false">
              <button
                :hover-start-time="5"
                :hover-stay-time="20"
                hover-class="hover-shadow"
                :data-key="'key-clear'"
                :class="'calculator-key ' + 'key-clear'"
              >
                {{ clearDisplay ? "C" : "AC" }}
              </button>
            </block>
            <!-- parse <template is="calculator-key" :data="className: 'key-1', display: '1'"/> -->
            <block name="calculator-key" v-if="false">
              <button
                :hover-start-time="5"
                :hover-stay-time="20"
                hover-class="hover-shadow"
                :data-key="'key-clear'"
                :class="'calculator-key ' + 'key-clear'"
              >
                {{ clearDisplay ? "C" : "AC" }}
              </button>
            </block>
            <!-- parse <template is="calculator-key" :data="className: 'key-2', display: '2'"/> -->
            <block name="calculator-key" v-if="false">
              <button
                :hover-start-time="5"
                :hover-stay-time="20"
                hover-class="hover-shadow"
                :data-key="'key-clear'"
                :class="'calculator-key ' + 'key-clear'"
              >
                {{ clearDisplay ? "C" : "AC" }}
              </button>
            </block>
            <!-- parse <template is="calculator-key" :data="className: 'key-3', display: '3'"/> -->
            <block name="calculator-key" v-if="false">
              <button
                :hover-start-time="5"
                :hover-stay-time="20"
                hover-class="hover-shadow"
                :data-key="'key-clear'"
                :class="'calculator-key ' + 'key-clear'"
              >
                {{ clearDisplay ? "C" : "AC" }}
              </button>
            </block>
            <!-- parse <template is="calculator-key" :data="className: 'key-4', display: '4'"/> -->
            <block name="calculator-key" v-if="false">
              <button
                :hover-start-time="5"
                :hover-stay-time="20"
                hover-class="hover-shadow"
                :data-key="'key-clear'"
                :class="'calculator-key ' + 'key-clear'"
              >
                {{ clearDisplay ? "C" : "AC" }}
              </button>
            </block>
            <!-- parse <template is="calculator-key" :data="className: 'key-5', display: '5'"/> -->
            <block name="calculator-key" v-if="false">
              <button
                :hover-start-time="5"
                :hover-stay-time="20"
                hover-class="hover-shadow"
                :data-key="'key-clear'"
                :class="'calculator-key ' + 'key-clear'"
              >
                {{ clearDisplay ? "C" : "AC" }}
              </button>
            </block>
            <!-- parse <template is="calculator-key" :data="className: 'key-6', display: '6'"/> -->
            <block name="calculator-key" v-if="false">
              <button
                :hover-start-time="5"
                :hover-stay-time="20"
                hover-class="hover-shadow"
                :data-key="'key-clear'"
                :class="'calculator-key ' + 'key-clear'"
              >
                {{ clearDisplay ? "C" : "AC" }}
              </button>
            </block>
            <!-- parse <template is="calculator-key" :data="className: 'key-7', display: '7'"/> -->
            <block name="calculator-key" v-if="false">
              <button
                :hover-start-time="5"
                :hover-stay-time="20"
                hover-class="hover-shadow"
                :data-key="'key-clear'"
                :class="'calculator-key ' + 'key-clear'"
              >
                {{ clearDisplay ? "C" : "AC" }}
              </button>
            </block>
            <!-- parse <template is="calculator-key" :data="className: 'key-8', display: '8'"/> -->
            <block name="calculator-key" v-if="false">
              <button
                :hover-start-time="5"
                :hover-stay-time="20"
                hover-class="hover-shadow"
                :data-key="'key-clear'"
                :class="'calculator-key ' + 'key-clear'"
              >
                {{ clearDisplay ? "C" : "AC" }}
              </button>
            </block>
            <!-- parse <template is="calculator-key" :data="className: 'key-9', display: '9'"/> -->
            <block name="calculator-key" v-if="false">
              <button
                :hover-start-time="5"
                :hover-stay-time="20"
                hover-class="hover-shadow"
                :data-key="'key-clear'"
                :class="'calculator-key ' + 'key-clear'"
              >
                {{ clearDisplay ? "C" : "AC" }}
              </button>
            </block>
          </view>
        </view>
        <view class="operate-keys" @tap.stop.prevent="onTapOperate">
          <!-- parse <template is="calculator-key" :data="className: 'key-divide', display: '÷'"/> -->
          <block name="calculator-key" v-if="false">
            <button
              :hover-start-time="5"
              :hover-stay-time="20"
              hover-class="hover-shadow"
              :data-key="'key-clear'"
              :class="'calculator-key ' + 'key-clear'"
            >
              {{ clearDisplay ? "C" : "AC" }}
            </button>
          </block>
          <!-- parse <template is="calculator-key" :data="className: 'key-multiply', display: '×'"/> -->
          <block name="calculator-key" v-if="false">
            <button
              :hover-start-time="5"
              :hover-stay-time="20"
              hover-class="hover-shadow"
              :data-key="'key-clear'"
              :class="'calculator-key ' + 'key-clear'"
            >
              {{ clearDisplay ? "C" : "AC" }}
            </button>
          </block>
          <!-- parse <template is="calculator-key" :data="className: 'key-subtract', display: '−'"/> -->
          <block name="calculator-key" v-if="false">
            <button
              :hover-start-time="5"
              :hover-stay-time="20"
              hover-class="hover-shadow"
              :data-key="'key-clear'"
              :class="'calculator-key ' + 'key-clear'"
            >
              {{ clearDisplay ? "C" : "AC" }}
            </button>
          </block>
          <!-- parse <template is="calculator-key" :data="className: 'key-add', display: '+'"/> -->
          <block name="calculator-key" v-if="false">
            <button
              :hover-start-time="5"
              :hover-stay-time="20"
              hover-class="hover-shadow"
              :data-key="'key-clear'"
              :class="'calculator-key ' + 'key-clear'"
            >
              {{ clearDisplay ? "C" : "AC" }}
            </button>
          </block>
          <!-- parse <template is="calculator-key" :data="className: 'key-equals', display: '='"/> -->
          <block name="calculator-key" v-if="false">
            <button
              :hover-start-time="5"
              :hover-stay-time="20"
              hover-class="hover-shadow"
              :data-key="'key-clear'"
              :class="'calculator-key ' + 'key-clear'"
            >
              {{ clearDisplay ? "C" : "AC" }}
            </button>
          </block>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "计算器",
      value: null,

      // 上次计算后的结果，null表示没有上次计算的结果
      showValue: "0",

      // 显示数值
      operate: null,

      // 上次计算符号，null表示没有未完成的计算
      // 前一按键是否为计算符号
      waitingForOperate: false,

      clearDisplay: false,
    };
  },
  onLoad: function (options) {
    uni.setNavigationBarTitle({
      title: this.title,
    });
    this.calculatorOperations = {
      "key-divide": (prevValue, nextValue) => prevValue / nextValue,
      "key-multiply": (prevValue, nextValue) => prevValue * nextValue,
      "key-add": (prevValue, nextValue) => prevValue + nextValue,
      "key-subtract": (prevValue, nextValue) => prevValue - nextValue,
      "key-equals": (prevValue, nextValue) => nextValue,
    };
  },
  methods: {
    /* 清空 */
    clearAll() {
      this.setData({
        value: null,
        showValue: "0",
        operate: null,
        waitingForOperate: false,
      });
    },

    /* 仅清空当前显示的输入值 */
    clearDisplayFun() {
      this.setData({
        showValue: "0",
      });
    },

    onTapFunction: function (event) {
      const key = event.target.dataset.key;
      switch (key) {
        case "key-clear":
          if (this.showValue !== "0") {
            this.clearDisplayFun();
          } else {
            this.clearAll();
          }
          break;
        case "key-sign":
          var newValue = parseFloat(this.showValue) * -1;
          this.setData({
            showValue: String(newValue),
          });
          break;
        case "key-percent":
          const fixedNum = this.showValue.replace(/^-?\d*\.?/, "");
          var newValue = parseFloat(this.showValue) / 100;
          this.setData({
            showValue: String(newValue.toFixed(fixedNum.length + 2)),
          });
          break;
        default:
          break;
      }
    },

    onTapOperate: function (event) {
      const nextOperate = event.target.dataset.key;
      const inputValue = parseFloat(this.showValue);
      if (this.value == null) {
        this.setData({
          value: inputValue,
        });
      } else if (this.operate) {
        const currentValue = this.value || 0;
        const newValue = this.calculatorOperations[this.operate](
          currentValue,
          inputValue,
        );
        this.setData({
          value: newValue,
          showValue: String(newValue),
        });
      }
      this.setData({
        waitingForOperate: true,
        operate: nextOperate,
      });
    },

    onTapNum: function (event) {
      const key = event.target.dataset.key; // 根据data-key标记按键

      if (key == "key-dot") {
        // 按下点号
        if (!/\./.test(this.showValue)) {
          this.setData({
            showValue: this.showValue + ".",
            waitingForOperate: false,
          });
        }
      } else {
        // 按下数字键
        const num = key[key.length - 1];
        if (this.waitingForOperate) {
          this.setData({
            showValue: String(num),
            waitingForOperate: false,
          });
        } else {
          this.setData({
            showValue:
              this.showValue === "0" ? String(num) : this.showValue + num,
          });
        }
      }
    },
  },
};
</script>
<style>
@import "reset.css";

page {
  display: block;
  background: #000;
}

.calculator {
  width: 750rpx;
  display: flex;
  position: fixed;
  flex-direction: column;
  bottom: 40rpx;
}

.calculator-display {
  display: flex;
  width: 95%;
  padding: 15rpx;
}

.content {
  color: #fff;
  text-align: right;
  font-size: 100rpx;
  width: 95%;
  margin: 15rpx;
}

.calculator-keypad {
  display: flex;
}

.calculator .function-keys {
  display: flex;
}

.calculator .digit-keys {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
}

.hover-shadow {
  box-shadow: inset 0rpx 0rpx 350rpx 0rpx rgb(242, 242, 242);
}

.calculator-key {
  display: block;
  width: 140rpx;
  height: 140rpx;
  margin-left: 42rpx;
  margin-top: 30rpx;
  line-height: 140rpx;
  border-radius: 50%;
  border: 1px solid #333;
  background: #333;
  color: #fff;
  font-size: 60rpx;
  text-align: center;
}

.calculator .function-keys .calculator-key {
  background: #adadad;
  color: #000;
}

.calculator .digit-keys .key-0 {
  width: 320rpx;
  border-radius: 150rpx;
}

.calculator .operate-keys .calculator-key {
  margin-right: 30rpx;
  background: #ff8c66;
}

@import "@/pages/my_module/calc/index.css";
</style>
