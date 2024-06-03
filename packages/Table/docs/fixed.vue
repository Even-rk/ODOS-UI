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
    title: 'Name',
    dataIndex: 'name',
    fixed: 'left',
    sorter: true
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
    slotName: 'Salary',
    fixed: true,
    width: '500px'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: '500px'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: '500px'
  }
]
</script>
