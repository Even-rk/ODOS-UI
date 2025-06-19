<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <!-- 禁用周末 -->
    <div>
      <h4 style="margin-bottom: 10px;">禁用周末</h4>
      <OdosDatePicker 
        v-model:value="workday" 
        title="工作日"
        :disabled-date="disableWeekends"
      />
    </div>
    
    <!-- 禁用过去的日期 -->
    <div>
      <h4 style="margin-bottom: 10px;">禁用过去的日期</h4>
      <OdosDatePicker 
        v-model:value="futureDate" 
        title="未来日期"
        :disabled-date="disablePastDates"
      />
    </div>
    
    <!-- 禁用特定日期 -->
    <div>
      <h4 style="margin-bottom: 10px;">禁用特定日期（圣诞节和元旦）</h4>
      <OdosDatePicker 
        v-model:value="customDate" 
        title="自定义禁用"
        :disabled-date="disableSpecificDates"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const workday = ref('')
const futureDate = ref('')
const customDate = ref('')

// 禁用周末
const disableWeekends = (date) => {
  const day = date.getDay()
  return day === 0 || day === 6 // 周日和周六
}

// 禁用过去的日期
const disablePastDates = (date) => {
  const newDate = new Date()
  newDate.setHours(0, 0, 0, 0)
  return date < newDate
}

// 禁用特定日期
const disableSpecificDates = (date) => {
  const disabledDates = ['2024-12-25', '2024-01-01']
  const dateStr = date.toISOString().split('T')[0]
  return disabledDates.includes(dateStr)
}
</script> 