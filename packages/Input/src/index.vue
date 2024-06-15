<template>
  <div class="odos-input" :class="{ 'odos-input-disabled': disabled }" :style="{ width: WidthSize }">
    <div class="odos-input-title" v-if="title">{{ title }}</div>
    <input
      :class="{ 'odos-input-isTitle': title }"
      :type="typeName || 'text'"
      :value="value"
      :disabled="disabled"
      @change="emit('change', $event)"
      @focus="emit('focus', $event)"
      @blur="handelBlur"
      @input="handleInput"
      :placeholder="placeholder || '请输入'"
    />
    <div v-if="type" class="odos-icon" :class="{ 'odos-search-icon': type == 'search' }" @click="iconClick">
      <Icon :name="iconName" color="#86909c" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onUpdated, ref } from 'vue'
import Icon from '../../Icon/src/index.vue'

const emit = defineEmits<{
  (e: 'update:value' | 'search', data: string): void
  (e: 'input' | 'focus' | 'change' | 'blur', data: Event): void
}>()

const focusRef = ref()
onUpdated(() => {
  if (isFocus) {
    focusRef.value.focus()
  }
})

const { value, width, placeholder, disabled, isFocus, title, type } = defineProps<{
  type?: 'text' | 'password' | 'search'
  value?: string
  width?: string | number
  placeholder?: string
  disabled?: boolean
  isFocus?: boolean
  title?: string
}>()
const Type = ref(type)
// typeName
const typeName = computed(() => {
  return Type.value == 'search' ? 'text' : Type.value
})
// iconName
const iconName = computed(() => {
  return Type.value == 'password' ? 'hide' : Type.value == 'search' ? 'Search' : 'View'
})

const iconClick = () => {
  if (Type && Type.value == 'password') {
    Type.value = 'text'
  } else if (Type.value == 'text') {
    Type.value = 'password'
  }
}

const WidthSize = computed(() => {
  const widthSize = ref('')
  if (typeof width === 'number') {
    widthSize.value = `${width}px`
  } else if (typeof width === 'string') {
    widthSize.value = width
  }
  return widthSize.value
})

const handleInput = (e: Event) => {
  emit('input', e)
  emit('update:value', (e.target as HTMLInputElement).value)
}

const handelBlur = ($event: Event) => {
  emit('blur', $event)
}
</script>

<style lang="scss" scoped>
@import '/styles/input.scss';
</style>
