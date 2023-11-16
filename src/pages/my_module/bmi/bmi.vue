<template>
  <!-- index.wxml -->
  <view class="container">
    <view
      class="result"
      :style="'background-color:' + conditionColor + ';'"
      @longpress="clear"
    >
      <view class="title">BMI值</view>
      <view class="score">{{ score }}</view>
      <view class="tip first-tip">
        <view class="physical-condition">
          身体状况：
          <text class="">{{ physicalCondition }}</text>
        </view>
        <view class="weight-standard no-border">
          健康体重范围：
          <text v-if="weightStandardMin != 0"
            >{{ weightStandardMin }}~{{ weightStandardMax }}kg
          </text>
          <text v-else>未知</text>
        </view>
      </view>
      <view class="tip">
        <view class="physical-condition">
          相关疾病发病危险性:
          <text class="">{{ danger }}</text>
        </view>
      </view>
    </view>
    <view class="input-container">
      <view class="item">
        <text class="label">身高</text>
        <input
          type="digit"
          placeholder="请输入身高"
          @input="bindKeyHightInput"
          maxlength="6"
          :value="inputValue"
        />
        <text class="unit">cm</text>
      </view>
      <view class="item">
        <text class="label">体重</text>
        <input
          type="digit"
          placeholder="请输入体重"
          @input="bindKeyWeightInput"
          maxlength="6"
          class=""
          :value="inputValue"
        />
        <text class="unit">kg</text>
      </view>
      <view class="item no-border">
        <text class="label">标准</text>
        <picker
          mode="selector"
          :value="index"
          :range="array"
          @change="bindPickerChange"
          class="type_select"
        >
          <view class="picker">
            {{ array[index] }}
            <text>></text>
          </view>
        </picker>
      </view>
      <button style="width: 90vw" class="calcu_btn" @tap="calculateBtn">
        开始计算
      </button>
    </view>

    <view class="compatable">
      <text class="table-title">标准对照表</text>
      <!-- 中国标准 -->
      <view class="table" v-if="index == 0">
        <view class="row thead">
          <text class="col">BMI值</text>
          <text class="col">身体状况</text>
        </view>
        <view class="row c1">
          <text class="col">{{ charLt }}18.5</text>
          <text class="col">偏瘦</text>
        </view>
        <view class="row c2">
          <text class="col">18.5～23.9</text>
          <text class="col">正常</text>
        </view>
        <view class="row c3">
          <text class="col">24～26.9</text>
          <text class="col">偏胖</text>
        </view>
        <view class="row c4">
          <text class="col">27～29.9</text>
          <text class="col">肥胖</text>
        </view>
        <view class="row c5">
          <text class="col">≥30</text>
          <text class="col">重度肥胖</text>
        </view>
      </view>

      <!-- 国际标准 -->
      <view class="table" v-if="index == 1">
        <view class="row thead">
          <text class="col">BMI值</text>
          <text class="col">身体状况</text>
        </view>
        <view class="row c1">
          <text class="col">{{ charLt }}18.5</text>
          <text class="col">偏瘦</text>
        </view>
        <view class="row c2">
          <text class="col">18.5～24.9</text>
          <text class="col">正常</text>
        </view>
        <view class="row c3">
          <text class="col">25～29.9</text>
          <text class="col">偏胖</text>
        </view>
        <view class="row c4">
          <text class="col">30.0～34.9</text>
          <text class="col">肥胖</text>
        </view>
        <view class="row c5">
          <text class="col">35.0～39.9</text>
          <text class="col">重度肥胖</text>
        </view>
        <view class="row c6">
          <text class="col">≥40.0</text>
          <text class="col">极重度肥胖</text>
        </view>
      </view>
      <!-- 亚洲标准 -->
      <view class="table" v-if="index == 2">
        <view class="row thead">
          <text class="col">BMI值</text>
          <text class="col">身体状况</text>
        </view>
        <view class="row c1">
          <text class="col">{{ charLt }}18.5</text>
          <text class="col">偏瘦</text>
        </view>
        <view class="row c2">
          <text class="col">18.5～22.9</text>
          <text class="col">正常</text>
        </view>
        <view class="row c3">
          <text class="col">23～24.9</text>
          <text class="col">偏胖</text>
        </view>
        <view class="row c4">
          <text class="col">25～29.9</text>
          <text class="col">肥胖</text>
        </view>
        <view class="row c5">
          <text class="col">≥30</text>
          <text class="col">重度肥胖</text>
        </view>
      </view>
    </view>
    <!-- <view class="weui-form" style="background: #f6f6f6;">
		<view class="weui-form__extra-area ">
			<view class="weui-footer">
				<view class="weui-footer__links">
					<view bindtap="copyLink" class="weui-footer__link">源自GitHub开源项目</view>
				</view>
				<text selectable="true" class="weui-footer__text">https://github.com/caizhenbo/BIM</text>
			</view>
		</view>
	</view> -->
  </view>
