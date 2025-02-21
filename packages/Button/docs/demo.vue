<template>
  <div class="demo-button">
    <!-- 基础按钮类型 -->
    <div class="button-row">
      <h4>基础按钮类型</h4>
      <div class="button-group">
        <odos-button>默认按钮</odos-button>
        <odos-button type="primary">主要按钮</odos-button>
        <odos-button type="line">线框按钮</odos-button>
        <odos-button type="text">文本按钮</odos-button>
      </div>
    </div>

    <!-- 带图标的按钮 -->
    <div class="button-row">
      <h4>带图标的按钮</h4>
      <div class="button-group">
        <odos-button icon="Add">新增</odos-button>
        <odos-button icon="Delete" type="primary">删除</odos-button>
        <odos-button icon="Edit" type="line">编辑</odos-button>
        <odos-button icon="Search" type="text">搜索</odos-button>
      </div>
    </div>

    <!-- 禁用状态 -->
    <div class="button-row">
      <h4>禁用状态</h4>
      <div class="button-group">
        <odos-button disabled>default</odos-button>
        <odos-button type="primary" disabled>primary</odos-button>
        <odos-button type="line" disabled>line</odos-button>
        <odos-button type="text" disabled>text</odos-button>
      </div>
    </div>

    <!-- 不同尺寸 -->
    <div class="button-row">
      <h4>不同尺寸</h4>
      <div class="button-group">
        <odos-button size="small">小按钮</odos-button>
        <odos-button size="medium">中按钮</odos-button>
        <odos-button size="large">大按钮</odos-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo-button {
  .button-row {
    margin-bottom: 2rem;

    h4 {
      margin: 0 0 1rem;
      color: #1d2129;
      font-weight: 500;
    }

    .button-group {
      display: flex;
      gap: 1rem;
      align-items: center;
      flex-wrap: wrap;
    }
  }
}
</style>
