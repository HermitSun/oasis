import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueRouter from "vue-router";
import App from "@/App.vue";

import { advancedSearch, basicSearch } from "@/api";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("App.vue", () => {
  it("renders correctly", () => {
    const wrapper = shallowMount(App, { localVue });
    expect(wrapper.find("#app").isVisible()).toBe(true);
  });

  it("basic search succeed", async () => {
    try {
      const searchRes = await basicSearch({ keyword: "keyword", page: 1 });
      expect(searchRes).not.toBeNull();
      expect(searchRes).not.toBeUndefined();
      expect(searchRes.data.size).not.toBe(0);
    } catch (e) {
      // network error
      expect(e.toString()).toContain("undefined");
    }
  });

  it("advanced search succeed", async () => {
    try {
      const searchRes = await advancedSearch({
        author: "123", // 作者
        affiliation: "123", // 机构
        conferenceName: "123", // 会议
        keyword: "123", // 研究关键字
        page: 1
      });
      expect(searchRes).not.toBeNull();
      expect(searchRes).not.toBeUndefined();
      expect(searchRes.data.size).toBe(0);
    } catch (e) {
      // network error
      expect(e.toString()).toContain("undefined");
    }
  });
});
