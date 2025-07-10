<template>
  <div
    class="odos-single-date-picker"
    :class="{
      'odos-date-picker-disabled': disabled
    }"
    ref="singleDatePickerRef"
    :style="{ width: WidthSize }"
  >
    <Icon class="odos-date-picker-icon" name="Callender" />
    <div class="odos-date-picker-title" v-if="title">{{ title }}</div>

    <!-- 单日期选择输入框 -->
    <input
      ref="inputRef"
      class="odos-date-picker-input"
      :class="{
        'odos-date-picker-input-focus': isShowPicker,
        'odos-date-picker-isTitle': title
      }"
      @focus="inputFocus(true)"
      :disabled="disabled"
      :value="displayValue"
      :placeholder="getPlaceholder()"
      readonly
    />

    <!-- 使用floating-ui定位的弹出层 -->
    <Teleport to="body">
      <div v-if="isShowPicker" ref="floatingRef" class="odos-date-picker-container" :style="floatingStyles">
        <!-- 日期选择面板 -->
        <div class="odos-date-picker-content">
          <!-- 月份选择模式 -->
          <div v-if="mode === 'month'" class="odos-date-picker-month-panel">
            <div class="odos-date-picker-header">
              <div class="odos-date-picker-header-year">{{ dayjs(showDate).format('YYYY年') }}</div>
              <div class="odos-date-picker-btn">
                <div class="odos-date-picker-header-pre" @click="updateYear('pre')">
                  <Icon name="ArowLeft" size="25px" />
                </div>
                <div class="odos-date-picker-header-today" @click="goToToday">
                  今年
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
                @click="selectMonth(month, $event)"
              >
                {{ month }}月
              </div>
            </div>
          </div>

          <!-- 日期选择模式 -->
          <div v-else-if="mode === 'date' || mode === 'datetime'" class="odos-date-picker-date-panel">
            <div class="odos-date-picker-header">
              <div class="odos-date-picker-header-year clickable" @click="toggleMonthPicker">
                {{ dayjs(showDate).format('YYYY年MM月') }}
              </div>
              <div class="odos-date-picker-btn">
                <div class="odos-date-picker-header-pre" @click="updateMouth('pre')">
                  <Icon name="ArowLeft" size="25px" />
                </div>
                <div class="odos-date-picker-header-today" @click="goToToday">
                  今天
                </div>
                <div class="odos-date-picker-header-next" @click="updateMouth('next')">
                  <Icon name="ArowRight" size="25px" />
                </div>
              </div>
            </div>

            <!-- 月份选择面板 -->
            <div v-if="isShowMonthPicker" class="odos-date-picker-month-selector">
              <div class="odos-date-picker-month-grid">
                <div
                  v-for="month in 12"
                  :key="month"
                  class="odos-date-picker-month-item"
                  :class="{
                    'odos-date-picker-selected': isSelectedMonthInDateMode(month),
                    'odos-date-picker-today': isCurrentMonth(month)
                  }"
                  @click="selectMonthInDateMode(month, $event)"
                >
                  {{ month }}月
                </div>
              </div>
            </div>

            <!-- 日期选择面板 -->
            <div v-else class="odos-date-picker-body">
              <div class="odos-date-picker-week-title">
                <div class="odos-date-picker-week-item" v-for="(week, i) in titleDayList" :key="i">
                  {{ week }}
                </div>
              </div>
              <div class="odos-date-picker-day-content">
                <!-- 上个月 -->
                <div
                  class="odos-date-picker-day-pre-item"
                  v-for="(day, i) in Array.from(
                    { length: preDay.day() + 1 },
                    (_, index) => index + 1
                  ).reverse()"
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
                  <div class="odos-date-picker-time-list" ref="hourListRef">
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
                  <div class="odos-date-picker-time-list" ref="minuteListRef">
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
                  <div class="odos-date-picker-time-list" ref="secondListRef">
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
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from 'packages/Icon'
import dayjs from 'dayjs'
import { computed, ref, toRefs, watch, nextTick, Teleport } from 'vue'
import { useFloating, autoUpdate, offset, flip, shift } from '@floating-ui/vue'

const props = defineProps<{
  title?: string
  value?: string
  width?: string | number
  disabled?: boolean
  mode?: 'date' | 'month' | 'datetime'
  disabledDate?: (date: Date) => boolean
  placeholder?: string
  format?: string
}>()

