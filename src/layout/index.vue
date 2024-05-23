<template>
  <div class="odos-ui">
    <aside>
      <router-link v-for="(link, index) in data.links" :key="index" :to="link.path">
        {{ link.name }}
      </router-link>
    </aside>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import ComponentList from 'packages/list.json'
import { onMounted, reactive, ref } from 'vue'

const data = reactive({
  links: ComponentList.map((item) => ({
    path: `/components/${item.compName}`,
    name: item.compZhName
  }))
})

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
    width: 80vw;
    overflow-y: scroll;
    height: calc(100vh - 55px);
    flex: 1;
    padding: 64px 96px 42px 70px;
  }
}
</style>
