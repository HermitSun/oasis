<template>
  <KeywordAdvancedComp :rankings="rankings" />
</template>

<script lang="ts">
import Vue from 'vue';
import { getKeywordAdvancedRanking } from '~/api';
import KeywordAdvancedComp from '@/components/ranking/advanced/keyword/KeywordAdvancedComp.vue';

export default Vue.extend({
  name: 'Keyword',
  components: { KeywordAdvancedComp },
  async asyncData({ store }) {
    // get load status
    const isPageLoaded = store.getters['ranking/isKeywordPageLoaded'];
    if (isPageLoaded) {
      return;
    }

    // TODO 添加可选择的sortKey和year
    const keywordAdvancedRankingRes = await getKeywordAdvancedRanking({
      sortKey: 'acceptanceCount',
      startYear: 2019,
      endYear: 2019
    });
    const keywordAdvancedRankingData =
      keywordAdvancedRankingRes && keywordAdvancedRankingRes.data
        ? keywordAdvancedRankingRes.data
        : [];

    // mark as loaded
    store.dispatch('ranking/updateIsKeywordPageLoaded', true);

    return {
      rankings: keywordAdvancedRankingData
    };
  },
  data() {
    return {
      bar: 'foo'
    };
  },
  activated() {},
  methods: {
    foo() {}
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
