<template>
  <div>
    <SearchBar />
    <div class="advanced-ranking-page">
      <AdvancedRankingSubtitle title="🏆 OASIS RANKING" subject="Author" />
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
            <AuthorDetailComp :rank="rank" :index="index + 1" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SearchBar from '~/components/search/SearchBarComp.vue';
import { getAuthorAdvancedRanking } from '~/api';
import AuthorDetailComp from '~/components/ranking/advanced/AuthorDetailComp.vue';
import AdvancedRankingSubtitle from '~/components/public/AdvancedRankingSubtitle.vue';
export default Vue.extend({
  name: 'Author',
  components: {
    SearchBar,
    AdvancedRankingSubtitle,
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
