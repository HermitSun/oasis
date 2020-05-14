import { Middleware } from '@nuxt/types';
import { clearPending } from '~/utils/pending';

// 路由跳转时清除未完成的请求
const cancelPending: Middleware = () => {
  clearPending();
};

export default cancelPending;
