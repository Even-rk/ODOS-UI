<template>
  <div class="odos-date-picker">
    <odos-input v-model:value="datePicker" @blur="inputBlur" @focus="inputFocus" placeholder="请选择日期" />
    <div
      class="odos-date-picker-content"
      v-if="isShowPicker"
      :class="{
        bottom: true,
        top: false
      }"
    >
      <div class="odos-date-picker-header"></div>
      <div class="odos-date-picker-body"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const datePicker = ref()

const isShowPicker = ref(false)
const inputFocus = () => {
  isShowPicker.value = true
}
const inputBlur = () => {
  isShowPicker.value = false
}
</script>

<style lang="scss">
@import '/styles/datePicker.scss';
</style>
