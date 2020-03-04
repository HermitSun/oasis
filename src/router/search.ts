import { Route } from "vue-router";

export default [
  {
    path: "/search",
    name: "Search",
    component: () =>
      import(/* webpackChunkName: "search" */ "@/views/SearchPage.vue"),
    // 在路由里将字符串转换成数字
    props: (route: Route) => ({
      ...route.query,
      page: Number(route.query.page)
    })
  }
];
