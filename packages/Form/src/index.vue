<template>
  <div class="odos-form">
    <form method="get" @submit.prevent="Submit">
      <slot />
    </form>
  </div>
</template>

<script setup lang="ts">
const { model } = defineProps<{
  model: any
}>()

const emit = defineEmits<{
  (e: 'finish', data: any): void
}>()
const Submit = () => {
  emit('finish', model)
}
</script>

<style scoped></style>
