<template>
  <div class="ranking">
    <div class="title">Top Authors</div>
    <div
      v-for="(rank, index) in authorBasicRankingResponse"
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
import { AuthorBasicRankingResponse } from "@/interfaces/responses/ranking/AuthorBasicRankingResponse";
import { sortKey } from "@/interfaces/components/ranking/RankingData";
import { getAuthorBasicRanking } from "@/api";
import { getRankingIcon } from "@/components/ranking/ranking";

export default Vue.extend({
  name: "AuthorBasicRanking",
  data() {
    return {
      authorBasicRankingResponse: [] as AuthorBasicRankingResponse[],
      sortKey: "acceptanceCount" as sortKey
    };
  },
  mounted(): void {
    this.requestAuthorBasicRanking();
  },
  methods: {
    async requestAuthorBasicRanking() {
      const authorBasicRankingRes = await getAuthorBasicRanking({
        sortKey: this.sortKey
      });
      this.authorBasicRankingResponse = authorBasicRankingRes.data;
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
