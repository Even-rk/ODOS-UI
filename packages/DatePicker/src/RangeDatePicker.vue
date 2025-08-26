<template>
  <div
    class="odos-range-date-picker"
    :class="{
      'odos-date-picker-disabled': disabled
    }"
    ref="rangeDatePickerRef"
    :style="{ width: WidthSize }"
  >
    <Icon class="odos-date-picker-icon" name="Callender" />
    <div class="odos-date-picker-title" v-if="title">{{ title }}</div>

    <!-- 区间选择输入框 -->
    <div
      ref="rangeInputRef"
      class="odos-date-picker-range-input"
      :class="{
        'odos-date-picker-input-focus': isShowPicker,
        'odos-date-picker-isTitle': title
      }"
      @click="inputFocus"
    >
      <input
        ref="startInputRef"
        class="odos-date-picker-range-start"
        :disabled="disabled"
        :value="formattedRangeValue[0]"
        placeholder="开始日期"
        readonly
      />
      <span class="odos-date-picker-range-separator">至</span>
      <input
        ref="endInputRef"
        class="odos-date-picker-range-end"
        :disabled="disabled"
        :value="formattedRangeValue[1]"
        placeholder="结束日期"
        readonly
      />
    </div>

    <!-- 使用floating-ui定位的弹出层 -->
    <Teleport to="body">
      <div v-if="isShowPicker" ref="floatingRef" class="odos-date-picker-container" :style="floatingStyles">
        <!-- 日期选择面板 -->
        <div class="odos-date-picker-content range-panel" :class="{ 'has-shortcuts': shortcuts && shortcuts.length > 0 }">
          <!-- 快捷选择区域 -->
          <div v-if="shortcuts && shortcuts.length > 0" class="odos-date-picker-shortcuts">
            <div class="odos-date-picker-shortcuts-list">
              <div
                v-for="(shortcut, index) in shortcuts"
                :key="index"
                class="odos-date-picker-shortcut-item"
                @click="selectShortcut(shortcut, $event)"
              >
                {{ shortcut.text }}
              </div>
            </div>
          </div>

          <!-- 主要日期选择区域 -->
          <div class="odos-date-picker-main">
            <!-- 日期区间选择模式 -->
            <div class="odos-date-picker-range-panel">
              <div class="odos-date-picker-range-calendars">
                <!-- 左侧日历 -->
                <div class="odos-date-picker-calendar">
                  <div class="odos-date-picker-header">
                    <div class="odos-date-picker-header-time">
                      <div class="odos-date-picker-header-year clickable" @click="toggleYearPicker('left', $event)">
                        {{ dayjs(leftCalendarDate).format('YYYY年') }}
                      </div>
                      <div class="odos-date-picker-header-month clickable" @click="toggleMonthPicker('left', $event)">
                        {{ dayjs(leftCalendarDate).format('MM月') }}
                      </div>
                    </div>
                    <div class="odos-date-picker-btn">
                      <div class="odos-date-picker-header-pre" @click="handleNavigation('left', 'pre', $event)">
                        <Icon name="ArowLeft" size="25px" />
                      </div>
                      <div class="odos-date-picker-header-today" @click="handleTodayClick('left', $event)">
                        {{ leftYearPicker ? '今年' : (leftMonthPicker ? '本月' : '今天') }}
                      </div>
                      <div class="odos-date-picker-header-next" @click="handleNavigation('left', 'next', $event)">
                        <Icon name="ArowRight" size="25px" />
                      </div>
                    </div>
                  </div>

                  <!-- 年份选择面板 -->
                  <div v-if="leftYearPicker" class="odos-date-picker-year-selector">
                    <div class="odos-date-picker-year-grid">
                      <div
                        v-for="year in leftYearRange"
                        :key="year"
                        class="odos-date-picker-year-item"
                        :class="{
                          'odos-date-picker-selected': dayjs(leftCalendarDate).year() === year
                        }"
                        @click="selectYear('left', year, $event)"
                      >
                        {{ year }}
                      </div>
                    </div>
                  </div>

                  <!-- 月份选择面板 -->
                  <div v-if="leftMonthPicker" class="odos-date-picker-month-selector">
                    <div class="odos-date-picker-month-grid">
                      <div
                        v-for="month in 12"
                        :key="month"
                        class="odos-date-picker-month-item"
                        :class="{
                          'odos-date-picker-selected': dayjs(leftCalendarDate).month() === month - 1,
                          'odos-date-picker-today': isCurrentMonth(month, dayjs(leftCalendarDate).year())
                        }"
                        @click="selectMonth('left', month, $event)"
                      >
                        {{ month }}月
                      </div>
                    </div>
                  </div>

                  <!-- 日期面板 -->
                  <div v-if="!leftYearPicker && !leftMonthPicker" class="odos-date-picker-body">
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
                        @click="selectRangeDate(date, $event)"
                      >
                        {{ date.day }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 右侧日历 -->
                <div class="odos-date-picker-calendar">
                  <div class="odos-date-picker-header">
                    <div class="odos-date-picker-header-time">
                      <div class="odos-date-picker-header-year clickable" @click="toggleYearPicker('right', $event)">
                        {{ dayjs(rightCalendarDate).format('YYYY年') }}
                      </div>
                      <div class="odos-date-picker-header-month clickable" @click="toggleMonthPicker('right', $event)">
                        {{ dayjs(rightCalendarDate).format('MM月') }}
                      </div>
                    </div>
                    <div class="odos-date-picker-btn">
                      <div class="odos-date-picker-header-pre" @click="updateRangeMonth('right', 'pre', $event)">
                        <Icon name="ArowLeft" size="25px" />
                      </div>
                      <div class="odos-date-picker-header-next" @click="updateRangeMonth('right', 'next', $event)">
                        <Icon name="ArowRight" size="25px" />
                      </div>
                    </div>
                  </div>

                  <!-- 年份选择面板 -->
                  <div v-if="rightYearPicker" class="odos-date-picker-year-selector">
                    <div class="odos-date-picker-year-grid">
                      <div
                        v-for="year in rightYearRange"
                        :key="year"
                        class="odos-date-picker-year-item"
                        :class="{
                          'odos-date-picker-selected': dayjs(rightCalendarDate).year() === year
                        }"
                        @click="selectYear('right', year, $event)"
                      >
                        {{ year }}
                      </div>
                    </div>
                  </div>

                  <!-- 月份选择面板 -->
                  <div v-if="rightMonthPicker" class="odos-date-picker-month-selector">
                    <div class="odos-date-picker-month-grid">
                      <div
                        v-for="month in 12"
                        :key="month"
                        class="odos-date-picker-month-item"
                        :class="{
                          'odos-date-picker-selected': dayjs(rightCalendarDate).month() === month - 1,
                          'odos-date-picker-today': isCurrentMonth(month, dayjs(rightCalendarDate).year()),
                          'odos-date-picker-disabled': isRightMonthDisabled(month)
                        }"
                        @click="!isRightMonthDisabled(month) && selectMonth('right', month, $event)"
                      >
                        {{ month }}月
                      </div>
                    </div>
                  </div>

                  <!-- 日期面板 -->
                  <div v-if="!rightYearPicker && !rightMonthPicker" class="odos-date-picker-body">
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
                        @click="selectRangeDate(date, $event)"
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
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from 'packages/Icon'
import dayjs from 'dayjs'
import { computed, ref, toRefs, watch, Teleport } from 'vue'
import { useFloating, autoUpdate, offset, flip, shift } from '@floating-ui/vue'

