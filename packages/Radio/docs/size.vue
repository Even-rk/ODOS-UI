<template>
  <div class="radio-size">
    <odos-radio v-model:value="radio" size="large">
      <odos-radio-item :value="1" label="选项1" />
      <odos-radio-item :value="2" label="选项2" />
      <odos-radio-item :value="3" label="选项3" />
    </odos-radio>

    <odos-radio v-model:value="radio" size="medium">
      <odos-radio-item :value="1" label="选项1" />
      <odos-radio-item :value="2" label="选项2" />
      <odos-radio-item :value="3" label="选项3" />
    </odos-radio>

    <odos-radio v-model:value="radio" size="small">
      <odos-radio-item :value="1" label="选项1" />
      <odos-radio-item :value="2" label="选项2" />
      <odos-radio-item :value="3" label="选项3" />
    </odos-radio>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const radio = ref()
watch(
  () => radio.value,
  () => {
    console.log(radio.value)
  }
)
</script>

<style scoped lang="scss">
.radio-size {
  display: flex;
  flex-direction: column;
  .odos-radio {
    margin: 10px 0;
  }
}
</style>
