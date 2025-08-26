<template>
  <div class="odos-calendar">
    <div class="odos-date-picker-header">
      <div class="odos-date-picker-header-time">
        <div class="odos-date-picker-header-year clickable" @click="toggleYearPicker">
          {{ dayjs(localShowDate).format('YYYY年') }}
        </div>
        <div class="odos-date-picker-header-month clickable" @click="toggleMonthPicker">
          {{ dayjs(localShowDate).format('MM月') }}
        </div>
      </div>
      <div class="odos-date-picker-btn">
        <div class="odos-date-picker-header-pre" @click="updateMouth('pre')">
          <Icon name="ArowLeft" size="25px" />
        </div>
        <div class="odos-date-picker-header-today" @click="goToToday">今天</div>
        <div class="odos-date-picker-header-next" @click="updateMouth('next')">
          <Icon name="ArowRight" size="25px" />
        </div>
      </div>
    </div>

    <div v-if="isShowYearPicker" class="odos-date-picker-year-selector">
      <div class="odos-date-picker-year-grid">
        <div
          v-for="year in yearRange"
          :key="year"
          class="odos-date-picker-year-item"
          :class="{
            'odos-date-picker-selected': isSelectedYear(year)
          }"
          @click="selectYear(year, $event)"
        >
          {{ year }}
        </div>
      </div>
    </div>

    <div v-if="isShowMonthPicker" class="odos-date-picker-month-selector">
      <div class="odos-date-picker-month-grid">
        <div
          v-for="month in 12"
          :key="month"
          class="odos-date-picker-month-item"
          :class="{
            'odos-date-picker-selected': isSelectedMonth(month),
            'odos-date-picker-today': isCurrentMonth(month)
          }"
          @click="selectMonth(month, $event)"
        >
          {{ month }}月
        </div>
      </div>
    </div>

    <div v-else-if="!isShowYearPicker && !isShowMonthPicker" class="odos-date-picker-body">
      <div class="odos-date-picker-week-title">
        <div class="odos-date-picker-week-item" v-for="(week, i) in titleDayList" :key="i">
          {{ week }}
        </div>
      </div>
      <div class="odos-date-picker-day-content">
        <div
          class="odos-date-picker-day-pre-item"
          v-for="(day, i) in Array.from({ length: preDay.day() + 1 }, (_, index) => index + 1).reverse()"
          :key="i"
          @click="datePickerClick(day === 1 ? preDay.date() - day : preDay.date(), 'pre')"
        >
          {{ preDay.date() + 1 - day }}
        </div>
        <div
          :class="{
            'odos-date-picker-today': isToday(day),
            'odos-date-picker-selected': isSelect(day),
            'odos-date-picker-disabled': isDisabledDate(day)
          }"
          class="odos-date-picker-day-item"
          v-for="(day, i) in days"
          :key="i"
          @click="!isDisabledDate(day) && datePickerClick(day)"
        >
          {{ day }}
        </div>
        <div
          class="odos-date-picker-day-next-item"
          v-for="(day, i) in 42 - (preDay.day() + 1 + days)"
          :key="i"
          @click="datePickerClick(day, 'next')"
        >
          {{ day }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import dayjs from 'dayjs'
import Icon from '../../Icon/src/index.vue'

const props = defineProps<{
  value?: string | Date
  showDate?: string | Date
  disabledDate?: (date: Date) => boolean
}>()

const emit = defineEmits<{
  (e: 'update:value', value: string): void
  (e: 'update:showDate', value: string): void
}>()

const titleDayList = ['日', '一', '二', '三', '四', '五', '六']
const localShowDate = ref(props.showDate ? dayjs(props.showDate).toDate() : new Date())
const isShowYearPicker = ref(false)
const isShowMonthPicker = ref(false)

watch(
  () => props.showDate,
  (newVal) => {
    localShowDate.value = newVal ? dayjs(newVal).toDate() : new Date()
  }
)

const days = computed(() => {
  const date = dayjs(localShowDate.value)
  return date.daysInMonth()
})

const preDay = computed(() => {
  const date = dayjs(localShowDate.value)
  return date.subtract(1, 'month').endOf('month')
})

const yearRange = computed(() => {
  const year = dayjs(localShowDate.value).year()
  const startYear = year - 10
  return Array.from({ length: 21 }, (_, i) => startYear + i)
})

const isToday = (day: number) => {
  const today = new Date()
  const date = dayjs(localShowDate.value)
  return date.year() === today.getFullYear() && date.month() === today.getMonth() && day === today.getDate()
}

const isSelect = (day: number) => {
  if (!props.value) return false
  const selectedDate = dayjs(props.value)
  const date = dayjs(localShowDate.value)
  return (
    date.year() === selectedDate.year() &&
    date.month() === selectedDate.month() &&
    day === selectedDate.date()
  )
}

const isDisabledDate = (day: number) => {
  if (!props.disabledDate) return false
  const date = dayjs(localShowDate.value).date(day).toDate()
  return props.disabledDate(date)
}

const isSelectedYear = (year: number) => {
  return dayjs(localShowDate.value).year() === year
}

const isSelectedMonth = (month: number) => {
  const date = dayjs(localShowDate.value)
  return date.month() + 1 === month && date.year() === dayjs().year()
}

const isCurrentMonth = (month: number) => {
  const today = new Date()
  return dayjs(localShowDate.value).year() === today.getFullYear() && month === today.getMonth() + 1
}

const updateMouth = (type: 'pre' | 'next') => {
  const newDate = dayjs(localShowDate.value)[type === 'pre' ? 'subtract' : 'add'](1, 'month').toDate()
  localShowDate.value = newDate
  emit('update:showDate', dayjs(newDate).format('YYYY-MM-DD'))
}

const goToToday = () => {
  const today = new Date()
  localShowDate.value = today
  emit('update:showDate', dayjs(today).format('YYYY-MM-DD'))
  emit('update:value', dayjs(today).format('YYYY-MM-DD'))
}

const datePickerClick = (day: number, type?: 'pre' | 'next') => {
  let newDate = dayjs(localShowDate.value).date(day)
  if (type === 'pre') {
    newDate = dayjs(localShowDate.value).subtract(1, 'month').date(day)
  } else if (type === 'next') {
    newDate = dayjs(localShowDate.value).add(1, 'month').date(day)
  }
  localShowDate.value = newDate.toDate()
  emit('update:showDate', newDate.format('YYYY-MM-DD'))
  emit('update:value', newDate.format('YYYY-MM-DD'))
}

const toggleYearPicker = () => {
  isShowYearPicker.value = !isShowYearPicker.value
  isShowMonthPicker.value = false
}

const toggleMonthPicker = () => {
  isShowMonthPicker.value = !isShowMonthPicker.value
  isShowYearPicker.value = false
}

const selectYear = (year: number, event: MouseEvent) => {
  event.stopPropagation()
  const newDate = dayjs(localShowDate.value).year(year).toDate()
  localShowDate.value = newDate
  emit('update:showDate', dayjs(newDate).format('YYYY-MM-DD'))
  isShowYearPicker.value = false
}

const selectMonth = (month: number, event: MouseEvent) => {
  event.stopPropagation()
  const newDate = dayjs(localShowDate.value)
    .month(month - 1)
    .toDate()
  localShowDate.value = newDate
  emit('update:showDate', dayjs(newDate).format('YYYY-MM-DD'))
  isShowMonthPicker.value = false
}
</script>

<style lang="scss" scoped>
.clickable {
  cursor: pointer;
}
.odos-calendar {
  width: 300px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 10px;
}
.odos-date-picker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.odos-date-picker-header-time {
  display: flex;
  gap: 10px;
  font-size: 16px;
  font-weight: 500;
}
.odos-date-picker-btn {
  display: flex;
  gap: 10px;
  align-items: center;
}
.odos-date-picker-header-pre,
.odos-date-picker-header-next {
  cursor: pointer;
}
.odos-date-picker-header-today {
  cursor: pointer;
  font-size: 14px;
  color: #409eff;
}
.odos-date-picker-year-selector,
.odos-date-picker-month-selector {
  .odos-date-picker-year-grid,
  .odos-date-picker-month-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
    .odos-date-picker-year-item,
    .odos-date-picker-month-item {
      text-align: center;
      padding: 10px 0;
      cursor: pointer;
      border-radius: 4px;
      &:hover {
        background-color: #f5f7fa;
      }
      &.odos-date-picker-selected {
        background-color: #409eff;
        color: #fff;
      }
      &.odos-date-picker-today {
        color: #409eff;
        font-weight: bold;
      }
    }
  }
}
.odos-date-picker-body {
  .odos-date-picker-week-title {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    margin-bottom: 5px;
    color: #606266;
  }
  .odos-date-picker-day-content {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
    .odos-date-picker-day-item,
    .odos-date-picker-day-pre-item,
    .odos-date-picker-day-next-item {
      text-align: center;
      padding: 10px 0;
      cursor: pointer;
      border-radius: 4px;
      &:hover {
        background-color: #f5f7fa;
      }
      &.odos-date-picker-selected {
        background-color: #409eff;
        color: #fff;
      }
      &.odos-date-picker-today {
        color: #409eff;
        font-weight: bold;
      }
      &.odos-date-picker-disabled {
        cursor: not-allowed;
        color: #c0c4cc;
        background-color: #f5f7fa;
      }
    }
    .odos-date-picker-day-pre-item,
    .odos-date-picker-day-next-item {
      color: #c0c4cc;
    }
  }
}
</style>
