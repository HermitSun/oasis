import axios from "axios";
import { Message } from "element-ui";

const globalConfig = {
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://wensun.top/api'
      : // : "http://116.62.23.105:8081";
      "http://localhost:3180";
  timeout: 60 * 1000
  // 如果启用凭据，后端必须在AllowOrigin里指定源，而不能是*
  // withCredentials: true
};

const globalAxios = axios.create(globalConfig);

// 请求过滤器
globalAxios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应过滤器
globalAxios.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    Message.error(error.toString());
    return Promise.resolve(error);
  }
);

export default globalAxios;