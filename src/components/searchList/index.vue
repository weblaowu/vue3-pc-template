<template>
  <div class="search-list">
    <div class="search-list_item" v-for="{ compName, ...item } in searchItem">
      <span class="title" v-if="item.title">{{ item.title }}</span>
      <slot :name="item.prop">
        <component
          :is="compName || Input"
          v-bind="item"
          clearable
          v-model="searchData[item.prop]"
        >
        </component>
      </slot>
    </div>
    <div class="search-btn">
      <slot name="search-btn"></slot>
    </div>
  </div>
</template>

<script setup>
import { Input } from "tdesign-vue-next";

defineProps({
  searchItem: {
    type: Array,
    default: () => [],
  },
  searchData: {
    type: Object,
    default: () => {},
  },
});
</script>

<style lang="scss" scoped>
.search-list {
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 15px;
  &_item {
    width: 260px;
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
