<template>
  <view class="datecal-wrapper">
    <wd-card title="计算改革后退休年龄">
      <wd-datetime-picker
          :min-date="minDate"
          :max-date="maxDate"
          type="year-month"
          v-model="date"
          label-width="200rpx"
          label="请选择出生年月"
          @confirm="clearDateRes"
      />
      <wd-cell title="性别及人员类型：" title-width="600rpx">
      </wd-cell>
      <view class="ipt-dis">
        <wd-radio-group v-model="gender" @change="genderChange">
          <wd-radio shape="dot" value="1">男职工</wd-radio>
          <wd-radio shape="dot" value="2">原法定退休年龄55周岁女职工</wd-radio>
          <wd-radio shape="dot" value="3">原法定退休年龄50周岁女职工</wd-radio>
        </wd-radio-group>
      </view>
      <view class="date-res" v-if="targetDate">
        <text>计算结果：</text>
        <view class="date-res-item">您的改革后法定退休年龄为：{{ retireAgeStr }}</view>
        <view class="date-res-item">您的改革后退休时间为：{{retireTimeStr}}</view>
        <view class="date-res-item">您的延迟月数为：{{delayMonthStr}}</view>
      </view>
      <view class="btns">
        <wd-button @click="handleConfirm">开始计算</wd-button>
        <wd-button @click="handleClear" type="info">清除</wd-button>
      </view>
    </wd-card>

    <FloatBtn
        desc="说明：按照《关于实施渐进式延迟法定退休年龄的决定》附表对照关系，您通过法定退休年龄计算器，选择出生年月、性别及人员类型，即可计算出对应的改革后法定退休年龄、改革后退休时间、延迟月数。"
    />
    <wd-message-box></wd-message-box>
  </view>
</template>

<script setup>
import dayjs from "dayjs";
import {ref} from "vue";
import FloatBtn from "@/components/FloatBtn.vue";
import {onShareAppMessage, onShareTimeline} from "@dcloudio/uni-app";
import {useMessage} from "wot-design-uni";


const message = useMessage();
const dateFormat = "YYYY-MM-DD";
// const initialDate = dayjs().format(dateFormat)
const initialDate = 946656000000;
const date = ref(initialDate);
const distance = ref(1);
const targetDate = ref("");
const gender = ref('1');
const minDate = dayjs().subtract(70, "years").valueOf();
const maxDate = dayjs().add(40, "years").valueOf();

const retireAgeStr = ref('')
const retireTimeStr = ref('')
const delayMonthStr = ref('')

function yearMonthAddYears(date1, diffYear) {


  var date11 = new Date(date1);
  var year1 = date11.getFullYear();
  var month1 = date11.getMonth() + 1;

  var years = year1 + diffYear;

  return month1 < 10 ? years + '-0' + month1 : years + '-' + month1
}

function yearMonthBetweenDates(date1, date2) {
  var date11 = new Date(date1);
  var date22 = new Date(date2);
  var year1 = date11.getFullYear();
  var month1 = date11.getMonth();
  var year2 = date22.getFullYear();
  var month2 = date22.getMonth();

  var years = year2 - year1;
  var months = month2 - month1;

  // 处理年份差异导致的月份差异
  if (months < 0) {
    years--;
    months += 12;
  }
  return months === 0 ? years + '岁' : years + '岁' + months + '个月'
}

function MonthsBetweenDates(date1, date2) {
  var date11 = new Date(date1);
  var date22 = new Date(date2);
  var year1 = date11.getFullYear();
  var month1 = date11.getMonth();
  var year2 = date22.getFullYear();
  var month2 = date22.getMonth();

  var years = year2 - year1;
  var months = month2 - month1;

  // 处理年份差异导致的月份差异
  if (months < 0) {
    years--;
    months += 12;
  }
  return years * 12 + months;
}

function isEmpty(obj) {
  if (typeof obj === 'undefined' || obj == null || obj === '') {
    return true;
  } else {
    return false;
  }
}

