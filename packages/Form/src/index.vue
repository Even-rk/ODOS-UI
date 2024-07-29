<template>
  <div class="odos-form">
    <Form
      ref="formRef"
      :modal="modal"
      :role="rule"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      :scrollToFirstError="scrollToFirstError"
    >
      <slot />
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form } from 'ant-design-vue'
import { ref } from 'vue'
const { modal, rule, labelCol, wrapperCol } = defineProps<{
  modal?: object
  rule?: object
  labelCol?: { span?: number; offset?: number }
  wrapperCol?: { span?: number; offset?: number }
  scrollToFirstError?: boolean
}>()

const formRef = ref()

const validate = async () => {
  return await formRef.value.validate()
}
</script>

<style scoped></style>
