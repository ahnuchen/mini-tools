<template>
  <!-- index.wxml -->
  <view class="container">
    <view class="form-group loan" v-if="loanType == 1">
      <view class="loanItem">
        <label>商业贷款总额(万)</label>
        <input
          type="digit"
          :value="businessTotalLoanStr"
          placeholder="请输入商业贷款金额"
          class="totalLoan line"
          @input="businessTotalLoanInput"
          :focus="businessFocus"
          @focus="inputFocus"
          @blur="inputBlur"
        />
      </view>
    </view>
    <view class="form-group loan" v-if="loanType == 2">
      <view class="loanItem">
        <label>公积金贷款金额(万)</label>
        <input
          type="digit"
          :value="gjjTotalLoanStr"
          placeholder="请输入公积金贷款金额"
          class="totalLoan line"
          @input="gjjTotalLoanInput"
          :focus="gjjFocus"
          @focus="inputFocus"
          @blur="inputBlur"
        />
      </view>
    </view>
    <view class="form-group loan double" v-if="loanType == 3">
      <view class="loanItem">
        <label>商业贷款总额(万)</label>
        <input
          type="digit"
          :value="businessTotalLoanStr"
          placeholder="请输入商业贷款金额"
          class="totalLoan line"
          @input="businessTotalLoanInput"
          :focus="businessFocus"
          @focus="inputFocus"
          @blur="inputBlur"
        />
      </view>
      <view class="loanItem">
        <label>公积金贷款金额(万)</label>
        <input
          type="digit"
          :value="gjjTotalLoanStr"
          placeholder="请输入公积金贷款金额"
          class="totalLoan line"
          @input="gjjTotalLoanInput"
          :focus="gjjFocus"
          @focus="inputFocus"
          @blur="inputBlur"
        />
      </view>
    </view>

    <view class="form-group">
      <radio-group class="radioGroup" @change="loanTypeChange">
        <label v-for="(item, index) in loanTypeArr" :key="index">
          <radio :value="item.id" :checked="item.checked" />

          {{ item.text }}
        </label>
      </radio-group>
    </view>
    <view class="form-group line">
      <label>还款方式</label>
      <picker
        mode="selector"
        :range="paymentMethodArr"
        :value="paymentMethodIndex"
        @change="paymentMethodchange"
        range-key="text"
      >
        <text>{{ paymentMethodArr[paymentMethodIndex].text }}</text>
        <i class="dropdown"></i>
      </picker>
    </view>
    <view class="form-group line">
      <label>还款年数</label>
      <picker
        mode="selector"
        :range="paymentYearArr"
        :value="paymentYearIndex"
        @change="paymentYearchange"
        range-key="text"
      >
        <text>{{ paymentYearArr[paymentYearIndex].text }}</text>
        <i class="dropdown"></i>
      </picker>
    </view>
    <view class="form-group line">
      <label>首次还款日期</label>
      <picker
        mode="date"
        :value="startDateStr"
        @change="startDateChange"
        range-key="text"
      >
        <text>{{ startDateStr }}</text>
        <i class="dropdown"></i>
      </picker>
    </view>
    <!-- 利率类型 -->
    <view class="rate-section" v-if="showBusiness">
      <view class="form-group line">
        <label>利率标准</label>
        <picker
          mode="selector"
          :value="businessLoanRateTypeIndex"
          :range="businessLoanRateTypeArr"
          @change="businessLoanRateTypeChange"
          range-key="text"
        >
          <text
            >{{ businessLoanRateTypeArr[businessLoanRateTypeIndex].text }}
          </text>
          <i class="dropdown"></i>
        </picker>
      </view>
      <view class="rate-section" v-if="LPR">
        <view class="form-group line">
          <label @tap="LPRTooltip" class="question">
            LPR
            <image
              class="question-icon"
              src="http://xue.ccy1994.top/xiaochengxu/mini-tools/static/pages/my_module/calc_mortgage/question.png"
            />
          </label>
          <view class="input-label">
            <input
              type="digit"
              :value="LPRValue"
              class="value-input"
              @input="LPRValueInput"
            />
            <label>%</label>
          </view>
        </view>
        <view class="form-group line">
          <label>基点</label>
          <view class="input-label">
            <input
              type="digit"
              :value="basePoint"
              class="value-input"
              @input="basePointInput"
            />
            <label>‰</label>
          </view>
        </view>
        <view class="form-group line">
          <label>贷款利率</label>
          <label
            >{{ LPRValueText }}% + {{ basePointText }}‰ =
            {{ LPRRateValue }}%</label
          >
        </view>
      </view>

      <view class="form-group line" v-if="!LPR">
        <label>贷款利率</label>
        <picker
          mode="selector"
          :value="businessLoanRateIndex"
          :range="businessLoanRateArr"
          @change="businessLoanRateChange"
          range-key="text"
        >
          <text>{{ businessLoanRateArr[businessLoanRateIndex].text }}</text>
          <i class="dropdown"></i>
        </picker>
      </view>
    </view>

    <view class="form-group line" v-if="showGJJ">
      <label>公积金贷款利率</label>
      <picker
        mode="selector"
        :value="gjjLoanRateIndex"
        :range="gjjLoanRateArr"
        @change="gjjLoanRateChange"
        range-key="text"
      >
        <text>{{ gjjLoanRateArr[gjjLoanRateIndex].text }}</text>
        <i class="dropdown"></i>
      </picker>
    </view>
    <view class="actions" :style="'bottom:' + actionsBottom + 'px'">
      <button type="primary" @tap="calculateLoan">开始计算</button>
    </view>
  </view>
