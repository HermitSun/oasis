import Vue from "vue";
import VueRouter, { Route } from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "OASIS_HOME",
    component: () => import("@/views/HomePage.vue")
  },
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

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
