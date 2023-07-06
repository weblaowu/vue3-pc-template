<template>
	<t-config-provider :global-config="globalConfig">
		<menu-wrap v-if="isDev" />
		<router-view />
	</t-config-provider>
</template>

<script setup>
import MenuWrap from '@/components/MenuWrap/index.vue'
import enConfig from 'tdesign-vue-next/es/locale/zh_CN'

const globalConfig = {
	enConfig,
}

const isDev = import.meta.env.MODE === 'development'
</script>
<style scoped lang="scss"></style>
