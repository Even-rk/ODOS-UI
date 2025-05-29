<template>
  <audio :src="props.src" ref="audioRef" />
  <div class="odos-audio">
    <Icon
      v-if="!isPlay1x"
      name="tripleSpeed"
      size="24px"
      :class="{ disabled: disabled1x }"
      @click="audioPlay(1)"
    />
    <Icon name="radiopaused-1x" v-else size="24px" :class="{ disabled: disabled1x }" @click="audioPause" />
    <Icon
      v-if="!isPlay2x"
      name="doubleSpeed"
      size="24px"
      :class="{ disabled: disabled2x }"
      @click="audioPlay(1.5)"
    />
    <Icon name="radiopaused-2x" v-else size="24px" :class="{ disabled: disabled2x }" @click="audioPause" />
    <div class="audio-slider">
      <Slider
        v-model:value="process"
        @afterChange="currentTimeChange"
        @change="currentChange"
        :tooltipOpen="false"
        :step="0.01"
        :disabled="!props.src"
      />
      <div class="time" v-if="isPlay1x || isPlay2x">{{ secondsToMMSS(audioData.currentTime as number) }}</div>
      <div class="time" v-else>{{ secondsToMMSS(audioData.duration as number) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import Icon from '../../Icon/src/index.vue'
import { Slider } from 'ant-design-vue'

type Emit = {
  (e: 'pause', time: number, Src: string): void
}
const emit = defineEmits<Emit>()
const props = defineProps<{
  src: string
  autoPlay?: boolean
  currentTime?: number
}>()

// 时间换算
const secondsToMMSS = (seconds: number) => {
  // 计算分钟
  const minutes = Math.floor(seconds / 60)
  const second = ref(0)
  // 计算秒数
  if (minutes > 0) {
    const minute = minutes * 60
    second.value = seconds - minute
  } else {
    second.value = seconds
  }
  return `${minutes.toString().padStart(2, '0')}:${second.value.toString().padStart(2, '0')}`
}
// 是否在播放
const isPlay1x = ref(false)
const isPlay2x = ref(false)
// 1倍速按钮禁用
const disabled1x = computed(() => {
  return !!props.src && isPlay2x.value
})

// 2倍速按钮禁用
const disabled2x = computed(() => {
  return !!props.src && isPlay1x.value
})
// 进度
const process = ref(0)
// 音频时长
const audioData: {
  // 总时长
  duration: number
  // 播放开始时间
  currentTime: number
} = reactive({
  duration: 0,
  currentTime: 0
})

const audioRef = ref({} as HTMLAudioElement)
onMounted(async () => {
  if (props.currentTime) {
    process.value = props.currentTime
    audioRef.value.currentTime = props.currentTime
  }
  if (props.autoPlay) {
    nextTick(() => {
      document.querySelector('body')?.click()
      audioRef.value.pause()
      isPlay1x.value = true
      audioRef.value
        .play()
        .then(() => {})
        .catch(() => {
          audioRef.value.play()
        })
    })
  }
  // 侦听总时长
  audioRef.value.addEventListener('loadedmetadata', (e: Event) => {
    const target = e.target as HTMLAudioElement
    audioData.duration = Math.floor(target.duration)
  })
  // 音频时长
  audioRef.value.addEventListener('canplay', (e: Event) => {
    const target = e.target as HTMLAudioElement
    audioData.duration = Math.floor(target.duration)
  })
  // 播放时间
  audioRef.value.addEventListener('timeupdate', (e: Event) => {
    const target = e.target as HTMLAudioElement
    audioData.currentTime = Math.floor(target.currentTime)
    // 进度条
    process.value = Math.floor((audioData.currentTime / audioData.duration) * 100)
  })
  // 播放结束
  audioRef.value.addEventListener('ended', () => {
    isPlay1x.value = false
    isPlay2x.value = false
  })
})

/**
 * 播放按钮
 * @param rade 几倍速
 */
const audioPlay = (rade: 1 | 1.5) => {
  if (rade == 1 && disabled1x.value) return
  if (rade == 1.5 && disabled2x.value) return
  if (!props.src) return
  if (rade == 1) {
    isPlay1x.value = true
    isPlay2x.value = false
  } else if (rade == 1.5) {
    isPlay2x.value = true
    isPlay1x.value = false
  }
  audioRef.value.playbackRate = rade // 设置播放播放
  audioRef.value.play()
}
// 暂停
const audioPause = () => {
  isPlay1x.value = false
  isPlay2x.value = false
  audioRef.value.pause()
  emit('pause', audioData.currentTime, props.src)
}

const currentChange = () => {
  audioRef.value.pause()
}
// 改变播放时间
const currentTimeChange = (val: [number, number] | number) => {
  audioRef.value.currentTime = ((val as number) / 100) * audioData.duration
  if (isPlay1x.value || isPlay2x.value) {
    audioRef.value.play()
  } else {
    audioRef.value.pause()
  }
}
</script>

<style scoped lang="scss">
.odos-audio {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 23px;
  .icon {
    cursor: pointer;
    margin-right: 8px;
    &.disabled {
      cursor: not-allowed;
      color: #c9cdd4;
    }
  }
  .audio-slider {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    :deep .ant-slider {
      width: 100%;
      .ant-slider-rail {
        height: 5px;
        background: #c9cdd4;
      }
      .ant-slider-track {
        height: 5px;
        background: #2e6ce4;
      }
      .ant-slider-step {
        height: 5px;
      }
      .ant-slider-handle-click-focused,
      .ant-slider-handle {
        &::after,
        &::before {
          content: none;
        }
      }
      .ant-slider-handle {
        top: -1px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #2e6ce4;
        border: 2px solid #fff;
      }
    }
    .time {
      display: flex;
      align-items: center;
      margin-left: 8px;
      width: 40px;
      height: 23px;
      color: #4e5969;
    }
  }
}
</style>