</template>

<script>
//index.js
//获取应用实例
var app = getApp();
export default {
  data() {
    return {
      inputValue: "",
      conditionColor: "green",
      color: [
        "lightskyblue",
        "green",
        "goldenrod",
        "darkorange",
        "red",
        "darkred",
      ],
      array: ["中国标准", "WHO标准", "亚洲标准"],
      index: 0,
      score: 0,
      height: 0,
      weight: 0,
      physicalCondition: "未知",
      weightStandardMin: 0,
      weightStandardMax: 0,
      danger: "未知",
      charLt: "<",
      rules: [
        [18.5, 24, 27, 30],
        [18.5, 25, 30, 35, 40],
        [18.5, 23, 25, 30],
      ],
      standardMax: [23.9, 24.9, 22.9],
      ruleConfig: ["偏瘦", "正常", "偏胖", "肥胖", "重度肥胖", "极重度肥胖"],
      dangerConfig: [
        "低（但其它疾病危险性增加）",
        "平均水平",
        "增加",
        "中度增加",
        "严重增加",
        "非常严重增加",
      ],
    };
  },
  onLoad: function () {},
  onShareAppMessage: function () {
    return {
      title: "来测测你的BMI叭~",
      path: "/pages/bmi/bmi",
      success: function (res) {
        console.log("成功进入分享==========", res);
      },
      fail: function (res) {
        console.log("进入分享失败==========", res);
      },
    };
  },
  methods: {
    copyLink: function (e) {
      uni.setClipboardData({
        data: "https://github.com/caizhenbo/BIM",
      });
    },

    clear: function (e) {
      this.setData({
        inputValue: "",
        conditionColor: "green",
        index: 0,
        score: 0,
        height: 0,
        weight: 0,
        physicalCondition: "未知",
        weightStandardMin: 0,
        weightStandardMax: 0,
        danger: "未知",
      });
    },

    bindPickerChange: function (e) {
      this.setData({
        index: e.detail.value,
      });
    },

    bindKeyHightInput: function (e) {
      this.setData({
        height: e.detail.value,
      });
    },

    bindKeyWeightInput: function (e) {
      this.setData({
        weight: e.detail.value,
      });
    },

    calculateBtn: function (e) {
      if (!this.height) {
        uni.showToast({
          title: "请输入身高",
        });
        return false;
      }
      if (!this.weight) {
        uni.showToast({
          title: "请输入体重",
        });
        return false;
      }
      this.calculate();
      this.weightStandardCalculate();
      this.physicalConditionCalculate();
    },

    //计算IBM值
    calculate: function () {
      let score = 0;
      let height = this.height / 100;
      score = (this.weight / (height * height)).toFixed(1);
      this.setData({
        score: score,
      });
    },

    //计算标准体重
    weightStandardCalculate: function () {
      let weightMin = 0;
      let weightMax = 0;
      let height = this.height / 100;
      weightMin = (18.5 * (height * height)).toFixed(1);
      weightMax = (this.standardMax[this.index] * (height * height)).toFixed(1);
      this.setData({
        weightStandardMax: weightMax,
        weightStandardMin: weightMin,
      });
    },

    //身体状况计算
    physicalConditionCalculate: function () {
      let rule = this.rules[this.index];
      let value = 0;
      let score = this.score;
      let length = rule.length;
      //如果分数大于最高级，则value为该长度
      if (score >= rule[length - 1]) {
        //端点有四个，则区间有五个
        value = length;
      } else {
        for (let length = rule.length, i = length; i >= 1; --i) {
          if (score < rule[i] && score >= rule[i - 1]) {
            value = i;
          }
        }
      }
      this.setData({
        physicalCondition: this.ruleConfig[value],
        danger: this.dangerConfig[value],
        conditionColor: this.color[value],
      });
    },
  },
};
</script>
<style>
@import "./weui.css"; /**index.wxss**/
.container {
  display: flex;
  flex-direction: column;
}

