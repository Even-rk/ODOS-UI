<script setup>
import basic from './basic.vue'
import search from './search.vue'
import multiple from './multiple.vue'
import title from './title.vue'
import disabled from './disabled.vue'
import mutex from './mutex.vue'
import slots from './slots.vue'
import TitleView from './title.vue'
import api from './api.vue'
</script>

# SmartSelect 智能选择器

## 基础使用

<Preview comp-name="SmartSelect" demo-name="basic">
  <basic />
</Preview>

## 带搜索功能

<Preview comp-name="SmartSelect" demo-name="search">
  <search />
</Preview>

## 多选模式

<Preview comp-name="SmartSelect" demo-name="multiple">
  <multiple />
</Preview>

## 带标题

<Preview comp-name="SmartSelect" demo-name="title">
  <TitleView />
</Preview>

## 禁用状态

<Preview comp-name="SmartSelect" demo-name="disabled">
  <disabled />
</Preview>

## 互斥选择

<Preview comp-name="SmartSelect" demo-name="mutex">
  <mutex />
</Preview>

## 插槽使用

<Preview comp-name="SmartSelect" demo-name="slots">
  <slots />
</Preview>

<api />
