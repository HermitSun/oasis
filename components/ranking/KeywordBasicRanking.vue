<template>
  <div class="ranking-basic">
    <div class="title">
      <span class="main" @click="$router.push('/ranking/keyword')">
        Top Keyword
        <svg
          t="1586349933837"
          class="icon icon-share"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4243"
          width="15"
          height="15"
        >
          <path
            d="M534.656 534.656a32 32 0 1 1-45.312-45.312L850.752 128H672a32 32 0 1 1 0-64h192A96 96 0 0 1 960 160v192a32 32 0 1 1-64 0V173.248L534.656 534.656zM896 640a32 32 0 1 1 64 0v160a160 160 0 0 1-160 160h-576A160 160 0 0 1 64 800v-576A160 160 0 0 1 224 64H384a32 32 0 0 1 0 64H224A96 96 0 0 0 128 224v576A96 96 0 0 0 224 896h576a96 96 0 0 0 96-96V640z"
            p-id="4244"
          />
        </svg>
      </span>
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
