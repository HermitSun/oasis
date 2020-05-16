<template>
  <KeywordAdvancedComp :rankings="rankings" />
</template>

<script lang="ts">
import Vue from 'vue';
import { getKeywordAdvancedRanking } from '~/api';
import KeywordAdvancedComp from '@/components/ranking/advanced/keyword/KeywordAdvancedComp.vue';
import { KeywordAdvancedRankingResponse } from '~/interfaces/responses/ranking/advanced/KeywordAdvancedRankingResponse';

const cache = {
  data: [] as KeywordAdvancedRankingResponse[],
  cached: false,
  expires: 300 * 1000 // 300s过期
};
let cacheTimer: NodeJS.Timeout;

export default Vue.extend({
  name: 'Keyword',
  components: { KeywordAdvancedComp },
  async asyncData() {
    if (!cache.cached) {
      // TODO 添加可选择的sortKey和year
      const keywordAdvancedRankingRes = await getKeywordAdvancedRanking({
        sortKey: 'acceptanceCount',
        startYear: 2019,
        endYear: 2019
      });
      cache.data =
        keywordAdvancedRankingRes && keywordAdvancedRankingRes.data
          ? keywordAdvancedRankingRes.data
          : [];
      cache.cached = true;
    }

    return {
      rankings: cache.data
    };
  },
  activated() {
    clearTimeout(cacheTimer);
  },
  deactivated() {
    cacheTimer = setTimeout(() => {
      cache.data = [];
      cache.cached = false;
    }, cache.expires);
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
