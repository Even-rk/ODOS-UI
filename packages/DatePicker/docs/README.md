<script setup>
import Basic from './basic.vue'
import DateWithTitle from './date-with-title.vue'
import MonthPicker from './month-picker.vue'
import DatetimePicker from './datetime-picker.vue'
import RangePicker from './range-picker.vue'
import DisabledDates from './disabled-dates.vue'
import CustomFormat from './custom-format.vue'
import DisabledState from './disabled-state.vue'
import CompleteDemo from './complete-demo.vue'
import ShortcutsDemo from './shortcuts-demo.vue'
import RangeShortcutsDemo from './range-shortcuts-demo.vue'
</script>

# DatePicker 日期选择器

一个功能强大的日期选择组件，支持多种选择模式：日期选择、月份选择、日期时间选择和日期区间选择。

## 功能特性

- 🗓️ **多种模式**：支持日期、月份、日期时间、日期区间四种选择模式
- ⏰ **时间选择**：精确到时、分、秒的时间选择
- 🚫 **禁用日期**：灵活的日期禁用规则
- 🎨 **自定义格式**：支持自定义日期显示格式
- ⚡ **快捷选择**：可配置的快捷选择按钮，提升用户体验
- 📱 **响应式设计**：适配不同屏幕尺寸
- 🎯 **TypeScript支持**：完整的类型定义

## 基础用法

最简单的日期选择器用法：

<Preview comp-name="DatePicker" demo-name="basic">
  <Basic />
</Preview>

## 选择模式

### 1. 日期选择（默认）

选择单个日期：

<Preview comp-name="DatePicker" demo-name="date-with-title">
  <DateWithTitle />
</Preview>

### 2. 月份选择

只选择年月，不包含具体日期：

<Preview comp-name="DatePicker" demo-name="month-picker">
  <MonthPicker />
</Preview>

### 3. 日期时间选择

同时选择日期和时间：

<Preview comp-name="DatePicker" demo-name="datetime-picker">
  <DatetimePicker />
</Preview>

### 4. 日期区间选择

选择一个日期范围：

<Preview comp-name="DatePicker" demo-name="range-picker">
  <RangePicker />
</Preview>

## 高级功能

### 禁用日期

通过 `disabledDate` 函数自定义禁用规则：

<Preview comp-name="DatePicker" demo-name="disabled-dates">
  <DisabledDates />
</Preview>

### 自定义格式

支持多种日期格式：

<Preview comp-name="DatePicker" demo-name="custom-format">
  <CustomFormat />
</Preview>

### 禁用状态

<Preview comp-name="DatePicker" demo-name="disabled-state">
  <DisabledState />
</Preview>

### 快捷选择

通过 `shortcuts` 属性可以配置快捷选择按钮，方便用户快速选择常用的日期。快捷选择功能支持日期、月份、日期时间三种模式，可以根据不同的业务场景配置相应的快捷选项：

<Preview comp-name="DatePicker" demo-name="shortcuts-demo">
  <ShortcutsDemo />
</Preview>

### 区间选择快捷选择

区间选择模式同样支持快捷选择功能，可以快速选择常用的日期区间，如"近7天"、"本月"、"上季度"等。区间选择的快捷选择返回值为数组格式 `[startDate, endDate]`：

<Preview comp-name="DatePicker" demo-name="range-shortcuts-demo">
  <RangeShortcutsDemo />
</Preview>

**区间快捷选择配置说明：**

- `text`: 快捷选择按钮显示的文本
- `value`: 返回包含两个日期的数组的函数，格式为 `[startDate, endDate]`
- 支持动态计算，如相对日期、本周/上周等
- 常用配置场景：基础区间（今天、昨天、近N天）、业务场景（本周、本月、本季度）、相对日期（N周前、N月前）

**快速上手示例：**

```vue
<template>
  <DatePicker
    v-model:value="selectedRange"
    mode="range"
    :shortcuts="rangeShortcuts"
    placeholder="请选择日期区间"
  />
</template>

<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

const selectedRange = ref([])

const rangeShortcuts = [
  {
    text: '近7天',
    value: () => [
      dayjs().subtract(6, 'day').format('YYYY-MM-DD'),
      dayjs().format('YYYY-MM-DD')
    ]
  },
  {
    text: '近30天',
    value: () => [
      dayjs().subtract(29, 'day').format('YYYY-MM-DD'),
      dayjs().format('YYYY-MM-DD')
    ]
  },
  {
    text: '本月',
    value: () => [
      dayjs().startOf('month').format('YYYY-MM-DD'),
      dayjs().endOf('month').format('YYYY-MM-DD')
    ]
  },
  {
    text: '上月',
    value: () => [
      dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
      dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
    ]
  }
]
</script>
```

