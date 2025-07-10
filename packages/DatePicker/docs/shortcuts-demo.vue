<template>
  <div class="shortcuts-demo">
    <div class="demo-item">
      <h4>基础日期快捷选择</h4>
      <DatePicker
        v-model:value="basicDate"
        :shortcuts="basicShortcuts"
        mode="date"
        placeholder="请选择日期"
        title="快捷选择"
      />
      <p class="result">选中的日期：{{ basicDate }}</p>
    </div>

    <div class="demo-item">
      <h4>月份快捷选择</h4>
      <DatePicker
        v-model:value="monthDate"
        :shortcuts="monthShortcuts"
        mode="month"
        placeholder="请选择月份"
        title="月份快捷"
      />
      <p class="result">选中的月份：{{ monthDate }}</p>
    </div>

    <div class="demo-item">
      <h4>日期时间快捷选择</h4>
      <DatePicker
        v-model:value="dateTimeValue"
        :shortcuts="dateTimeShortcuts"
        mode="datetime"
        placeholder="请选择日期时间"
        title="时间快捷"
      />
      <p class="result">选中的日期时间：{{ dateTimeValue }}</p>
    </div>

    <div class="demo-item">
      <h4>业务场景快捷选择</h4>
      <DatePicker
        v-model:value="businessDate"
        :shortcuts="businessShortcuts"
        mode="date"
        placeholder="请选择日期"
        title="业务场景"
      />
      <p class="result">选中的日期：{{ businessDate }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import DatePicker from '../src/index.vue'

// 基础日期选择
const basicDate = ref('')
const basicShortcuts = [
  {
    text: '今天',
    value: () => dayjs().format('YYYY-MM-DD')
  },
  {
    text: '明天',
    value: () => dayjs().add(1, 'day').format('YYYY-MM-DD')
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
  },
  {
    text: '半年后',
    value: () => dayjs().add(6, 'month').format('YYYY-MM-DD')
  },
  {
    text: '一年后',
    value: () => dayjs().add(1, 'year').format('YYYY-MM-DD')
  }
]

// 月份选择
const monthDate = ref('')
const monthShortcuts = [
  {
    text: '本月',
    value: () => dayjs().format('YYYY-MM')
  },
  {
    text: '下月',
    value: () => dayjs().add(1, 'month').format('YYYY-MM')
  },
  {
    text: '3个月后',
    value: () => dayjs().add(3, 'month').format('YYYY-MM')
  },
  {
    text: '6个月后',
    value: () => dayjs().add(6, 'month').format('YYYY-MM')
  },
  {
    text: '一年后',
    value: () => dayjs().add(1, 'year').format('YYYY-MM')
  }
]

// 日期时间选择
const dateTimeValue = ref('')
const dateTimeShortcuts = [
  {
    text: '现在',
    value: () => dayjs().format('YYYY-MM-DD HH:mm:ss')
  },
  {
    text: '明天此时',
    value: () => dayjs().add(1, 'day').format('YYYY-MM-DD HH:mm:ss')
  },
  {
    text: '一周后',
    value: () => dayjs().add(1, 'week').format('YYYY-MM-DD HH:mm:ss')
  },
  {
    text: '一个月后',
    value: () => dayjs().add(1, 'month').format('YYYY-MM-DD HH:mm:ss')
  }
]

// 业务场景快捷键
const businessDate = ref('')
const businessShortcuts = [
  {
    text: '项目开始',
    value: () => dayjs().add(1, 'week').format('YYYY-MM-DD')
  },
  {
    text: '第一阶段',
    value: () => dayjs().add(1, 'month').format('YYYY-MM-DD')
  },
  {
    text: '第二阶段',
    value: () => dayjs().add(2, 'month').format('YYYY-MM-DD')
  },
  {
    text: '第三阶段',
    value: () => dayjs().add(3, 'month').format('YYYY-MM-DD')
  },
  {
    text: '项目结束',
    value: () => dayjs().add(6, 'month').format('YYYY-MM-DD')
  }
]
</script>

<style scoped>
.shortcuts-demo {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.demo-item {
  padding: 16px;
  border: 1px solid #e5e6eb;
  border-radius: 8px;
  background: #fff;
}

.demo-item h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #1d2129;
}

.result {
  margin-top: 12px;
  padding: 8px 12px;
  background: #f2f3f5;
  border-radius: 4px;
  font-size: 12px;
  font-family: 'Consolas', 'Monaco', monospace;
  color: #2e6ce4;
}
</style> 