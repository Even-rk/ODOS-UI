<script setup>
import demo from './demo.vue'
</script>

# TextDisplay 文本展示组件

TextDisplay 组件用于文本的展示，支持超出宽度显示省略号和跑马灯效果。

## 功能特点

- 支持指定宽度，超出宽度的文字展示省略号，并在鼠标悬停时显示完整文本（Tooltip）
- 支持跑马灯效果，文字超出宽度时自动循环滚动

<Preview comp-name="TextDisplay" demo-name="demo">
  <demo />
</Preview>

## TextDisplay API

### 属性

| 参数      | 说明        | 类型                      | 默认值        |
|---------|-----------|-------------------------|------------|
| text    | 文本内容      | string                  | -          |
| width   | 容器宽度，单位px | number                  | -          |
| mode    | 显示模式      | 'ellipsis' \| 'marquee' | 'ellipsis' |
| trigger | 触发方式      | 'hover' \| 'click'      | 'hover'    |

### 插槽

| 插槽名     | 说明   |
|---------|------|
| default | 默认插槽 |

### 使用示例_

```vue
<!-- 省略号模式 -->
<odos-text-display
  text="这是一段很长的文本，超出部分将显示省略号"
  :width="200"
/>

<!-- 跑马灯模式 -->
<odos-text-display
  text="这是一段很长的文本，将以跑马灯形式展示"
  :width="200"
  mode="marquee"
/>
```

### 注意事项

1. 当设置 `mode="ellipsis"` 时：
    - 文本超出容器宽度将显示省略号
    - 鼠标悬停时会通过 Tooltip 显示完整文本

2. 当设置 `mode="marquee"` 时：
    - 文本超出容器宽度将以跑马灯形式循环滚动
    - 可以通过 `duration` 属性调整滚动速度
    - 跑马灯效果采用无缝衔接的形式，头尾相连

3. 组件高度固定为 16px，确保在不同模式下保持一致的视觉效果 