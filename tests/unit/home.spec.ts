import Vue from "vue";
import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import HomePage from "@/views/HomePage.vue";
import router from "@/router";

const localVue = createLocalVue();

describe("HomePage", () => {
  const wrapper = shallowMount(HomePage, { localVue, router });
  const vm = wrapper.vm as { keyword: string; abstractResponse: [] } & Vue;

  it("renders correctly", done => {
    vm.$nextTick(() => {
      expect(wrapper.find(".homepage-header").isVisible()).toBe(true);
      expect(wrapper.find(".homepage-content").isVisible()).toBe(true);
      expect(wrapper.find(".homepage-content__abstract").isVisible()).toBe(
        true
      );
      expect(wrapper.find(".homepage-content__ranking").isVisible()).toBe(true);
      done();
    });
  });

  it("can do search when input keywords", () => {
    vm.keyword = "software";
    vm.$nextTick(() => {
      jest.clearAllMocks();
      jest.spyOn(vm.$router, "push");
      wrapper.find(".basic-search__input").trigger("keyup.enter");
      expect(vm.$router.push).toBeCalledWith({
        path: "/search",
        query: {
          keyword: vm.keyword,
          mode: "basic",
          page: "1",
          startYear: "2001",
          endYear: "2020"
        }
      });
    });
  });

  it("will not do search when keyword is empty", () => {
    vm.keyword = "";
    vm.$nextTick(() => {
      // 先重置mock
      jest.clearAllMocks();
      jest.spyOn(vm.$router, "push");
      wrapper.find(".basic-search__input").trigger("keyup.enter");
      expect(vm.$router.push).not.toBeCalled();
    });
  });
});
