<template>
	<div id="searchWrap" class="search-wrap">
		<div class="search-wrap_body">
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
import { animateCSS } from '@/tools/utils/index'

onMounted(() => {
	const height = document.body.clientHeight
	const searchWrap = document.getElementById('searchWrap')
	searchWrap.style.height = `${height}px`
	animateCSS('.search-wrap', 'fadeInUp')
})
</script>

<style lang="scss" scoped>
.search-wrap {
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
