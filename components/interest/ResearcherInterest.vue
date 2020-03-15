<template>
  <div class="wordCloud">
    <p v-if="researcherInterestResponse.length === 0">
      Sorry,no keyword at present.
    </p>
    <wordcloud
      v-if="researcherInterestResponse.length !== 0"
      :data="researcherInterestResponse"
      name-key="name"
      value-key="value"
      :color="wordcloudColors"
      :show-tooltip="false"
      :word-click="wordClickHandler"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getResearcherInterest } from '~/api';
import { ResearcherInterestResponse } from '~/interfaces/responses/interest/ResearcherInterestResponse';

export default Vue.extend({
  name: 'ResearcherInterest',
  props: {
    researcherId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      researcherInterestResponse: [] as ResearcherInterestResponse[],
      wordcloudColors: ['#1f77b4', '#629fc9', '#94bedb', '#c9e0ef']
    };
  },
  async mounted() {
    await this.requestResearcherInterest();
  },
  methods: {
    async requestResearcherInterest() {
      try {
        const researcherInterestRes = await getResearcherInterest({
          researcherId: this.researcherId
        });
        this.researcherInterestResponse = researcherInterestRes.data;
      } catch (e) {
        this.$message(e.toString());
      }
    },
    wordClickHandler(name: string) {
      this.$router.push({
        path: '/search',
        query: {
          mode: 'basic',
          keyword: name,
          page: '1',
          startYear: '2001',
          endYear: '2020'
        }
      });
    }
  }
});
</script>
