<template>
  <div class="tooth" @mousedown="onmousedown">
    <!-- 第一，第五，象限 -->
    <div class="quadrant" style="align-items: end">
      <!-- 恒牙列 -->
      <CheckBox v-model:value="toothVal" @change="toothValChange">
        <template v-for="item in reversePermanentTeeth" :key="item">
          <CheckBoxItem :disabled="disabled" :id="'1' + item" :value="'1' + item" :label="item" />
        </template>
      </CheckBox>
      <!-- 乳牙列 -->
      <CheckBox v-model:value="toothVal" @change="toothValChange">
        <template v-for="item in reverseDeciduousTeeth" :key="item.value">
          <CheckBoxItem
            :disabled="disabled"
            :id="'5' + item.value"
            :value="'5' + item.value"
            :label="item.label"
          />
        </template>
      </CheckBox>
    </div>
    <!-- 第二，第六，象限 -->
    <div class="quadrant">
      <!-- 恒牙列 -->
      <CheckBox v-model:value="toothVal" @change="toothValChange">
        <template v-for="item in permanentTeeth" :key="item">
          <CheckBoxItem :disabled="disabled" :id="'2' + item" :value="'2' + item" :label="item" />
        </template>
      </CheckBox>
      <!-- 乳牙列 -->
      <CheckBox v-model:value="toothVal" @change="toothValChange">
        <template v-for="item in deciduousTeeth" :key="item.value">
          <CheckBoxItem
            :disabled="disabled"
            :id="'6' + item.value"
            :value="'6' + item.value"
            :label="item.label"
          />
        </template>
      </CheckBox>
    </div>
    <!-- 第四，第八，象限 -->
    <div class="quadrant" style="justify-content: end; align-items: end">
      <!-- 乳牙列 -->
      <CheckBox v-model:value="toothVal" @change="toothValChange">
        <template v-for="item in reverseDeciduousTeeth" :key="item.value">
          <CheckBoxItem
            :disabled="disabled"
            :id="'8' + item.value"
            :value="'8' + item.value"
            :label="item.label"
          />
        </template>
      </CheckBox>
      <!-- 恒牙列 -->
      <CheckBox v-model:value="toothVal" @change="toothValChange">
        <template v-for="item in reversePermanentTeeth" :key="item">
          <CheckBoxItem :disabled="disabled" :id="'4' + item" :value="'4' + item" :label="item" />
        </template>
      </CheckBox>
    </div>
    <!-- 第三，第七，象限 -->
    <div class="quadrant" style="justify-content: end">
      <!-- 乳牙列 -->
      <CheckBox v-model:value="toothVal" @change="toothValChange">
        <template v-for="item in deciduousTeeth" :key="item.value">
          <CheckBoxItem
            :disabled="disabled"
            :id="'7' + item.value"
            :value="'7' + item.value"
            :label="item.label"
          />
        </template>
      </CheckBox>
      <!-- 恒牙列 -->
      <CheckBox v-model:value="toothVal" @change="toothValChange">
        <template v-for="item in permanentTeeth" :key="item">
          <CheckBoxItem :disabled="disabled" :id="'3' + item" :value="'3' + item" :label="item" />
        </template>
      </CheckBox>
    </div>
    <!-- 滑动控制覆层 -->
    <template v-if="isBoxSelect">
      <div class="module">
        <div class="rectangle" :style="regionConfig" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
// 多选
import CheckBox from '../../CheckBox/src/index.vue'
import CheckBoxItem from '../../CheckBox/src/item.vue'

