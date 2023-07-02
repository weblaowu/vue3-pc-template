<template>
  <t-config-provider :global-config="globalConfig">
    <menu-wrap v-if="isDev" />
    <div class="app">
      <router-view />
    </div>
  </t-config-provider>
</template>

<script setup>
import MenuWrap from "@/components/menuWrap/index.vue";
import enConfig from "tdesign-vue-next/es/locale/zh_CN";

const globalConfig = {
  enConfig,
};

const isDev = import.meta.env.MODE === "development";
</script>
<style scoped lang="scss">
.link-list {
  display: flex;
  gap: 20px;
}
.app {
  padding: 0 10px;
}
</style>
