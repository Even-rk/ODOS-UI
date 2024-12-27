<template>
  <div class="tooth">
    <!-- 第一，第五，象限 -->
    <div class="quadrant" style="align-items: end">
      <!-- 恒牙列 -->
      <CheckBox v-model:value="toothVal">
        <template v-for="item in reversePermanentTeeth" :key="item">
          <CheckBoxItem :value="'1' + item" :label="item" />
        </template>
      </CheckBox>
      <!-- 乳牙列 -->
      <CheckBox v-model:value="toothVal">
        <template v-for="item in reverseDeciduousTeeth" :key="item">
          <CheckBoxItem :value="'5' + item.value" :label="item.label" />
        </template>
      </CheckBox>
    </div>
    <!-- 第二，第六，象限 -->
    <div class="quadrant">
      <!-- 恒牙列 -->
      <CheckBox v-model:value="toothVal">
        <template v-for="item in permanentTeeth" :key="item">
          <CheckBoxItem :value="'2' + item" :label="item" />
        </template>
      </CheckBox>
      <!-- 乳牙列 -->
      <CheckBox v-model:value="toothVal">
        <template v-for="item in deciduousTeeth" :key="item">
          <CheckBoxItem :value="'6' + item.value" :label="item.label" />
        </template>
      </CheckBox>
    </div>
    <!-- 第四，第八，象限 -->
    <div class="quadrant" style="justify-content: end; align-items: end">
      <!-- 乳牙列 -->
      <CheckBox v-model:value="toothVal">
        <template v-for="item in reverseDeciduousTeeth" :key="item">
          <CheckBoxItem :value="'8' + item.value" :label="item.label" />
        </template>
      </CheckBox>
      <!-- 恒牙列 -->
      <CheckBox v-model:value="toothVal">
        <template v-for="item in reversePermanentTeeth" :key="item">
          <CheckBoxItem :value="'4' + item" :label="item" />
        </template>
      </CheckBox>
    </div>
    <!-- 第三，第七，象限 -->
    <div class="quadrant" style="justify-content: end">
      <!-- 乳牙列 -->
      <CheckBox v-model:value="toothVal">
        <template v-for="item in deciduousTeeth" :key="item">
          <CheckBoxItem :value="'7' + item.value" :label="item.label" />
        </template>
      </CheckBox>
      <!-- 恒牙列 -->
      <CheckBox v-model:value="toothVal">
        <template v-for="item in permanentTeeth" :key="item">
          <CheckBoxItem :value="'3' + item" :label="item" />
        </template>
      </CheckBox>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 多选
import CheckBox from '../../CheckBox/src/index.vue'
import CheckBoxItem from '../../CheckBox/src/item.vue'

const toothVal = ref()
// 象限
const quadrant = ['1', '2', '3', '4', '5', '6', '7', '8']
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
</script>

<style scoped lang="scss">
.tooth {
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
      &.active {
        background: #e7efff;
      }
    }
  }
}
</style>
