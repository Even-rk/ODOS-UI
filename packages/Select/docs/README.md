<script setup>
import demo from './demo.vue'
import Disabled from './disabled.vue'
import API from './api.vue'
import Event from './event.vue'
import SLOT from './slot.vue'
import Multiple from './multiple.vue'
import FilterDemo from './filter.vue'  
import TitleDemo from './title.vue'
</script>

# Select选择框

## 基本使用

<Preview comp-name="Select" demo-name="demo">
  <demo />
</Preview>

## 禁用

<Preview comp-name="Select" demo-name="disabled">
  <Disabled />
</Preview>

## 多选

<Preview comp-name="Select" demo-name="multiple">
  <Multiple />
</Preview>

## 设置title

<Preview comp-name="Select" demo-name="title">
  <TitleDemo />
</Preview>

## 筛选

<Preview comp-name="Select" demo-name="filter">
  <FilterDemo />
</Preview>

## Select Api

### Select 属性

<API/>

### Select event

<Event/>

### Select 插槽

<SLOT/>
