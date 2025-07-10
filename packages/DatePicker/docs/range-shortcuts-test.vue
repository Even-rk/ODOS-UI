<template>
  <div class="test-container">
    <h3>区间选择快捷选项测试</h3>
    
    <div class="test-section">
      <h4>基础测试</h4>
      <p>测试快捷选项是否正确显示和工作：</p>
      <DatePicker
        v-model:value="testRange"
        mode="range"
        :shortcuts="testShortcuts"
        placeholder="请选择日期区间"
        width="500px"
      />
      <div class="result">
        <strong>选择结果：</strong>
        <span>{{ testRange.length === 2 ? `${testRange[0]} 至 ${testRange[1]}` : '未选择' }}</span>
      </div>
      <div class="debug-info">
        <strong>调试信息：</strong>
        <pre>{{ JSON.stringify(testRange, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { DatePicker } from '../index'

// 测试区间快捷选择
const testRange = ref([])
const testShortcuts = [
  {
    text: '今天',
    value: () => {
      const today = dayjs().format('YYYY-MM-DD')
      console.log('今天快捷选项被点击，返回:', [today, today])
      return [today, today]
    }
  },
  {
    text: '近7天',
    value: () => {
      const result = [
        dayjs().subtract(6, 'day').format('YYYY-MM-DD'),
        dayjs().format('YYYY-MM-DD')
      ]
      console.log('近7天快捷选项被点击，返回:', result)
      return result
    }
  },
  {
    text: '本月',
    value: () => {
      const result = [
        dayjs().startOf('month').format('YYYY-MM-DD'),
        dayjs().endOf('month').format('YYYY-MM-DD')
      ]
      console.log('本月快捷选项被点击，返回:', result)
      return result
    }
  }
]

// 监听 testRange 的变化
console.log('初始化 testRange:', testRange.value)
</script>

<style scoped>
.test-container {
  padding: 20px;
}

.test-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e5e6eb;
  border-radius: 8px;
}

.test-section h4 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #1d2129;
  font-size: 16px;
  font-weight: 500;
}

.test-section p {
  margin-bottom: 15px;
  color: #4e5969;
  font-size: 14px;
  line-height: 1.5;
}

.result {
  margin-top: 15px;
  padding: 12px;
  background-color: #f7f8fa;
  border-radius: 4px;
  font-size: 14px;
  color: #1d2129;
}

.result strong {
  color: #2e6ce4;
}

.debug-info {
  margin-top: 15px;
  padding: 12px;
  background-color: #f0f0f0;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
}

.debug-info pre {
  margin: 0;
  white-space: pre-wrap;
}
</style> 