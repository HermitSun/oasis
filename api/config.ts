import axios from 'axios';

const globalConfig = {
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://wensun.top/api'
      : 'http://101.132.102.201:8081', // 测试
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
    return Promise.resolve(error);
  }
);

export default globalAxios;
