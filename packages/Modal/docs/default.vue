<script setup lang="ts">
import { ref } from 'vue'

const isModalVisible = ref(false)

const showModal = () => {
  isModalVisible.value = true
}

const handleOk = () => {
  isModalVisible.value = false
}

const handleCancel = () => {
  isModalVisible.value = false
}
</script>

<template>
  <div>
    <odos-button type="primary" @click="showModal"> Open Modal </odos-button>
    <odos-modal v-model:open="isModalVisible" title="Basic Modal" @ok="handleOk" @cancel="handleCancel">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </odos-modal>
  </div>
</template>

<style scoped lang="scss"></style>
