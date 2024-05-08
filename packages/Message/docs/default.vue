<template>
  <odos-button @click="useInfoMessage('info')">info</odos-button>
  <odos-button @click="useErrorMessage('error')">error</odos-button>
  <odos-button @click="useWarningMessage('warning')">warning</odos-button>
  <odos-button @click="useSuccessMessage('success')">success</odos-button>
  <odos-button @click="useLoadingMessage('loading')">loading</odos-button>
</template>

<script setup>
import {
  useInfoMessage,
  useErrorMessage,
  useWarningMessage,
  useSuccessMessage,
  useLoadingMessage
} from './../utils/message'
</script>

<style scoped lang="scss">
.odos-btn {
  margin-right: 10px;
}
</style>
