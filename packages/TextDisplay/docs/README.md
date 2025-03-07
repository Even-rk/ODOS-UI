<script setup>
import demo from './demo.vue'
</script>

# TextDisplay 文本展示组件

TextDisplay 组件用于文本的展示，支持超出宽度显示省略号和跑马灯效果。

## 功能特点

- 支持指定宽度，超出宽度的文字展示省略号，并在鼠标悬停时显示完整文本（Tooltip）
- 支持指定宽度，文字超出宽度展示跑马灯效果，轮循显示所有内容
- 支持多行文本省略
- 支持自定义文本对齐方式
- 支持自定义跑马灯动画速度和延迟

<Preview comp-name="TextDisplay" demo-name="demo">
  <demo />
</Preview>

## TextDisplay API

### 属性

| 参数     | 说明                               | 类型                       | 默认值    |
| -------- | ---------------------------------- | -------------------------- | --------- |
| text     | 文本内容                           | string                     | ''        |
| mode     | 显示模式                           | 'ellipsis' \| 'marquee'    | 'ellipsis'|
| width    | 容器宽度，单位px                   | number                     | null      |
| align    | 文本对齐方式                       | 'left' \| 'center' \| 'right' | 'left' |
| duration | 跑马灯动画持续时间，单位秒         | number                     | 10        |
| delay    | 跑马灯动画延迟时间，单位秒         | number                     | 1         |
| lines    | 行数，仅在ellipsis模式下生效       | number                     | 1         |

### 插槽

| 插槽名称 | 说明                           |
| -------- | ------------------------------ |
| default  | 文本内容，会覆盖text属性       |

### 注意事项

1. 当设置 `mode="ellipsis"` 时，文本超出容器宽度将显示省略号，并在鼠标悬停时通过Tooltip显示完整文本
2. 当设置 `mode="marquee"` 时，只有当文本内容超出容器宽度时才会触发跑马灯效果，跑马灯会轮循显示所有内容
3. 多行省略 `lines` 属性仅在 `mode="ellipsis"` 模式下生效
4. 当未设置 `width` 属性时，组件会自动占满父容器的宽度
5. 跑马灯效果使用 CSS 动画实现，可通过 `duration` 和 `delay` 属性调整动画速度和延迟 