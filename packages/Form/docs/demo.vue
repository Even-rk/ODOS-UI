<template>
  <odos-form ref="formRef" :model="formState" @finish="onFinish">
    <odos-form-item label="用户名" label-width="80px" name="username" props="username">
      <odos-input placeholder="请输入用户名" v-model:value="formState.username" />
    </odos-form-item>
    <odos-form-item>
      <odos-button html-type="submit">提交</odos-button>
    </odos-form-item>
  </odos-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

interface FormState {
  username: string
}

const formState = reactive<FormState>({
  username: ''
})

const formRef = ref()

const onFinish = (values: FormState) => {
  console.log(values)
}
</script>

<style scoped></style>
