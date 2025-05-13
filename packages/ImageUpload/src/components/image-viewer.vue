<template>
  <div v-if="isModalVisible" class="viewer-container" @click="cancelHandle">
    <Icon name="Failed" size="36px" class="closeIcon" @click="cancelHandle" />
    <img :src="sourceUrl || cropUrl || ''" alt="" width="480px" height="243px" @click.stop />
  </div>
</template>

<script setup lang="ts">
import Icon from 'packages/Icon/src/index.vue'
import { toRefs, ref } from 'vue';
const props = withDefaults(
  defineProps<{
    sourceUrl: string | null
    cropUrl: string | null
  }>(),
  {}
)
const { sourceUrl, cropUrl } = toRefs(props)
const emit = defineEmits(['cancel', 'confirm'])
const isModalVisible = ref(false) // 模态框显示状态
const cancelHandle = () => {
  emit('cancel')
  isModalVisible.value = false
}

const open = () => {
  isModalVisible.value = true
}
defineExpose({
  open
})
</script>

<style scoped lang="scss">
.viewer-container {
  width: 100vw;
  height: 100vh;
  background: rgba(48, 49, 50, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  .closeIcon {
    position: absolute;
    top: 24px;
    right: 24px;
    color: white;
    cursor: pointer;
  }
  img {
    // width: v-bind(width);
    // height: v-bind(height);
    width: 762px;
    height: 507.54px;
    border-radius: 12px;
    box-shadow: 0px 4px 20px 0px rgba(221, 226, 231, 0.4);
  }
}
</style>
