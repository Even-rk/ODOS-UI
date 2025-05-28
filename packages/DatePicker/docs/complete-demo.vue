<template>
  <div class="date-picker-demo">
    <h2>DatePicker 功能演示</h2>

    <!-- 基础日期选择 -->
    <div class="demo-item">
      <h3>基础日期选择</h3>
      <OdosDatePicker v-model:value="basicDate" title="日期" />
    </div>

    <!-- 月份选择 -->
    <div class="demo-item">
      <h3>月份选择</h3>
      <OdosDatePicker v-model:value="monthValue" mode="month" title="月份" />
    </div>

    <!-- 日期时间选择 -->
    <div class="demo-item">
      <h3>日期时间选择</h3>
      <OdosDatePicker v-model:value="datetimeValue" mode="datetime" title="日期时间" />
    </div>

    <!-- 日期区间选择 -->
    <div class="demo-item">
      <h3>日期区间选择</h3>
      <OdosDatePicker v-model:value="rangeValue" mode="range" title="日期区间" />
    </div>

    <!-- 禁用日期 -->
    <div class="demo-item">
      <h3>禁用日期（禁用周末）</h3>
      <OdosDatePicker v-model:value="workdayValue" title="工作日" :disabled-date="disableWeekends" />
    </div>

    <!-- 自定义格式 -->
    <div class="demo-item">
      <h3>自定义格式</h3>
      <OdosDatePicker v-model:value="customFormatValue" title="美式格式" format="MM/DD/YYYY" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 响应式数据
const basicDate = ref('')
const monthValue = ref('')
const datetimeValue = ref('')
const rangeValue = ref(['', ''])
const workdayValue = ref('')
const customFormatValue = ref('')

// 禁用周末的函数
const disableWeekends = (date) => {
  const day = date.getDay()
  return day === 0 || day === 6 // 禁用周日(0)和周六(6)
}
</script>

<style scoped>
.date-picker-demo {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.demo-item {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e5e6eb;
  border-radius: 8px;
  background: #fff;
}

.demo-item h3 {
  margin-bottom: 15px;
  color: #4e5969;
}
</style>
