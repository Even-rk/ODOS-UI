<template>
  <div class="check-box-size">
    <odos-check-box v-model:value="checkBox1" size="large">
      <odos-check-box-item :value="1" label="选项1" />
      <odos-check-box-item :value="2" label="选项2" />
      <odos-check-box-item :value="3" label="选项3" />
    </odos-check-box>

    <odos-check-box v-model:value="checkBox2" size="medium">
      <odos-check-box-item :value="4" label="选项4" />
      <odos-check-box-item :value="5" label="选项5" />
      <odos-check-box-item :value="6" label="选项6" />
    </odos-check-box>

    <odos-check-box v-model:value="checkBox3" size="small">
      <odos-check-box-item :value="7" label="选项7" />
      <odos-check-box-item :value="8" label="选项8" />
      <odos-check-box-item :value="9" label="选项9" />
    </odos-check-box>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const checkBox1 = ref()
const checkBox2 = ref()
const checkBox3 = ref()
</script>

<style scoped lang="scss">
.check-box-size {
  display: flex;
  flex-direction: column;
  .odos-check-box {
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