// 默认数据
const props = defineProps<{
  value: string[]
  disabled: boolean
}>()
const toothVal = ref(props.value || [])
const emit = defineEmits<{
  (e: 'update:value' | 'change', data: string[]): void
}>()
// 乳牙
const deciduousTeeth = [
  {
    label: 'A',
    value: '1'
  },
  {
    label: 'B',
    value: '2'
  },
  {
    label: 'C',
    value: '3'
  },
  {
    label: 'D',
    value: '4'
  },
  {
    label: 'E',
    value: '5'
  }
]
const reverseDeciduousTeeth = JSON.parse(JSON.stringify(deciduousTeeth)).reverse()
// 恒牙
const permanentTeeth = ['1', '2', '3', '4', '5', '6', '7', '8']
const reversePermanentTeeth = JSON.parse(JSON.stringify(permanentTeeth)).reverse()
// 是否开启框选
const isBoxSelect = ref(false)
const regionConfig = ref({
  top: '0px',
  left: '0px',
  width: '0px',
  height: '0px'
})
// 鼠标按下坐标
const officeStart = ref({
  x: 0,
  y: 0
})
// 鼠标移动坐标
const officeEnd = ref({
  x: 0,
  y: 0
})
// 框选元素判断 选中/删除
const isElementInRegion = (elementList: Element[], e?: MouseEvent) => {
  e?.stopPropagation
  // 判断框选区域选中的元素
  const children = Array.from(document.querySelectorAll('.odos-check_box-item-content'))
  elementList.forEach((item, index) => {
    const target = children[index]
    const itemRect = target.getBoundingClientRect()
    const regionRect = document.querySelector('.module .rectangle')?.getBoundingClientRect()
    if (regionRect) {
      // 只要元素有在框选区域内，就认为元素在框选区域内
      const leftRegion = itemRect.left >= regionRect.left
      const rightRegion = itemRect.right <= regionRect.right
      const topRegion = itemRect.top >= regionRect.top
      const bottomRegion = itemRect.bottom <= regionRect.bottom
      if (e?.shiftKey) {
        if (item.classList.contains('odos-check-box-item') && toothVal.value.includes(children[index].id)) {
          if (leftRegion && rightRegion && topRegion && bottomRegion) {
            // 删除选中的元素
            item.classList.remove('active')
            item.classList.add('error')
          } else {
            // 不删除选中的元素
            item.classList.remove('error')
            item.classList.add('active')
          }
        }
      } else {
        if (item.classList.contains('odos-check-box-item') && !toothVal.value.includes(children[index].id)) {
          if (leftRegion && rightRegion && topRegion && bottomRegion) {
            // 选中的元素
            item.classList.add('active')
          } else {
            // 删除选中的元素
            item.classList.remove('active')
          }
        }
      }
    }
  })
}
// 鼠标移动事件
const onMousemove = (e: MouseEvent) => {
  e.stopPropagation()
  if (!isBoxSelect.value) return false
  officeEnd.value = {
    x: e.pageX,
    y: e.pageY
  }
  const x = e.pageX - officeStart.value.x
  const y = e.pageY - officeStart.value.y
  regionConfig.value.width = Math.abs(x) + 'px'
  regionConfig.value.height = Math.abs(y) + 'px'

  if (x < 0) {
    regionConfig.value.left = e.pageX + 'px'
  }

  if (y < 0) {
    regionConfig.value.top = e.pageY + 'px'
  }

  // 判断框选区域包含的元素
  const elementList = Array.from(document.querySelectorAll('.odos-check-box-item'))
  // 拖拽时，是否有按住shift键
  isElementInRegion(elementList, e)
}
// 鼠标框选结束函数
const onMouseup = () => {
  const elementList = Array.from(document.querySelectorAll('.odos-check_box-item-content'))
  const filterList = elementList.filter((item) => {
    return item.parentElement?.classList.contains('active')
  })
  toothVal.value = filterList.map((item) => item.id)
  emit('update:value', toothVal.value)
  emit('change', toothVal.value)
  isBoxSelect.value = false
  officeStart.value = {
    x: 0,
    y: 0
  }
  officeEnd.value = {
    x: 0,
    y: 0
  }
  regionConfig.value = {
    top: '0px',
    left: '0px',
    width: '0px',
    height: '0px'
  }
}
// 鼠标框选函数
const selectRegion = (e: MouseEvent) => {
  officeStart.value = {
    x: e.pageX,
    y: e.pageY
  }
  regionConfig.value.top = e.pageY + 'px'
  regionConfig.value.left = e.pageX + 'px'
  // 鼠标移动事件
  isBoxSelect.value = true
  // 定义鼠标移动事件处理函数
  function handleMousemove(e: MouseEvent) {
    // 调用 onMousemove 函数处理鼠标移动事件
    onMousemove(e)
  }

  // 定义鼠标抬起事件处理函数
  function handleMouseup() {
    // 调用 onMouseup 函数处理鼠标抬起事件
    onMouseup()

    // 清除鼠标移动和鼠标抬起的事件监听器，防止内存泄漏和不必要的事件触发
    document.removeEventListener('mousemove', handleMousemove)
    document.removeEventListener('mouseup', handleMouseup)
  }

  // 添加鼠标移动事件监听器，当鼠标在文档中移动时触发 handleMousemove 函数
  document.addEventListener('mousemove', handleMousemove)

  // 添加鼠标抬起事件监听器，当鼠标在文档中抬起时触发 handleMouseup 函数
  document.addEventListener('mouseup', handleMouseup)
}
// 鼠标按下事件
const onmousedown = (e: MouseEvent) => {
  if (props.disabled) return
  const target = e.target as HTMLElement
  if (!target.classList.contains('odos-check-box-item')) {
    selectRegion(e)
  }
}

