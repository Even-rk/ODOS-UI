<template>
  <div class="odos-ui">
    <aside>
      <router-link v-for="(link, index) in data.links" :key="index" :to="link.path">
        {{ link.name }}
      </router-link>
    </aside>
    <main :class="{ 'has-toc': hasToc }">
      <router-view></router-view>
    </main>
    <TocNav @toc-change="handleTocChange" />
  </div>
</template>

<script setup lang="ts">
import ComponentList from 'packages/list.json'
import { onMounted, reactive, ref } from 'vue'
import TocNav from '@/components/TocNav.vue'

const data = reactive({
  links: ComponentList.map((item) => ({
    path: `/components/${item.compName}`,
    name: item.compZhName
  }))
})

const hasToc = ref(false)

const handleTocChange = (hasTocItems: boolean) => {
  hasToc.value = hasTocItems
}

const linkName = ref('')
onMounted(() => {
  linkName.value = location.hash
})
</script>
<style lang="scss" scoped>
.header {
  height: 55px;
  background-color: pink;
}
.odos-ui {
  display: flex;
  max-height: calc(100vh - 55px);
  overflow: hidden;
  aside {
    box-sizing: border-box;
    width: 330px;
    height: calc(100vh - 55px);
    padding: 48px 48px 96px 60px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 1em;
      background-color: transparent;
    }

    a {
      padding: 8px 16px;
      margin-bottom: 8px;
      font-size: 14px;
    }
    .router-link-exact-active {
      border-radius: 10px;
      background-color: #eef5fe;
      color: #2e6ce4;
    }
  }
  main {
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
    height: calc(100vh - 160px);
    padding: 64px 96px 42px 70px;
    position: relative;
    transition: all 0.3s ease;
    max-width: calc(100% - 330px);

    &.has-toc {
      margin-right: 240px; /* 为右侧目录腾出空间 */
      max-width: calc(100% - 330px - 240px);
    }
  }
}
</style>
