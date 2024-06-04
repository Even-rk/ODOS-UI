<template>
  <odos-table :columns="columns" :data="data" :scroll="{ x: 1300 }"> </odos-table>
</template>

<script setup lang="tsx">
const data = [
  {
    key: '1',
    name: 'Jane Doe',
    salary: 23000,
    address: '32 Park Road, London',
    email: 'jane.doe@example.com'
  },
  {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com'
  },
  {
    key: '3',
    name: 'Kevin Sandra',
    salary: 22000,
    address: '31 Park Road, London',
    email: 'kevin.sandra@example.com'
  },
  {
    key: '4',
    name: 'Ed Hellen',
    salary: 17000,
    address: '42 Park Road, London',
    email: 'ed.hellen@example.com'
  },
  {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
  }
]

const columns = [
  {
    title: 'Index',
    dataIndex: 'key',
    fixed: 'left',
    sorter: true,
    width: '100px'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: '200px'
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
    slotName: 'Salary',
    width: '200px'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: '200px'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: '100px',
    fixed: 'right'
  }
]
</script>
