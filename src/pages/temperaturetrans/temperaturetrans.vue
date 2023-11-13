<template>
  <view>
    <wd-cell-group border>
      <wd-cell title="摄氏度(C)" title-width="200rpx">
        <wd-input-number :min="-Infinity" placeholder="请输入摄氏度(C)" :precision="2" v-model="valueC" allow-null
                         @change="(v) => onChange(v, 'C')"
                         input-width="120px"/>
      </wd-cell>
      <wd-cell title="华氏度(F)" title-width="200rpx">
        <wd-input-number :min="-Infinity" placeholder="请输入华氏度(F)" :precision="2" v-model="valueF" allow-null
                         @change="(v) => onChange(v, 'F')"
                         input-width="120px"/>
      </wd-cell>
      <wd-cell title="开氏度(K)" title-width="200rpx">
        <wd-input-number :min="-Infinity" placeholder="请输入开氏度(K)" :precision="2" v-model="valueK" allow-null
                         @change="(v) => onChange(v, 'K')"
                         input-width="120px"/>
      </wd-cell>
      <wd-cell title="兰氏度(Ra)" title-width="200rpx">
        <wd-input-number :min="-Infinity" placeholder="请输入兰氏度(Ra)" :precision="2" v-model="valueRa" allow-null
                         @change="(v) => onChange(v, 'Ra')"
                         input-width="120px"/>
      </wd-cell>
      <wd-cell title="列氏度(Re)" title-width="200rpx">
        <wd-input-number :min="-Infinity" placeholder="请输入列氏度(Re)" :precision="2" v-model="valueRe" allow-null
                         @change="(v) => onChange(v, 'Re')"
                         input-width="120px"/>
      </wd-cell>
    </wd-cell-group>
    <FloatBtn
        desc="温度转换是一款多功能的数据处理软件，支持多平台应用。它可以将任意格式的数字转换为所需的模拟温度值，例如摄氏度、华氏度、开尔文等，适合温度不同场合转换有严格要求的用户"/>
  </view>
</template>

<script setup lang="ts">

import {ref} from "vue";
import UnitOf from "@/utils/UnitOf.min";
import FloatBtn from "@/components/FloatBtn.vue";

const unitOf = UnitOf as any

const valueC = ref()
const valueF = ref()
const valueK = ref()
const valueRa = ref()
const valueRe = ref()

type Unit = 'C' | 'F' | 'K' | 'Ra' | 'Re'

function onChange(v: { value: string | number }, unit: Unit) {
  // C
  // F
  // K
  // Ra
  // Re
  let {value} = v
  if (!value && value !== 0) {
    valueC.value = null
    valueF.value = null
    valueK.value = null
    valueRa.value = null
    valueRe.value = null
    return
  }
  if (typeof value === 'string') {
    value = Number(value)
  }
  switch (unit) {
    case "C": {
      valueF.value = parseFloat(unitOf.Temperature.fromCelsius(value).toFahrenheit.toFixed(2));
      valueK.value = parseFloat(unitOf.Temperature.fromCelsius(value).toKelvin.toFixed(2));
      valueRa.value = parseFloat(unitOf.Temperature.fromCelsius(value).toRankine.toFixed(2));
      valueRe.value = parseFloat(unitOf.Temperature.fromCelsius(value).toReaumur.toFixed(2));
      return
    }
    case "F": {
      valueC.value = parseFloat(unitOf.Temperature.fromFahrenheit(value).toCelsius.toFixed(2));
      valueK.value = parseFloat(unitOf.Temperature.fromFahrenheit(value).toKelvin.toFixed(2));
      valueRa.value = parseFloat(unitOf.Temperature.fromFahrenheit(value).toRankine.toFixed(2));
      valueRe.value = parseFloat(unitOf.Temperature.fromFahrenheit(value).toReaumur.toFixed(2));
      return
    }
    case "K": {
      valueC.value = parseFloat(unitOf.Temperature.fromKelvin(value).toCelsius.toFixed(2));
      valueF.value = parseFloat(unitOf.Temperature.fromKelvin(value).toFahrenheit.toFixed(2));
      valueRa.value = parseFloat(unitOf.Temperature.fromKelvin(value).toRankine.toFixed(2));
      valueRe.value = parseFloat(unitOf.Temperature.fromKelvin(value).toReaumur.toFixed(2));
      return
    }
    case "Ra": {
      valueC.value = parseFloat(unitOf.Temperature.fromRankine(value).toCelsius.toFixed(2));
      valueF.value = parseFloat(unitOf.Temperature.fromRankine(value).toFahrenheit.toFixed(2));
      valueK.value = parseFloat(unitOf.Temperature.fromRankine(value).toKelvin.toFixed(2));
      valueRe.value = parseFloat(unitOf.Temperature.fromRankine(value).toReaumur.toFixed(2));
      return
    }
    case "Re": {
      valueC.value = parseFloat(unitOf.Temperature.fromReaumur(value).toCelsius.toFixed(2));
      valueF.value = parseFloat(unitOf.Temperature.fromReaumur(value).toFahrenheit.toFixed(2));
      valueK.value = parseFloat(unitOf.Temperature.fromReaumur(value).toKelvin.toFixed(2));
      valueRa.value = parseFloat(unitOf.Temperature.fromReaumur(value).toRankine.toFixed(2));
      return
    }
  }
}


</script>

<style lang="scss">

</style>
