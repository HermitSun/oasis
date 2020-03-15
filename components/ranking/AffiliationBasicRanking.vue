<template>
  <div class="ranking">
    <div class="title">
      Top Affiliation
      <span class="sortKey">
        {{ sortKey === 'acceptanceCount' ? 'count' : 'citation' }}
        <svg
          class="icon"
          width="20px"
          height="20px"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          @click="changeSortKey"
        >
          <path
            d="M832 592c0 10.752-3.968 20.096-11.904 28.096l-280 280C532.096 908.096 522.752 912 512 912c-10.816 0-20.16-3.904-28.096-11.904L203.904 620.096C195.904 612.096 192 602.752 192 592s3.904-20.096 11.904-28.096C211.84 555.904 221.184 552 232 552l560 0c10.752 0 20.096 3.904 28.096 11.904C828.032 571.904 832 581.248 832 592zM832 384c0 10.752-3.968 20.096-11.904 28.096-8 8-17.344 11.904-28.096 11.904l-560 0c-10.816 0-20.16-3.904-28.096-11.904C195.904 404.096 192 394.752 192 384s3.904-20.096 11.904-28.096l280-280C491.84 67.968 501.184 64 512 64c10.752 0 20.096 3.968 28.096 11.904l280 280C828.032 363.904 832 373.248 832 384z"
            fill="#418BAF"
          />
        </svg>
      </span>
    </div>
    <div
      v-for="(rank, index) in affiliationBasicRankingResponse"
      :key="index"
      class="info"
    >
      <div class="name-wrapper">
        <span class="icon">{{ requestRankingIcon(index) }}</span>
        <span class="name">{{ rank.name }}</span>
      </div>
      <div class="count">
        {{ rank.count }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getRankingIcon } from './ranking';
import { getAffiliationBasicRanking } from '~/api';
import { sortKey } from '~/interfaces/requests/ranking/RankingPayload';

export default Vue.extend({
  name: 'AffiliationBasicRanking',
  props: {
    ranking: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      sortKey: 'acceptanceCount' as sortKey,
      affiliationBasicRankingResponse: this.ranking
    };
  },
  methods: {
    async requestAffiliationBasicRanking() {
      try {
        const affiliationBasicRankingRes = await getAffiliationBasicRanking({
          sortKey: this.sortKey,
          year: new Date().getFullYear() - 1 // TODO 去掉 - 1
        });
        this.affiliationBasicRankingResponse = affiliationBasicRankingRes.data;
      } catch (e) {
        this.$message(e.toString());
      }
    },
    requestRankingIcon(rank: number): string {
      return getRankingIcon(rank);
    },
    changeSortKey() {
      this.sortKey =
        this.sortKey === 'citationCount' ? 'acceptanceCount' : 'citationCount';
      this.requestAffiliationBasicRanking();
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>