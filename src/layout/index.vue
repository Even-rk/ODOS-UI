<template>
  <div class="odos-ui">
    <aside>
      <!-- 快速上手 -->
      <div v-if="getStartLink" class="menu-category">
        <router-link :to="getStartLink.path" class="get-start-link">
          {{ getStartLink.name }}
        </router-link>
      </div>

      <!-- 基础组件 -->
      <div class="menu-category">
        <div class="category-title">基础组件</div>
        <router-link v-for="link in basicComponents" :key="link.path" :to="link.path">
          {{ link.name }}
        </router-link>
      </div>

      <!-- 展示组件 -->
      <div class="menu-category">
        <div class="category-title">展示组件</div>
        <router-link v-for="link in displayComponents" :key="link.path" :to="link.path">
          {{ link.name }}
        </router-link>
      </div>

      <!-- 反馈组件 -->
      <div class="menu-category">
        <div class="category-title">反馈组件</div>
        <router-link v-for="link in feedbackComponents" :key="link.path" :to="link.path">
          {{ link.name }}
        </router-link>
      </div>

      <!-- 导航组件 -->
      <div class="menu-category" v-if="navigationComponents.length > 0">
        <div class="category-title">导航组件</div>
        <router-link v-for="link in navigationComponents" :key="link.path" :to="link.path">
          {{ link.name }}
        </router-link>
      </div>

      <!-- 特殊组件 -->
      <div class="menu-category">
        <div class="category-title">特殊组件</div>
        <router-link v-for="link in specialComponents" :key="link.path" :to="link.path">
          {{ link.name }}
        </router-link>
      </div>

      <!-- 其他组件 -->
      <div class="menu-category" v-if="otherComponents.length > 0">
        <div class="category-title">其他组件</div>
        <router-link v-for="link in otherComponents" :key="link.path" :to="link.path">
          {{ link.name }}
        </router-link>
      </div>
    </aside>
    <main :class="{ 'has-toc': hasToc }">
      <router-view></router-view>
    </main>
    <TocNav @toc-change="handleTocChange" />
  </div>
</template>

<script setup lang="ts">
import ComponentList from 'packages/list.json'
import { onMounted, ref, computed } from 'vue'
import TocNav from '@/components/TocNav.vue'
import { componentGroups } from './component-categories'

// 将组件按照类型分类
const allComponents = ComponentList.map((item) => ({
  path: `/components/${item.compName}`,
  name: item.compZhName,
  compName: item.compName,
  isUseComp: item.compName === 'useComp'
}))

// 获取快速上手链接
const getStartLink = computed(() => {
  return allComponents.find((item) => item.isUseComp)
})

// 基础组件
const basicComponents = computed(() => {
  return allComponents
    .filter((item) => componentGroups.basic.includes(item.compName))
    .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
})

// 展示组件
const displayComponents = computed(() => {
  return allComponents
    .filter((item) => componentGroups.display.includes(item.compName))
    .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
})

// 反馈组件
const feedbackComponents = computed(() => {
  return allComponents
    .filter((item) => componentGroups.feedback.includes(item.compName))
    .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
})

// 导航组件
const navigationComponents = computed(() => {
  return allComponents
    .filter((item) => componentGroups.navigation.includes(item.compName))
    .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
})

// 特殊组件
const specialComponents = computed(() => {
  return allComponents
    .filter((item) => componentGroups.special.includes(item.compName))
    .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
})

// 其他未分类组件
const otherComponents = computed(() => {
  const categorizedCompNames = [
    ...componentGroups.basic,
    ...componentGroups.display,
    ...componentGroups.feedback,
    ...componentGroups.navigation,
    ...componentGroups.special,
    'useComp' // 排除快速上手
  ]

  return allComponents
    .filter((item) => !categorizedCompNames.includes(item.compName))
    .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
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

    .menu-category {
      margin-bottom: 20px;

      .category-title {
        font-size: 16px;
        color: #333;
        font-weight: bold;
        margin-bottom: 12px;
      }

      .get-start-link {
        font-weight: bold;
        color: #2e6ce4;
      }
    }

    a {
      padding: 8px 16px;
      margin-bottom: 8px;
      font-size: 14px;
      display: block;
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

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