**快捷选择配置说明：**

- `text`: 快捷选择按钮显示的文本
- `value`: 返回对应日期字符串的函数，支持动态计算
- 支持的格式：日期模式(`YYYY-MM-DD`)、月份模式(`YYYY-MM`)、日期时间模式(`YYYY-MM-DD HH:mm:ss`)
- 建议控制快捷选择项数量在 10 个以内，保持良好的用户体验

**快速上手示例：**

```vue
<template>
  <DatePicker
    v-model:value="selectedDate"
    :shortcuts="shortcuts"
    mode="date"
    placeholder="请选择日期"
  />
</template>

<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

const selectedDate = ref('')

const shortcuts = [
  {
    text: '今天',
    value: () => dayjs().format('YYYY-MM-DD')
  },
  {
    text: '一周后',
    value: () => dayjs().add(1, 'week').format('YYYY-MM-DD')
  },
  {
    text: '一个月后',
    value: () => dayjs().add(1, 'month').format('YYYY-MM-DD')
  },
  {
    text: '三个月后',
    value: () => dayjs().add(3, 'month').format('YYYY-MM-DD')
  }
]
</script>
```

## API 参考

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| value / v-model | 绑定值 | `string \| string[]` | - | - |
| mode | 选择模式 | `'date' \| 'month' \| 'datetime' \| 'range'` | `'date'` | - |
| title | 输入框标题 | `string` | - | - |
| width | 组件宽度 | `string \| number` | 自适应 | - |
| disabled | 是否禁用 | `boolean` | `false` | - |
| disabledDate | 禁用日期函数 | `(date: Date) => boolean` | - | - |
| placeholder | 占位符 | `string` | 根据mode自动设置 | - |
| shortcuts | 快捷选择配置 | `Array<{text: string, value: () => string \| string[]}>` | - | - |
| format | 自定义日期格式 | `string` | 根据mode自动设置 | - |


### Events

| 事件名 | 说明 | 回调参数 | 版本 |
|--------|------|----------|------|
| update:value | 值改变时触发 | `(value: string \| string[]) => void` | - |

### 默认格式

| 模式 | 默认格式 | 示例 | 快捷选择格式 |
|------|----------|------|-------------|
| date | `YYYY-MM-DD` | 2024-12-25 | 需返回 `YYYY-MM-DD` 格式 |
| month | `YYYY-MM` | 2024-12 | 需返回 `YYYY-MM` 格式 |
| datetime | `YYYY-MM-DD HH:mm:ss` | 2024-12-25 14:30:00 | 需返回 `YYYY-MM-DD HH:mm:ss` 格式 |
| range | `YYYY-MM-DD` | ["2024-12-01", "2024-12-31"] | 需返回 `[YYYY-MM-DD, YYYY-MM-DD]` 格式 |

## 样式定制

组件支持通过CSS变量进行样式定制：

```css
.odos-date-picker {
  /* 主色调 */
  --odos-primary-color: #2e6ce4;
  --odos-primary-hover: #1d5bd9;
  
  /* 背景色 */
  --odos-bg-color: #f2f3f5;
  --odos-bg-hover: #e5e6eb;
  --odos-bg-focus: #ffffff;
  
  /* 边框色 */
  --odos-border-color: #e5e6eb;
  --odos-border-focus: #2e6ce4;
  
  /* 文字颜色 */
  --odos-text-color: #1d2129;
  --odos-text-secondary: #4e5969;
  --odos-text-placeholder: #86909c;
  --odos-text-disabled: #c9cdd4;
  
  /* 阴影 */
  --odos-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.12);
  
  /* 快捷选择样式 */
  --odos-shortcut-bg: #f2f3f5;
  --odos-shortcut-bg-hover: #e8f3ff;
  --odos-shortcut-bg-active: #cce7ff;
  --odos-shortcut-text: #1d2129;
  --odos-shortcut-text-hover: #2e6ce4;
  --odos-shortcut-border-radius: 4px;
}
```

