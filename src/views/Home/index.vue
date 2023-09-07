<template>
	<div class="home-wrap container">
		<search-wrap :items="searchItem" :data="searchData" />
		<t-table
			id="tableRef"
			row-key="index"
			:data="tableData"
			:columns="columns"
			:pagination="pagination"
			resizable
		/>
	</div>
	<SecondWrap v-model="showSecond">
		<FormWrap
			:items="formItem"
			:data="formData"
			@ok="onSubmit"
			@cancel="onCancel"
		/>
	</SecondWrap>
</template>

<script setup lang="jsx">
import { Select } from 'tdesign-vue-next'
import useRequest from '@/use/useRequest'
import { formState } from './homeState'
import { checkPermissionAPI } from '@api/index.js'

const { formData, formItem, initFormData } = formState()

// 搜素条件
const searchData = ref({
	name: '',
	gender: '',
	pageSize: 10,
	pageNum: 1,
})

const { data: tableData, run } = useRequest(checkPermissionAPI, {
	params: searchData.value,
})

tableData.value = [
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
]

// 搜索字段
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
			console.log('dainji: ~~~~', run())
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

const pagination = ref({
	current: 1,
	pageSize: 10,
	total: 0,
	onChange({ current, pageSize }) {
		this.current = current
		this.pageSize = pageSize
	},
})

const showSecond = ref(false)

const statusNameListMap = {
	0: { label: '审批通过', theme: 'success' },
	1: { label: '审批失败', theme: 'danger' },
	2: { label: '审批过期', theme: 'warning' },
}

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
	{
		colKey: 'action',
		title: '操作',
		cell: (h, { row }) => (
			<span class="action-wrap">
				<span onclick={openSecond}>编辑</span>
				<span>删除</span>
			</span>
		),
	},
]

function openSecond() {
	showSecond.value = true
}

function onCancel() {
	showSecond.value = false
	initFormData()
}
function onSubmit() {
	console.log('onSubmit')
}
</script>

<style lang="scss" scoped>
.home-wrap {
}
</style>
