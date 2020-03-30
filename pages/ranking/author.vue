<template>
  <div>
    <SearchBar />
    <div class="advanced-ranking-page">
      <Subtitle title="🏆 OASIS RANKING" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SearchBar from '~/components/search/SearchBar.vue';
import Subtitle from '~/components/public/Subtitle.vue';
export default Vue.extend({
  name: 'Author',
  components: {
    SearchBar,
    Subtitle
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
