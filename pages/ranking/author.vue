<template>
  <div>
    <SearchBarComp
      v-model="keyword"
      @keyword-change="startAnotherBasicSearch"
    />
    <div class="advanced-ranking-page">
      <AdvancedRankingSubtitle title="🏆 OASIS RANKING" subject="Author" />
      <AuthorAdvancedComp :rankings="rankings" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import SearchBarComp from '~/components/search/SearchBarComp.vue';
import { getAuthorAdvancedRanking } from '~/api';
import AdvancedRankingSubtitle from '~/components/public/AdvancedRankingSubtitle.vue';
import AuthorAdvancedComp from '@/components/ranking/advanced/author/AuthorAdvancedComp.vue';
import AsyncLoadWordCloud from '~/components/mixins/AsyncLoadWordCloud';
import StartAnotherBasicSearch from '~/components/mixins/StartAnotherBasicSearch';

export default Vue.extend({
  name: 'Author',
  components: {
    SearchBarComp,
    AdvancedRankingSubtitle,
    AuthorAdvancedComp
  },
  mixins: [AsyncLoadWordCloud, StartAnotherBasicSearch],
  async asyncData() {
    // TODO 添加可选择的sortKey和year
    const authorAdvancedRankingRes = await getAuthorAdvancedRanking({
      sortKey: 'acceptanceCount',
      startYear: 2019,
      endYear: 2019
    });
    return {
      rankings: authorAdvancedRankingRes.data
    };
  },
  methods: {
    ...mapActions('ranking', {
      updateWordCloudLoaded: 'updateIsAuthorWordCloudLoaded'
    })
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
