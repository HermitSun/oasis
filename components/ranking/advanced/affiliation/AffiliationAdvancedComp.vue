<template>
  <div class="ranking-advanced">
    <div class="header">
      <span class="prop">Affiliation</span>
      <span class="prop">Citation</span>
      <span class="prop">Acceptance</span>
      <span class="prop">Authors</span>
    </div>
    <div class="body">
      <div v-for="(rank, index) in rankings" :key="index">
        <AffiliationDetailComp :rank="rank" :index="index + 1" />
      </div>
      <div v-if="rankings.length === 0" style="text-align: center;color:#333 ">
        No Data
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AffiliationDetailComp from './AffiliationDetailComp.vue';

export default Vue.extend({
  name: 'AffiliationAdvancedComp',
  components: {
    AffiliationDetailComp
  },
  props: {
    rankings: {
      type: Array,
      default: () => []
    }
  }
});
</script>

<style scoped lang="less">
@import '../../../../stylesheets/index.less';
</style>