function calculate() {
  var data = {
    "result": {"sexAndPersonType": "3", "birth": dayjs(date.value).format('YYYY-MM')},
    "minMax": {
      "minmaledate": "1965-01",
      "minfemale50date": "1975-01",
      "maxfemale55date": "1981-12",
      "minfemale55date": "1970-01",
      "maxmaledate": "1976-12",
      "maxfemale50date": "1984-12"
    },
    "code": "1"
  }

  // 获取birth、sexAndPersonType

  var birth = data.result.birth;
  var sexAndPersonType = gender.value;

  var retireAge = ''
  var retireTime = ''
  var delayMonth = ''
  if (sexAndPersonType === '1') {
    // 获取retireDate
    var retireDate = ''
    if (isEmpty(data.result.maledate)) {
      if (birth < data.minMax.minmaledate) {
        retireDate = yearMonthAddYears(birth, 60)
      }
      if (birth > data.minMax.maxmaledate) {
        retireDate = yearMonthAddYears(birth, 63)
      }
    } else {
      retireDate = data.result.maledate;
    }

    retireAge = yearMonthBetweenDates(birth, retireDate);
    if (retireDate.length === 7) {
      retireTime = retireDate.replace('-', '年') + '月'
      if (retireTime.substring(5, 6) === '0') {
        retireTime = retireTime.substring(0, 5) + retireTime.substring(6)
      }
    }
    var delay = MonthsBetweenDates(birth, retireDate) - 60 * 12
    delayMonth = delay + '个月'
  }
  if (sexAndPersonType === '2') {
    // 获取retireDate
    var retireDate = ''
    if (isEmpty(data.result.female55date)) {
      if (birth < data.minMax.minfemale55date) {
        retireDate = yearMonthAddYears(birth, 55)
      }
      if (birth > data.minMax.maxfemale55date) {
        retireDate = yearMonthAddYears(birth, 58)
      }
    } else {
      retireDate = data.result.female55date;
    }

    retireAge = yearMonthBetweenDates(birth, retireDate);
    if (retireDate.length === 7) {
      retireTime = retireDate.replace('-', '年') + '月'
      if (retireTime.substring(5, 6) === '0') {
        retireTime = retireTime.substring(0, 5) + retireTime.substring(6)
      }
    }
    var delay = MonthsBetweenDates(birth, retireDate) - 55 * 12
    delayMonth = delay + '个月'
  }
  if (sexAndPersonType === '3') {
    // 获取retireDate
    var retireDate = ''
    if (isEmpty(data.result.female50date)) {
      if (birth < data.minMax.minfemale50date) {
        retireDate = yearMonthAddYears(birth, 50)
      }
      if (birth > data.minMax.maxfemale50date) {
        retireDate = yearMonthAddYears(birth, 55)
      }
    } else {
      retireDate = data.result.female50date;
    }

    retireAge = yearMonthBetweenDates(birth, retireDate);
    if (retireDate.length === 7) {
      retireTime = retireDate.replace('-', '年') + '月'
      if (retireTime.substring(5, 6) === '0') {
        retireTime = retireTime.substring(0, 5) + retireTime.substring(6)
      }
    }
    var delay = MonthsBetweenDates(birth, retireDate) - 50 * 12
    delayMonth = delay + '个月'
  }

  retireAgeStr.value = retireAge;
  retireTimeStr.value = retireTime;
  delayMonthStr.value = delayMonth;
}

function handleConfirm() {
  targetDate.value = true
  calculate()
}

function genderChange({value}) {
  clearDateRes()
}

function clearDateRes() {
  targetDate.value = "";
}

function handleClear() {
  date.value = initialDate;
  targetDate.value = "";
  distance.value = 1;
}


const shareInfo = {
  path: "/pages/retire/retire",
  title: "退休年龄计算",
};

onShareAppMessage(() => shareInfo);

onShareTimeline(() => shareInfo);
</script>

<style lang="scss">
.datecal-wrapper.datecal-wrapper.datecal-wrapper {
  padding-top: 40rpx;

  .ipt-dis {
    padding-left: 30rpx;
  }

  .ipt-number {
    height: 66rpx;

    .wd-input-number__action {
      height: 66rpx;
      width: 66rpx;
    }

    input {
      height: 66rpx;
    }
  }

  .btns {
    display: flex;
    padding-top: 36rpx;
    padding-bottom: 20rpx;
  }

  .date-res {
    margin-top: 30rpx;
    padding-left: 30rpx;
    line-height: 50rpx;
    color: $uni-color-primary;
  }
}
</style>
