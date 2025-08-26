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
        <div class="odos-date-picker-header-pre" @click="handleNavigation('pre')">
          <Icon name="ArowLeft" size="25px" />
        </div>
        <div class="odos-date-picker-header-today" @click="handleTodayClick">
          {{ isShowYearPicker ? '今年' : isShowMonthPicker ? '本月' : '今天' }}
        </div>
        <div class="odos-date-picker-header-next" @click="handleNavigation('next')">
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
          v-for="(day, i) in Array.from({ length: startDayOfWeek }, (_, index) => index + 1).reverse()"
          :key="i"
          @click="datePickerClick(preDay.date() + 1 - day, 'pre')"
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
          v-for="(day, i) in 42 - (startDayOfWeek + days)"
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

const titleDayList = ['一', '二', '三', '四', '五', '六', '日']
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

const startDayOfWeek = computed(() => {
  return (dayjs(localShowDate.value).startOf('month').day() + 6) % 7
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

const updateYear = (type: 'pre' | 'next') => {
  const newDate = dayjs(localShowDate.value)[type === 'pre' ? 'subtract' : 'add'](1, 'year').toDate()
  localShowDate.value = newDate
  emit('update:showDate', dayjs(newDate).format('YYYY-MM-DD'))
}

const handleNavigation = (type: 'pre' | 'next') => {
  if (isShowYearPicker.value) {
    updateYear(type)
  } else {
    updateMouth(type)
  }
}

const goToToday = () => {
  const today = new Date()
  localShowDate.value = today
  emit('update:showDate', dayjs(today).format('YYYY-MM-DD'))
  emit('update:value', dayjs(today).format('YYYY-MM-DD'))
}

const handleTodayClick = () => {
  const today = dayjs()
  if (isShowYearPicker.value) {
    const newDate = dayjs(localShowDate.value).year(today.year()).toDate()
    localShowDate.value = newDate
    emit('update:showDate', dayjs(newDate).format('YYYY-MM-DD'))
  } else if (isShowMonthPicker.value) {
    const newDate = dayjs(localShowDate.value).month(today.month()).toDate()
    localShowDate.value = newDate
    emit('update:showDate', dayjs(newDate).format('YYYY-MM-DD'))
  } else {
    goToToday()
  }
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
@mixin DateItem {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  margin: 5px;
  box-sizing: border-box;
}

.clickable {
  cursor: pointer;
}
.odos-calendar {
  width: 285px;
  border-radius: 4px;
  padding: 10px;
}

.odos-date-picker-year-selector {
  .odos-date-picker-year-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    padding: 16px;

    .odos-date-picker-year-item {
      @include DateItem;
      width: 60px;
      height: 40px;
      border-radius: 4px;

      &:hover {
        background: #e5e6eb;
      }

      &.odos-date-picker-selected {
        background-color: #2e6ce4;
        color: #fff;

        &:hover {
          background-color: #2e6ce4;
        }
      }
    }
  }
}

// 日期模式下的月份选择器
.odos-date-picker-month-selector {
  .odos-date-picker-month-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    padding: 16px;

    .odos-date-picker-month-item {
      @include DateItem;
      width: 60px;
      height: 40px;
      border-radius: 4px;

      &:hover {
        background: #e5e6eb;
      }

      &.odos-date-picker-today {
        border: 1px dashed #2e6ce4;
        color: #2e6ce4;
      }

      &.odos-date-picker-selected {
        background-color: #2e6ce4;
        color: #fff;

        &:hover {
          background-color: #2e6ce4;
        }
      }
    }
  }
}

.odos-date-picker-header {
  width: 280px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border-bottom: 1px solid #f4f4f5;
  padding-left: 14px;
  padding-right: 4px;

  .odos-date-picker-header-time {
    display: flex;
    align-items: center;
    gap: 4px;

    .odos-date-picker-header-year,
    .odos-date-picker-header-month {
      font-size: 16px;
      font-weight: 500;
      width: fit-content;

      &.clickable {
        cursor: pointer;
        border-radius: 4px;
        padding: 4px 6px;
        transition: background-color 0.2s;

        &:hover {
          background-color: #f2f3f5;
        }
      }
    }
  }

  .odos-date-picker-header-year {
    font-size: 18px;
    font-weight: 500;
    width: fit-content;

    &.clickable {
      cursor: pointer;
      border-radius: 4px;
      padding: 4px 8px;
      transition: background-color 0.2s;

      &:hover {
        background-color: #f2f3f5;
      }
    }
  }

  .odos-date-picker-btn {
    width: 130px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .odos-date-picker-header-next,
    .odos-date-picker-header-pre {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:hover {
        background: #e5e6eb;
      }

      &:active {
        background: #86909c;
      }
    }

    .odos-date-picker-header-today {
      padding: 0 8px;
      border-radius: 4px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 10px;
      color: #2e6ce4;
      border: 1px solid #2e6ce4;
      background: #fff;
      white-space: nowrap;

      &:hover {
        background: #e8f3ff;
      }

      &:active {
        background: #cce7ff;
      }
    }
  }
}

.odos-date-picker-body {
  width: 285px;
  height: 285px;
  box-sizing: border-box;

  .odos-date-picker-week-title {
    display: flex;

    .odos-date-picker-week-item {
      @include DateItem;
      cursor: default;
      color: #86909c;
      font-weight: 500;
    }
  }

  .odos-date-picker-day-content {
    display: flex;
    flex-wrap: wrap;

    .odos-date-picker-day-pre-item,
    .odos-date-picker-day-next-item {
      @include DateItem;
      color: #bfbfbf;
    }

    .odos-date-picker-day-item {
      @include DateItem;

      &:hover:not(.odos-date-picker-disabled) {
        background: #e5e6eb;
      }

      &:active:not(.odos-date-picker-disabled) {
        background: #86909c;
      }

      &.odos-date-picker-today {
        border: 1px dashed #2e6ce4;
        color: #2e6ce4;
      }

      &.odos-date-picker-selected {
        background-color: #2e6ce4;
        color: #fff;

        &:hover,
        &:active {
          background-color: #2e6ce4;
        }
      }

      &.odos-date-picker-disabled {
        color: #c9cdd4;
        cursor: not-allowed;
        background: #f7f8fa;
      }
    }
  }
}
</style>
