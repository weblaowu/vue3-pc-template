<template>
	<div v-if="modelValue" ref="secondWrap" class="second-wrap">
		<div class="seconch-wrap_body">
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
import { animateCSS } from '@/utils/animate'

const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false,
	},
})
defineEmits(['update:modelValue'])

const secondWrap = ref(null)

watch(
	() => props.modelValue,
	(val) => {
		if (!val) return
		nextTick(() => {
			animateCSS(secondWrap.value, 'fadeInUp')
		})
	}
)
onMounted(() => {
	const height = document.body.clientHeight
	if (secondWrap.value) {
		secondWrap.value.style.height = `${height}px`
	}
})
</script>

<style lang="scss" scoped>
.second-wrap {
	box-sizing: border-box;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	background-color: #fff;
	padding: 10px;
	z-index: 2000;
	overflow-y: scroll;
	overflow-x: hidden;
	&_body {
		margin-bottom: 30px;
	}
}
</style>
