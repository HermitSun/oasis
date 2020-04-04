<template>
  <div>
    <SearchBar />
    <div class="advanced-ranking-page">
      <Subtitle title="🏆 OASIS RANKING" />
      <div class="ranking-advanced">
        <div class="header">
          <span class="prop">Author</span>
          <span class="prop">Count</span>
          <span class="prop">Citation</span>
          <span class="prop">Publication Trend</span>
        </div>
        <div class="body">
          <div
            v-for="(rank, index) in rankings"
            :key="index"
            style="margin-bottom: 5px"
          >
            <AuthorDetailComp :rank="rank" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SearchBar from '~/components/search/SearchBar.vue';
import Subtitle from '~/components/public/Subtitle.vue';
import { getAuthorAdvancedRanking } from '~/api';
import AuthorDetailComp from '~/components/ranking/advanced/AuthorDetailComp.vue';
export default Vue.extend({
  name: 'Author',
  components: {
    SearchBar,
    Subtitle,
    AuthorDetailComp
  },
  async asyncData() {
    // TODO 添加可选择的sortKey和year
    const affiliationAdvancedRankingRes = await getAuthorAdvancedRanking({
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
