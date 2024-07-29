<template>
  <odos-form ref="formRef" :model="formState" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
    <odos-form-item label="Activity name" name="name">
      <odos-input v-model:value="formState.name" />
    </odos-form-item>
  </odos-form>
  <odos-button type="primary" @click="onSubmit">提交</odos-button>
</template>
<script lang="ts" setup>
import type { UnwrapRef } from 'vue'
import { reactive, ref } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'

interface FormState {
  name: string
}

const formRef = ref()
const labelCol = { span: 5 }
const wrapperCol = { span: 13 }
const formState: UnwrapRef<FormState> = reactive({
  name: ''
})
const rules: Record<string, Rule[]> = {
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'change' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ]
}
const onSubmit = () => {
  console.log(formRef.value)
  // formRef.value
  //   .validate()
  //   .then(() => {
  //     console.log('values', formState, toRaw(formState))
  //   })
  //   .catch((error: object) => {
  //     console.log('error', error)
  //   })
}
const resetForm = () => {
  formRef.value.resetFields()
}
</script>