## 常见问题

### Q: 如何设置默认值？

A: 直接给 `v-model:value` 绑定的变量设置初始值：

```javascript
const date = ref('2024-12-25') // 设置默认日期
const range = ref(['2024-12-01', '2024-12-31']) // 设置默认区间
```

### Q: 如何禁用特定的日期？

A: 使用 `disabledDate` 函数：

```javascript
const disableSpecificDates = (date) => {
  const disabledDates = ['2024-12-25', '2024-01-01']
  const dateStr = date.toISOString().split('T')[0]
  return disabledDates.includes(dateStr)
}
```

### Q: 如何自定义时间格式？

A: 使用 `format` 属性：

```vue
<OdosDatePicker 
  v-model:value="datetime" 
  mode="datetime"
  format="YYYY年MM月DD日 HH时mm分"
/>
```

### Q: 区间选择如何限制最大天数？

A: 可以在选择完成后进行验证：

```javascript
const rangeValue = ref(['', ''])

watch(rangeValue, (newValue) => {
  if (newValue[0] && newValue[1]) {
    const start = dayjs(newValue[0])
    const end = dayjs(newValue[1])
    const diffDays = end.diff(start, 'day')
    
    if (diffDays > 30) {
      // 超过30天的处理逻辑
      console.warn('选择的日期范围不能超过30天')
    }
  }
})
```

### Q: 如何配置快捷选择？

A: 使用 `shortcuts` 属性配置快捷选择按钮：

```javascript
const shortcuts = [
  {
    text: '今天',
    value: () => dayjs().format('YYYY-MM-DD')
  },
  {
    text: '一周后',
    value: () => dayjs().add(1, 'week').format('YYYY-MM-DD')
  },
  {
    text: '一个月后',
    value: () => dayjs().add(1, 'month').format('YYYY-MM-DD')
  }
]
```

### Q: 区间选择如何配置快捷选择？

A: 区间选择的快捷选择需要返回数组格式：

```javascript
const rangeShortcuts = [
  {
    text: '近7天',
    value: () => [
      dayjs().subtract(6, 'day').format('YYYY-MM-DD'),
      dayjs().format('YYYY-MM-DD')
    ]
  },
  {
    text: '本月',
    value: () => [
      dayjs().startOf('month').format('YYYY-MM-DD'),
      dayjs().endOf('month').format('YYYY-MM-DD')
    ]
  }
]
```

### Q: 快捷选择如何适配不同的模式？

A: 确保 `value` 函数返回的格式与对应模式匹配：

```javascript
// 日期模式
const dateShortcuts = [
  { text: '今天', value: () => dayjs().format('YYYY-MM-DD') }
]

// 月份模式
const monthShortcuts = [
  { text: '本月', value: () => dayjs().format('YYYY-MM') }
]

// 日期时间模式
const datetimeShortcuts = [
  { text: '现在', value: () => dayjs().format('YYYY-MM-DD HH:mm:ss') }
]

// 区间模式
const rangeShortcuts = [
  { text: '近7天', value: () => [dayjs().subtract(6, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')] }
]
```

### Q: 快捷选择的日期计算是否是动态的？

A: 是的，`value` 函数会在每次点击时重新执行，因此可以实现动态日期计算：

```javascript
const shortcuts = [
  {
    text: '今天',
    value: () => dayjs().format('YYYY-MM-DD') // 每次点击都会计算当前日期
  },
  {
    text: '本月最后一天',
    value: () => dayjs().endOf('month').format('YYYY-MM-DD') // 动态计算月末
  }
]
```

### Q: 如何实现年月分离选择？

A: 在日期选择模式下，年份和月份是可以分别点击的：

- 点击年份可以打开年份选择面板，支持快速选择年份
- 点击月份可以打开月份选择面板，支持快速选择月份
- 两个面板互斥，只能同时打开一个
- 选择完成后自动关闭面板并更新日历显示

### Q: 如何隐藏年份选择面板的滚动条？

A: 组件已经自动处理了滚动条的隐藏，支持跨浏览器兼容：

- Webkit浏览器：通过 `::-webkit-scrollbar` 隐藏
- Firefox浏览器：通过 `scrollbar-width: none` 隐藏
- IE浏览器：通过 `-ms-overflow-style: none` 隐藏

滚动功能仍然可用，只是视觉上隐藏了滚动条。
