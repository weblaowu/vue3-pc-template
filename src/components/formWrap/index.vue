<template>
  <div class="form-wrap">
    <div class="title">{{ title }}</div>
    <t-form v-bind="$attrs" :data="data" ref="tform" @submit="onSubmit">
      <template
        v-for="{
          show = true,
          compProps,
          compName,
          slotName,
          ...item
        } in formItem"
      >
        <t-form-item v-bind="item" v-if="show">
          <slot :name="slotName">
            <!-- 默认是 input，不满足可自定义 -->
            <component
              :is="compName || Input"
              v-bind="compProps || {}"
              clearable
              v-model="dataComp[item?.name]"
            />
          </slot>
        </t-form-item>
      </template>
      <t-form-item
        v-show="showSubmit"
        label-width="0"
        class="form-wrap_btn"
        :style="{ 'justify-content': btnAlign }"
      >
        <t-button theme="default" @click="handleCancel">取消</t-button>
        <t-button theme="primary" type="submit">确认</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>

<script setup>
import { Input } from "tdesign-vue-next";

defineOptions({
  name: "FromWrap",
});

const props = defineProps({
  showSubmit: {
    type: Boolean,
    default: true,
  },
  btnAlign: {
    type: String,
    default: "flex-end",
  },
  title: {
    type: String,
    default: "",
  },
  formItem: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["ok", "cancel", "after-close", "update:value"]);

const dataComp = computed({
  get() {
    return props.data;
  },
  set(value) {},
});

const tform = ref(null);
// 确认
function onSubmit(valid) {
  const { validateResult } = valid;
  if (validateResult === true) {
    emit("ok");
    emit("after-close");
  }
}

function handleCancel() {
  emit("cancel");
  emit("after-close");
}
</script>

<style lang="scss" scoped>
.form-wrap {
  padding: 0 20px;
  background-color: #fff;
  box-sizing: border-box;
  .title {
    margin-bottom: 20px;
    font-size: 16px;
    color: hsl(0, 0%, 7%);
    font-weight: 600;
  }
  &_btn {
    display: flex;
    margin-top: 40px !important;
    z-index: 200;
    .t-button + .t-button {
      margin-left: 15px;
    }
  }
}
</style>
