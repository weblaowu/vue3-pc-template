import { debounce } from "lodash-es";
// 控制弹框取消和确定
export const useModal = () => {
  const visible = ref(false);
  const close = (boolean = false) => {
    visible.value = boolean;
  };
  const onConfirm = (cb = null, params) => {
    cb && cb(params);
  };
  return {
    visible,
    close,
    onConfirm,
  };
};

// 控制表格
export const useTable = () => {
  const height = ref("");
  const tableData = ref({
    list: [],
    total: 0,
  });

  const pagination = ref({
    current: 1,
    pageSize: 10,
    total: 0,
    onChange({ current, pageSize }) {
      this.current = current;
      this.pageSize = pageSize;
    },
  });
  watch(
    () => tableData.value.total,
    (total) => {
      pagination.value.total = total;
    }
  );
  // 设置数据
  const setTableData = (data = {}) => {
    tableData.value = data;
  };
  let tableRef = null;
  let cache = {};
  // resize 防抖
  const handleDebounce = debounce(setHeight, 200);
  // 计算出需要设置Ttable的高度
  function setHeight() {
    const bodyHeight = document.body.clientHeight;
    if (bodyHeight === cache.bodyHeight) return;
    const realHeight = bodyHeight - tableRef.offsetTop - 65;
    if (realHeight >= 200) {
      height.value = realHeight;
    }
    cache.bodyHeight = bodyHeight;
  }
  onMounted(() => {
    tableRef = document.getElementById("tableRef");
    if (!tableRef) return;
    setHeight();
    window.addEventListener("resize", handleDebounce);
  });
  onUnmounted(() => {
    if (!tableRef) return;
    cache = {};
    tableRef = null;
    window.removeEventListener("resize", handleDebounce);
  });
  return {
    tableData,
    pagination,
    setTableData,
    height,
  };
};
