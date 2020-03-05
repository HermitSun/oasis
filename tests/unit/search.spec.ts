import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import VueRouter from "vue-router";
import SearchPage from "@/views/SearchPage.vue";

import ElementUI from "element-ui";
import search from "@/router/search";
import Vue from "vue";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(ElementUI);

// deal with async mounted hook error
jest.mock("@/plugins/axios");

const router = new VueRouter({
  routes: [...search]
});

describe("Search", () => {
  it("renders correctly", async () => {
    const wrapper = shallowMount(SearchPage, {
      localVue,
      router,
      propsData: {
        keyword: "software",
        mode: "basic",
        page: 1,
        startYear: "2000",
        endYear: "2019"
      }
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.find(".searchPage-header").isVisible()).toBe(true);
    expect(wrapper.find(".searchPage-content").isVisible()).toBe(true);
    expect(wrapper.find("el-pagination-stub").isVisible()).toBe(true);
  });

  it("can do basic search", async () => {
    const wrapper = mount(SearchPage, {
      localVue,
      router,
      propsData: {
        keyword: "software",
        mode: "basic",
        page: 1,
        startYear: "2000",
        endYear: "2019"
      }
    });
    const vm = wrapper.vm as {
      searchContent: string;
    } & Vue;
    expect(wrapper.find(".searchPage-content").isVisible()).toBe(true);

    // test page
    // 2nd page
    await vm.$nextTick();
    jest.clearAllMocks();
    jest.spyOn(vm.$router, "push");
    wrapper.find(".btn-next").trigger("click");

    await vm.$nextTick();
    expect(vm.$router.push).toBeCalledWith({
      path: "/search",
      query: {
        keyword: vm.searchContent,
        mode: "basic",
        page: "2",
        startYear: "2000",
        endYear: "2019"
      }
    });
  });

  it("can do advanced search", async () => {
    const wrapper = mount(SearchPage, {
      localVue,
      router,
      propsData: {
        keyword: "testing",
        mode: "advanced",
        page: 1,
        startYear: "2000",
        endYear: "2019"
      }
    });
    expect(wrapper.find(".searchPage-content").isVisible()).toBe(true);
    const vm = wrapper.vm as {
      searchContent: string;
    } & Vue;
    // test page
    // 2nd page
    await vm.$nextTick();
    jest.clearAllMocks();
    jest.spyOn(vm.$router, "push");
    wrapper.find(".btn-next").trigger("click");

    await vm.$nextTick();
    expect(vm.$router.push).toBeCalledWith({
      path: "/search",
      query: {
        affiliation: undefined,
        author: undefined,
        conferenceName: undefined,
        endYear: "2019",
        keyword: "testing",
        mode: "advanced",
        page: "2",
        startYear: "2000"
      }
    });
  });

  it("can start another search", async () => {
    const wrapper = shallowMount(SearchPage, {
      localVue,
      router,
      propsData: {
        keyword: "testing",
        mode: "basic",
        page: 1,
        startYear: "2000",
        endYear: "2019"
      }
    });
    const vm = wrapper.vm as { searchContent: string } & Vue;
    vm.searchContent = "software";

    await vm.$nextTick();
    jest.clearAllMocks();
    jest.spyOn(vm.$router, "push");
    wrapper.find(".basic-search__input").trigger("keyup.enter");
    expect(vm.$router.push).toBeCalledWith({
      path: "/search",
      query: {
        keyword: vm.searchContent,
        mode: "basic",
        page: "1",
        startYear: "2000",
        endYear: "2019"
      }
    });
  });

  it("can select time", async () => {
    const wrapper = shallowMount(SearchPage, {
      localVue,
      router,
      propsData: {
        keyword: "testing",
        mode: "basic",
        page: 1,
        startYear: "2000",
        endYear: "2019"
      }
    });
    const vm = wrapper.vm as {
      searchContent: string;
      newStartYear: string;
      newEndYear: string;
    } & Vue;
    vm.newStartYear = "2003";
    vm.newEndYear = "2019";

    await vm.$nextTick();
    jest.clearAllMocks();
    jest.spyOn(vm.$router, "push");
    wrapper.find(".basic-search__button").trigger("click");
    expect(vm.$router.push).toBeCalledWith({
      path: "/search",
      query: {
        keyword: vm.searchContent,
        mode: "basic",
        page: "1",
        startYear: "2003",
        endYear: "2019"
      }
    });
  });
});
