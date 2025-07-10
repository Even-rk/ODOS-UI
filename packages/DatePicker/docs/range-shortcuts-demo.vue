<template>
  <div class="demo-container">
    <h3>区间选择快捷选择示例</h3>
    
    <div class="demo-section">
      <h4>基础区间快捷选择</h4>
      <p>配置常用的日期区间快捷选择，提升用户体验：</p>
      <DatePicker
        v-model:value="basicRange"
        mode="range"
        :shortcuts="basicShortcuts"
        placeholder="请选择日期区间"
        width="400px"
      />
      <div class="result">
        <strong>选择结果：</strong>
        <span>{{ basicRange.length === 2 ? `${basicRange[0]} 至 ${basicRange[1]}` : '未选择' }}</span>
      </div>
    </div>

    <div class="demo-section">
      <h4>业务场景快捷选择</h4>
      <p>根据具体业务场景配置的快捷选择：</p>
      <DatePicker
        v-model:value="businessRange"
        mode="range"
        :shortcuts="businessShortcuts"
        placeholder="请选择统计周期"
        width="400px"
      />
      <div class="result">
        <strong>选择结果：</strong>
        <span>{{ businessRange.length === 2 ? `${businessRange[0]} 至 ${businessRange[1]}` : '未选择' }}</span>
      </div>
    </div>

    <div class="demo-section">
      <h4>相对日期快捷选择</h4>
      <p>基于当前日期的相对时间快捷选择：</p>
      <DatePicker
        v-model:value="relativeRange"
        mode="range"
        :shortcuts="relativeShortcuts"
        placeholder="请选择相对日期区间"
        width="400px"
      />
      <div class="result">
        <strong>选择结果：</strong>
        <span>{{ relativeRange.length === 2 ? `${relativeRange[0]} 至 ${relativeRange[1]}` : '未选择' }}</span>
      </div>
    </div>

    <div class="demo-section">
      <h4>固定周期快捷选择</h4>
      <p>按照固定周期（周、月、季度）配置的快捷选择：</p>
      <DatePicker
        v-model:value="periodicRange"
        mode="range"
        :shortcuts="periodicShortcuts"
        placeholder="请选择固定周期"
        width="400px"
      />
      <div class="result">
        <strong>选择结果：</strong>
        <span>{{ periodicRange.length === 2 ? `${periodicRange[0]} 至 ${periodicRange[1]}` : '未选择' }}</span>
      </div>
    </div>

    <div class="demo-section">
      <h4>自定义格式快捷选择</h4>
      <p>使用自定义格式的快捷选择：</p>
      <DatePicker
        v-model:value="customFormatRange"
        mode="range"
        :shortcuts="customFormatShortcuts"
        format="MM/DD/YYYY"
        placeholder="请选择日期区间"
        width="400px"
      />
      <div class="result">
        <strong>选择结果：</strong>
        <span>{{ customFormatRange.length === 2 ? `${customFormatRange[0]} 至 ${customFormatRange[1]}` : '未选择' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { DatePicker } from '../index'

// 基础区间快捷选择
const basicRange = ref([])
const basicShortcuts = [
  {
    text: '今天',
    value: () => {
      const today = dayjs().format('YYYY-MM-DD')
      return [today, today]
    }
  },
  {
    text: '昨天',
    value: () => {
      const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
      return [yesterday, yesterday]
    }
  },
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
    text: '近90天',
    value: () => [
      dayjs().subtract(89, 'day').format('YYYY-MM-DD'),
      dayjs().format('YYYY-MM-DD')
    ]
  }
]

// 业务场景快捷选择
const businessRange = ref([])
const businessShortcuts = [
  {
    text: '本周',
    value: () => [
      dayjs().startOf('week').format('YYYY-MM-DD'),
      dayjs().endOf('week').format('YYYY-MM-DD')
    ]
  },
  {
    text: '上周',
    value: () => [
      dayjs().subtract(1, 'week').startOf('week').format('YYYY-MM-DD'),
      dayjs().subtract(1, 'week').endOf('week').format('YYYY-MM-DD')
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
  },
  {
    text: '本季度',
    value: () => [
      dayjs().startOf('quarter').format('YYYY-MM-DD'),
      dayjs().endOf('quarter').format('YYYY-MM-DD')
    ]
  },
  {
    text: '上季度',
    value: () => [
      dayjs().subtract(1, 'quarter').startOf('quarter').format('YYYY-MM-DD'),
      dayjs().subtract(1, 'quarter').endOf('quarter').format('YYYY-MM-DD')
    ]
  }
]

// 相对日期快捷选择
const relativeRange = ref([])
const relativeShortcuts = [
  {
    text: '1周前',
    value: () => [
      dayjs().subtract(1, 'week').format('YYYY-MM-DD'),
      dayjs().format('YYYY-MM-DD')
    ]
  },
  {
    text: '2周前',
    value: () => [
      dayjs().subtract(2, 'week').format('YYYY-MM-DD'),
      dayjs().format('YYYY-MM-DD')
    ]
  },
  {
    text: '1个月前',
    value: () => [
      dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
      dayjs().format('YYYY-MM-DD')
    ]
  },
  {
    text: '3个月前',
    value: () => [
      dayjs().subtract(3, 'month').format('YYYY-MM-DD'),
      dayjs().format('YYYY-MM-DD')
    ]
  },
  {
    text: '半年前',
    value: () => [
      dayjs().subtract(6, 'month').format('YYYY-MM-DD'),
      dayjs().format('YYYY-MM-DD')
    ]
  },
  {
    text: '1年前',
    value: () => [
      dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
      dayjs().format('YYYY-MM-DD')
    ]
  }
]

// 固定周期快捷选择
const periodicRange = ref([])
const periodicShortcuts = [
  {
    text: '当前周',
    value: () => [
      dayjs().startOf('week').format('YYYY-MM-DD'),
      dayjs().endOf('week').format('YYYY-MM-DD')
    ]
  },
  {
    text: '前1周',
    value: () => [
      dayjs().subtract(1, 'week').startOf('week').format('YYYY-MM-DD'),
      dayjs().subtract(1, 'week').endOf('week').format('YYYY-MM-DD')
    ]
  },
  {
    text: '前2周',
    value: () => [
      dayjs().subtract(2, 'week').startOf('week').format('YYYY-MM-DD'),
      dayjs().subtract(2, 'week').endOf('week').format('YYYY-MM-DD')
    ]
  },
  {
    text: '当前月',
    value: () => [
      dayjs().startOf('month').format('YYYY-MM-DD'),
      dayjs().endOf('month').format('YYYY-MM-DD')
    ]
  },
  {
    text: '前1月',
    value: () => [
      dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
      dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
    ]
  },
  {
    text: '前2月',
    value: () => [
      dayjs().subtract(2, 'month').startOf('month').format('YYYY-MM-DD'),
      dayjs().subtract(2, 'month').endOf('month').format('YYYY-MM-DD')
    ]
  }
]

// 自定义格式快捷选择
const customFormatRange = ref([])
const customFormatShortcuts = [
  {
    text: '今天',
    value: () => {
      const today = dayjs().format('YYYY-MM-DD')
      return [today, today]
    }
  },
  {
    text: '本周',
    value: () => [
      dayjs().startOf('week').format('YYYY-MM-DD'),
      dayjs().endOf('week').format('YYYY-MM-DD')
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
    text: '近30天',
    value: () => [
      dayjs().subtract(29, 'day').format('YYYY-MM-DD'),
      dayjs().format('YYYY-MM-DD')
    ]
  }
]
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.demo-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e5e6eb;
  border-radius: 8px;
}

.demo-section h4 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #1d2129;
  font-size: 16px;
  font-weight: 500;
}

.demo-section p {
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
</style> 