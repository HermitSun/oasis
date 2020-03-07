import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import ResearcherInterest from "@/components/interest/ResearcherInterest.vue";

import ElementUI from "element-ui";

const localVue = createLocalVue();
localVue.use(ElementUI);

// deal with async mounted hook error
jest.mock("@/plugins/axios");

describe("Interest", () => {
  // mount the view
  const wrapper = mount(ResearcherInterest, {
    localVue,
    propsData: {
      researcherId: "0"
    }
  });

  it("word cloud renders correctly", async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".wordCloud").isVisible()).toBe(true);
  });
});
