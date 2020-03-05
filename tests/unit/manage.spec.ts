import Vue from "vue";
import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import VueRouter from "vue-router";
import ManagePage from "@/views/manage/ManagePage.vue";
import ManageImport from "@/components/manage/import/ManageImport.vue";
import ManagePapers from "@/components/manage/import/ManagePapers.vue";

import ElementUI from "element-ui";
import manage from "@/router/manage";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(ElementUI);

const router = new VueRouter({
  routes: [...manage]
});

// //
// 正式测试部分
describe("Manage Frame", () => {
  // mount the view
  const wrapper = shallowMount(ManagePage, { localVue, router });

  it("the frame renders correctly", () => {
    expect(wrapper.find("el-header-stub").isVisible()).toBe(true);
    expect(wrapper.find("el-aside-stub").isVisible()).toBe(true);
    expect(wrapper.find("el-main-stub").isVisible()).toBe(true);
  });

  it("the nav-bar renders correctly", () => {
    expect(wrapper.find("el-menu-stub").contains("el-menu-item-stub")).toBe(
      true
    );
  });
});

describe("Data Import", () => {
  // mount the view
  const wrapper = mount(ManageImport, { localVue, router });
  const vm = wrapper.vm as { isUploadValid: boolean } & Vue;

  it("renders correctly", () => {
    expect(wrapper.find(".el-upload").isVisible()).toBe(true);
  });

  it("when file not selected, upload is not clickable", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(vm.isUploadValid).toBe(false);
  });
});

describe("Data Manage", () => {
  // mount the view
  const wrapper = shallowMount(ManagePapers, { localVue, router });
  it("renders correctly", () => {
    expect(wrapper.find("p").isVisible()).toBe(true);
  });
});
