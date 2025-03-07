<template>
  <audio :src="props.src" ref="audioRef" />
  <div class="odos-audio">
    <Icon name="audio-play" :class="{ disabled: !props.src }" v-show="!isPlay" @click="audioPlay" />
    <Icon name="audio-pause" :class="{ disabled: !props.src }" v-show="isPlay" @click="audioPause" />
    <div class="audio-slider">
      <Slider
        v-model:value="process"
        @afterChange="currentTimeChange"
        @change="currentChange"
        :tooltipOpen="false"
        :step="0.01"
        :disabled="!props.src"
      />
      <div class="time" v-show="!isPlay">{{ secondsToMMSS(audioData.duration as number) }}</div>
      <div class="time" v-show="isPlay">{{ secondsToMMSS(audioData.currentTime as number) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue'
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
const isPlay = ref(false)
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
      isPlay.value = true
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
    isPlay.value = false
  })
})

// 播放
const audioPlay = () => {
  if (!props.src) return
  isPlay.value = true
  audioRef.value.play()
}
// 暂停
const audioPause = () => {
  if (!props.src) return
  isPlay.value = false
  audioRef.value.pause()
  emit('pause', audioData.currentTime, props.src)
}

const currentChange = () => {
  audioRef.value.pause()
}
// 改变播放时间
const currentTimeChange = (val: [number, number] | number) => {
  audioRef.value.currentTime = ((val as number) / 100) * audioData.duration
  if (isPlay.value) {
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
