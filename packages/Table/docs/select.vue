<template>
  <odos-table
    :columns="columns"
    :data="data"
    :isSelection="true"
    @selectChange="selectChange"
  ></odos-table>
</template>

<script setup lang="tsx">
const selectChange = (row: any[]) => {
  console.log(row)
}
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
    width: '200px',
    fixed: 'left'
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
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
    fixed: 'right',
    width: '200px'
  }
]
</script>
