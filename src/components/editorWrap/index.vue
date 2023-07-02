<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 400px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script setup>
// 若使用改组件，请安装这两个依赖 @wangeditor/editor | @wangeditor/editor-for-vue
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { uploadCoverAPI } from "@/api/index";
import { throttle } from "lodash-es";

defineOptions({
  name: "EditorWrap",
});

const emit = defineEmits(["message"]);

const mode = "default";

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref();

const throttleMessage = throttle((val) => emit("message", val), 1000);

watch(
  () => valueHtml.value,
  (val) => {
    if (val === "<p><br></p>") return throttleMessage("");
    throttleMessage(val);
  }
);

const toolbarConfig = {
  excludeKeys: [
    "italic",
    "insertVideo",
    "uploadVideo",
    "todo",
    "codeBlock",
    "group-video",
    "group-more-style",
    "insertLink",
    "undo",
    "redo",
    "fullScreen",
    "insertTable",
    "bulletedList",
    "numberedList",
    "blockquote",
    "divider",
  ],
};
const editorConfig = {
  placeholder: "请输入内容...",
  MENU_CONF: {
    uploadImage: {
      // 自定义上传
      async customUpload(file, insertFn) {
        const form = new FormData();
        form.append("file", file);
        uploadCoverAPI(form).then((res) => {
          const { data } = res;
          // 插入图片
          insertFn(data, "上传图片", data);
        });
      },
    },
  },
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

// 设置 mssage

function setMessage(msg) {
  valueHtml.value = msg;
}
defineExpose({
  setMessage,
});
</script>
