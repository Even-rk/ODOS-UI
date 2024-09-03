<template>
  <form class="odos-form" method="get" @submit.prevent="Submit">
    <slot />
  </form>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'finish', ev: Event): void
}>()
// 表单提交事件
const Submit = (e: Event) => {
  emit('finish', e)
}

const validate = (
  rules: {
    [key: string]: {
      type?: string
      required?: boolean
      message?: string
      trigger?: 'blur' | 'change' | 'input'
      validator?: () => boolean
    }
  },
  model: Record<string, unknown>
) => {
  console.log(rules, model)
}

const resetFields = () => {}

defineExpose({
  validate
})
</script>

<style scoped lang="scss">
.odos-form {
  width: 100%;
}
</style>
