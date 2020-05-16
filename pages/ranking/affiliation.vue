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
  cached: false
};

export default Vue.extend({
  name: 'Affiliation',
  components: { AffiliationAdvancedComp },
  async asyncData() {
    if (!cache.cached) {
      // TODO 添加可选择的sortKey和year
      const affiliationAdvancedRankingRes = await getAffiliationAdvancedRanking(
        {
          sortKey: 'acceptanceCount',
          startYear: 2019,
          endYear: 2019
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
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
