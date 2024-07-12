<template>
  <Form ref="ref" :modal="modal" :role="rule" :labelCol="labelCol" :wrapperCol="wrapperCol">
    <slot />
  </Form>
</template>

<script setup lang="ts">
import { Form } from 'ant-design-vue'
const { modal, rule, labelCol, wrapperCol, ref } = defineProps<{
  ref: any,
  modal?: object
  rule?: object
  labelCol?: { span?: number, offset?: number }
  wrapperCol?: { span?: number, offset?: number }
}>()

const validate = () => {
  console.log('aaa')
}
</script>

<style scoped>

</style>