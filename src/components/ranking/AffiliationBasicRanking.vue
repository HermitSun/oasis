<template>
  <div class="ranking">
    <div class="title">Top Affiliation</div>
    <div
      v-for="(rank, index) in affiliationBasicRankingResponse"
      :key="index"
      class="info"
    >
      <span class="icon">{{ requestRankingIcon(index) }}</span>
      <span class="name">{{ rank.name }}</span>
      <span class="count">{{ rank.count }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AffiliationBasicRankingResponse } from "@/interfaces/responses/ranking/AffiliationBasicRankingResponse";
import { getAffiliationBasicRanking } from "@/api";
import { sortKey } from "@/interfaces/components/ranking/RankingData";
import { getRankingIcon } from "@/components/ranking/ranking";

export default Vue.extend({
  name: "AffiliationBasicRanking",
  data() {
    return {
      affiliationBasicRankingResponse: [] as AffiliationBasicRankingResponse[],
      sortKey: "acceptanceCount" as sortKey
    };
  },
  mounted(): void {
    this.requestAffiliationBasicRanking();
  },
  methods: {
    async requestAffiliationBasicRanking() {
      const affiliationBasicRankingRes = await getAffiliationBasicRanking({
        sortKey: this.sortKey
      });
      this.affiliationBasicRankingResponse = affiliationBasicRankingRes.data;
    },
    requestRankingIcon(rank: number): string {
      return getRankingIcon(rank);
    }
  }
});
</script>

<style scoped lang="less">
@import "../../../src/stylesheets/index.less";
</style>
