<template>
  <div>
    <SearchBar />
    <div class="advanced-ranking-page">
      <AdvancedRankingSubtitle title="🏆 OASIS RANKING" subject="Keyword" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SearchBar from '~/components/search/SearchBarComp.vue';
import AdvancedRankingSubtitle from '~/components/public/AdvancedRankingSubtitle.vue';
export default Vue.extend({
  name: 'Keyword',
  components: {
    SearchBar,
    AdvancedRankingSubtitle
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
