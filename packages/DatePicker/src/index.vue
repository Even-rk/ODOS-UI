<template>
  <div
    class="odos-date-picker"
    :class="{
      'odos-date-picker-disabled': disabled
    }"
    ref="datePickerRef"
    :style="{ width: WidthSize }"
  >
    <Icon class="odos-date-picker-icon" name="Callender" />
    <div class="odos-date-picker-title" v-if="title">{{ title }}</div>
    <input
      ref="inputRef"
      class="odos-date-picker-input"
      :class="{
        'odos-date-picker-input-focus': isShowPicker,
        'odos-date-picker-isTitle': title
      }"
      :disabled="disabled"
      :value="value"
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
              'odos-date-picker-selected': isSelect(day)
            }"
            class="odos-date-picker-day-item"
            v-for="(day, i) in days"
            :key="i"
            @click="datePickerClick(day)"
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from 'packages/Icon'
import dayjs from 'dayjs'
import { computed, ref, toRefs, watch } from 'vue'
const props = defineProps<{
  title?: string
  value?: string
  width?: string | number
  disabled?: boolean
}>()
const { value, title, width, disabled } = toRefs(props)
const emit = defineEmits<{
  (e: 'update:value', data: string): void
}>()

watch(value, () => {
  datePicker.value = value.value
})
// 是否是今天
const isToday = (day: number) => {
  return dayjs(new Date()).date() === day && dayjs(new Date()).month() === dayjs(showDate.value).month()
}
// 是否被选中
const isSelect = (day: number) => {
  const isDay = datePicker.value && dayjs(datePicker.value).date() === day
  const isMonth = dayjs(datePicker.value).month() === dayjs(showDate.value).month()
  return datePicker && isDay && isMonth
}

const WidthSize = computed(() => {
  const widthSize = ref('')
  if (typeof width === 'number') {
    widthSize.value = `${width}px`
  } else if (typeof width === 'string') {
    widthSize.value = width
  }
  return widthSize.value
})
// 绑定值
const datePicker = ref()
// 显示月份
const showDate = ref(dayjs(new Date()))

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
  const data = dayjs(showDate.value).format('YYYY-MM') + '-' + (day >= 10 ? day : '0' + day)
  showDate.value = dayjs(data)
  emit('update:value', data)
}
const datePickerRef = ref()
const inputRef = ref()

document.addEventListener('click', (e) => {
  if (datePickerRef.value?.contains(e.target)) {
    inputFocus()
    inputRef.value.focus()
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
    &:blur {
      border: 1px solid #2e6ce4;
      background: #fff;
    }
    &::placeholder {
      position: relative;
      top: 1px;
      color: #86909c;
    }
  }

  .odos-date-picker-content {
    &.bottom {
      position: absolute;
      top: 44px;
    }
    width: 312px;
    height: 340px;
    border-radius: 8px;
    box-sizing: border-box;
    background-color: #fff;
    border: 1px solid #e5e6eb;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.12);
    padding: 0 16px;
    z-index: 1000;
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
        }
      }
      .odos-date-picker-day-title,
      .odos-date-picker-day-content {
        display: flex;
        flex-wrap: wrap;
        .odos-date-picker-day-item {
          @include DateItem;
        }
      }
      .odos-date-picker-day-content {
        .odos-date-picker-day-pre {
          display: flex;
          align-items: end;
        }
        .odos-date-picker-day-pre-item,
        .odos-date-picker-day-next-item {
          @include DateItem;
          color: #bfbfbf;
        }
        .odos-date-picker-day-item {
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
          &.odos-date-picker-selected {
            background-color: #2e6ce4;
            color: #fff;
            &:hover,
            &:active {
              background-color: #2e6ce4;
            }
          }
        }
      }
    }
  }
  &.odos-date-picker-disabled {
    background: #f2f3f5;
    border-radius: 8px;
    input:hover {
      cursor: not-allowed;
      background: #f2f3f5;
    }
  }
}
</style>
