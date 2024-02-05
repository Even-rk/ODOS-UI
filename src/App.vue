<template>
  <header class="header">
    <div class="logo">
      <img src="./assets/imgs/logo.png" />
    </div>
    <div class="components">
      <odos-button type="text" size="large" @click="$router.push('/home')">首页</odos-button>
      <odos-button type="text" size="large" @click="$router.push('/layout')">组件</odos-button>
    </div>
  </header>
  <router-view></router-view>
</template>

<script setup lang="ts"></script>
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
  }
}
</style>