const toothValChange = () => {
  emit('update:value', toothVal.value)
  emit('change', toothVal.value)
}

// 监听value
const watchValue = (newValue: string[]) => (toothVal.value = newValue)
watch(() => props.value, watchValue, { deep: true })
</script>

<style scoped lang="scss">
.tooth {
  user-select: none;
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;
  width: 489px;
  height: 162px;
  border-radius: 8px;
  padding: 12px;
  background: #f7f8fa;
  position: relative;
  .quadrant {
    width: 232px;
    height: 50%;
    display: flex;
    flex-direction: column;
    &:nth-child(1) {
      padding-right: 8px;
      border-right: 0.5px solid #c9cdd4;
      border-bottom: 0.5px solid #c9cdd4;
    }
    &:nth-child(2) {
      padding-left: 8px;
      border-left: 0.5px solid #c9cdd4;
      border-bottom: 0.5px solid #c9cdd4;
    }
    &:nth-child(3) {
      padding-right: 8px;
      border-right: 0.5px solid #c9cdd4;
      border-top: 0.5px solid #c9cdd4;
    }
    &:nth-child(4) {
      padding-left: 8px;
      border-left: 0.5px solid #c9cdd4;
      border-top: 0.5px solid #c9cdd4;
    }
  }
  &::after {
    font-size: 10px;
    position: absolute;
    content: '左';
    padding: 0 10px;
    top: 50%;
    left: 25%;
    transform: translate(-50%, -50%);
    display: block;
    color: #4e5969;
    background-color: #f7f8fa;
  }
  &::before {
    font-size: 10px;
    position: absolute;
    content: '右';
    padding: 0 10px;
    top: 50%;
    right: 25%;
    transform: translate(50%, -50%);
    display: block;
    color: #4e5969;
    background-color: #f7f8fa;
  }
  :deep .odos-check-box {
    .odos-check-box-item {
      position: relative;
      width: 24px;
      height: 24px;
      border-radius: 4px;
      display: flex;
      padding: 0;
      margin: 2px;
      justify-content: center;
      align-items: center;
      background: #ffffff;
      border: 0.5px solid #c9cdd4;
      &:hover {
        background: #f2f3f5;
      }
      &.active {
        background: #2e6ce4;
        color: #ffffff;
      }
      &.disabled {
        background: none;
        color: #c9cdd4;
      }
      &.error {
        background: #ff4d4f;
        color: #fff;
      }
      // 框选区域
      .odos-check_box-item-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .module {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1;
    .rectangle {
      position: absolute;
      background-color: #2e6ce410;
      border: 1px dashed #2e6ce4;
    }
  }
}
</style>
