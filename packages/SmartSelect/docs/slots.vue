<template>
  <div class="demo-container">
    <h4>自定义选项内容 (option插槽)</h4>
    <SmartSelect
      v-model:value="optionValue"
      :options="optionOptions"
      placeholder="请选择用户"
      style="width: 300px"
    >
      <template #option="{ option, selected }">
        <div class="custom-option">
          <div class="user-avatar">{{ option.label.charAt(0) }}</div>
          <div class="user-info">
            <div class="user-name">{{ option.label }}</div>
            <div class="user-role">{{ (option as any).role }}</div>
          </div>
          <div v-if="selected" class="selected-icon">✓</div>
        </div>
      </template>
    </SmartSelect>

    <h4>自定义下拉框内容 (dropdownRender插槽)</h4>
    <SmartSelect
      v-model="dropdownValue"
      :options="dropdownOptions"
      placeholder="请选择操作"
      style="width: 300px"
    >
      <template #dropdownRender="{ options, empty }">
        <div class="custom-dropdown">
          <div class="dropdown-header">
            <h5>快速操作</h5>
          </div>
          <div v-if="empty" class="empty-content">
            <div>暂无数据</div>
          </div>
          <div v-else class="dropdown-content">
            <div
              v-for="option in options"
              :key="option.value"
              class="custom-dropdown-item"
              @click="handleDropdownItemClick(option)"
            >
              <Icon :name="(option as any).icon" />
              <span>{{ option.label }}</span>
            </div>
          </div>
          <div class="dropdown-footer">
            <button class="add-btn" @click="addNewItem">+ 添加新项</button>
          </div>
        </div>
      </template>
    </SmartSelect>

    <h4>自定义后缀图标 (suffixIcon插槽)</h4>
    <SmartSelect v-model="suffixValue" :options="suffixOptions" placeholder="请选择状态" style="width: 300px">
      <template #suffixIcon>
        <Icon name="Arrow" style="transition: transform 0.2s ease" />
      </template>
    </SmartSelect>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SmartSelect from '../src/index.vue'
import Icon from '../../Icon/src/index.vue'

const optionValue = ref('')
const optionOptions = ref([
  { label: '张三', value: 'zhangsan', role: '前端开发工程师' },
  { label: '李四', value: 'lisi', role: '后端开发工程师' },
  { label: '王五', value: 'wangwu', role: '产品经理' },
  { label: '赵六', value: 'zhaoliu', role: 'UI设计师' }
])

const dropdownValue = ref('')
const dropdownOptions = ref([
  { label: '编辑', value: 'edit', icon: 'Edit' },
  { label: '删除', value: 'delete', icon: 'Delete' },
  { label: '复制', value: 'copy', icon: 'Copy' },
  { label: '分享', value: 'share', icon: 'Share' }
])

const suffixValue = ref('')
const suffixOptions = ref([
  { label: '进行中', value: 'progress' },
  { label: '已完成', value: 'completed' },
  { label: '已取消', value: 'cancelled' },
  { label: '待审核', value: 'pending' }
])

const handleDropdownItemClick = (option: any) => {
  dropdownValue.value = option.value
}

const addNewItem = () => {
  console.log('添加新项')
}
</script>

<style scoped lang="scss">
.demo-container {
  display: flex;
  flex-direction: column;
  gap: 24px;

  h4 {
    margin: 0 0 12px 0;
    font-size: 16px;
    font-weight: 500;
    color: #1d2129;
  }
}

.custom-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;

  .user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #2e6ce4;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 14px;
  }

  .user-info {
    flex: 1;

    .user-name {
      font-size: 14px;
      color: #1d2129;
      font-weight: 500;
    }

    .user-role {
      font-size: 12px;
      color: #86909c;
      margin-top: 2px;
    }
  }

  .selected-icon {
    color: #2e6ce4;
    font-weight: bold;
  }
}

.custom-dropdown {
  .dropdown-header {
    padding: 12px 16px 8px;
    border-bottom: 1px solid #f2f3f5;

    h5 {
      margin: 0;
      font-size: 14px;
      font-weight: 500;
      color: #1d2129;
    }
  }

  .empty-content {
    padding: 24px;
    text-align: center;
    color: #86909c;
  }

  .dropdown-content {
    padding: 8px 0;
  }

  .custom-dropdown-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background: #f2f3f5;
    }

    span {
      font-size: 14px;
      color: #1d2129;
    }
  }

  .dropdown-footer {
    padding: 8px 16px 12px;
    border-top: 1px solid #f2f3f5;

    .add-btn {
      width: 100%;
      padding: 6px 12px;
      border: 1px dashed #c9cdd4;
      background: transparent;
      color: #86909c;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      transition: all 0.2s ease;

      &:hover {
        border-color: #2e6ce4;
        color: #2e6ce4;
      }
    }
  }
}
</style>
