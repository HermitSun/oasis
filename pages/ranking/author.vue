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
  async asyncData() {
    if (!cache.cached) {
      // TODO 添加可选择的sortKey和year
      const authorAdvancedRankingRes = await getAuthorAdvancedRanking({
        sortKey: 'acceptanceCount',
        startYear: 2019,
        endYear: 2019
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
    $route: {
      handler() {
        this.requestAuthorAdvancedRanking();
      }
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
        const sortKey = this.$route.query.sortKey as any; // TODO 奇怪呢 没法导入sortKey类型
        const authorAdvancedRankingRes = await getAuthorAdvancedRanking({
          sortKey,
          startYear: Number(this.$route.query.startYear),
          endYear: Number(this.$route.query.endYear)
        });
        // TODO 为了不报错这么写的 到底该咋写呢
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
