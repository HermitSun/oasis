<template>
  <AffiliationAdvancedComp :rankings="rankings" />
</template>

<script lang="ts">
import Vue from 'vue';
import { getAffiliationAdvancedRanking } from '~/api';
import AffiliationAdvancedComp from '@/components/ranking/advanced/affiliation/AffiliationAdvancedComp.vue';

export default Vue.extend({
  name: 'Affiliation',
  components: { AffiliationAdvancedComp },
  async asyncData({ store }) {
    // get load status
    const isPageLoaded = store.getters['ranking/isAffiliationPageLoaded'];
    if (isPageLoaded) {
      return;
    }

    // TODO 添加可选择的sortKey和year
    const affiliationAdvancedRankingRes = await getAffiliationAdvancedRanking({
      sortKey: 'acceptanceCount',
      startYear: 2019,
      endYear: 2019
    });
    const affiliationAdvancedRankingData =
      affiliationAdvancedRankingRes && affiliationAdvancedRankingRes.data
        ? affiliationAdvancedRankingRes.data
        : [];

    // mark as loaded
    store.dispatch('ranking/updateIsAffiliationPageLoaded', true);

    return {
      rankings: affiliationAdvancedRankingData
    };
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
