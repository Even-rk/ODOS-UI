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
</script>

# DatePicker 日期选择器

一个功能强大的日期选择组件，支持多种选择模式：日期选择、月份选择、日期时间选择和日期区间选择。

## 功能特性

- 🗓️ **多种模式**：支持日期、月份、日期时间、日期区间四种选择模式
- ⏰ **时间选择**：精确到时、分、秒的时间选择
- 🚫 **禁用日期**：灵活的日期禁用规则
- 🎨 **自定义格式**：支持自定义日期显示格式
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
| format | 显示格式 | `string` | 根据mode自动设置 | - |
| placeholder | 占位符 | `string` | 根据mode自动设置 | - |


### Events

| 事件名 | 说明 | 回调参数 | 版本 |
|--------|------|----------|------|
| update:value | 值改变时触发 | `(value: string \| string[]) => void` | - |

### 默认格式

| 模式 | 默认格式 | 示例 |
|------|----------|------|
| date | `YYYY-MM-DD` | 2024-12-25 |
| month | `YYYY-MM` | 2024-12 |
| datetime | `YYYY-MM-DD HH:mm:ss` | 2024-12-25 14:30:00 |
| range | `YYYY-MM-DD` | ["2024-12-01", "2024-12-31"] |

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
}
```

## 使用示例

### 完整示例

<Preview comp-name="DatePicker" demo-name="complete-demo">
  <CompleteDemo />
</Preview>

## 注意事项

1. **日期区间模式**：返回值为数组格式 `[startDate, endDate]`，确保在使用时正确处理数组类型
2. **禁用日期函数**：接收 `Date` 对象作为参数，返回 `boolean` 值，`true` 表示禁用该日期
3. **时间选择器**：在 `datetime` 模式下，支持时、分、秒的精确选择
4. **格式化规则**：自定义格式请参考 [dayjs 格式化文档](https://dayjs.gitee.io/docs/zh-CN/display/format)
5. **响应式设计**：组件会根据不同模式自动调整宽度，也可通过 `width` 属性手动设置
6. **事件处理**：组件使用 `v-model` 双向绑定，值变化时会自动触发 `update:value` 事件

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
