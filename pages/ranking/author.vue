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
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
