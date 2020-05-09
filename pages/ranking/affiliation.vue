<template>
  <div>
    <SearchBarComp
      v-model="searchContent"
      @keyword-change="startAnotherBasicSearch"
    />
    <div class="advanced-ranking-page">
      <AdvancedRankingSubtitle title="🏆 OASIS RANKING" subject="Affiliation" />
      <AffiliationAdvancedComp :rankings="rankings" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SearchBarComp from '~/components/search/SearchBarComp.vue';
import { getAffiliationAdvancedRanking } from '~/api';
import AdvancedRankingSubtitle from '@/components/public/AdvancedRankingSubtitle.vue';
import AffiliationAdvancedComp from '@/components/ranking/advanced/affiliation/AffiliationAdvancedComp.vue';
import StartAnotherBasicSearch from '~/components/mixins/StartAnotherBasicSearch';

export default Vue.extend({
  name: 'Affiliation',
  components: {
    SearchBarComp,
    AdvancedRankingSubtitle,
    AffiliationAdvancedComp
  },
  mixins: [StartAnotherBasicSearch],
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
  },
  head() {
    return {
      script: [
        {
          src:
            'https://cdn.jsdelivr.net/npm/vue-wordcloud@1.1.1/dist/word-cloud.min.js',
          defer: true
        }
      ]
    };
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
