<template>
  <AffiliationAdvancedComp :rankings="rankings" />
</template>

<script lang="ts">
import Vue from 'vue';
import { getAffiliationAdvancedRanking } from '~/api';
import AffiliationAdvancedComp from '@/components/ranking/advanced/affiliation/AffiliationAdvancedComp.vue';
import { AffiliationAdvancedRankingResponse } from '~/interfaces/responses/ranking/advanced/AffiliationAdvancedRankingResponse';

const cache = {
  data: [] as AffiliationAdvancedRankingResponse[],
  cached: false,
  expires: 300 * 1000 // 300s过期
};
let cacheTimer: NodeJS.Timeout;

export default Vue.extend({
  name: 'Affiliation',
  components: {
    AffiliationAdvancedComp
  },
  props: {
    /**
     * advancedRankOpt: 包含sortKey,startYear, endYear
     */
    advancedRankOpt: {
      type: Object,
      default: () => ({})
    }
  },
  async asyncData({ query }) {
    if (!cache.cached) {
      const sortKey = query.sortKey
        ? (query.sortKey as any)
        : 'acceptanceCount';
      const affiliationAdvancedRankingRes = await getAffiliationAdvancedRanking(
        {
          sortKey,
          startYear: query.startYear ? Number(query.startYear) : 2015,
          endYear: query.endYear ? Number(query.endYear) : 2020
        }
      );
      cache.data =
        affiliationAdvancedRankingRes && affiliationAdvancedRankingRes.data
          ? affiliationAdvancedRankingRes.data
          : [];
      cache.cached = true;
    }

    return {
      rankings: cache.data
    };
  },
  watch: {
    $route() {
      this.requestAffiliationAdvancedRanking();
    }
  },
  activated() {
    clearTimeout(cacheTimer);
  },
  deactivated() {
    cacheTimer = setTimeout(() => {
      cache.data = [];
      cache.cached = false;
    }, cache.expires);
  },
  methods: {
    async requestAffiliationAdvancedRanking() {
      try {
        const sortKey = this.$route.query.sortKey
          ? (this.$route.query.sortKey as any)
          : 'acceptanceCount';
        const startYear = this.$route.query.startYear
          ? Number(this.$route.query.startYear)
          : 2015;
        const endYear = this.$route.query.endYear
          ? Number(this.$route.query.endYear)
          : 2020;
        const affiliationAdvancedRankingRes = await getAffiliationAdvancedRanking(
          {
            sortKey,
            startYear,
            endYear
          }
        );
        (this as any).rankings = affiliationAdvancedRankingRes.data;
      } catch (e) {
        this.$message(e.toString());
      }
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
