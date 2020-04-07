<template>
  <div class="ranking-basic">
    <div class="title">
      Top Keyword
    </div>
    <!--无数据时的提示-->
    <div v-if="ranking.length === 0" :style="noDataPromptStyle">
      暂无数据...
    </div>
    <!--排名内容-->
    <div v-for="(rank, index) in ranking" :key="index" class="info">
      <div class="name-wrapper">
        <span class="icon">{{ requestRankingIcon(index) }}</span>
        <span class="name" @click="jumpToPortrait(rank.name)">{{
          rank.name
        }}</span>
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
import NoDataPrompt from '~/components/mixins/NoDataPrompt';

export default Vue.extend({
  name: 'KeywordBasicRanking',
  mixins: [NoDataPrompt],
  props: {
    ranking: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    requestRankingIcon(rank: number): string {
      return getRankingIcon(rank);
    },
    jumpToPortrait(keyword: string) {
      this.$router.push({
        path: '/portrait/keyword',
        query: {
          keyword
        }
      });
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
