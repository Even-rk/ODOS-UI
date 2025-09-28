<template>
  <div class="odos-input" :class="{ 'odos-input-disabled': disabled }" :style="{ width: WidthSize }">
    <div class="odos-input-title" v-if="!$slots.prefix && title">{{ title }}</div>
    <div v-if="type == 'search'" class="odos-search-icon" @click="iconClick">
      <Icon :name="iconName" color="#86909c" />
    </div>
    <!-- fix slots -->
    <div v-if="$slots.prefix" ref="prefixRef" class="odos-input-prefix">
      <slot name="prefix">prefix</slot>
    </div>
    <div v-if="$slots.suffix" ref="suffixRef" class="odos-input-suffix">
      <slot name="suffix">suffix</slot>
    </div>

    <input
      :style="inputStyle"
      :class="{ 'odos-input-isTitle': title, 'odos-input-search': type == 'search' }"
      :type="typeName || 'text'"
      :value="value"
      :disabled="disabled"
      @change="emit('change', $event)"
      @focus="emit('focus', $event)"
      @blur="handelBlur"
      @input="handleInput"
      @compositionstart="handleCompositionStart"
      @compositionupdate="handleCompositionUpdate"
      @compositionend="handleCompositionEnd"
      :placeholder="placeholder || '请输入'"
    />
    <div v-if="type !== 'search'" class="odos-icon" @click="iconClick">
      <Icon :name="iconName" color="#86909c" />
    </div>
    <div class="odos-unit" v-if="!$slots.suffix && unit">
      {{ unit }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onUpdated, ref, useSlots } from 'vue'
import Icon from '../../Icon/src/index.vue'

const emit = defineEmits<{
  (e: 'update:value' | 'search', data: string | null): void
  (e: 'input' | 'focus' | 'change' | 'blur', data: Event): void
  (e: 'ime-status', status: boolean): void
}>()

const focusRef = ref()
onUpdated(() => {
  if (isFocus) {
    focusRef.value.focus()
  }
})

const { value, width, placeholder, disabled, isFocus, title, type, unit, maxLength } = defineProps<{
  type?: 'text' | 'password' | 'search'
  value?: string | null
  width?: string | number
  placeholder?: string
  disabled?: boolean
  isFocus?: boolean
  title?: string
  unit?: string
  maxLength?: number
}>()
const Type = ref(type)
const slots = useSlots()
const prefixRef = ref<HTMLElement | null>(null)
const suffixRef = ref<HTMLElement | null>(null)
// 输入法状态标志
const isComposing = ref(false)
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
  // fix style
  if (slots.prefix && prefixRef.value) {
    return {
      paddingLeft: prefixRef.value.clientWidth + 'px'
    }
  }
  if (slots.suffix && suffixRef.value) {
    return {
      paddingRight: suffixRef.value.clientWidth + 'px'
    }
  }
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

// 输入法开始输入
const handleCompositionStart = () => {
  isComposing.value = true
  emit('ime-status', true)
}

// 输入法输入更新
const handleCompositionUpdate = () => {
  isComposing.value = true
  emit('ime-status', true)
}

// 输入法输入结束
const handleCompositionEnd = (e: Event) => {
  isComposing.value = false
  emit('ime-status', false)
  // 在输入法结束后手动触发一次更新，确保最终值被正确捕获
  handleInput(e)
}

const handleInput = (e: Event) => {
  // 如果当前正在使用输入法输入，不进行处理
  const target = e.target as HTMLInputElement
  if (isComposing.value) return
  if (target.value == '') {
    return emit('update:value', null)
  } else {
    const sliceValue = (e.target as HTMLInputElement).value.slice(0, maxLength || 50)
    // @ts-ignore
    e.target.value = sliceValue
    emit('update:value', sliceValue)
    emit('input', e)
  }
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
      font-size: 14px;
      color: #86909c;
    }

    &.odos-input-isTitle {
      padding-left: 88px;
    }

    &.odos-input-search {
      padding-left: 35px;
    }
  }

  .odos-input-prefix {
    position: absolute;
    padding: 0px 10px;
    left: 2px;
  }

  .odos-input-suffix {
    position: absolute;
    padding: 0px 10px;
    right: 2px;
  }

  .odos-icon {
    position: absolute;
    right: 12px;
    cursor: pointer;
  }

  .odos-search-icon {
    position: absolute;
    left: 12px;
    cursor: auto;
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
