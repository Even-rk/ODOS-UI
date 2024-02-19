<template>
  <div class="radio-size">
    <odos-radio v-model:value="radio1" size="large">
      <odos-radio-item :value="1" label="选项1" />
      <odos-radio-item :value="2" label="选项2" />
      <odos-radio-item :value="3" label="选项3" />
    </odos-radio>

    <odos-radio v-model:value="radio2" size="medium">
      <odos-radio-item :value="4" label="选项4" />
      <odos-radio-item :value="5" label="选项5" />
      <odos-radio-item :value="6" label="选项6" />
    </odos-radio>

    <odos-radio v-model:value="radio3" size="small">
      <odos-radio-item :value="7" label="选项7" />
      <odos-radio-item :value="8" label="选项8" />
      <odos-radio-item :value="9" label="选项9" />
    </odos-radio>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const radio1 = ref()
const radio2 = ref()
const radio3 = ref()
watch(
  () => radio1.value,
  () => {
    console.log('radio1:', radio1.value)
  }
)
watch(
  () => radio2.value,
  () => {
    console.log('radio2:', radio2.value)
  }
)
watch(
  () => radio3.value,
  () => {
    console.log('radio3:', radio3.value)
  }
)
</script>

<style scoped lang="scss">
.radio-size {
  display: flex;
  flex-direction: column;
  .odos-radio {
    margin: 10px 0;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
