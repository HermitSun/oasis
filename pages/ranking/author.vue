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
  cached: false
};

export default Vue.extend({
  name: 'Author',
  components: { AuthorAdvancedComp },
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
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
