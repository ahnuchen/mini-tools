<template>
  <view class="datecal-wrapper">
    <wd-card title="计算几天后的日期">
      <wd-datetime-picker type="date" v-model="date" label-width="200upx" label="请选择起始日期"
                          @confirm="clearDateRes"/>
      <wd-cell title="请输入间隔天数（负数表示向前计算）" title-width="600upx">
      </wd-cell>
      <view class="ipt-dis">
        <wd-input-number input-width="200upx" :min="-Infinity" :precision="0" v-model:model-value="distance"
                         @change="clearDateRes"
                         :step="1"/>
      </view>
      <view class="btns">
        <wd-button @click="handleConfirm">开始计算</wd-button>
        <wd-button @click="handleClear" type="info">清除</wd-button>
      </view>
      <view class="date-res" v-if="targetDate">
        <text>计算结果：</text>
        <text>{{ targetDate }}</text>
      </view>
    </wd-card>

    <wd-card title="计算时间差">
      <wd-datetime-picker type="date" v-model="startDate" label-width="200upx" label="请选择起始日期"
                          @confirm="clearDiffRes"/>
      <wd-datetime-picker type="date" v-model="endDate" label-width="200upx" label="请选择结束日期"
                          @confirm="clearDiffRes"/>
      <view class="btns">
        <wd-button @click="disCalc">开始计算</wd-button>
        <wd-button @click="disClear" type="info">清除</wd-button>
      </view>
      <view class="date-res" v-if="disValue || disValue === 0">
        <text>计算结果：</text>
        <text>{{ disValue }}</text>
      </view>
    </wd-card>
    <FloatBtn
        desc="日期计算是一款专门用于计算日期和时间的专业工具。它可以对各种时间基准(如天、小时、分钟、秒等)进行实时转换，并输出标准的时间信号。 该工具内置了多种处理日期时间的算法和方法，适合对食物过期、节假日安排、旅游出行等需求用户使用"/>
  </view>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import {ref} from "vue";
import FloatBtn from "@/components/FloatBtn.vue";

const dateFormat = 'YYYY-MM-DD'
// const initialDate = dayjs().format(dateFormat)
const initialDate = Date.now()
const date = ref(initialDate)
const distance = ref(1)
const targetDate = ref('')
const startDate = ref(initialDate)
const endDate = ref(initialDate)

const disValue = ref<number | null>(null)


function handleConfirm() {
  const targetDay = dayjs(date.value, dateFormat).add(distance.value, 'days')
  targetDate.value = targetDay.format(dateFormat)
}

function clearDateRes() {
  targetDate.value = ''
}

function clearDiffRes() {
  disValue.value = null
}

function handleClear() {
  date.value = initialDate
  targetDate.value = ''
  distance.value = 1
}

function disCalc() {
  const diff = dayjs(endDate.value).diff(dayjs(startDate.value), 'days', true)
  disValue.value = Math.ceil(diff)
}

function disClear() {
  startDate.value = initialDate
  endDate.value = initialDate
  disValue.value = null
}

</script>

<style lang="scss">
.datecal-wrapper {
  padding-top: 40upx;

  .ipt-dis {
    padding-left: 30upx;
  }

  .btns {
    display: flex;
    padding-top: 36upx;
    padding-bottom: 20upx;
  }

  .date-res {
    padding-left: 30upx;
    color: $uni-color-primary;
  }
}
</style>
