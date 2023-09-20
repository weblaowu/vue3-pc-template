<template>
	<div class="search-wrap">
		<div
			v-for="({ compName, title, prop, type, ...item }, idx) in items"
			:key="idx"
			class="search-wrap_item"
		>
			<template v-if="type === 'button'">
				<t-button v-bind="item">{{ title }}</t-button>
			</template>
			<template v-else>
				<span v-if="title" class="title">{{ title }}</span>
				<slot :name="prop">
					<component
						:is="compName || Input"
						v-bind="item"
						v-model="dataComp[prop]"
						clearable
					>
					</component>
				</slot>
			</template>
		</div>
		<div class="search-btn">
			<slot name="search-btn"></slot>
		</div>
	</div>
</template>

<script setup>
import { Input } from 'tdesign-vue-next'

defineOptions({
	name: 'SearchWrap',
})

const props = defineProps({
	items: {
		type: Array,
		default: () => [],
	},
	data: {
		type: Object,
		default: () => ({}),
	},
})

const dataComp = computed({
	get() {
		return props.data
	},
})
</script>

<style lang="scss" scoped>
.search-wrap {
	background-color: #fff;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	margin-top: 15px;
	&_item {
		// width: 260px;
		display: flex;
		align-items: center;
		margin-right: 20px;
		margin-bottom: 15px;
		.title {
			white-space: nowrap;
			padding-right: 15px;
		}
	}
	.search-btn {
		display: flex;
		gap: 10px;
		margin-bottom: 15px;
	}
}
</style>
