import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// element-ui
import "@/plugins/element";
// normalize css
import "@/stylesheets/normalize.less";

Vue.config.productionTip = false;

// 全局错误捕获，防止遗漏的promise和其他错误
window.addEventListener(
  "error",
  error => {
    console.log("Error：", error);
  },
  true
);

window.addEventListener("unhandledrejection", e => {
  e.preventDefault();
  console.log("Error：", e);
  return true;
});

Vue.config.errorHandler = (err, vm, info) => {
  console.log("vue errorHandler:", err, vm, info);
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
