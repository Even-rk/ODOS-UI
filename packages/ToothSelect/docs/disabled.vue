<template>
  <div class="odos-tooth-select-disabled">
    <h1>全口</h1>
    <OdosToothSelect
      name="fullMouth"
      v-model:value="fullMouth"
      range-limit="fullMouth"
      :multiple-tooth-list="multipleToothList"
    />
    <hr />
    <h1>咬翼面和全口</h1>
    <OdosToothSelect
      name="bitewing"
      v-model:value="bitewing"
      range-limit="bitewing"
      :multiple-tooth-list="multipleToothList"
    />
    <hr />
    <h1>咬翼面</h1>
    <OdosToothSelect
      name="all"
      v-model:value="all"
      range-limit="all"
      :multiple-tooth-list="multipleToothList"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const fullMouth = ref(['11', '12'])
const bitewing = ref(['11', '12'])
const all = ref(['11', '12'])

const multipleToothList = ref([
  {
    label: '12近中',
    value: '12.2'
  },
  {
    label: '12近远',
    value: '12.1'
  }
])

watch(fullMouth, () => {
  console.log('fullMouth', fullMouth.value)
})
watch(bitewing, () => {
  console.log('bitewing', bitewing.value)
})
watch(all, () => {
  console.log('all', all.value)
})
</script>

<style scoped lang="scss">
.odos-tooth-select-disabled {
  display: flex;
  flex-direction: column;
}
</style>
