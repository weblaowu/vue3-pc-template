<template>
	<div class="search-wrap">
		<div class="search-content">
			<div
				v-for="({ compName, title, prop, type, ...item }, idx) in items"
				:key="idx"
				:style="{ width: item.width }"
				:class="['search-content_item', { 'item-width': type !== 'button' }]"
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
		</div>
		<div class="search-btn">
			<slot></slot>
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
	justify-content: space-between;
	margin-top: 15px;
	.search-content {
		display: flex;
		align-items: center;
		&_item {
			display: flex;
			align-items: center;
			margin-right: 20px;
			margin-bottom: 15px;
			.title {
				white-space: nowrap;
				padding-right: 15px;
			}
		}
		.item-width {
			width: 220px;
		}
	}
	.search-btn {
		display: flex;
		gap: 10px;
	}
}
</style>
