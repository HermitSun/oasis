<template>
  <wordcloud
    :data="researcherInterestResponse"
    nameKey="name"
    valueKey="value"
    :color="wordcloudColors"
    :showTooltip="true"
  >
  </wordcloud>
</template>

<script lang="ts">
import Vue from "vue";
import wordcloud from "vue-wordcloud";

import { ResearcherInterestResponse } from "@/interfaces/responses/interest/ResearcherInterestResponse";
import { getResearcherInterest } from "@/api";

export default Vue.extend({
  name: "ResearcherInterest",
  props: {
    researcherId: String
  },
  components: {
    wordcloud
  },
  data() {
    return {
      researcherInterestResponse: [] as ResearcherInterestResponse[],
      wordcloudColors: ["#1f77b4", "#629fc9", "#94bedb", "#c9e0ef"]
    };
  },
  async mounted() {
    await this.requestResearcherInterest();
  },
  methods: {
    async requestResearcherInterest() {
      const researcherInterestRes = await getResearcherInterest({
        researcherId: this.researcherId
      });
      this.researcherInterestResponse = researcherInterestRes.data;
    }
  }
});
</script>

<style scoped></style>
