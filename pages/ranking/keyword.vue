<template>
  <KeywordAdvancedComp :rankings="rankings" />
</template>

<script lang="ts">
import Vue from 'vue';
import { getKeywordAdvancedRanking } from '~/api';
import KeywordAdvancedComp from '@/components/ranking/advanced/keyword/KeywordAdvancedComp.vue';
import { KeywordAdvancedRankingResponse } from '~/interfaces/responses/ranking/advanced/KeywordAdvancedRankingResponse';

export default Vue.extend({
  name: 'Keyword',
  components: { KeywordAdvancedComp },
  async asyncData() {
    // TODO 添加可选择的sortKey和year
    const keywordAdvancedRankingRes = await getKeywordAdvancedRanking({
      sortKey: 'acceptanceCount',
      startYear: 2019,
      endYear: 2019
    });

    return {
      rankings:
        keywordAdvancedRankingRes && keywordAdvancedRankingRes.data
          ? keywordAdvancedRankingRes.data
          : []
    };
  },
  data() {
    return {
      rankings: [] as KeywordAdvancedRankingResponse[]
    };
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
