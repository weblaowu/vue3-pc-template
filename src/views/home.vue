<template>
	<div class="home-wrap">
		<!-- <from-wrap :from-item="fromItem" :data="fromData" /> -->
		<search-wrap :items="searchItem" :data="searchData" />
		<t-table
			id="tableRef"
			row-key="index"
			:data="tableData"
			:columns="columns"
			:height="height"
			:pagination="pagination"
			resizable
		/>
	</div>
</template>

<script setup lang="jsx">
// import FromWrap from '@/components/FormWrap/index.vue'
import SearchWrap from '@/components/SearchWrap/index.vue'
import { useTable } from '@/use/useTdesign'
import { Select } from 'tdesign-vue-next'

const { pagination, height } = useTable()

// const fromItem = ref([
// 	{ label: '姓名', props: 'name' },
// 	{ label: '性别', props: 'gender' },
// ])
// const fromData = ref({
// 	name: '',
// 	gender: '',
// })
const searchData = ref({
	name: '',
	gender: '',
})
const searchItem = [
	{ title: '姓名', prop: 'name' },
	{
		title: '性别',
		prop: 'gender',
		compName: Select,
		options: [
			{ label: '男', value: '1' },
			{ label: '女', value: '2' },
		],
	},
	{
		title: '搜索',
		type: 'button',
		onClick: () => {
			console.log('dainji: ~~~~')
		},
	},
	{
		title: '下载',
		type: 'button',
		theme: 'default',
		variant: 'outline',
		onClick: () => {
			console.log('下载: ~~~~')
		},
	},
]

const statusNameListMap = {
	0: { label: '审批通过', theme: 'success' },
	1: { label: '审批失败', theme: 'danger' },
	2: { label: '审批过期', theme: 'warning' },
}

const tableData = ref([
	{
		applicant: 'xxxx',
		status: 1,
		channel: 'cccc',
		'detail.email': 'email',
		createTime: '2020-10-10',
	},
	{
		applicant: 'xxxx',
		status: 0,
		channel: 'cccc',
		'detail.email': 'email',
		createTime: '2020-10-10',
	},
])

const columns = [
	{ colKey: 'applicant', title: '申请人', width: '100' },
	{
		colKey: 'status',
		title: '申请状态',
		cell: (h, { row }) => {
			return (
				<t-tag
					shape="round"
					theme={statusNameListMap[row.status].theme}
					variant="light-outline"
				>
					{statusNameListMap[row.status].label}
				</t-tag>
			)
		},
	},
	{ colKey: 'channel', title: '签署方式' },
	{ colKey: 'detail.email', title: '邮箱地址', ellipsis: true },
	{ colKey: 'createTime', title: '申请时间' },
]
</script>

<style lang="scss" scoped>
.home-wrap {
	padding: 0 10px;
}
</style>
