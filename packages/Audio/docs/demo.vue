<template>
  <odos-audio
    src="/src/assets/audio/t-rex-roar.mp3"
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
