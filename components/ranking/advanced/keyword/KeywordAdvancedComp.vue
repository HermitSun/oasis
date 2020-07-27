<template>
  <div class="ranking-advanced">
    <div class="header">
      <span class="prop">Keyword</span>
      <span class="prop">Citation</span>
      <span class="prop">Acceptance</span>
      <span class="prop">Author</span>
    </div>
    <div class="body">
      <div v-for="(rank, index) in rankings" :key="index">
        <KeywordDetailComp :rank="rank" :index="index + 1" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import KeywordDetailComp from '~/components/ranking/advanced/keyword/KeywordDetailComp.vue';

export default Vue.extend({
  name: 'KeywordAdvancedComp',
  components: {
    KeywordDetailComp
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