interface DateItem {
  date: string
  day: number
  isCurrentMonth?: boolean
  key: string
}

const props = defineProps<{
  title?: string
  value?: string[]
  width?: string | number
  disabled?: boolean
  disabledDate?: (date: Date) => boolean
  placeholder?: string
  format?: string
  shortcuts?: Array<{
    text: string
    value: () => string[]
  }>
}>()

const { value, title, width, disabled, disabledDate, format, shortcuts } = toRefs(props)

const emit = defineEmits<{
  (e: 'update:value', data: string[]): void
}>()

// 基础状态
const rangeValue = ref<string[]>(['', ''])
const isShowPicker = ref(false)

// 区间选择相关
const leftCalendarDate = ref(dayjs(new Date()))
const rightCalendarDate = ref(dayjs(new Date()).add(1, 'month'))
const rangeSelectState = ref<'start' | 'end' | null>(null)

// 年份和月份选择器状态
const leftYearPicker = ref(false)
const leftMonthPicker = ref(false)
const rightYearPicker = ref(false)
const rightMonthPicker = ref(false)

// 计算宽度
const WidthSize = computed(() => {
  if (typeof width?.value === 'number') {
    return `${width.value}px`
  } else if (typeof width?.value === 'string') {
    return width.value
  }
  return '350px'
})

