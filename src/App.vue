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

<style lang="scss">
@import '../styles/icon.scss';
html,
body {
  margin: 0;
  padding: 0;
}
.odos-ui {
  display: flex;
  min-height: 100vh;
  aside {
    box-sizing: border-box;
    width: 20vw;
    padding: 50px 50px 50px 100px;
    display: flex;
    flex-direction: column;
    a {
      padding: 8px;
      margin-bottom: 8px;
    }
    .router-link-exact-active {
      border-radius: 10px;
      background-color: #eef5fe;
      color: #2e6ce4;
    }
  }
  main {
    width: 80vw;
    flex: 1;
    padding: 15px;
  }
}
</style>
