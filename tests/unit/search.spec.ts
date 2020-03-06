import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import VueRouter from "vue-router";
import SearchPage from "@/views/SearchPage.vue";
import SearchResComp from "@/components/search/SearchResComp.vue";
import AdvancedSearchComp from "@/components/search/AdvancedSearchComp.vue";

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

// 搜索的主体部分
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
    expect(vm.$router.push).not.toBeCalledWith({
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
    expect(vm.$router.push).not.toBeCalledWith({
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

// 搜索组件本身
describe("Search Comp", () => {
  it("renders correctly", async () => {
    const testData = await import("./test.json");
    const wrapper = shallowMount(SearchResComp, {
      localVue,
      propsData: { res: testData }
    });
    expect(wrapper.find(".searchPage-item").isVisible()).toBe(true);
  });

  it("can show references", async () => {
    const testData = await import("./test.json");
    const wrapper = shallowMount(SearchResComp, {
      localVue,
      propsData: { res: testData }
    });
    wrapper.find(".detail-hint").trigger("click");

    expect(wrapper.find(".searchPage-item").isVisible()).toBe(true);
  });
});

describe("Advanced Search Comp", () => {
  const wrapper = mount(AdvancedSearchComp, { localVue, router });
  const vm = wrapper.vm as {
    affiliation: string;
    author: string;
    conferenceName: string;
    keyword: string;
  } & Vue;

  it("renders correctly", async () => {
    expect(wrapper.find(".mask-box-header").isVisible()).toBe(true);
    expect(wrapper.find(".mask-box-content").isVisible()).toBe(true);
    expect(wrapper.find(".advanced-search__button").isVisible()).toBe(true);
  });

  it("can do advanced search", async () => {
    jest.clearAllMocks();
    jest.spyOn(vm.$router, "push");

    vm.affiliation = "foo";
    (vm.author = "bar"), (vm.conferenceName = "buz"), (vm.keyword = "baz");

    await vm.$nextTick();
    wrapper.find(".advanced-search__button").trigger("click");

    await vm.$nextTick();
    expect(wrapper.emitted("close")).toBeTruthy();
    expect(vm.$router.push).toBeCalledWith({
      path: "/search",
      query: {
        affiliation: "foo",
        author: "bar",
        conferenceName: "buz",
        endYear: "2020",
        keyword: "baz",
        mode: "advanced",
        page: "1",
        startYear: "2001"
      }
    });
  });
});
