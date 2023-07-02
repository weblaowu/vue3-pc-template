// 校验数字加英文字母
export const validateEnAndNum = /^[0-9a-zA-Z]+$/gi;

/**
 * 读取图片
 * @param {string} img 图片名称
 * @param {string} format 图片格式，默认是svg
 */
export const getImgUrl = (img, format = "svg") => {
  return new URL(`../../assets/image/${img}.${format}`, import.meta.url).href;
};

// 判断promise 类型
export function isPromise(p) {
  return Object.prototype.toString.call(p) === "[object Promise]";
}

export function isFunction(p) {
  return Object.prototype.toString.call(p) === "[object Function]";
}

export function isObject(p) {
  return Object.prototype.toString.call(p) === "[object Object]";
}

// 根据 items 生成 maps
export function generateMaps(items, type = "name", params = {}) {
  const map = { ...params };
  items.forEach((item) => {
    if (map[item[type]] !== undefined) {
      map[item[type]] = "";
    }
  });
  return map;
}

/**
 * 合并目标数据到源数据，不改变源数据结构，返回新的数据
 * @param {object} source 源对象
 * @param {object} target 目标对象
 * @returns
 */
export function mergeData(source, target = {}) {
  const data = { ...source };
  for (let key of Object.keys(data)) {
    const value = target[key];
    if (value !== undefined) {
      data[key] = value;
    }
  }
  return data;
}

// 判断是否是IOS
export const isIOS = (() => {
  return /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
})();

// 判断是否是安卓
export const isAndroid = (() => {
  return /android/.test(navigator.userAgent.toLowerCase());
})();

// 判断是否是微信内置浏览器
export function isWeixin() {
  var ua = navigator.userAgent.toLowerCase();
  return ua.match(/MicroMessenger/i) == "micromessenger";
}

/**
 * animate 封装，需借助第三方库 Animate.css
 * @param {string} element 要获取的DOM元素的classNam或id
 * @param {string} animation 需要实现的动画className
 */
export function animateCSS(element, animation, prefix = "animate__") {
  // We create a Promise and return it
  new Promise((resolve) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);
    // console.log('node: ', node.classList)
    node.classList.add(`${prefix}animated`, animationName);
    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }
    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });
}

// Lottie 动画
export const lottieAnimate = (el, animationData, opt = {}) => {
  return lottie.loadAnimation({
    container: document.getElementById(el), // 绑定dom节点
    renderer: "svg", // 渲染方式:svg、canvas
    loop: false, // 是否循环播放，默认：false
    autoplay: true, // 是否自动播放, 默认true
    animationData, // AE动画使用bodymovie导出为json数据
    ...opt,
  });
};

// 手机号正则
export const regPhone =
  /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;

export function queryString(data) {
  let keyValue = "";
  Object.keys(data).forEach((key) => {
    keyValue += `${key}=${data[key]}`;
  });
  return keyValue;
}

/**
 * 导出json文件
 * @param {*} data
 * @param {*} fileName
 */
export function exportToJSON(data, fileName = "导出.xls") {
  const uri = window.URL.createObjectURL(new Blob([data]));
  // 通过创建a标签实现
  const link = document.createElement("a");
  link.href = uri;
  // 对下载的文件命名
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(uri);
}

// 获取图片分base64格式
export const getBase64 = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve) => {
    reader.onload = () => {
      resolve(reader.result);
    };
  });
};

// 获取图片像素
export async function getImgPx(file) {
  const base64 = await getBase64(file);
  const image = new Image();
  image.src = base64;
  return new Promise((resolve) => {
    image.onload = () => {
      const width = image.width;
      const height = image.height;
      resolve({ width, height });
    };
  });
}

/**
 * 格式化时间
 * @param {object | string} params
 * @param {string} params.date 时间字符串
 * @param {string} params.separator 年月日时间分隔符
 * @param {boolean} params.showHour 是否显示时分秒
 */
export function formatDate(params) {
  // 判断params的数据格式
  let date = null,
    separator = "-",
    showHour = true;
  if (isObject(params)) {
    params.date && (date = new Date(params.date));
    params.separator && (separator = params.separator);
    params.showHour !== undefined && (showHour = params.showHour);
  } else {
    date = params ? new Date(params) : new Date();
  }
  //获取年月日，时间
  const year = date.getFullYear();
  const mon =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const data = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const min =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const seon =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  const _newYear = `${year}${separator}${mon}${separator}${data}`;
  const _newHour = `${hour}:${min}:${seon}`;
  const _newDate = showHour ? `${_newYear} ${_newHour}` : _newYear;
  return _newDate;
}
