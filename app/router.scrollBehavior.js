// 每次路由切换时跳转到顶部
// 这个文件**必须**是JS，因为nuxt就是这么解析的
export default function(to) {
  if (to.hash) {
    return {
      selector: to.hash
    }
  }
  return { x: 0, y: 0 };
}
