<script setup>
import demo from './demo.vue'

import DemoPlacement from './demo-placement.vue'
import DemoWidth from './demo-width.vue'
import DemoFooter from './demo-footer.vue'
</script>

# Drawer 抽屉

抽屉组件用于从屏幕边缘滑出的浮层面板。

## 基本使用

<Preview comp-name="Drawer" demo-name="demo">
  <demo />
</Preview>

## 自定义位置

抽屉可以从四个方向滑出，通过设置 `placement` 属性来控制。

<Preview comp-name="Drawer" demo-name="demo-placement">
  <DemoPlacement />
</Preview>

## 自定义宽度

通过设置 `width` 属性来控制抽屉的宽度。

<Preview comp-name="Drawer" demo-name="demo-width">
  <DemoWidth />
</Preview>

## 自定义页脚

通过 `footer` 插槽来自定义抽屉的页脚。

<Preview comp-name="Drawer" demo-name="demo-footer">
  <DemoFooter />
</Preview>

## Drawer 属性

| 属性 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| open | 抽屉是否可见 | boolean | false |
| title | 抽屉标题 | string | -- |
| width | 抽屉宽度 | string \| number | -- |
| height | 抽屉高度，在 placement 为 top 或 bottom 时使用 | string \| number | -- |
| placement | 抽屉的方向 | -- | -- |
| closable | 是否显示左上角的关闭按钮 | boolean | true |
| keyboard | 是否支持键盘 esc 关闭 | boolean | true |
| mask | 是否显示遮罩 | boolean | true |
| maskClosable | 点击遮罩是否允许关闭 | boolean | true |
| destroyOnClose | 关闭时销毁 Drawer 里的子元素 | boolean | false |
| zIndex | 设置 Drawer 的 z-index | number | 1000 |
| class | 设置 Drawer 的类名 | string | -- |
| rootClassName | 设置 Drawer 的根类名 | string | -- |
| rootStyle | 设置 Drawer 的根样式 | object | -- |

