import Vue from "vue";
import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import { getRankingIcon } from "@/components/ranking/ranking";
import AffiliationBasicRanking from "@/components/ranking/AffiliationBasicRanking.vue";
import AuthorBasicRanking from "@/components/ranking/AuthorBasicRanking.vue";
import { AuthorBasicRankingResponse } from "@/interfaces/responses/ranking/AuthorBasicRankingResponse";
import { sortKey } from "@/interfaces/components/ranking/RankingData";

import ElementUI from "element-ui";
import { AffiliationBasicRankingResponse } from "@/interfaces/responses/ranking/AffiliationBasicRankingResponse";

const localVue = createLocalVue();
localVue.config.errorHandler = (err, vm, info) => {
  console.log("vue errorHandler:", err, vm, info);
};
localVue.use(ElementUI);

// 排名
describe("Ranking", () => {
  it("can get correct icon", () => {
    expect(getRankingIcon(0)).toBe("🏅️");
    expect(getRankingIcon(1)).toBe("🥈");
    expect(getRankingIcon(2)).toBe("🥉");
    expect(getRankingIcon(3)).toBe("4");
    // 边界情况
    // 姑且不算做异常吧，因为有个断言了
    expect(getRankingIcon(-1)).toBe("0");
    expect(getRankingIcon(10)).toBe("11");
  });
});

// 机构
describe("AffiliationBasicRanking", () => {
  const wrapper = mount(AffiliationBasicRanking, { localVue });
  const vm = wrapper.vm as {
    affiliationBasicRankingResponse: AffiliationBasicRankingResponse[];
    sortKey: sortKey;
  } & Vue;

  it("renders correctly", async () => {
    // 初始化假数据
    vm.affiliationBasicRankingResponse = [
      {
        name: "testing",
        count: 1
      }
    ];
    await vm.$nextTick();

    expect(wrapper.find(".ranking").isVisible()).toBe(true);
    expect(wrapper.find(".title").isVisible()).toBe(true);
    expect(wrapper.find(".info").isVisible()).toBe(true);
  });

  it("can change sort key ", async () => {
    wrapper.find(".icon").trigger("click");
    await vm.$nextTick();
    expect(vm.sortKey).toBe("citationCount");

    wrapper.find(".icon").trigger("click");
    await vm.$nextTick();
    expect(vm.sortKey).toBe("acceptanceCount");
  });
});

// 作者
describe("AuthorBasicRanking", () => {
  const wrapper = mount(AuthorBasicRanking, { localVue });
  const vm = wrapper.vm as {
    authorBasicRankingResponse: AuthorBasicRankingResponse[];
    showInterest: boolean;
    sortKey: sortKey;
  } & Vue;

  it("renders correctly", async () => {
    vm.authorBasicRankingResponse = [
      {
        name: "Lajos Hanzo",
        count: 399,
        researcherId: "0"
      }
    ];
    await vm.$nextTick();

    expect(wrapper.find(".ranking").isVisible()).toBe(true);
    expect(wrapper.find(".title").isVisible()).toBe(true);
    expect(wrapper.find(".info").isVisible()).toBe(true);
    // 词云一开始不渲染
    expect(wrapper.find(".wordCloud").exists()).toBe(false);
  });

  it("can show ranking", async () => {
    // 初始化假数据
    vm.authorBasicRankingResponse = [
      {
        name: "Lajos Hanzo",
        count: 399,
        researcherId: "0"
      }
    ];
    await vm.$nextTick();
    wrapper.find(".name").trigger("click");
    await vm.$nextTick();
    expect(vm.showInterest).toBe(true);
    await vm.$nextTick();
    expect(wrapper.find(".wordCloud").isVisible()).toBe(true);
  });

  it("can change sort key ", async () => {
    wrapper.find(".icon").trigger("click");
    await vm.$nextTick();
    expect(vm.sortKey).toBe("citationCount");

    wrapper.find(".icon").trigger("click");
    await vm.$nextTick();
    expect(vm.sortKey).toBe("acceptanceCount");
  });
});