.result {
  width: 100%;
  height: 460rpx;
}

.result .title {
  padding: 0 40rpx;
  font-size: 28rpx;
  padding-top: 20rpx;
  color: #f1f1f1;
  font-weight: 600;
}

.result .score {
  padding: 40rpx 50rpx;
  margin-bottom: 20rpx;
  line-height: 100rpx;
  font-size: 180rpx;
  color: #fff;
}

.tip {
  display: flex;
}

.first-tip {
  margin-bottom: 10rpx;
}

.tip view {
  line-height: 80rpx;
  color: #f1f1f1;
  font-size: 24rpx;
  background-color: rgba(0, 0, 0, 0.1);
  flex: 1;
  padding-left: 30rpx;
}

.tip view text {
  color: #fff;
}

.physical-condition {
  margin: 0 4rpx 0 0;
}

.input-container {
  padding: 0 40rpx;
  display: flex;
  flex-direction: column;
}

.item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e2e2e2;
  height: 60rpx;
  line-height: 60rpx;
  font-size: 32rpx;
  padding: 20rpx 0rpx;
  color: #909090;
}

.item .label {
  width: 20%;
  float: left;
  vertical-align: middle;
}

.item input {
  width: 80%;
  margin-right: 5%;
  text-align: right;
  padding-right: 8rpx;
  padding-right: 8rpx;
  color: green;
}

.item .unit {
  float: right;
}

.item .type_select {
  float: right;
}

.item .type_select text {
  margin-left: 8rpx;
}

.no-border {
  display: block;
  border-bottom: 0px;
}

.calcu_btn {
  background-color: green;
  color: #fff;
  font-weight: 400;
  width: 80vw;
}

#result-container {
  padding: 20rpx 0;
}

.compatable {
  width: 90%;
  padding: 40rpx 40rpx 0 40rpx;
  font-size: 28rpx;
  color: #909090;
}

.compatable .table-title {
  line-height: 50rpx;
  height: 50rpx;
}

.table {
  border: 1rpx solid #e2e2e2;
}

.table .row {
  display: flex;
  border-bottom: 1rpx solid #e2e2e2;
  line-height: 60rpx;
  height: 60rpx;
}

.table .row .col {
  flex: 1;
  text-align: center;
  border-right: 1rpx solid #e2e2e2;
  color: #f1f1f1;
}

.table .thead {
  background-color: #909090;
  color: #f1f1f1;
}

.table .row .col:last-child {
  border-right: 0rpx;
}

.table .row:last-child {
  border-bottom: 0rpx;
}

.c1 {
  background-color: lightskyblue;
}

.c2 {
  background-color: green;
}

.c3 {
  background-color: goldenrod;
}

.c4 {
  background-color: darkorange;
}

.c5 {
  background-color: red;
}

.c6 {
  background-color: darkred;
}
</style>
