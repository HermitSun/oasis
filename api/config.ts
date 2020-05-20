import axios from 'axios';

const globalConfig = {
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://wensun.top/api'
      : 'http://34.102.235.205/prod', // 测试
  // : 'http://34.102.235.205/test', // 正式
  // : 'http://localhost:3000/test',
  // : 'http://47.101.33.219:8081',

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
