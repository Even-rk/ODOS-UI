<template>
  <div class="odos-date-picker">
    <odos-input v-model:value="datePicker" @blur="inputBlur" @focus="inputFocus" placeholder="请选择日期" />
    <div
      class="odos-date-picker-content"
      @click="contentClick"
      :class="{
        bottom: true,
        top: false
      }"
    >
      <div class="odos-date-picker-header">
        <div class="odos-date-picker-header-year">{{ dayjs(showDate).format('YYYY年MM月') }}</div>
        <div class="odos-date-picker-btn">
          <div class="odos-date-picker-header-pre" @click="updateMouth('pre')">
            <odos-icon name="ArowLeft" size="25px" />
          </div>
          <div class="odos-date-picker-header-next" @click="updateMouth('next')">
            <odos-icon name="ArowRight" size="25px" />
          </div>
        </div>
      </div>
      <div class="odos-date-picker-body">
        <div class="odos-date-picker-day-title">
          <div class="odos-date-picker-day-item" v-for="(day, i) in titleDayList" :key="i">
            {{ day }}
          </div>
        </div>
        <div class="odos-date-picker-day-content">
          <div
            class="odos-date-picker-day-item pre"
            v-for="(day, i) in preDay.day()"
            :key="i"
            @click="datePickerClick(day === 1 ? preDay.date() - day : preDay.date(), 'pre')"
          >
            {{ day === 1 ? preDay.date() - day : preDay.date() }}
          </div>
          <div
            :class="{
              active: dayjs(showDate).date() === day && dayjs(datePicker).month() === dayjs(showDate).month()
            }"
            class="odos-date-picker-day-item"
            v-for="(day, i) in days"
            :key="i"
            @click="datePickerClick(day)"
          >
            {{ day }}
          </div>
          <div
            class="odos-date-picker-day-item next"
            v-for="(day, i) in 42 - (preDay.day() + days)"
            :key="i"
            @click="datePickerClick(day, 'next')"
          >
            {{ day }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, ref } from 'vue'

const datePicker = ref()
const showDate = ref()

const isShowPicker = ref(false)
const timer = ref()
const inputFocus = () => {
  isShowPicker.value = true
}
const isBlur = ref(false)
const inputBlur = (e: Event) => {
  setTimeout(() => {
    if (isBlur.value) {
      const target = e.target as HTMLInputElement
      target.focus()
    } else {
      isShowPicker.value = false
    }
  }, 100)
}
// 上个月最后一天
const preDay = computed(() => {
  return dayjs(showDate.value).startOf('month').subtract(1, 'month').endOf('month')
})

const titleDayList = ['日', '一', '二', '三', '四', '五', '六']
// 当月天数
const days = computed(() => {
  const year = dayjs(showDate.value).year()
  const month = dayjs(showDate.value).month()
  return new Date(year, month + 1, 0).getDate()
})
// 变换月份
const updateMouth = (type: 'pre' | 'next') => {
  isBlur.value = true
  if (type === 'next') {
    showDate.value = dayjs(showDate.value).add(1, 'month')
  } else {
    showDate.value = dayjs(showDate.value).subtract(1, 'month')
  }
}
// 变换日期
const datePickerClick = (day: number, type?: 'next' | 'pre') => {
  if (type == 'pre') {
    showDate.value = dayjs(showDate.value).subtract(1, 'month')
  } else if (type === 'next') {
    showDate.value = dayjs(showDate.value).add(1, 'month')
  }
  datePicker.value = dayjs(showDate.value).format('YYYY-MM') + '-' + (day >= 10 ? day : '0' + day)
  showDate.value = dayjs(datePicker.value)
}
// 点击日历下拉框内
const contentClick = () => {
  isBlur.value = true
}
</script>

<style lang="scss">
@import '/styles/datePicker.scss';
</style>
