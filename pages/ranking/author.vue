<template>
  <AuthorAdvancedComp :rankings="rankings" />
</template>

<script lang="ts">
import Vue from 'vue';
import { getAuthorAdvancedRanking } from '~/api';
import AuthorAdvancedComp from '@/components/ranking/advanced/author/AuthorAdvancedComp.vue';

export default Vue.extend({
  name: 'Author',
  components: { AuthorAdvancedComp },
  async asyncData({ store }) {
    // get load status
    const isPageLoaded = store.getters['ranking/isAuthorPageLoaded'];
    if (isPageLoaded) {
      return;
    }

    // TODO 添加可选择的sortKey和year
    const authorAdvancedRankingRes = await getAuthorAdvancedRanking({
      sortKey: 'acceptanceCount',
      startYear: 2019,
      endYear: 2019
    });
    const authorAdvancedRankingData =
      authorAdvancedRankingRes && authorAdvancedRankingRes.data
        ? authorAdvancedRankingRes.data
        : [];

    // mark as loaded
    store.dispatch('ranking/updateIsAuthorPageLoaded', true);

    return {
      rankings: authorAdvancedRankingData
    };
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
