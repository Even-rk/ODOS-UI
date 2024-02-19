<template>
  <header class="header">
    <div class="logo">
      <img src="./assets/imgs/logo.png" />
    </div>
    <div class="components">
      <odos-button type="text" size="large" @click="$router.push('/home')">
        <b :class="{ active: $route.fullPath === '/home' }">首页</b>
      </odos-button>
      <odos-button type="text" size="large" @click="$router.push('/layout')">
        <b :class="{ active: $route.fullPath.includes('components') }">组件</b>
      </odos-button>
    </div>
  </header>
  <router-view></router-view>
</template>
<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  height: 55px;
  padding: 0 100px;
  border-bottom: 1px solid #dddfe5;
  .logo {
    height: 80%;
    img {
      height: 100%;
    }
  }
  .components {
    margin-left: 150px;
    button {
      color: #38485c;
      font-weight: bold;
      .active {
        color: #3f6bdc;
      }
    }
  }
}
</style>
