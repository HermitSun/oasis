<template>
  <div>
    <SearchBar />
    <div class="advanced-ranking-page">
      <AdvancedRankingSubtitle title="🏆 OASIS RANKING" subject="Keyword" />
      <div class="ranking-advanced">
        <div class="header">
          <span class="prop">Keyword</span>
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
            <KeywordDetailComp :rank="rank" :index="index + 1" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SearchBar from '~/components/search/SearchBarComp.vue';
import AdvancedRankingSubtitle from '~/components/public/AdvancedRankingSubtitle.vue';
import { getKeywordAdvancedRanking } from '~/api';
import KeywordDetailComp from '~/components/ranking/advanced/KeywordDetailComp.vue';
import keywordAdvancedRankingMockData from '~/server/mock/ranking/keyword/keywordAdvancedRankingMockData';
export default Vue.extend({
  name: 'Keyword',
  components: {
    SearchBar,
    AdvancedRankingSubtitle,
    KeywordDetailComp
  },
  async asyncData() {
    // TODO 添加可选择的sortKey和year
    let keywordAdvancedRankingRes = await getKeywordAdvancedRanking({
      sortKey: 'acceptanceCount',
      startYear: 2019,
      endYear: 2019
    });
    keywordAdvancedRankingRes = keywordAdvancedRankingMockData;
    return {
      rankings: keywordAdvancedRankingRes.data
    };
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
