<template>
  <div
    class="odos-date-picker"
    :class="{
      'odos-date-picker-disabled': disabled,
      'odos-date-picker-range': mode === 'range'
    }"
    ref="datePickerRef"
    :style="{ width: WidthSize }"
  >
    <Icon class="odos-date-picker-icon" name="Callender" />
    <div class="odos-date-picker-title" v-if="title">{{ title }}</div>

    <!-- 单日期选择输入框 -->
    <input
      v-if="mode === 'date' || mode === 'month' || mode === 'datetime'"
      ref="inputRef"
      class="odos-date-picker-input"
      :class="{
        'odos-date-picker-input-focus': isShowPicker,
        'odos-date-picker-isTitle': title
      }"
      :disabled="disabled"
      :value="displayValue"
      :placeholder="getPlaceholder()"
      readonly
    />

    <!-- 日期区间选择输入框 -->
    <div
      v-if="mode === 'range'"
      class="odos-date-picker-range-input"
      :class="{
        'odos-date-picker-input-focus': isShowPicker,
        'odos-date-picker-isTitle': title
      }"
    >
      <input
        ref="startInputRef"
        class="odos-date-picker-range-start"
        :disabled="disabled"
        :value="rangeValue[0]"
        placeholder="开始日期"
        readonly
      />
      <span class="odos-date-picker-range-separator">至</span>
      <input
        ref="endInputRef"
        class="odos-date-picker-range-end"
        :disabled="disabled"
        :value="rangeValue[1]"
        placeholder="结束日期"
        readonly
      />
    </div>

    <!-- 日期选择面板 -->
    <div
      class="odos-date-picker-content"
      v-if="isShowPicker"
      :class="{
        bottom: true,
        top: false,
        'range-panel': mode === 'range'
      }"
    >
      <!-- 月份选择模式 -->
      <div v-if="mode === 'month'" class="odos-date-picker-month-panel">
        <div class="odos-date-picker-header">
          <div class="odos-date-picker-header-year">{{ dayjs(showDate).format('YYYY年') }}</div>
          <div class="odos-date-picker-btn">
            <div class="odos-date-picker-header-pre" @click="updateYear('pre')">
              <Icon name="ArowLeft" size="25px" />
            </div>
            <div class="odos-date-picker-header-next" @click="updateYear('next')">
              <Icon name="ArowRight" size="25px" />
            </div>
          </div>
        </div>
        <div class="odos-date-picker-month-grid">
          <div
            v-for="month in 12"
            :key="month"
            class="odos-date-picker-month-item"
            :class="{
              'odos-date-picker-selected': isSelectedMonth(month),
              'odos-date-picker-today': isCurrentMonth(month)
            }"
            @click="selectMonth(month)"
          >
            {{ month }}月
          </div>
        </div>
      </div>

      <!-- 日期选择模式 -->
      <div v-else-if="mode === 'date' || mode === 'datetime'" class="odos-date-picker-date-panel">
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
          <div class="odos-date-picker-week-title">
            <div class="odos-date-picker-week-item" v-for="(week, i) in titleDayList" :key="i">
              {{ week }}
            </div>
          </div>
          <div class="odos-date-picker-day-content">
            <!-- 上个月 -->
            <div
              class="odos-date-picker-day-pre-item"
              v-for="(day, i) in Array.from({ length: preDay.day() + 1 }, (_, index) => index + 1).reverse()"
              :key="i"
              @click="datePickerClick(day === 1 ? preDay.date() - day : preDay.date(), 'pre')"
            >
              {{ preDay.date() + 1 - day }}
            </div>
            <!-- 本月 -->
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
            <!-- 下个月 -->
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

        <!-- 时间选择器 -->
        <div v-if="mode === 'datetime'" class="odos-date-picker-time-panel">
          <div class="odos-date-picker-time-title">选择时间</div>
          <div class="odos-date-picker-time-content">
            <div class="odos-date-picker-time-column">
              <div class="odos-date-picker-time-label">时</div>
              <div class="odos-date-picker-time-list">
                <div
                  v-for="hour in 24"
                  :key="hour - 1"
                  class="odos-date-picker-time-item"
                  :class="{ selected: selectedTime.hour === hour - 1 }"
                  @click="selectTime('hour', hour - 1)"
                >
                  {{ String(hour - 1).padStart(2, '0') }}
                </div>
              </div>
            </div>
            <div class="odos-date-picker-time-column">
              <div class="odos-date-picker-time-label">分</div>
              <div class="odos-date-picker-time-list">
                <div
                  v-for="minute in 60"
                  :key="minute - 1"
                  class="odos-date-picker-time-item"
                  :class="{ selected: selectedTime.minute === minute - 1 }"
                  @click="selectTime('minute', minute - 1)"
                >
                  {{ String(minute - 1).padStart(2, '0') }}
                </div>
              </div>
            </div>
            <div class="odos-date-picker-time-column">
              <div class="odos-date-picker-time-label">秒</div>
              <div class="odos-date-picker-time-list">
                <div
                  v-for="second in 60"
                  :key="second - 1"
                  class="odos-date-picker-time-item"
                  :class="{ selected: selectedTime.second === second - 1 }"
                  @click="selectTime('second', second - 1)"
                >
                  {{ String(second - 1).padStart(2, '0') }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 日期区间选择模式 -->
      <div v-else-if="mode === 'range'" class="odos-date-picker-range-panel">
        <div class="odos-date-picker-range-calendars">
          <!-- 左侧日历 -->
          <div class="odos-date-picker-calendar">
            <div class="odos-date-picker-header">
              <div class="odos-date-picker-header-year">
                {{ dayjs(leftCalendarDate).format('YYYY年MM月') }}
              </div>
              <div class="odos-date-picker-btn">
                <div class="odos-date-picker-header-pre" @click="updateRangeMonth('left', 'pre')">
                  <Icon name="ArowLeft" size="25px" />
                </div>
                <div class="odos-date-picker-header-next" @click="updateRangeMonth('left', 'next')">
                  <Icon name="ArowRight" size="25px" />
                </div>
              </div>
            </div>
            <div class="odos-date-picker-body">
              <div class="odos-date-picker-week-title">
                <div class="odos-date-picker-week-item" v-for="(week, i) in titleDayList" :key="i">
                  {{ week }}
                </div>
              </div>
              <div class="odos-date-picker-day-content">
                <div
                  v-for="date in getCalendarDates(leftCalendarDate)"
                  :key="date.key"
                  :class="getRangeDateClass(date)"
                  class="odos-date-picker-day-item"
                  @click="selectRangeDate(date)"
                >
                  {{ date.day }}
                </div>
              </div>
            </div>
          </div>

          <!-- 右侧日历 -->
          <div class="odos-date-picker-calendar">
            <div class="odos-date-picker-header">
              <div class="odos-date-picker-header-year">
                {{ dayjs(rightCalendarDate).format('YYYY年MM月') }}
              </div>
              <div class="odos-date-picker-btn">
                <div class="odos-date-picker-header-pre" @click="updateRangeMonth('right', 'pre')">
                  <Icon name="ArowLeft" size="25px" />
                </div>
                <div class="odos-date-picker-header-next" @click="updateRangeMonth('right', 'next')">
                  <Icon name="ArowRight" size="25px" />
                </div>
              </div>
            </div>
            <div class="odos-date-picker-body">
              <div class="odos-date-picker-week-title">
                <div class="odos-date-picker-week-item" v-for="(week, i) in titleDayList" :key="i">
                  {{ week }}
                </div>
              </div>
              <div class="odos-date-picker-day-content">
                <div
                  v-for="date in getCalendarDates(rightCalendarDate)"
                  :key="date.key"
                  :class="getRangeDateClass(date)"
                  class="odos-date-picker-day-item"
                  @click="selectRangeDate(date)"
                >
                  {{ date.day }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from 'packages/Icon'
import dayjs from 'dayjs'
import { computed, ref, toRefs, watch } from 'vue'

interface DateItem {
  date: string
  day: number
  isCurrentMonth: boolean
  key: string
}

const props = defineProps<{
  title?: string
  value?: string | string[]
  width?: string | number
  disabled?: boolean
  mode?: 'date' | 'month' | 'datetime' | 'range'
  disabledDate?: (date: Date) => boolean
  format?: string
  placeholder?: string
}>()

const { value, title, width, disabled, disabledDate, format } = toRefs(props)
const mode = computed(() => props.mode || 'date')

const emit = defineEmits<{
  (e: 'update:value', data: string | string[]): void
}>()

// 基础状态
const datePicker = ref('')
const rangeValue = ref<string[]>(['', ''])
const showDate = ref(dayjs(new Date()))
const isShowPicker = ref(false)

// 时间选择相关
const selectedTime = ref({
  hour: 0,
  minute: 0,
  second: 0
})

// 区间选择相关
const leftCalendarDate = ref(dayjs(new Date()))
const rightCalendarDate = ref(dayjs(new Date()).add(1, 'month'))
const rangeSelectState = ref<'start' | 'end' | null>(null)

// 计算宽度
const WidthSize = computed(() => {
  if (typeof width?.value === 'number') {
    return `${width.value}px`
  } else if (typeof width?.value === 'string') {
    return width.value
  }
  return mode.value === 'range' ? '350px' : '100%'
})

// 获取占位符
const getPlaceholder = () => {
  if (props.placeholder) {
    return props.placeholder
  }
  switch (mode.value) {
    case 'month':
      return '请选择月份'
    case 'datetime':
      return '请选择日期时间'
    default:
      return '请选择日期'
  }
}

// 显示值
const displayValue = computed(() => {
  if (!datePicker.value) return ''
  if (props.format) {
    return dayjs(datePicker.value).format(props.format)
  }
  switch (mode.value) {
    case 'month':
      return dayjs(datePicker.value).format('YYYY-MM')
    case 'datetime':
      return dayjs(datePicker.value).format('YYYY-MM-DD HH:mm:ss')
    default:
      return dayjs(datePicker.value).format('YYYY-MM-DD')
  }
})

// 是否是今天
const isToday = (day: number) => {
  return (
    dayjs(new Date()).date() === day &&
    dayjs(new Date()).month() === dayjs(showDate.value).month() &&
    dayjs(new Date()).year() === dayjs(showDate.value).year()
  )
}

// 是否被选中
const isSelect = (day: number) => {
  if (!datePicker.value) return false
  const isDay = dayjs(datePicker.value).date() === day
  const isMonth = dayjs(datePicker.value).month() === dayjs(showDate.value).month()
  const isYear = dayjs(datePicker.value).year() === dayjs(showDate.value).year()
  return isDay && isMonth && isYear
}

// 是否是当前月份
const isCurrentMonth = (month: number) => {
  const now = dayjs()
  return now.month() === month - 1 && now.year() === dayjs(showDate.value).year()
}

// 是否是选中的月份
const isSelectedMonth = (month: number) => {
  if (!datePicker.value) return false
  const selected = dayjs(datePicker.value)
  return selected.month() === month - 1 && selected.year() === dayjs(showDate.value).year()
}

// 是否是禁用日期
const isDisabledDate = (day: number) => {
  if (!disabledDate?.value) return false
  const date = dayjs(showDate.value).date(day).toDate()
  return disabledDate.value(date)
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

// 变换年份
const updateYear = (type: 'pre' | 'next') => {
  if (type === 'next') {
    showDate.value = dayjs(showDate.value).add(1, 'year')
  } else {
    showDate.value = dayjs(showDate.value).subtract(1, 'year')
  }
}

// 选择月份
const selectMonth = (month: number) => {
  const selectedDate = dayjs(showDate.value).month(month - 1)
  // 对于月份模式，只保存年月信息
  datePicker.value = selectedDate.format('YYYY-MM-01') // 使用01作为默认日期
  emit('update:value', selectedDate.format(format?.value || 'YYYY-MM'))
  isShowPicker.value = false
}

// 选择时间
const selectTime = (type: 'hour' | 'minute' | 'second', value: number) => {
  selectedTime.value[type] = value
  updateDateTime()
}

// 更新日期时间
const updateDateTime = () => {
  if (datePicker.value) {
    const date = dayjs(datePicker.value)
      .hour(selectedTime.value.hour)
      .minute(selectedTime.value.minute)
      .second(selectedTime.value.second)

    datePicker.value = date.format('YYYY-MM-DD HH:mm:ss')
    emit('update:value', date.format(format?.value || 'YYYY-MM-DD HH:mm:ss'))
  }
}

// 变换日期
const datePickerClick = (day: number, type?: 'next' | 'pre') => {
  if (type == 'pre') {
    showDate.value = dayjs(showDate.value).subtract(1, 'month')
  } else if (type === 'next') {
    showDate.value = dayjs(showDate.value).add(1, 'month')
  }

  const data = dayjs(showDate.value).format('YYYY-MM') + '-' + (day >= 10 ? day : '0' + day)
  showDate.value = dayjs(data)

  if (mode.value === 'datetime') {
    const dateTime = dayjs(data)
      .hour(selectedTime.value.hour)
      .minute(selectedTime.value.minute)
      .second(selectedTime.value.second)
    datePicker.value = dateTime.format('YYYY-MM-DD HH:mm:ss')
    emit('update:value', dateTime.format(format?.value || 'YYYY-MM-DD HH:mm:ss'))
  } else {
    datePicker.value = data
    emit('update:value', data)
    isShowPicker.value = false
  }
}

// 区间选择相关方法
const updateRangeMonth = (calendar: 'left' | 'right', type: 'pre' | 'next') => {
  if (calendar === 'left') {
    if (type === 'next') {
      leftCalendarDate.value = dayjs(leftCalendarDate.value).add(1, 'month')
    } else {
      leftCalendarDate.value = dayjs(leftCalendarDate.value).subtract(1, 'month')
    }
  } else {
    if (type === 'next') {
      rightCalendarDate.value = dayjs(rightCalendarDate.value).add(1, 'month')
    } else {
      rightCalendarDate.value = dayjs(rightCalendarDate.value).subtract(1, 'month')
    }
  }
}

// 获取日历日期数据
const getCalendarDates = (baseDate: dayjs.Dayjs): DateItem[] => {
  const dates: DateItem[] = []
  const startOfMonth = baseDate.startOf('month')
  const endOfMonth = baseDate.endOf('month')
  const startOfCalendar = startOfMonth.startOf('week')
  const endOfCalendar = endOfMonth.endOf('week')

  let current = startOfCalendar
  while (current.isBefore(endOfCalendar) || current.isSame(endOfCalendar, 'day')) {
    dates.push({
      date: current.format('YYYY-MM-DD'),
      day: current.date(),
      isCurrentMonth: current.isSame(baseDate, 'month'),
      key: current.format('YYYY-MM-DD')
    })
    current = current.add(1, 'day')
  }

  return dates
}

// 获取区间日期样式类
const getRangeDateClass = (date: DateItem) => {
  const classes = []

  if (!date.isCurrentMonth) {
    classes.push('odos-date-picker-day-other-month')
  }

  if (dayjs().isSame(date.date, 'day')) {
    classes.push('odos-date-picker-today')
  }

  const [start, end] = rangeValue.value
  if (start && dayjs(start).isSame(date.date, 'day')) {
    classes.push('odos-date-picker-range-start')
  }
  if (end && dayjs(end).isSame(date.date, 'day')) {
    classes.push('odos-date-picker-range-end')
  }
  if (start && end && dayjs(date.date).isAfter(start) && dayjs(date.date).isBefore(end)) {
    classes.push('odos-date-picker-range-middle')
  }

  return classes
}

// 选择区间日期
const selectRangeDate = (date: DateItem) => {
  const [start, end] = rangeValue.value

  if (!start || (start && end)) {
    // 开始新的选择
    rangeValue.value = [date.date, '']
    rangeSelectState.value = 'end'
  } else if (start && !end) {
    // 选择结束日期
    if (dayjs(date.date).isBefore(start)) {
      rangeValue.value = [date.date, start]
    } else {
      rangeValue.value = [start, date.date]
    }
    rangeSelectState.value = null
    emit('update:value', [...rangeValue.value])
    isShowPicker.value = false
  }
}

// 事件处理
const datePickerRef = ref()
const inputRef = ref()

const inputFocus = () => {
  if (!disabled?.value) {
    isShowPicker.value = true
  }
}

const inputBlur = () => {
  isShowPicker.value = false
}

document.addEventListener('click', (e) => {
  if (datePickerRef.value?.contains(e.target)) {
    inputFocus()
    inputRef.value?.focus()
  } else {
    inputBlur()
  }
})
</script>

<style lang="scss" scoped>
@mixin useSelect {
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

@mixin DateItem {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  margin: 5px;
  cursor: pointer;
}

.odos-date-picker {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;

  .odos-date-picker-title {
    position: absolute;
    width: 80px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    font-size: 14px;
    color: #4e5969;
    border-right: 1px solid #c9cdd4;
    z-index: 1;
  }

  .odos-date-picker-icon {
    position: absolute;
    cursor: auto;
    right: 10px;
    z-index: 2;
  }

  .odos-date-picker-input {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    border-radius: 8px;
    padding: 10px 30px 10px 16px;
    background: #f2f3f5;
    width: 100%;
    height: 100%;
    border: 1px solid #f2f3f5;
    outline: none;

    &:hover {
      background: #e5e6eb;
    }

    &.odos-date-picker-isTitle {
      padding-left: 88px;
    }

    &.odos-date-picker-input-focus {
      border: 1px solid #2e6ce4;
      background: #fff;
    }

    &::placeholder {
      position: relative;
      top: 1px;
      color: #86909c;
    }
  }

  // 区间选择输入框
  .odos-date-picker-range-input {
    display: flex;
    align-items: center;
    border-radius: 8px;
    background: #f2f3f5;
    width: 100%;
    height: 100%;
    border: 1px solid #f2f3f5;
    padding: 0 30px 0 16px;
    box-sizing: border-box;

    &:hover {
      background: #e5e6eb;
    }

    &.odos-date-picker-input-focus {
      border: 1px solid #2e6ce4;
      background: #fff;
    }

    &.odos-date-picker-isTitle {
      padding-left: 88px;
    }

    .odos-date-picker-range-start,
    .odos-date-picker-range-end {
      width: 100px;
      border: none;
      outline: none;
      background: transparent;
      flex: 1;
      height: 100%;

      &::placeholder {
        color: #86909c;
      }
    }

    .odos-date-picker-range-separator {
      margin: 0 8px;
      color: #86909c;
    }
  }

  .odos-date-picker-content {
    position: absolute;
    top: 44px;
    border-radius: 8px;
    box-sizing: border-box;
    background-color: #fff;
    border: 1px solid #e5e6eb;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.12);
    z-index: 1000;

    &.range-panel {
      width: 624px;
      height: 340px;
    }

    &:not(.range-panel) {
      width: 312px;
      min-height: 340px;
      padding: 0 16px;
    }

    // 月份选择面板
    .odos-date-picker-month-panel {
      .odos-date-picker-month-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
        padding: 16px;

        .odos-date-picker-month-item {
          @include DateItem;
          width: 60px;
          height: 40px;

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

    // 时间选择面板
    .odos-date-picker-time-panel {
      border-top: 1px solid #f4f4f5;
      padding: 16px;

      .odos-date-picker-time-title {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 12px;
        color: #1d2129;
      }

      .odos-date-picker-time-content {
        display: flex;
        gap: 16px;

        .odos-date-picker-time-column {
          flex: 1;

          .odos-date-picker-time-label {
            text-align: center;
            font-size: 12px;
            color: #86909c;
            margin-bottom: 8px;
          }

          .odos-date-picker-time-list {
            height: 120px;
            overflow-y: auto;
            border: 1px solid #e5e6eb;
            border-radius: 4px;
            &::-webkit-scrollbar {
              width: 2px;
            }
            &::-webkit-scrollbar-thumb {
              background-color: #e5e6eb;
              border-radius: 2px;
            }

            .odos-date-picker-time-item {
              height: 24px;
              line-height: 24px;
              text-align: center;
              font-size: 12px;
              cursor: pointer;

              &:hover {
                background: #f2f3f5;
              }

              &.selected {
                background: #2e6ce4;
                color: #fff;
              }
            }
          }
        }
      }
    }

    // 区间选择面板
    .odos-date-picker-range-panel {
      .odos-date-picker-range-calendars {
        display: flex;

        .odos-date-picker-calendar {
          width: 312px;
          padding: 0 16px;

          &:first-child {
            border-right: 1px solid #f4f4f5;
          }
        }
      }
    }

    .odos-date-picker-header {
      @include useSelect();
      width: 280px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      border-bottom: 1px solid #f4f4f5;
      padding-left: 14px;
      padding-right: 4px;

      .odos-date-picker-header-year {
        font-size: 18px;
        font-weight: 500;
        width: 120px;
      }

      .odos-date-picker-btn {
        width: 130px;
        display: flex;
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
        .odos-date-picker-day-next-item,
        .odos-date-picker-day-other-month {
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

          // 区间选择样式
          &.odos-date-picker-range-start {
            background-color: #2e6ce4;
            color: #fff;
            border-radius: 8px 0 0 8px;
          }

          &.odos-date-picker-range-end {
            background-color: #2e6ce4;
            color: #fff;
            border-radius: 0 8px 8px 0;
          }

          &.odos-date-picker-range-middle {
            background-color: #e8f3ff;
            color: #2e6ce4;
            border-radius: 0;
          }

          &.odos-date-picker-range-start.odos-date-picker-range-end {
            border-radius: 8px;
          }
        }
      }
    }
  }

  &.odos-date-picker-disabled {
    .odos-date-picker-input,
    .odos-date-picker-range-input {
      background: #f2f3f5;
      cursor: not-allowed;

      &:hover {
        background: #f2f3f5;
      }

      input {
        cursor: not-allowed;
      }
    }
  }

  &.odos-date-picker-range {
    .odos-date-picker-icon {
      right: 10px;
    }
  }
}
</style>
