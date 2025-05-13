<script setup>
import demo from './demo.vue'
import PassWord from './password.vue'
import Search from './search.vue'
import Disabled from './disabled.vue'
import API from './api.vue'
import Event from './event.vue'
import TitleDemo from './title.vue'
import Unit from './unit.vue'
import Slots from './slots.vue'
</script>

# Input输入框

## 基础使用

<Preview comp-name="Input" demo-name="demo">
  <demo />
</Preview>

## 密码输入框

<Preview comp-name="Input" demo-name="password">
  <PassWord />
</Preview>

## Search搜索框

<Preview comp-name="Input" demo-name="search">
  <Search />
</Preview>

## 禁用

<Preview comp-name="Input" demo-name="disabled">
  <Disabled />
</Preview>

## 设置title

<Preview comp-name="Input" demo-name="title">
  <TitleDemo />
</Preview>

## 设置unit

<Preview comp-name="Input" demo-name="unit">
  <Unit />
</Preview>

## 使用插槽
<Preview comp-name="Input" demo-name="slots">
  <Slots />
</Preview>

## Input API

### Input 属性

<API />

### Input 事件

<Event />
