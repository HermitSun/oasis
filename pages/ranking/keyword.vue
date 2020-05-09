<template>
  <div>
    <SearchBarComp
      v-model="keyword"
      @keyword-change="startAnotherBasicSearch"
    />
    <div class="advanced-ranking-page">
      <AdvancedRankingSubtitle title="🏆 OASIS RANKING" subject="Keyword" />
      <KeywordAdvancedComp :rankings="rankings" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SearchBarComp from '~/components/search/SearchBarComp.vue';
import AdvancedRankingSubtitle from '~/components/public/AdvancedRankingSubtitle.vue';
import { getKeywordAdvancedRanking } from '~/api';
import keywordAdvancedRankingMockData from '~/server/mock/ranking/keyword/keywordAdvancedRankingMockData';
import KeywordAdvancedComp from '@/components/ranking/advanced/keyword/KeywordAdvancedComp.vue';
import { KeywordAdvancedRankingResponse } from '~/interfaces/responses/ranking/advanced/KeywordAdvancedRankingResponse';
import StartAnotherBasicSearch from '~/components/mixins/StartAnotherBasicSearch';

export default Vue.extend({
  name: 'Keyword',
  components: {
    SearchBarComp,
    AdvancedRankingSubtitle,
    KeywordAdvancedComp
  },
  mixins: [StartAnotherBasicSearch],
  data() {
    return {
      rankings: [] as KeywordAdvancedRankingResponse[]
    };
  },
  async mounted() {
    // TODO 添加可选择的sortKey和year
    let keywordAdvancedRankingRes = await getKeywordAdvancedRanking({
      sortKey: 'acceptanceCount',
      startYear: 2019,
      endYear: 2019
    });
    keywordAdvancedRankingRes = keywordAdvancedRankingMockData;
    this.rankings = keywordAdvancedRankingRes.data;
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