const { value, title, width, disabled, disabledDate, format } = toRefs(props)
const mode = computed(() => props.mode || 'date')

const emit = defineEmits<{
  (e: 'update:value', data: string): void
}>()

// 基础状态
const datePicker = ref('')
// 当前显示日期
const showDate = ref(dayjs(new Date()))
// 是否显示日期选择器
const isShowPicker = ref(false)
// 是否显示月份选择器
const isShowMonthPicker = ref(false)

// 时间选择相关
const selectedTime = ref({
  // 当前选择时间
  hour: 0,
  // 当前选择分钟
  minute: 0,
  // 当前选择秒
  second: 0
})

// 计算宽度 
const WidthSize = computed(() => {
  if (typeof width?.value === 'number') {
    return `${width.value}px`
  } else if (typeof width?.value === 'string') {
    return width.value
  }
  return '100%'
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

// 获取格式化字符串
const getFormat = () => {
  if (format?.value) {
    return format.value
  }
  
  switch (mode.value) {
    case 'month':
      return 'YYYY-MM'
    case 'datetime':
      return 'YYYY-MM-DD HH:mm:ss'
    default:
      return 'YYYY-MM-DD'
  }
}

// 显示值
const displayValue = computed(() => {
  if (props.value) {
    switch (mode.value) {
      case 'month':
        datePicker.value = dayjs((props.value as string) + '-01').format('YYYY-MM')
        return dayjs(datePicker.value).format(getFormat())
      case 'datetime':
        datePicker.value = props.value as string
        selectedTime.value = {
          hour: dayjs(datePicker.value).hour(),
          minute: dayjs(datePicker.value).minute(),
          second: dayjs(datePicker.value).second()
        }
        return dayjs(datePicker.value).format(getFormat())
      default:
        datePicker.value = props.value as string
        return dayjs(datePicker.value).format(getFormat())
    }
  }
  // 如果datePicker.value为空，则返回空字符串
  if (!datePicker.value) return ''
  // 根据模式返回不同的格式化字符串
  switch (mode.value) {
    case 'month':
      return dayjs(datePicker.value).format(getFormat())
    case 'datetime':
      return dayjs(datePicker.value).format(getFormat())
    default:
      return dayjs(datePicker.value).format(getFormat())
  }
})

// 是否是今天
const isToday = (day: number) => {
  // 如果当前日期、月份、年份都与showDate.value相同，则返回true
  const isDay = dayjs(new Date()).date() === day
  const isMonth = dayjs(new Date()).month() === dayjs(showDate.value).month()
  const isYear = dayjs(new Date()).year() === dayjs(showDate.value).year()
  // 如果当前日期、月份、年份都与showDate.value相同，则返回true
  return isDay && isMonth && isYear
}

// 是否被选中
const isSelect = (day: number) => {
  // 如果datePicker.value为空，则返回false
  if (!datePicker.value) return false
  // 如果datePicker.value的日期、月份、年份都与showDate.value相同，则返回true
  const isDay = dayjs(datePicker.value).date() === day
  const isMonth = dayjs(datePicker.value).month() === dayjs(showDate.value).month()
  const isYear = dayjs(datePicker.value).year() === dayjs(showDate.value).year()
  return isDay && isMonth && isYear
}

// 是否是当前月份
const isCurrentMonth = (month: number) => {
  // 获取当前时间
  const now = dayjs()
  // 如果当前月份与showDate.value的月份相同，且当前年份与showDate.value的年份相同，则返回true
  return now.month() === month - 1 && now.year() === dayjs(showDate.value).year()
}

// 是否是选中的月份
const isSelectedMonth = (month: number) => {
  // 如果datePicker.value为空，则返回false
  if (!datePicker.value) return false
  // 如果datePicker.value的月份与showDate.value的月份相同，且datePicker.value的年份与showDate.value的年份相同，则返回true
  const selected = dayjs(datePicker.value)
  // 如果datePicker.value的月份与showDate.value的月份相同，且datePicker.value的年份与showDate.value的年份相同，则返回true
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

// 跳转到今天
const goToToday = () => {
  const today = dayjs()
  showDate.value = today
  
  if (mode.value === 'datetime') {
    // 如果是日期时间模式，设置当前时间
    selectedTime.value = {
      hour: today.hour(),
      minute: today.minute(),
      second: today.second()
    }
    const dateTime = today.format('YYYY-MM-DD HH:mm:ss')
    datePicker.value = dateTime
    emit('update:value', dateTime)
  } else if (mode.value === 'date') {
    // 如果是日期模式，选择今天
    const todayStr = today.format('YYYY-MM-DD')
    datePicker.value = todayStr
    emit('update:value', todayStr)
  } else if (mode.value === 'month') {
    // 如果是月份模式，跳转到当前年份
    showDate.value = today
  }
}

// 选择月份
const selectMonth = (month: number, event?: Event) => {
  if (event) {
    event.stopPropagation()
  }
  const selectedDate = dayjs(showDate.value).month(month - 1)
  datePicker.value = selectedDate.format('YYYY-MM-01')
  emit('update:value', selectedDate.format('YYYY-MM'))
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
    emit('update:value', date.format('YYYY-MM-DD HH:mm:ss'))
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
    emit('update:value', dateTime.format('YYYY-MM-DD HH:mm:ss'))
  } else {
    datePicker.value = data
    emit('update:value', data)
    isShowPicker.value = false
  }
}

// 事件处理
const singleDatePickerRef = ref()
const inputRef = ref()
const floatingRef = ref()

// 时间选择器的ref引用
const hourListRef = ref()
const minuteListRef = ref()
const secondListRef = ref()

// Floating UI 配置
const { floatingStyles } = useFloating(inputRef, floatingRef, {
  placement: 'bottom-start',
  middleware: [offset(4), flip(), shift({ padding: 8 })],
  whileElementsMounted: autoUpdate
})

// 滚动到选中的时间项
const scrollToSelectedTime = () => {
  nextTick(() => {
    const itemHeight = 24

    if (hourListRef.value) {
      const scrollTop = selectedTime.value.hour * itemHeight
      hourListRef.value.scrollTop = scrollTop
    }

    if (minuteListRef.value) {
      const scrollTop = selectedTime.value.minute * itemHeight
      minuteListRef.value.scrollTop = scrollTop
    }

    if (secondListRef.value) {
      const scrollTop = selectedTime.value.second * itemHeight
      secondListRef.value.scrollTop = scrollTop
    }
  })
}

const inputFocus = (flag?: boolean) => {
  if (!disabled?.value) {
    isShowPicker.value = true
    if (mode.value === 'datetime' && flag) {
      scrollToSelectedTime()
    }
  }
}

const inputBlur = () => {
  isShowPicker.value = false
}

// 监听value变化
watch(
  value,
  (newVal) => {
    if (newVal) {
      datePicker.value = newVal as string
      showDate.value = dayjs(newVal as string)
      
      // 如果是datetime模式，解析时间部分
      if (mode.value === 'datetime') {
        selectedTime.value = {
          hour: dayjs(newVal as string).hour(),
          minute: dayjs(newVal as string).minute(),
          second: dayjs(newVal as string).second()
        }
      }
    }
  },
  { immediate: true }
)

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement
  if (singleDatePickerRef.value?.contains(target)) {
    inputFocus()
  } else if (floatingRef.value && !floatingRef.value.contains(target)) {
    inputBlur()
  }
})

// 月份选择器切换
const toggleMonthPicker = () => {
  isShowMonthPicker.value = !isShowMonthPicker.value
}

const isSelectedMonthInDateMode = (month: number) => {
  if (!datePicker.value) return false
  const selected = dayjs(datePicker.value)
  return selected.month() === month - 1 && selected.year() === dayjs(showDate.value).year()
}

const selectMonthInDateMode = (month: number, event?: Event) => {
  if (event) {
    event.stopPropagation()
  }
  showDate.value = dayjs(showDate.value).month(month - 1)
  isShowMonthPicker.value = false
}
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

.odos-single-date-picker {
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

  &.odos-date-picker-disabled {
    .odos-date-picker-input {
      background: #f2f3f5;
      cursor: not-allowed;

      &:hover {
        background: #f2f3f5;
      }
    }
  }
}

// 弹出层容器样式
.odos-date-picker-container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: #fff;
  border: 1px solid #e5e6eb;
  border-radius: 8px;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.12);
}

.odos-date-picker-content {
  position: relative;
  border-radius: 8px;
  box-sizing: border-box;
  background-color: #fff;
  width: 312px;
  padding: 0 16px;

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
}
</style> 