<template>
  <div class="ranking-basic">
    <div class="title">
      Top Keyword
    </div>
    <div v-for="(rank, index) in ranking" :key="index" class="info">
      <div class="name-wrapper">
        <span class="icon">{{ requestRankingIcon(index) }}</span>
        <span class="name">{{ rank.name }}</span>
      </div>
      <div class="count">
        {{ rank.count }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getRankingIcon } from '~/components/ranking/ranking';
export default Vue.extend({
  name: 'KeywordBasicRanking',
  props: {
    ranking: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    requestRankingIcon(rank: number): string {
      return getRankingIcon(rank);
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
