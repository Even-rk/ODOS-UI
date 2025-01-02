<script setup>
import SLOT from './slot.vue'
import Default from './default.vue'
import Selection from './select.vue'
import Children from './children.vue'
import Fixed from './fixed.vue'
import API from './api.vue'
import ColumnsAPI from './columns-api.vue'
</script>

# Table表格

## 基础使用

<Preview comp-name="Table" demo-name="default">
  <Default />
</Preview>

## 可选择

<Preview comp-name="Table" demo-name="select">
  <Selection />
</Preview>

## 固定列

<Preview comp-name="Table" demo-name="fixed">
  <Fixed />
</Preview>

## 镶嵌子表格

<Preview comp-name="Table" demo-name="children">
  <Children />
</Preview>

# Table API

## Table 属性

<API />

## Table slot

<SLOT />

## Columns 属性

<ColumnsAPI />
