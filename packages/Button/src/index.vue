<template>
  <button ref="btnRef" @click="Click" class="odos-btn" :class="styleClass" :disabled="selfDisabled">
    <slot name="icon">
      <div :class="styleIconClass" v-if="icon">
        <Icon :name="icon" :color="iconColor" />
      </div>
    </slot>
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import Icon from 'packages/Icon/src/index.vue'
import { computed, ref, useSlots, watchEffect, type SetupContext, watch } from 'vue'

const { type, size, disabled, icon } = defineProps<{
  type?: 'primary' | 'default' | 'line' | 'text'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  icon?: string
}>()

const selfDisabled = ref(disabled)

const slots = useSlots() as SetupContext['slots']
const iconColor = ref('')

const styleClass = computed(() => {
  return {
    ['odos-btn--icon']: !slots.default,
    [`odos-btn--${type}`]: type,
    [`odos-btn-size--${size}`]: size,
    'is-disabled': disabled
  }
})

const styleIconClass = computed(() => {
  return {
    'odos-icon': slots.default,
    [`odos-icon--${type}`]: type
  }
})

watchEffect(() => {
  if (!slots.default) iconColor.value = '#4E5969'
})
const emit = defineEmits(['click'])

watch(() => disabled, () => {
  selfDisabled.value = disabled
}, { deep: true })

const Click = (e: Event) => {
  if (selfDisabled.value) return
  emit('click', e)
}
</script>

<style lang="scss" scoped>
@mixin bgc($bgc) {
  background-color: $bgc;
}

@mixin border($color) {
  box-sizing: border-box;
  color: $color;
  border: 1px solid $color;
}

@mixin odos-btn-default {
  height: 36px;
  padding: 0 20px;
  .odos-icon {
    margin-right: 8px;
  }
}

.odos-btn {
  cursor: pointer;
}

.odos-btn,
.odos-btn--default {
  @include bgc(#f2f3f5);
  @include odos-btn-default();
  border: none;
  display: inline-flex;
  align-items: center;
  color: #1d2129;
  border-radius: 8px;

  &:hover {
    @include bgc(#e5e6eb);
  }

  &:active {
    @include bgc(#c9cdd4);
  }

  &.is-disabled {
    color: #86909c;
    @include bgc(#f7f8fa);
    cursor: not-allowed;
  }

  .odos-icon {
    margin-right: 8px;
  }

  &.odos-btn-size--large {
    @include odos-btn-default();
  }

  &.odos-btn-size--medium {
    height: 32px;
    padding: 0 16px;

    .odos-icon {
      margin-right: 6px;
    }
  }

  &.odos-btn-size--small {
    height: 28px;
    padding: 0 12px;

    .odos-icon {
      margin-right: 4px;
    }
  }

  &.odos-btn--primary {
    @include bgc(#2e6ce4);
    color: #ffffff;

    &:hover {
      @include bgc(#6d99ed);
    }

    &:active {
      @include bgc(#0042c1);
    }

    &.is-disabled {
      @include bgc(#96b5f1);
      cursor: not-allowed;
    }
  }

  &.odos-btn--line {
    background-color: #fff;
    mix-blend-mode: multiply;
    @include border(#c9cdd4);
    color: #1d2129;

    &:hover {
      @include bgc(#fff);
      @include border(#6d99ed);
    }

    &:active {
      @include bgc(#fff);
      @include border(#0042c1);
    }

    &.is-disabled {
      @include bgc(#fff);
      @include border(#c9cdd4);
      cursor: not-allowed;
    }
  }

  &.odos-btn--text {
    mix-blend-mode: multiply;
    color: #2e6ce4;
    background-color: transparent;

    &:hover {
      @include bgc(#f2f3f5);
    }

    &:active {
      @include bgc(#e5e6eb);
    }

    &.is-disabled {
      color: #96b5f1;
      @include bgc(transparent);
      cursor: not-allowed;
    }
  }

  .odos-icon {
    width: 16px;
    height: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &.odos-btn--icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    width: 36px;
    padding: 0;

    &.odos-btn-size--large {
      height: 36px;
      width: 36px;
      padding: 0;
    }

    &.odos-btn-size--medium {
      height: 32px;
      width: 32px;
      padding: 0;
    }

    &.odos-btn-size--small {
      height: 28px;
      width: 28px;
      padding: 0;
    }

    .odos-icon--primary .icon {
      fill: #fff !important;
    }

    &:hover .odos-icon--line .icon {
      fill: #6d99ed !important;
    }

    &:active .odos-icon--line .icon {
      fill: #0042c1 !important;
    }
  }
}
</style>
