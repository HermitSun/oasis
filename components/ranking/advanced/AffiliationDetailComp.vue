<template>
  <div class="ranking-advanced-detail">
    <span class="value">{{ rank.affiliationName }}</span>
    <span class="value">{{ rank.count }}</span>
    <span class="value">{{ rank.citation }}</span>
    <span class="value">{{ rank.authorNum }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'AffiliationDetailComp',
  props: {
    rank: {
      type: Object,
      default: () => ({})
    }
  }
});
</script>

<style scoped lang="less">
@import '../../../stylesheets/index.less';
</style>
