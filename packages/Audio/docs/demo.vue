<template>
  <odos-audio
    src="https://orange-odos.oss-cn-hangzhou.aliyuncs.com/2025/04/21/7120475-20250421165416-18638125465-4001--record-sip-45-1745225656.308007_20250421165515A143.mp3"
    :autoPlay="false"
    :currentTime="0"
    @pause="handlePause"
  />
</template>

<script setup>
const handlePause = (time, src) => {
  console.log('Audio paused at:', time, 'seconds')
  console.log('Audio source:', src)
}
</script>
