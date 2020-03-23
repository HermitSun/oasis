import { Middleware } from '@nuxt/types';

// 路由鉴权中间件
const routesAuth: Middleware = ({ route }) => {
  console.log(route);
};

export default routesAuth;
