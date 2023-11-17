<template>
  <!-- pages/detail/detail.wxml -->

  <view class="container">
    <view class="card">
      <view class="cardItem">
        <label>每月需还款</label>
      </view>
      <view class="cardItem monthlyPayment">
        <label :class="monthlyPaymentClass">{{ monthlyPaymentStr }}</label>
        <label class="unit">元</label>
      </view>
      <view class="cardItem" v-if="balanceStr">
        <label>每月递减 {{ balanceStr }} 元</label>
      </view>
      <view class="line"></view>
      <view class="total">
        <label>还款总额</label>
        <label>{{ TotalPaidStr }} 万</label>
      </view>
      <view class="total">
        <label>支付利息</label>
        <label>{{ totalInterestStr }} 万</label>
      </view>
      <view class="total">
        <label>贷款金额</label>
        <label>{{ totalLoanStr }} 万</label>
      </view>
      <view class="total">
        <label>还款方式</label>
        <label>{{ loanTypeName }}</label>
      </view>
      <view class="monthDetails">
        <view class="showDetail" @tap="showYearsDetailToggle">
          <label class="subTitle">{{ paymentYear }}年还款明细</label>
          <wd-icon
            custom-class="arrow"
            v-if="showDetail"
            name="arrow-up"
            size="22px"
          ></wd-icon>
          <wd-icon
            custom-class="arrow"
            v-else
            name="arrow-down"
            size="22px"
          ></wd-icon>
        </view>
        <view v-if="showDetail">
          <view
            class="year"
            :data-index="index"
            @tap="showMonthDetailToggle"
            v-for="(yearItem, index) in payDetails"
            :key="index"
          >
            <view class="yearName">
              <label>{{ yearItem.year }}年</label>
              <i :class="'arraw ' + (yearItem.showMonths ? 'raise' : '')" />
            </view>

            <view class="yearDetail">
              <view class="yearItem">
                <label class="yearPaid">{{
                  truncate(yearItem.yearPaid)
                }}</label>
                <label>本年还款</label>
              </view>
              <view class="yearItem">
                <label class="yearPaid">{{
                  truncate(yearItem.yearInterest)
                }}</label>
                <label>本年利息</label>
              </view>
              <wd-icon
                custom-class="arrow"
                v-if="yearItem.showMonths"
                name="arrow-up"
                size="22px"
              ></wd-icon>
              <wd-icon
                custom-class="arrow"
                v-else
                name="arrow-down"
                size="22px"
              ></wd-icon>
            </view>

            <view class="months table" v-if="yearItem.showMonths">
              <view class="tr">
                <text class="th">月份</text>
                <text class="th">本期还款</text>
                <text class="th">本期本金</text>
                <text class="th">本期利息</text>
                <text class="th">剩余本金</text>
              </view>
              <view
                class="tr"
                v-for="(monthItem, index1) in yearItem.months"
                :key="index1"
              >
                <text class="td">{{ monthItem.month }}月</text>

                <text class="td"
                  >{{ truncate(monthItem.monthlyPayment) }}
                </text>

                <text class="td">{{ truncate(monthItem.principal) }}</text>

                <text class="td">{{ truncate(monthItem.interest) }}</text>

                <text class="td">{{ truncate(monthItem.surplus) }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// pages/detail/detail.js
import util from "./mortgage_util.js";
import mortgageHelper from "./mortgageHelper.js";
//获取应用实例
const app = getApp();
export default {
  data() {
    return {
      monthlyPaymentStr: "0",
      monthlyPaymentClass: "",
      balanceStr: "",
      totalLoanStr: "",
      totalInterestStr: "",
      TotalPaidStr: "",
      loanTypeName: "",
      paymentYear: 0,
      showDetail: false,
      payDetails: [],
      showMonths: "",

      yearItem: {
        year: "",
        showMonths: false,
        months: [],
      },

      monthItem: {
        month: "",
      },
    };
  },
  /**
   * 生命周期函数--监听页面加载
   */ onLoad: function (options) {
    let mortgage = app.globalData.mortgageData;
    let loanTypeName = "等额本息(每月等额还款)";
    if (mortgage.paymentMethod === 2) {
      loanTypeName = "等额本金(每月递减还款)";
    }
    var mortgageDetail = mortgageHelper.calculatePaymentDetail(mortgage);
    mortgageDetail.monthlyPayment = util.truncate(
      mortgageDetail.monthlyPayment,
    );
    let balanceStr = "";
    if (mortgageDetail.balance > 0) {
      mortgageDetail.balance = util.truncate(mortgageDetail.balance);
      balanceStr = mortgageDetail.balance.toLocaleString();
    }
    let paymentMonthStr = mortgageDetail.monthlyPayment.toLocaleString();
    let monthlyPaymentClass = "";
    if (paymentMonthStr.length < 8) {
      monthlyPaymentClass = "";
    } else if (paymentMonthStr.length < 10) {
      monthlyPaymentClass = "bigNum1";
    } else if (paymentMonthStr.length < 14) {
      monthlyPaymentClass = "bigNum2";
    } else {
      monthlyPaymentClass = "bigNum3";
    }
    mortgageDetail.totalPaid = util.truncate(mortgageDetail.totalPaid);
    mortgageDetail.totalInterest = util.truncate(mortgageDetail.totalInterest);
    this.setData({
      monthlyPaymentStr: paymentMonthStr,
      monthlyPaymentClass: monthlyPaymentClass,
      balanceStr: balanceStr,
      totalLoanStr: mortgageDetail.totalLoan.toLocaleString(),
      totalInterestStr: mortgageDetail.totalInterest.toLocaleString(),
      TotalPaidStr: mortgageDetail.totalPaid.toLocaleString(),
      loanTypeName: loanTypeName,
      paymentYear: mortgage.paymentYear,
      payDetails: mortgageDetail.payDetails,
    });
    console.log(
      `%c this.data`,
      "color: pink;font-size:20px;background:black;",
      [...this.payDetails],
    );
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    uni.showToast({
      title: "感谢您的分享，谢谢您！",
      icon: "none",
      duration: 1500,
    });
    return {
      title: "个人房贷(商业/公积金/组合贷款)计算，每月还款明细查看",
      path: "/pages/my_module/calc_mortgage/index?f=detail",
      imageUrl: "../../images/share.jpg",
    };
  },
  methods: {
    showYearsDetailToggle: function () {
      this.setData({
        showDetail: !this.showDetail,
      });
    },
    truncate: function (num, decimal = 2) {
      var numStr = (num * 1.0).toFixed(decimal + 1);
      return parseFloat(numStr.substring(0, numStr.length - 1));
    },
    showMonthDetailToggle: function (event) {
      let index = event.currentTarget.dataset.index;
      var showMonths = "payDetails[" + index + "].showMonths";
      this.setData({
        [showMonths]: !this.payDetails[index].showMonths,
      });
    },
  },
};
</script>

<style lang="scss">
/* pages/detail/detail.wxss */

.container {
  padding: 20rpx;
  justify-content: center;
}

.card {
  width: 100%;
  padding: 50rpx 0;
  border-radius: 10rpx;
  border: 5rpx solid #eee;
  margin: 0 auto;
}

.cardItem {
  width: 100%;
  text-align: center;
}

.monthlyPayment {
  padding: 10rpx 0;
  color: #ff5500;
  font-size: 100rpx;
}

.bigNum1 {
  font-size: 100rpx;
}

.bigNum2 {
  font-size: 80rpx;
}

.bigNum3 {
  font-size: 60rpx;
}

.monthlyPayment .unit {
  font-size: 50rpx;
}

.line {
  border-top: 1px dotted #aaa;
  height: 0;
  margin: 50rpx 0;
}

.total {
  display: flex;
  padding: 0 5%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 40rpx;
}

.monthDetails {
  margin-top: 30rpx;
}

.year {
  width: 100%;
}

.showDetail {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 30rpx;

  .subTitle {
    padding-bottom: 5rpx;
  }
}

.yearName {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
}

.yearName .arraw {
  margin-top: 10rpx;
}

.yearName .arraw.raise {
  margin-top: 20rpx;
}

.yearDetail {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 30rpx;
  padding: 0 5%;

  .arrow {
    margin-top: 30rpx;
  }
}

.yearItem {
  width: 45%;
  display: flex;
  flex-direction: column;
}

.yearDetail .yearItem:first-child {
  width: 55%;
}

.yearPaid {
  font-size: 50rpx;
}

.months {
  margin-bottom: 30rpx;
}

.table {
  border: 0px solid #fff;
}

.tr {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.th,
.td {
  width: 22.5%;
  justify-content: center;
  text-align: center;
  border-left: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 12rpx 0;
}

.tr .th:first-child,
.tr .td:first-child {
  width: 10%;
  border-left: 0px solid #ccc;
}
</style>