// 年份范围（当前年份前后各10年）
const leftYearRange = computed(() => {
  const currentYear = dayjs(leftCalendarDate.value).year()
  const years = []
  for (let i = currentYear - 10; i <= currentYear + 10; i++) {
    years.push(i)
  }
  return years
})

const rightYearRange = computed(() => {
  const leftYear = dayjs(leftCalendarDate.value).year()
  const currentYear = dayjs(rightCalendarDate.value).year()
  const years = []
  
  // 右侧日历的年份范围从左侧日历的年份开始，到当前年份+10年
  const startYear = Math.max(leftYear, currentYear - 10)
  const endYear = currentYear + 10
  
  for (let i = startYear; i <= endYear; i++) {
    years.push(i)
  }
  return years
})

// 监听value变化
watch(
  value,
  (newVal) => {
    if (newVal && Array.isArray(newVal)) {
      rangeValue.value = newVal as string[]
      
      // 如果有起始日期，设置左侧日历显示
      if (newVal[0]) {
        leftCalendarDate.value = dayjs(newVal[0])
        rightCalendarDate.value = dayjs(newVal[0]).add(1, 'month')
      }
    }
  },
  { immediate: true }
)

// 日期显示title
const titleDayList = ['一', '二', '三', '四', '五', '六', '日']

// 年份和月份选择器切换
const toggleYearPicker = (side: 'left' | 'right', event?: Event) => {
  if (event) {
    event.stopPropagation()
  }
  if (side === 'left') {
    leftYearPicker.value = !leftYearPicker.value
    if (leftYearPicker.value) {
      leftMonthPicker.value = false
    }
  } else {
    rightYearPicker.value = !rightYearPicker.value
    if (rightYearPicker.value) {
      rightMonthPicker.value = false
    }
  }
}

const toggleMonthPicker = (side: 'left' | 'right', event?: Event) => {
  if (event) {
    event.stopPropagation()
  }
  if (side === 'left') {
    leftMonthPicker.value = !leftMonthPicker.value
    if (leftMonthPicker.value) {
      leftYearPicker.value = false
    }
  } else {
    rightMonthPicker.value = !rightMonthPicker.value
    if (rightMonthPicker.value) {
      rightYearPicker.value = false
    }
  }
}

// 选择年份
const selectYear = (side: 'left' | 'right', year: number, event?: Event) => {
  // 阻止事件冒泡，避免触发全局点击监听器
  if (event) {
    event.stopPropagation()
  }
  
  if (side === 'left') {
    const newLeftDate = dayjs(leftCalendarDate.value).year(year)
    leftCalendarDate.value = newLeftDate
    
    // 确保右侧日历不早于左侧日历
    if (rightCalendarDate.value.isBefore(newLeftDate, 'month')) {
      rightCalendarDate.value = newLeftDate.add(1, 'month')
    }
    
    leftYearPicker.value = false
  } else {
    const newRightDate = dayjs(rightCalendarDate.value).year(year)
    
    // 确保右侧日历不早于左侧日历
    if (newRightDate.isBefore(leftCalendarDate.value, 'month')) {
      // 如果选择的年份会导致右侧早于左侧，则调整为左侧日历的下一个月
      rightCalendarDate.value = leftCalendarDate.value.add(1, 'month')
    } else {
      rightCalendarDate.value = newRightDate
    }
    
    rightYearPicker.value = false
  }
}

