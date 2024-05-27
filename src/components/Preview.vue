<template>
  <div class="orange-preview">
    <section class="section">
      <slot></slot>
    </section>

    <div v-show="codeVisible" class="source-code">
      <pre class="language-html"><code class="language-html">{{ previewSourceCode }}</code></pre>
    </div>

    <div class="preview-bottom" @click="codeVisible = !codeVisible">
      <span name="Code">查看代码</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import Prism from 'prismjs'
import '../assets/prism.css'
import { computed, nextTick, onMounted, ref } from 'vue'

const isDev = import.meta.env.MODE === 'development'
const { compName, demoName } = defineProps<{
  compName: string
  demoName: string
}>()
const sourceCode = ref('')
const codeVisible = ref(false)

const previewSourceCode = computed(() => {
  const str = sourceCode.value.replace(/'\.\.\/\.\.\/index'/g, `'@tencent/odos-ui'`)
  const startIndex = str.indexOf('<template>') + '<template>'.length
  const endIndex = str.indexOf('</template>')
  const content = str.substring(startIndex, endIndex)
  // return '<template>' + content + '<template>'
  return str
})

onMounted(async () => {
  if (compName && demoName) {
    if (isDev) {
      sourceCode.value = (
        await import(/* @vite-ignore */ `../../packages/${compName}/docs/${demoName}.vue?raw`)
      ).default
    } else {
      sourceCode.value = await fetch(`${isDev ? '' : './'}/packages/${compName}/docs/${demoName}.vue`).then((res) =>
        res.text()
      )
    }
  }
  await nextTick()
  Prism.highlightAll()
})
</script>

<style lang="scss">
pre {
  line-height: 0;
}
.orange-preview {
  border: 4px;
  border: 1px solid #dddfe5;
  border-radius: 8px;
  .section {
    display: flex;
    margin: 15px;
  }
}

.source-code {
  max-height: 500px;
}
.language-html {
  margin: 0;
  padding: 0 15px;
}
.preview-bottom {
  height: 40px;
  display: flex;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #dddfe5;
  cursor: pointer;
  border-radius: 0 0 8px 8px;
  &:hover {
    background-color: #dddfe5;
  }
}
</style>
