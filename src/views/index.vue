<template>
  <div class="odos-home">
    <div class="banner" text="center">
      <div class="banner-desc">
        <h1>ODOS-UI</h1>
        <p>ODOSUI,一套为医疗场景准备的vue3组件库</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.odos-home {
  width: 800px;
  margin: 20px auto;
  padding: 40px 40px 0;
  position: relative;
  .banner-desc h1 {
    font-size: 48px;
    font-weight: 800;
    margin-top: 40px;
    margin: 0;
    font-family: Inter, sans-serif;
  }
}
[text~='center'] {
  text-align: center;
}
</style>
