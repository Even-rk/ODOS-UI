<template>
  <div class="odos-date-picker" ref="datePickerRef">
    <div class="odos-date-picker-title">title</div>
    <input
      ref="inputRef"
      class="odos-date-picker-input"
      :class="{
        'odos-date-picker-focus-input': isShowPicker,
        'odos-date-picker-isTitle': title
      }"
      :value="datePicker"
      placeholder="请选择日期"
    />
    <div
      class="odos-date-picker-content"
      v-if="isShowPicker"
      :class="{
        bottom: true,
        top: false
      }"
    >
      <div class="odos-date-picker-header">
        <div class="odos-date-picker-header-year">{{ dayjs(showDate).format('YYYY年MM月') }}</div>
        <div class="odos-date-picker-btn">
          <div class="odos-date-picker-header-pre" @click="updateMouth('pre')">
            <Icon name="ArowLeft" size="25px" />
          </div>
          <div class="odos-date-picker-header-next" @click="updateMouth('next')">
            <Icon name="ArowRight" size="25px" />
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

<script lang="ts" setup>
import { Icon } from 'packages/Icon'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'
const { title } = defineProps<{
  title?: string
}>()
// 绑定值
const datePicker = ref()
// 显示月份
const showDate = ref()

const isShowPicker = ref(false)
const inputFocus = () => {
  isShowPicker.value = true
}
const inputBlur = () => {
  isShowPicker.value = false
}
// 上个月最后一天
const preDay = computed(() => {
  return dayjs(showDate.value).startOf('month').subtract(1, 'month').endOf('month')
})
// 日期显示title
const titleDayList = ['日', '一', '二', '三', '四', '五', '六']
// 当月天数
const days = computed(() => {
  const year = dayjs(showDate.value).year()
  const month = dayjs(showDate.value).month()
  return new Date(year, month + 1, 0).getDate()
})
// 变换月份
const updateMouth = (type: 'pre' | 'next') => {
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
const datePickerRef = ref()
const inputRef = ref()

document.onclick = (e) => {
  if (datePickerRef.value.contains(e.target)) {
    inputFocus()
    inputRef.value.focus()
  } else {
    inputBlur()
  }
}
</script>

<style lang="scss" scoped>
@import '/styles/datePicker.scss';
</style>
