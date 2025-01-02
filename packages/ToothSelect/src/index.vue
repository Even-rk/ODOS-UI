<template>
  <div class="odos-tooth-posit">
    <div class="header">
      <div class="complete">
        <CheckBox v-model:value="toothVal">
          <CheckBoxItem value="全口" label="全口" />
        </CheckBox>
      </div>
      <div class="info">
        <Icon name="vector" color="#2e6ce4" />
        <span>单击选择单个牙位，框选可选择多个牙位</span>
      </div>
    </div>
    <Tooth v-model:value="toothVal" />
    <div class="footer" v-if="multipleToothList?.length">
      <div class="label">多生牙：</div>
      <div class="value">
        <CheckBox v-model:value="toothVal">
          <template v-for="ele in multipleToothList" :key="ele.value">
            <CheckBoxItem :value="ele.value" :label="ele.label" />
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
import { ref } from 'vue'
const { value, multipleToothList } = defineProps<{
  value: string[]
  multipleToothList: {
    label: string
    value: string
  }[]
}>()
const toothVal = ref(value || [])
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
