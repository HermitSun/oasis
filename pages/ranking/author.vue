<template>
  <AuthorAdvancedComp :rankings="rankings" />
</template>

<script lang="ts">
import Vue from 'vue';
import { getAuthorAdvancedRanking } from '~/api';
import AuthorAdvancedComp from '@/components/ranking/advanced/author/AuthorAdvancedComp.vue';
import { AuthorAdvancedRankingResponse } from '~/interfaces/responses/ranking/advanced/AuthorAdvancedRankingResponse';

const cache = {
  data: [] as AuthorAdvancedRankingResponse[],
  cached: false,
  expires: 300 * 1000 // 300s过期
};
let cacheTimer: NodeJS.Timeout;

export default Vue.extend({
  name: 'Author',
  components: { AuthorAdvancedComp },
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
      const authorAdvancedRankingRes = await getAuthorAdvancedRanking({
        sortKey,
        startYear: query.startYear ? Number(query.startYear) : 2015,
        endYear: query.endYear ? Number(query.endYear) : 2020
      });
      cache.data =
        authorAdvancedRankingRes && authorAdvancedRankingRes.data
          ? authorAdvancedRankingRes.data
          : [];
      cache.cached = true;
    }

    return {
      rankings: cache.data
    };
  },
  watch: {
    $route() {
      this.requestAuthorAdvancedRanking();
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
    async requestAuthorAdvancedRanking() {
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
        const authorAdvancedRankingRes = await getAuthorAdvancedRanking({
          sortKey,
          startYear,
          endYear
        });
        (this as any).rankings = authorAdvancedRankingRes.data;
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
