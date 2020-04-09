<template>
  <div class="ranking-advanced-detail__paper">
    <div class="sub-title">
      <span class="publication"
        >{{ paper.publicationYear }} {{ paper.publicationName }}</span
      >
      <a
        :href="paper.link"
        class="name"
        target="_blank"
        rel="noopener noreferrer"
        >{{ paper.title }}</a
      >
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'PaperInfoComp',
  props: {
    paper: {
      type: Object,
      default: () => ({})
    }
  }
});
</script>

<style scoped lang="less">
@import '../../../stylesheets/index.less';
</style>
