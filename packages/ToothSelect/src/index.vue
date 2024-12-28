<template>
  <div class="odos-tooth-posit">
    <div class="header">
      <div class="complete">
        <Radio v-model:value="toothVal">
          <RadioItem value="全口" label="全口" />
        </Radio>
      </div>
      <div class="info">
        <Icon name="vector" color="#2e6ce4" />
        <span>单击选择单个牙位，框选可选择多个牙位</span>
      </div>
    </div>
    <Tooth />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Icon from '../../Icon/src/index.vue'
// 全口
import Radio from '../../Radio/src/index.vue'
import RadioItem from '../../Radio/src/item.vue'
// 象限牙位
import Tooth from './tooth.vue'

const toothVal = ref()
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
      :deep .odos-radio-item {
        border-radius: 6px;
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
}
</style>
