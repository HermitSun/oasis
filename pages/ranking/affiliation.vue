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
  async asyncData() {
    // TODO 添加可选择的sortKey和year
    const affiliationAdvancedRankingRes = await getAffiliationAdvancedRanking({
      sortKey: 'acceptanceCount',
      startYear: 2019,
      endYear: 2019
    });
    return {
      rankings: affiliationAdvancedRankingRes.data
    };
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