</template>

<script>
//index.js
import util from "./mortgage_util.js";
//获取应用实例
const app = getApp();
export default {
  data() {
    return {
      businessTotalLoan: 0,
      gjjTotalLoan: 0,
      loanType: "1",
      startDate: undefined,
      actionsBottom: 50,
      businessTotalLoanStr: "",
      gjjTotalLoanStr: "",
      showGJJ: false,
      showBusiness: true,
      gjjFocus: false,
      businessFocus: false,
      startDateStr: "",
      LPR: true,
      LPRValue: 4,
      basePoint: 0,
      LPRValueText: "4",
      basePointText: "0",
      LPRRateValue: 4,
      paymentMethodIndex: 0,
      paymentYearIndex: 29,
      businessLoanRateTypeIndex: 0,
      businessLoanRateIndex: 6,
      gjjLoanRateIndex: 0,

      loanTypeArr: [
        {
          text: "商业贷款",
          id: 1,
          checked: true,
        },
        {
          text: "公积金贷款",
          id: 2,
        },
        {
          text: "组合贷款",
          id: 3,
        },
      ],

      paymentMethodArr: [
        {
          text: "等额本息(每月等额还款)",
          id: 1,
        },
        {
          text: "等额本金(每月递减还款)",
          id: 2,
        },
      ],

      paymentYearArr: [],

      businessLoanRateTypeArr: [
        {
          text: "LPR",
          value: 1,
        },
        {
          text: "基准利率",
          value: 2,
        },
      ],

      businessLoanRateArr: [],
      gjjLoanRateArr: [],
      businessLoanRate: "",
      text: "",
    };
  },
  /**
   * 生命周期函数--监听页面加载
   */ onLoad: function () {
    let currentDate = new Date();
    let paymentYearArr = [];
    for (let i = 1; i <= 30; i++) {
      paymentYearArr.push({
        value: i,
        text: `${i}年 (${i * 12}月)`,
      });
    }
    let tempArr = util.getBusinessLoanRateArr(this.paymentYear);
    this.setData({
      paymentYearArr: paymentYearArr,
      businessLoanRateArr: tempArr,
      gjjLoanRateArr: util.getGJJLoanRateArr(this.paymentYear),
      startDate: currentDate,
      startDateStr: util.formatDate(currentDate),
      businessLoanRate: tempArr[this.businessLoanRateIndex].value,
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareTimeline: function () {
    return {
      title: "个人房贷(商业/公积金/组合贷款)计算，每月还款明细查看",
    };
  },
  onShareAppMessage: function () {
    return {
      path: "/pages/my_module/calc_mortgage/index",
      title: "个人房贷(商业/公积金/组合贷款)计算，每月还款明细查看",
    };
  },
  methods: {
    // 公共方法
    resetData: function (loanType) {
      let paymentYear = 30;
      let currentDate = new Date();
      this.setData({
        loanType: loanType,
        paymentMethodIndex: 0,
        paymentYearIndex: 29,
        businessLoanRateIndex: 6,
        gjjLoanRateIndex: 0,
        showBusiness: loanType === "1" || loanType === "3",
        showGJJ: loanType === "2" || loanType === "3",
        businessLoanRateArr: util.getBusinessLoanRateArr(paymentYear),
        gjjLoanRateArr: util.getGJJLoanRateArr(paymentYear),
        startDate: currentDate,
        startDateStr: util.formatDate(currentDate),
        // businessFocus: loanType === '1' || loanType === '3',
        // gjjFocus: loanType === '2',
      });
    },

    /**
     * 贷款计算数据
     */
    getMortgageData: function () {
      let data = {
        businessTotalLoan: parseFloat(this.businessTotalLoan),
        gjjTotalLoan: parseFloat(this.gjjTotalLoan),
        gjjLoanRate: this.gjjLoanRateArr[this.gjjLoanRateIndex].value,
        paymentMethod: this.paymentMethodArr[this.paymentMethodIndex].id,
        paymentYear: this.paymentYearArr[this.paymentYearIndex].value,
        startDate: this.startDate,
        loanType: this.loanType,
      };
      if (this.LPR) {
        data.businessLoanRate = this.LPRRateValue;
      } else {
        data.businessLoanRate =
          this.businessLoanRateArr[this.businessLoanRateIndex].value;
      }
      return data;
    },

    //事件处理函数
    inputFocus: function (e) {
      this.setData({
        actionsBottom: e.detail.height,
      });
      return;
    },

    inputBlur: function (e) {
      this.setData({
        actionsBottom: 0,
      });
      return;
    },

    /**
     * 商业贷款金额输入
     */
    businessTotalLoanInput: function (e) {
      let value = e.detail.value || 0;
      if (value === 0) {
        this.setData({
          businessTotalLoan: 0,
          businessTotalLoanStr: "",
        });
        return;
      }
      let valueStr = value.toString();
      if (valueStr.indexOf(".") < valueStr.length - 2) {
        value = util.truncate(value);
        this.setData({
          businessTotalLoan: value,
          businessTotalLoanStr: value,
        });
      }
    },

    /**
     * 公积金贷款金额输入
     */
    gjjTotalLoanInput: function (e) {
      let value = e.detail.value || 0;
      if (value === 0) {
        this.setData({
          gjjTotalLoan: 0,
          gjjTotalLoanStr: "",
        });
        return;
      }
      let valueStr = value.toString();
      if (valueStr.indexOf(".") < valueStr.length - 2) {
        value = util.truncate(value);
        this.setData({
          gjjTotalLoan: value,
          gjjTotalLoanStr: value,
        });
      }
    },

    /**
     * 贷款类型切换
     */
    loanTypeChange: function (e) {
      let loanType = e.detail.value;
      this.resetData(loanType);
    },

    /**
     * 还款方式切换
     */
    paymentMethodchange: function (e) {
      let index = e.detail.value;
      this.setData({
        paymentMethodIndex: index,
      });
    },

    /**
     * 还款年数
     */
    paymentYearchange: function (e) {
      let index = e.detail.value;
      let paymentYear = this.paymentYearArr[index].value;
      let lpr = 4;
      if (paymentYear == 1) {
        lpr = 3.85;
      }
      this.setData({
        LPRValue: lpr,
        LPRValueText: "" + lpr,
      });
      this.calculateLPRRateValue();
      this.setData({
        paymentYearIndex: index,
        businessLoanRateArr: util.getBusinessLoanRateArr(paymentYear),
        gjjLoanRateArr: util.getBusinessLoanRateArr(paymentYear),
      });
    },

    /**
     * 开始还款日期
     */
    startDateChange: function (e) {
      this.setData({
        startDate: new Date(e.detail.value),
        startDateStr: util.formatDate(new Date(e.detail.value)),
      });
    },

    /**
     * 利率类型变更
     */
    businessLoanRateTypeChange: function (e) {
      let index = e.detail.value;
      this.setData({
        businessLoanRateTypeIndex: index,
        LPR: index == 0,
      });
    },

    /**
     * LPR提示
     */
    LPRTooltip: function (e) {
      uni.showModal({
        title: "LPR（贷款市场报价利率）",
        content:
          "自2019年10月8日起，新发放商业性个人住房贷款利率从以往的贷款基准利率（4.9%）转换为LPR（贷款市场报价利率），最终的商业贷款利率是通过在LPR的基础上增加基点确认。\r\n\r\nLPR分为一年期和五年期，于每月20日（遇节假日顺延）报价，可在中国人民银行网站查询。",
        confirmText: "知道了",
        showCancel: false,
      });
    },

    /**
     * LPR
     */
    LPRValueInput: function (e) {
      let value = e.detail.value || 0;
      this.setData({
        LPRValue: value,
        LPRValueText: Math.floor(value * 10000) / 10000,
      });
      this.calculateLPRRateValue();
    },

    /**
     * 基点
     */
    basePointInput: function (e) {
      let value = e.detail.value || 0;
      this.setData({
        basePoint: value,
        basePointText: Math.floor(value * 100) / 100,
      });
      this.calculateLPRRateValue();
    },

    /**
     * 计算LPR 实际利率
     */
    calculateLPRRateValue: function (e) {
      let value =
        (Math.floor(this.LPRValue * 10000) + Math.floor(this.basePoint * 100)) /
        10000;
      this.setData({
        LPRRateValue: value,
      });
    },

    /**
     * 商业贷款基准利率变更
     */
    businessLoanRateChange: function (e) {
      let index = e.detail.value;
      this.setData({
        businessLoanRateIndex: index,
      });
    },

    /**
     * 公积金利率选择
     */
    gjjLoanRateChange: function (e) {
      let index = e.detail.value;
      this.setData({
        gjjLoanRateIndex: index,
      });
    },

    /**
     * 计算
     */
    calculateLoan: function () {
      let mortgageData = this.getMortgageData();
      switch (mortgageData.loanType) {
        case "1":
          if (!mortgageData.businessTotalLoan) {
            uni.showToast({
              title: "请输入商业贷款金额",
              icon: "none",
              duration: 2000,
            });
            this.setData({
              businessFocus: true,
            });
            return;
          }
          break;
        case "2":
          if (!mortgageData.gjjTotalLoan) {
            uni.showToast({
              title: "请输入公积金贷款金额",
              icon: "none",
              duration: 2000,
            });
            this.setData({
              gjjFocus: true,
            });
            return;
          }
          break;
        case "3":
          if (!mortgageData.businessTotalLoan) {
            uni.showToast({
              title: "请输入商业贷款金额",
              icon: "none",
              duration: 2000,
            });
            this.setData({
              businessFocus: true,
            });
            return;
          }
          if (!mortgageData.gjjTotalLoan) {
            uni.showToast({
              title: "请输入公积金贷款金额",
              icon: "none",
              duration: 2000,
            });
            this.setData({
              gjjFocus: true,
            });
            return;
          }
          break;
      }
      app.globalData.mortgageData = mortgageData;
      uni.navigateTo({
        url: "../calc_mortgage/detail",
      });
    },
  },
};
</script>
<style>
/**index.wxss**/

.container {
  padding: 20rpx;
}

.form-group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 40rpx;
}

.form-group.loan {
  min-height: 160rpx;
}

.line {
  padding-bottom: 20rpx;
  border-bottom: 1px solid #ccc;
}

.loan {
  flex-direction: row;
}

.loanItem {
  width: 100%;
}

.totalLoan {
  font-size: 50rpx;
  margin-top: 10rpx;
  padding-top: 30rpx;
  height: 60rpx;
}

.double .totalLoan {
  font-size: 32rpx;
}

.double .loanItem {
  width: 46%;
}

.double .totalLoan {
  padding-top: 20rpx;
}

.radioGroup {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.actions {
  background: #fff;
  width: 90%;
  padding: 40rpx 6%;
}

.rate-section {
  width: 100%;
}

.value-input {
  width: 120rpx;
  text-align: center;
}

.input-label {
  display: flex;
  justify-content: space-between;
  font-size: 36rpx;
  background: #ccc;
  border-radius: 10rpx;
  padding: 16rpx;
}

.question-icon {
  height: 28rpx;
  width: 28rpx;
  padding-left: 5px;
}
</style>
