<template>
  <div class="odos-input" :class="{ 'odos-input-disabled': disabled }" :style="{ width: WidthSize }">
    <div class="odos-input-title" v-if="title">{{ title }}</div>
    <input
      :style="inputStyle"
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
    <div class="odos-unit">
      {{ unit }}
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

const { value, width, placeholder, disabled, isFocus, title, type, unit, maxLength } = defineProps<{
  type?: 'text' | 'password' | 'search'
  value?: string
  width?: string | number
  placeholder?: string
  disabled?: boolean
  isFocus?: boolean
  title?: string
  unit?: string
  maxLength?: number
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
// inputStyle
const inputStyle = computed(() => {
  if (type === 'password' || type === 'search' || unit) {
    return {
      paddingRight: '35px'
    }
  } else {
    return {}
  }
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
  if (maxLength) {
    emit('update:value', (e.target as HTMLInputElement).value.slice(0, maxLength))
  } else {
    emit('update:value', (e.target as HTMLInputElement).value)
  }
  emit('input', e)
}

const handelBlur = ($event: Event) => {
  emit('blur', $event)
}
</script>

<style lang="scss" scoped>
.odos-input {
  position: relative;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;

  input {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    border-radius: 8px;
    padding: 10px 16px;
    background: #f2f3f5;
    width: 100%;
    height: 100%;
    border: 1px solid #f2f3f5;
    outline: none;

    &:hover {
      background: #e5e6eb;
    }

    &:focus-within {
      border: 1px solid #2e6ce4;
      background: #fff;
    }

    &::placeholder {
      color: #86909c;
    }

    &.odos-input-isTitle {
      padding-left: 88px;
    }
  }

  .odos-icon {
    position: absolute;
    right: 12px;
    cursor: pointer;

    &.odos-search-icon {
      cursor: auto;
    }
  }

  .odos-unit {
    position: absolute;
    right: 12px;
  }

  .odos-input-title {
    position: absolute;
    width: 80px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    font-size: 14px;
    color: #4e5969;
    border-right: 1px solid #c9cdd4;
    z-index: 1;
  }

  &.odos-input-disabled {
    background: #f2f3f5;
    border-radius: 8px;

    input:hover {
      cursor: not-allowed;
      background: #f2f3f5;
    }
  }
}
</style>
