<template>
  <view class="datecal-wrapper">
    <wd-card title="计算几天后的日期">
      <wd-calendar v-model="date" label-width="200upx" label="请选择起始日期" @confirm="handleConfirm"/>
      <wd-cell title="请输入间隔天数（负数表示向前计算）" title-width="600upx">
      </wd-cell>
      <view class="ipt-dis">
        <wd-input-number :min="-Infinity" :precision="0" allow-null model-value="distance" :step="1"/>
      </view>
      <view class="btns">
        <wd-button>开始计算</wd-button>
        <wd-button type="info">清除</wd-button>
      </view>
      <wd-cell title="计算结果：">
        <view class="date-res"></view>
      </wd-cell>
    </wd-card>
  </view>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import {ref} from "vue";

const date = ref()
const distance = ref(1)

function handleConfirm() {

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
    color: #333333;
  }
}
</style>
