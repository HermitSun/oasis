<template>
  <div>
    <SearchBar />
    <div class="advanced-ranking-page">
      <Subtitle title="🏆 OASIS RANKING" />
      <div class="ranking-advanced">
        <div class="header">
          <span class="prop">Affiliation</span>
          <span class="prop">Count</span>
          <span class="prop">Citation</span>
          <span class="prop">Author</span>
        </div>
        <div class="body">
          <div
            v-for="(rank, index) in rankings"
            :key="index"
            style="margin-bottom: 5px"
          >
            <AffiliationDetailComp :rank="rank" :index="index + 1" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SearchBar from '~/components/search/SearchBarComp.vue';
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
