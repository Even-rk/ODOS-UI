<template>
  <div class="odos-MedicalRecordTerms entries-part">
    <div class="entries-part-item" v-for="(item, index) in props.entryData" :key="index">
      <div class="entries-part-item-title">
        {{ item.itemType }}
        <div class="line" />
      </div>
      <div class="entries-part-item-select-wrapper scrollbar">
        <div
          class="entries-part-item-select"
          v-for="sub in item.items"
          :key="sub.itemName"
          @click="addWordToDescHandle(sub)"
        >
          {{ sub.itemName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  // 属性定义
  entryData?: {
    itemType: string
    items: {
      itemName: string
    }[]
  }[]
}>()

const emit = defineEmits<{
  // 事件定义
  (e: 'add-word', sub: { itemName: string }): void
}>()

const addWordToDescHandle = (sub: { itemName: string }) => {
  // 点击词条添加到描述
  emit('add-word', sub)
}
</script>

<style scoped lang="scss">
.odos-MedicalRecordTerms {
  // 样式定义
  &.entries-part {
    width: fit-content;
    height: fit-content;
    padding: 8px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    flex-wrap: nowrap;
    align-content: flex-start;
    align-self: stretch;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    .entries-part-item {
      /* 自动布局子元素 */
      position: relative;
      // width: 100px;
      flex: 1;
      height: 400px;
      opacity: 1;
      display: flex;
      flex-direction: column;
      align-items: start;
      padding-left: 4px;
      border-right: 1px solid #dee0e5;
      overflow: hidden;
      padding: 0 12px;
      &:last-child {
        border-right: none;
      }

      .entries-part-item-title {
        font-size: 14px;
        line-height: 20px;
        margin: 10px 0 18px;
        .line {
          width: 100%;
          height: 4px;
          border-radius: 153.02px;
          /* 渐变 */
          background: linear-gradient(178deg, #649dff 5%, #1b81fd 117%);
        }
      }

      .entries-part-item-select-wrapper {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        flex-direction: column;
        gap: 12px;
        .entries-part-item-select {
          width: 120px;
          border-radius: 4px;
          padding: 8px;
          background: #f7f8fa;
          display: flex;
          justify-content: start;
          align-items: center;
          cursor: pointer;
          line-height: 1.7;

          &:hover {
            background: #eaf0fc;
          }

          &:active {
            background: #dce7f8;
          }
        }
      }
    }
  }
}
</style>