// 选择月份
const selectMonth = (side: 'left' | 'right', month: number, event?: Event) => {
  // 阻止事件冒泡，避免触发全局点击监听器
  if (event) {
    event.stopPropagation()
  }
  
  if (side === 'left') {
    const newLeftDate = dayjs(leftCalendarDate.value).month(month - 1)
    leftCalendarDate.value = newLeftDate
    
    // 确保右侧日历不早于左侧日历
    if (rightCalendarDate.value.isBefore(newLeftDate, 'month') || rightCalendarDate.value.isSame(newLeftDate, 'month')) {
      rightCalendarDate.value = newLeftDate.add(1, 'month')
    }
    
    leftMonthPicker.value = false
  } else {
    const newRightDate = dayjs(rightCalendarDate.value).month(month - 1)
    
    // 确保右侧日历不早于左侧日历
    if (newRightDate.isBefore(leftCalendarDate.value, 'month') || newRightDate.isSame(leftCalendarDate.value, 'month')) {
      // 如果选择的月份会导致右侧早于或等于左侧，则调整为左侧日历的下一个月
      rightCalendarDate.value = leftCalendarDate.value.add(1, 'month')
    } else {
      rightCalendarDate.value = newRightDate
    }
    
    rightMonthPicker.value = false
  }
}

// 是否是当前月份
const isCurrentMonth = (month: number, year: number) => {
  const now = dayjs()
  return now.month() === month - 1 && now.year() === year
}
// 选择快捷选项
const selectShortcut = (shortcut: { text: string; value: () => string[] }, event?: Event) => {
  // 阻止事件冒泡，避免触发全局点击监听器
  if (event) {
    event.stopPropagation()
  }
  const selectedRange = shortcut.value()
  if (selectedRange && selectedRange.length === 2) {
    rangeValue.value = selectedRange
    emit('update:value', [...selectedRange])
    
    // 更新日历显示
    if (selectedRange[0]) {
      leftCalendarDate.value = dayjs(selectedRange[0])
      rightCalendarDate.value = dayjs(selectedRange[0]).add(1, 'month')
    }
    
    isShowPicker.value = false
  }
}

// 区间选择相关方法
const updateRangeMonth = (side: 'left' | 'right', type: 'pre' | 'next', event?: Event) => {
  if (event) {
    event.stopPropagation()
  }
  if (side === 'left') {
    if (type === 'next') {
      const newLeftDate = dayjs(leftCalendarDate.value).add(1, 'month')
      leftCalendarDate.value = newLeftDate

      // 确保右侧日历不早于左侧日历
      if (rightCalendarDate.value.isBefore(newLeftDate, 'month') || rightCalendarDate.value.isSame(newLeftDate, 'month')) {
        rightCalendarDate.value = newLeftDate.add(1, 'month')
      }
    } else {
      leftCalendarDate.value = dayjs(leftCalendarDate.value).subtract(1, 'month')
    }
  } else {
    if (type === 'next') {
      rightCalendarDate.value = dayjs(rightCalendarDate.value).add(1, 'month')
    } else {
      const newRightDate = dayjs(rightCalendarDate.value).subtract(1, 'month')

      // 确保右侧日历不早于左侧日历
      if (newRightDate.isBefore(leftCalendarDate.value, 'month') || newRightDate.isSame(leftCalendarDate.value, 'month')) {
        rightCalendarDate.value = leftCalendarDate.value.add(1, 'month')
      } else {
        rightCalendarDate.value = newRightDate
      }
    }
  }
}

const updateRangeYear = (side: 'left' | 'right', type: 'pre' | 'next', event?: Event) => {
  if (event) event.stopPropagation()
  const amount = type === 'pre' ? -1 : 1
  if (side === 'left') {
    const newLeftDate = dayjs(leftCalendarDate.value).add(amount, 'year')
    leftCalendarDate.value = newLeftDate

    if (rightCalendarDate.value.isBefore(newLeftDate, 'month')) {
      rightCalendarDate.value = newLeftDate.add(1, 'month')
    }
  } else {
    // side === 'right'
    const newRightDate = dayjs(rightCalendarDate.value).add(amount, 'year')

    if (newRightDate.isAfter(leftCalendarDate.value, 'month')) {
      rightCalendarDate.value = newRightDate
    }
  }
}

const handleNavigation = (side: 'left' | 'right', type: 'pre' | 'next', event?: Event) => {
  if (event) event.stopPropagation()
  const picker = side === 'left' ? leftYearPicker : rightYearPicker
  if (picker.value) {
    updateRangeYear(side, type, event)
  } else {
    updateRangeMonth(side, type, event)
  }
}

