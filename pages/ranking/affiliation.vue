<template>
  <div>
    <SearchBar />
    <div class="advanced-ranking-page">
      <Subtitle title="🏆 OASIS RANKING" />
      <div v-for="(rank, index) in rankings" :key="index">
        <AffiliationDetailComp :rank="rank" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SearchBar from '~/components/search/SearchBar.vue';
import Subtitle from '~/components/public/Subtitle.vue';
import { getAffiliationAdvancedRanking } from '~/api';
import AffiliationDetailComp from '~/components/ranking/advanced/AffiliationDetailComp.vue';

export default Vue.extend({
  name: 'Affiliation',
  components: {
    SearchBar,
    Subtitle,
    AffiliationDetailComp
  },
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
