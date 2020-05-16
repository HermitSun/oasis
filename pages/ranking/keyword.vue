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
import { mapActions } from 'vuex';
import SearchBarComp from '~/components/search/SearchBarComp.vue';
import AdvancedRankingSubtitle from '~/components/public/AdvancedRankingSubtitle.vue';
import { getKeywordAdvancedRanking } from '~/api';
import KeywordAdvancedComp from '@/components/ranking/advanced/keyword/KeywordAdvancedComp.vue';
import { KeywordAdvancedRankingResponse } from '~/interfaces/responses/ranking/advanced/KeywordAdvancedRankingResponse';
import AsyncLoadWordCloud from '~/components/mixins/AsyncLoadWordCloud';
import StartAnotherBasicSearch from '~/components/mixins/StartAnotherBasicSearch';

export default Vue.extend({
  name: 'Keyword',
  components: {
    SearchBarComp,
    AdvancedRankingSubtitle,
    KeywordAdvancedComp
  },
  mixins: [AsyncLoadWordCloud, StartAnotherBasicSearch],
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
  },
  methods: {
    ...mapActions('ranking', {
      updateWordCloudLoaded: 'updateIsKeywordWordCloudLoaded'
    })
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
