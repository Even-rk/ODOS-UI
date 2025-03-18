<script setup>
import demo from './demo.vue'
import API from './api.vue'
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

<API />
