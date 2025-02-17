<template>
  <div class="tooth-chart">
    <div class="table">
      <div class="all" v-if="toothList.includes('-1')">全口</div>
      <div class="one-two">
        <!-- 第一象限 -->
        <div class="one">
          <div>
            <span v-if="data.oneList.includes('1')">{{ '1' }}</span>
            <span v-if="data.oneList.includes('2')">{{ '2' }}</span>
            <span v-if="data.oneList.includes('3')">{{ '3' }}</span>
            <span v-if="data.oneList.includes('4')">{{ '4' }}</span>
            <span v-if="data.oneList.includes('5')">{{ '5' }}</span>
            <span v-if="data.oneList.includes('6')">{{ '6' }}</span>
            <span v-if="data.oneList.includes('7')">{{ '7' }}</span>
            <span v-if="data.oneList.includes('8')">{{ '8' }}</span>
          </div>
          <div>
            <span v-if="data.oneList.includes('A')">{{ 'A' }}</span>
            <span v-if="data.oneList.includes('B')">{{ 'B' }}</span>
            <span v-if="data.oneList.includes('C')">{{ 'C' }}</span>
            <span v-if="data.oneList.includes('D')">{{ 'D' }}</span>
            <span v-if="data.oneList.includes('E')">{{ 'E' }}</span>
          </div>
        </div>
        <!-- 第二象限 -->
        <div class="two">
          <div>
            <span v-if="data.twoList.includes('1')">{{ '1' }}</span>
            <span v-if="data.twoList.includes('2')">{{ '2' }}</span>
            <span v-if="data.twoList.includes('3')">{{ '3' }}</span>
            <span v-if="data.twoList.includes('4')">{{ '4' }}</span>
            <span v-if="data.twoList.includes('5')">{{ '5' }}</span>
            <span v-if="data.twoList.includes('6')">{{ '6' }}</span>
            <span v-if="data.twoList.includes('7')">{{ '7' }}</span>
            <span v-if="data.twoList.includes('8')">{{ '8' }}</span>
          </div>
          <div>
            <span v-if="data.twoList.includes('A')">{{ 'A' }}</span>
            <span v-if="data.twoList.includes('B')">{{ 'B' }}</span>
            <span v-if="data.twoList.includes('C')">{{ 'C' }}</span>
            <span v-if="data.twoList.includes('D')">{{ 'D' }}</span>
            <span v-if="data.twoList.includes('E')">{{ 'E' }}</span>
          </div>
        </div>
      </div>
      <div class="three-four">
        <!-- 第四象限 -->
        <div class="four">
          <div>
            <span v-if="data.fourList.includes('A')">{{ 'A' }}</span>
            <span v-if="data.fourList.includes('B')">{{ 'B' }}</span>
            <span v-if="data.fourList.includes('C')">{{ 'C' }}</span>
            <span v-if="data.fourList.includes('D')">{{ 'D' }}</span>
            <span v-if="data.fourList.includes('E')">{{ 'E' }}</span>
          </div>
          <div>
            <span v-if="data.fourList.includes('1')">{{ '1' }}</span>
            <span v-if="data.fourList.includes('2')">{{ '2' }}</span>
            <span v-if="data.fourList.includes('3')">{{ '3' }}</span>
            <span v-if="data.fourList.includes('4')">{{ '4' }}</span>
            <span v-if="data.fourList.includes('5')">{{ '5' }}</span>
            <span v-if="data.fourList.includes('6')">{{ '6' }}</span>
            <span v-if="data.fourList.includes('7')">{{ '7' }}</span>
            <span v-if="data.fourList.includes('8')">{{ '8' }}</span>
          </div>
        </div>
        <!-- 第三象限 -->
        <div class="three">
          <div>
            <span v-if="data.threeList.includes('A')">{{ 'A' }}</span>
            <span v-if="data.threeList.includes('B')">{{ 'B' }}</span>
            <span v-if="data.threeList.includes('C')">{{ 'C' }}</span>
            <span v-if="data.threeList.includes('D')">{{ 'D' }}</span>
            <span v-if="data.threeList.includes('E')">{{ 'E' }}</span>
          </div>
          <div>
            <span v-if="data.threeList.includes('1')">{{ '1' }}</span>
            <span v-if="data.threeList.includes('2')">{{ '2' }}</span>
            <span v-if="data.threeList.includes('3')">{{ '3' }}</span>
            <span v-if="data.threeList.includes('4')">{{ '4' }}</span>
            <span v-if="data.threeList.includes('5')">{{ '5' }}</span>
            <span v-if="data.threeList.includes('6')">{{ '6' }}</span>
            <span v-if="data.threeList.includes('7')">{{ '7' }}</span>
            <span v-if="data.threeList.includes('8')">{{ '8' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, toRefs, watch } from 'vue'

/**
 * @toothList 牙齿列表
 */
const props = defineProps<{
  toothList: string[]
}>()
const toothList = ref(props.toothList)

const data = ref<{
  oneList: string[]
  twoList: string[]
  threeList: string[]
  fourList: string[]
}>({
  oneList: [],
  twoList: [],
  threeList: [],
  fourList: []
})
const list = ['A', 'B', 'C', 'D', 'E']

const updateToothList = () => {
  data.value.oneList = []
  data.value.twoList = []
  data.value.threeList = []
  data.value.fourList = []
  toothList.value.forEach((item) => {
    if (item[0] === '1') {
      data.value.oneList.push(item[1])
    }
    if (item[0] === '2') {
      data.value.twoList.push(item[1])
    }
    if (item[0] === '3') {
      data.value.threeList.push(item[1])
    }
    if (item[0] === '4') {
      data.value.fourList.push(item[1])
    }
    if (item[0] === '5') {
      data.value.oneList.push(list[+item[1] - 1])
    }
    if (item[0] === '6') {
      data.value.twoList.push(list[+item[1] - 1])
    }
    if (item[0] === '7') {
      data.value.threeList.push(list[+item[1] - 1])
    }
    if (item[0] === '8') {
      data.value.fourList.push(list[+item[1] - 1])
    }
  })
}
onMounted(() => {
  // 处理牙位数据
  updateToothList()
})

const clearData = () => {
  data.value = {
    oneList: [],
    twoList: [],
    threeList: [],
    fourList: []
  }
}

let timer: NodeJS.Timeout
watch(
  props,
  (value) => {
    clearData()
    clearTimeout(timer)
    timer = setTimeout(() => {
      toothList.value = value.toothList
      if (!value.toothList.includes('-1')) {
        updateToothList()
      }
    }, 100)
  },
  { deep: true }
)

onUnmounted(() => {
  toothList.value = []
  clearData()
})
</script>

<style scoped lang="scss">
.tooth-chart {
  display: flex;
  flex-wrap: wrap;
  min-width: 122px;
  height: 50px;
  padding: 4px;
  font-size: 12px;
  box-sizing: border-box;

  * {
    font-size: 10px;
  }

  .table {
    position: relative;
    width: 100%;
    height: 100%;
    border: none;

    .all {
      position: absolute;
      left: 50%;
      font-size: 20px;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .onw,
  .two,
  .three,
  .four {
    display: flex;
    flex-direction: column;
  }

  .one-two {
    display: flex;
    height: 50%;
    width: 100%;
    border-bottom: 0.5px solid #d8d8d8;
    // 第一象限
    .one {
      line-height: 10px;
      padding: 0 2px 2px 0;
      height: 100%;
      flex: 1;
      border-right: 0.5px solid #d8d8d8;

      div {
        display: flex;
        align-items: flex-end;
        flex-direction: row-reverse;
      }
    }

    // 第二象限
    .two {
      line-height: 10px;
      padding: 0 0 2px 2px;
      height: 100%;
      border-left: 0.5px solid #d8d8d8;
      flex: 1;

      div {
        display: flex;
        align-items: flex-end;
      }
    }
  }

  .three-four {
    display: flex;
    height: 50%;
    width: 100%;
    border-top: 0.5px solid #d8d8d8;
    // 第三象限
    .three {
      line-height: 10px;
      padding: 2px 0 0 2px;
      height: 100%;
      flex: 1;
      border-left: 0.5px solid #d8d8d8;

      div {
        display: flex;
        align-items: flex-end;
      }
    }

    // 第四象限
    .four {
      line-height: 10px;
      padding: 2px 2px 0 0;
      height: 100%;
      flex: 1;
      border-right: 0.5px solid #d8d8d8;

      div {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row-reverse;
      }
    }
  }
}
</style>
