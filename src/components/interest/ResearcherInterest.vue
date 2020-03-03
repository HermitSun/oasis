<template>
  <div>
    ResearcherInterest
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ResearcherInterestResponse } from "../../interfaces/responses/interest/ResearcherInterestResponse";
import { getResearcherInterest } from "../../api";
export default Vue.extend({
  name: "ResearcherInterest",
  props: {
    researcherId: String
  },
  data() {
    return {
      researcherInterestResponse: [] as ResearcherInterestResponse[]
    };
  },
  mounted(): void {
    this.requestResearcherInterest();
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
