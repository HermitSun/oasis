import { Component } from 'vue';
import AsyncCompLoading from '~/components/AsyncCompLoading';
import AsyncCompError from '~/components/AsyncCompError';

/**
 * 异步组件的工厂函数
 * 此函数不适用于client only的组件
 * @param comp 形如`import('path')`的动态组件
 * @param delay
 * @param timeout
 */
export function getAsyncComp(
  comp: Promise<Component>,
  delay = 200,
  timeout = 3000
) {
  return () =>
    (({
      component: comp,
      loading: AsyncCompLoading,
      error: AsyncCompError,
      delay,
      timeout
    } as unknown) as Promise<Component>);
}
