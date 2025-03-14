<template>
  <div class="odos-text-display" :style="{ width: props.width + 'px' }">
    <template v-if="props.mode !== 'marquee'">
      <Tooltip :placement="props.placement || 'top'" :trigger="props.trigger || 'hover'">
        <div class="odos-text-display_ellipsis__text" :style="{ width: props.width + 'px' }">
          <slot>{{ props.text }}</slot>
        </div>
        <template #title>
          <slot name="tooltip">{{ props.tooltip }}</slot>
        </template>
      </Tooltip>
    </template>
    <template v-else>
      <div class="odos-text-display__marquee">
        <div class="odos-text-display_marquee__container">
          <div class="odos-text-display_marquee__text">
            <slot>{{ props.text }}</slot>
          </div>
          <div class="odos-text-display_marquee__text">
            <slot>{{ props.text }}</slot>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import Tooltip from '../../Tooltip/src/index.vue'
const props = defineProps<{
  width?: number
  text?: string
  tooltip?: string
  trigger?: 'hover' | 'click'
  mode?: 'marquee' | 'ellipsis'
  placement?: 'top' | 'bottom' | 'left' | 'right'
}>()
</script>

<style lang="scss" scoped>
.odos-text-display {
  width: fit-content;
  overflow: hidden;
  display: flex;
  align-items: center;

  .odos-text-display_ellipsis__text {
    // 超出显示省略号
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    * {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .odos-text-display__marquee {
    position: relative;
    overflow: hidden;

    .odos-text-display_marquee__container {
      display: inline-block;
      vertical-align: middle;
      white-space: nowrap;
      animation: marquee 10s linear infinite;
      padding-right: 50px;
      height: 100%;
    }

    .odos-text-display_marquee__text {
      display: inline-block;
      padding-right: 70px;
    }
  }
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
