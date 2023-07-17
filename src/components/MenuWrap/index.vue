<template>
	<div>
		<t-head-menu v-model="activeMenu" theme="dark">
			<div v-for="{ compName, ...item } in menuDatas" :key="item.value">
				<component :is="compName" v-bind="item">
					<span>{{ item.title }}</span>
				</component>
			</div>
		</t-head-menu>
	</div>
</template>

<script setup>
import { MenuItem } from 'tdesign-vue-next'
import { routes } from '@/router/baseRoutes'

defineOptions({
	name: 'MenuWrap',
})

const route = useRoute()

const activeMenu = ref('')

onMounted(() => {
	setTimeout(() => {
		activeMenu.value = route.fullPath.slice(1)
	}, 300)
})

// 生成菜单数据
const menuDatas = routes
	.filter((item) => !item.redirect)
	.map((item) => {
		const { children, path } = item
		const index = children[0]
		return {
			title: index.meta.title,
			value: index.name,
			to: path,
			compName: MenuItem,
		}
	})
</script>

<style lang="scss" scoped></style>
