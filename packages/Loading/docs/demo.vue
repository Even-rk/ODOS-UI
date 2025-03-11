# 基础用法示例
<template>
  <div class="demo-container">
    <div class="demo-block">
      <h3>基础用法</h3>
      <odos-loading />
    </div>
    <hr />
    <div class="demo-block">
      <h3>显示提示文本</h3>
      <odos-loading :show-tip="true" />
    </div>
    <hr />
    <div class="demo-block">
      <h3>自定义提示文本颜色</h3>
      <odos-loading :show-tip="true" tip-color="pink" />
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.demo-block {
  flex: 1;
  text-align: center;
}

h3 {
  margin-bottom: 16px;
  font-size: 16px;
  color: #1d2129;
}
</style>
