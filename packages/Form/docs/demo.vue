<template>
  <odos-form ref="formRef" :model="formState">
    <odos-form-item :model="formState" label="用户名" prop="username" :rule="rules.username">
      <odos-input placeholder="请输入用户名" v-model:value="formState.username" />
    </odos-form-item>
    <odos-form-item :model="formState" label="密码" prop="password" :rule="rules.password">
      <odos-input type="password" placeholder="请输入密码" v-model:value="formState.password" />
    </odos-form-item>
    <odos-form-item>
      <odos-button @click="onFinish">提交</odos-button>
    </odos-form-item>
  </odos-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

interface FormState {
  username: string
  password: string
}

const formState = reactive<FormState>({
  username: '',
  password: ''
})

const rules = {
  username: {
    required: true,
    message: '用户名不能为空'
  },
  password: {
    required: true,
    message: '密码不能为空'
  }
}

const formRef = ref()

const onFinish = async () => {
  console.log('提交')
}
</script>

<style scoped></style>
