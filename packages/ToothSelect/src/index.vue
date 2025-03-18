<template>
  <div class="odos-tooth-posit">
    <div class="header">
      <div class="complete">
        <CheckBox v-model:value="toothVal" @change="toothValChange" mutex mutexOptionValue="All">
          <CheckBoxItem :disabled="props.rangeLimit === 'tooth'" id="-1" value="-1" label="全口" />
        </CheckBox>
      </div>
      <div class="info">
        <Icon name="vector" color="#2e6ce4" />
        <span>单击选择单个牙位，框选可选择多个牙位</span>
      </div>
    </div>
    <Tooth
      :name="props.name"
      v-model:value="toothVal"
      :rangeLimit="props.rangeLimit"
      :disabled="props.rangeLimit === 'fullMouth' || props.rangeLimit === 'bitewing'"
      @change="toothValChange"
    />
    <div class="footer" v-if="props.multipleToothList && props.multipleToothList?.length">
      <div class="label">多生牙：</div>
      <div class="value">
        <CheckBox v-model:value="toothVal" @change="toothValChange" mutex :mutexOptionValue="['-1']">
          <template v-for="ele in props.multipleToothList" :key="ele.value">
            <CheckBoxItem
              :disabled="props.rangeLimit === 'fullMouth'"
              :id="ele.value"
              :value="ele.value"
              :label="ele.label"
            />
          </template>
        </CheckBox>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '../../Icon/src/index.vue'
// 全口
import CheckBox from '../../CheckBox/src/index.vue'
import CheckBoxItem from '../../CheckBox/src/item.vue'
// 象限牙位
import Tooth from './tooth.vue'
import { nextTick, onUnmounted, ref, watch } from 'vue'
const props = defineProps<{
  value: string[]
  multipleToothList?: {
    label: string
    value: string
  }[]
  name?: string
  rangeLimit?: 'fullMouth' | 'tooth' | 'bitewing' | string
}>()

const toothVal = ref(props.value)

watch(
  () => props.value,
  (val) => {
    console.log(val)
    toothVal.value = val
  },
  { deep: true }
)

const emit = defineEmits<{
  (e: 'update:value', data: string[]): void
  (e: 'change', data: string[]): void
}>()
// 定义一个处理牙齿值变化的函数
const toothValChange = () => {
  // 使用nextTick确保在DOM更新之后再执行后续代码
  nextTick(() => {
    // 检查牙齿值数组是否为空
    if (toothVal.value.length > 0) {
      // 如果数组最后一个元素是'-1'，则将数组设置为只包含'-1'
      if (toothVal.value[toothVal.value.length - 1] == '-1') {
        // 触发更新事件和变化事件
        toothVal.value = ['-1']
        emit('update:value', toothVal.value)
        emit('change', toothVal.value)
      } else {
        // 如果数组中包含'-1'但不是最后一个元素，则移除所有'-1'
        toothVal.value = toothVal.value.filter((i) => i != '-1')
        // 触发更新事件和变化事件
        emit('update:value', toothVal.value)
        emit('change', toothVal.value)
      }
    } else {
      toothVal.value = []
      // 如果数组为空，触发更新事件和变化事件
      emit('update:value', [])
      emit('change', [])
    }
  })
}

// 卸载阶段
onUnmounted(() => {
  toothVal.value = []
})
</script>

<style scoped lang="scss">
.odos-tooth-posit {
  width: 489px;
  height: auto;

  * {
    box-sizing: border-box;
  }

  .header {
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .complete {
      :deep .odos-check-box-item {
        background: #ffffff;
        border: 0.5px solid #c9cdd4;
        border-radius: 6px;

        &.active {
          background: #2e6ce4;
          color: #ffffff;
        }
      }
    }

    .info {
      display: flex;
      align-items: center;

      span {
        margin-left: 4px;
        color: #2e6ce4;
        font-size: 14px;
      }
    }
  }

  .footer {
    display: flex;
    align-items: center;
    margin-top: 14px;

    .label {
      font-size: 14px;
      color: #4e5969;
    }

    :deep .odos-check-box {
      .odos-check-box-item {
        border-radius: 4px;
        display: flex;
        height: 24px;
        padding: 0 8px;
        margin: 2px;
        justify-content: center;
        align-items: center;
        background: #ffffff;
        border: 0.5px solid #c9cdd4;

        &.active {
          background: #2e6ce4;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