const goToToday = (side: 'left' | 'right') => {
  const today = dayjs()
  if (side === 'left') {
    leftCalendarDate.value = today
    rightCalendarDate.value = today.add(1, 'month')
  }
}

const handleTodayClick = (side: 'left' | 'right', event?: Event) => {
  if (event) event.stopPropagation()
  const today = dayjs()
  if (side === 'left') {
    if (leftYearPicker.value) {
      const newLeftDate = dayjs(leftCalendarDate.value).year(today.year())
      leftCalendarDate.value = newLeftDate
      if (rightCalendarDate.value.isBefore(newLeftDate, 'month')) {
        rightCalendarDate.value = newLeftDate.add(1, 'month')
      }
    } else if (leftMonthPicker.value) {
      const newLeftDate = dayjs(leftCalendarDate.value).year(today.year()).month(today.month())
      leftCalendarDate.value = newLeftDate
      if (rightCalendarDate.value.isBefore(newLeftDate, 'month') || rightCalendarDate.value.isSame(newLeftDate, 'month')) {
        rightCalendarDate.value = newLeftDate.add(1, 'month')
      }
    } else {
      goToToday(side)
    }
  } else {
    // side === 'right'
    if (rightYearPicker.value) {
      const newRightDate = dayjs(rightCalendarDate.value).year(today.year())
      rightCalendarDate.value = newRightDate
      if (leftCalendarDate.value.isAfter(newRightDate, 'month')) {
        leftCalendarDate.value = newRightDate.subtract(1, 'month')
      }
    } else if (rightMonthPicker.value) {
      const newRightDate = dayjs(rightCalendarDate.value).year(today.year()).month(today.month())
      rightCalendarDate.value = newRightDate
      if (leftCalendarDate.value.isAfter(newRightDate, 'month') || leftCalendarDate.value.isSame(newRightDate, 'month')) {
        leftCalendarDate.value = newRightDate.subtract(1, 'month')
      }
    } else {
      goToToday(side)
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

  // 检查是否禁用日期
  const isDisabled = disabledDate?.value && disabledDate.value(new Date(date.date))
  if (isDisabled) {
    classes.push('odos-date-picker-day-disabled')
    return classes // 禁用日期不显示范围选择样式
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

// 检查日期范围内是否有禁用日期
const hasDisabledDateInRange = (startDate: string, endDate: string) => {
  if (!disabledDate?.value) return false
  
  let current = dayjs(startDate).add(1, 'day')
  const end = dayjs(endDate)
  
  while (current.isBefore(end)) {
    if (disabledDate.value(current.toDate())) {
      return true
    }
    current = current.add(1, 'day')
  }
  
  return false
}

// 选择区间日期
const selectRangeDate = (date: DateItem, event?: Event) => {
  // 阻止事件冒泡，避免触发全局点击监听器
  if (event) {
    event.stopPropagation()
  }

  // 检查是否禁用日期，如果禁用则不允许选择
  if (disabledDate?.value && disabledDate.value(new Date(date.date))) {
    return
  }

  const [start, end] = rangeValue.value

  if (!start || (start && end)) {
    // 开始新的选择
    rangeValue.value = [date.date, '']
    rangeSelectState.value = 'end'
  } else if (start && !end) {
    // 选择结束日期
    let newStart: string
    let newEnd: string
    
    if (dayjs(date.date).isBefore(start)) {
      newStart = date.date
      newEnd = start
    } else {
      newStart = start
      newEnd = date.date
    }
    
    // 检查范围内是否有禁用日期
    if (hasDisabledDateInRange(newStart, newEnd)) {
      // 如果范围内有禁用日期，不允许选择，重新开始选择
      rangeValue.value = [date.date, '']
      rangeSelectState.value = 'end'
      return
    }
    
    rangeValue.value = [newStart, newEnd]
    rangeSelectState.value = null
    emit('update:value', [...rangeValue.value])
    isShowPicker.value = false
  }
}

// 事件处理
const rangeDatePickerRef = ref()
const rangeInputRef = ref()
const floatingRef = ref()

// Floating UI 配置
const { floatingStyles } = useFloating(rangeInputRef, floatingRef, {
  placement: 'bottom-start',
  middleware: [offset(4), flip(), shift({ padding: 8 })],
  whileElementsMounted: autoUpdate
})

const inputFocus = () => {
  if (!disabled?.value) {
    isShowPicker.value = true
  }
}

const inputBlur = () => {
  isShowPicker.value = false
}

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement
  if (rangeDatePickerRef.value?.contains(target)) {
    inputFocus()
  } else if (floatingRef.value && !floatingRef.value.contains(target)) {
    inputBlur()
  }
})

// 获取格式化字符串
const getFormat = () => {
  if (format?.value) {
    return format.value
  }
  return 'YYYY-MM-DD'
}

// 格式化显示的区间值
const formattedRangeValue = computed(() => {
  const [start, end] = rangeValue.value
  return [
    start ? dayjs(start).format(getFormat()) : '',
    end ? dayjs(end).format(getFormat()) : ''
  ]
})

// 判断右侧月份是否禁用
const isRightMonthDisabled = (month: number) => {
  const leftYear = dayjs(leftCalendarDate.value).year()
  const leftMonth = dayjs(leftCalendarDate.value).month() + 1 // dayjs月份从0开始，转换为1-12
  const rightYear = dayjs(rightCalendarDate.value).year()
  
  // 如果左右日历是同一年，那么右侧日历的月份不能早于或等于左侧日历的月份
  if (rightYear === leftYear && month <= leftMonth) {
    return true
  }
  return false
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

.odos-range-date-picker {
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

  &.odos-date-picker-disabled {
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

  &.range-panel {
    // 默认布局（无快捷选择）
    &:not(.has-shortcuts) {
      width: 624px;
      
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
    
    // 当有快捷选择时，调整布局
    &.has-shortcuts {
      display: flex;
      width: 732px; // 624 + 108
      padding: 0;
      
      .odos-date-picker-range-calendars {
        display: flex;
        flex: 1;

        .odos-date-picker-calendar {
          width: 312px;
          padding: 0 16px;

          &:first-child {
            border-right: 1px solid #f4f4f5;
          }
        }
      }
    }
  }

  // 快捷选择区域
  .odos-date-picker-shortcuts {
    width: fit-content;
    padding: 12px 8px;
    border-right: 1px solid #f4f4f5;
    background: #fafbfc;
    border-radius: 8px 0 0 8px;

    .odos-date-picker-shortcuts-list {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .odos-date-picker-shortcut-item {
        padding: 0px 10px;
        border-radius: 3px;
        background: #fff;
        color: #4e5969;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.2s;
        white-space: nowrap;
        text-align: center;
        line-height: 24px;
        border: 1px solid #e5e6eb;

        &:hover {
          background: #e8f3ff;
          color: #2e6ce4;
          border-color: #2e6ce4;
        }

        &:active {
          background: #cce7ff;
        }
      }
    }
  }

  // 年份选择器
  .odos-date-picker-year-selector {
    .odos-date-picker-year-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      padding: 16px;
      max-height: 200px;
      overflow-y: auto;
      
      // 隐藏滚动条
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
      
      &::-webkit-scrollbar-track {
        background: transparent;
      }
      
      &::-webkit-scrollbar-thumb {
        background: transparent;
      }
      
      // Firefox
      scrollbar-width: none;
      
      // IE
      -ms-overflow-style: none;

      .odos-date-picker-year-item {
        @include DateItem;
        width: 60px;
        height: 32px;
        font-size: 12px;

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

  // 月份选择器
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

        &.odos-date-picker-disabled {
          background-color: #f2f3f5;
          color: #c9cdd4;
          cursor: not-allowed;

          &:hover {
            background-color: #f2f3f5;
          }

          &:active {
            background-color: #f2f3f5;
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

      .odos-date-picker-day-other-month {
        @include DateItem;
        color: #bfbfbf;
      }

      .odos-date-picker-day-item {
        @include DateItem;

        &:hover {
          background: #e5e6eb;
        }

        &:active {
          background: #86909c;
        }

        &.odos-date-picker-today {
          border: 1px dashed #2e6ce4;
          color: #2e6ce4;
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

        &.odos-date-picker-day-disabled {
          background-color: #f2f3f5;
          color: #c9cdd4;
          cursor: not-allowed;

          &:hover {
            background-color: #f2f3f5;
          }

          &:active {
            background-color: #f2f3f5;
          }
        }
      }
    }
  }
}
</style>