import axios from "axios";
import { MessagePlugin } from "tdesign-vue-next";

// 请求取消
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const service = axios.create({
  timeout: 30000, // 请求超时时间
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  cancelToken: source.token,
});

// 请求拦截
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/** 添加响应拦截器  * */
service.interceptors.response.use(
  (response) => {
    const { data, status } = response;
    if (status === 200) {
      const { code, message } = data;
      if (code !== 200) {
        MessagePlugin.closeAll();
        MessagePlugin.error(message);
      } else {
        return data;
      }
    }
  },
  (error) => {
    if (error.response) {
      console.log("error: ", error);
    }
  }
);

export default service;
