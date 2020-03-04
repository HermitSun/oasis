import Vue from "vue";
import VueRouter from "vue-router";
import search from "./search";
import manage from "./manage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "OASIS_HOME",
    component: () => import("@/views/HomePage.vue")
  },
  ...search,
  ...manage
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // 页面标题
  if (to.meta.title) {
    document.title = to.meta.title + " - OASIS";
  }
  next();
});

export default router;
