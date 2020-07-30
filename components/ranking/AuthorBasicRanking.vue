<template>
  <div class="ranking-basic">
    <div class="title">
      <span class="main" @click="$router.push('/ranking/author')"
        >Top Author
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
            fill="#581BFF"
          /></svg
      ></span>
      <span class="filter">
        <span class="label">
          <span class="hint">Year</span>
          <el-select
            v-model="year"
            size="small"
            :value="year"
            style="width:90px"
            @change="requestAuthorBasicRanking"
          >
            <el-option
              v-for="item in timeRange"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </span>
        <span class="label" style="margin-left: 10px">
          <span class="hint">Sort By</span>
          <el-select
            v-model="sortKey"
            size="small"
            value="sortKey"
            style="width: 160px"
            @change="requestAuthorBasicRanking"
          >
            <el-option
              v-for="item in sortKeys"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </span>
      </span>
    </div>
    <!--无数据时的提示-->
    <div
      v-if="authorBasicRankingResponse.length === 0"
      :style="noDataPromptStyle"
    >
      No Data
    </div>
    <!--排名内容-->
    <!--现在的解决方案不支持key的变动，所以最好不要对列表进行修改-->
    <div
      v-for="(rank, index) in authorBasicRankingResponse"
      :key="index"
      class="info"
    >
      <div class="name-wrapper">
        <span class="icon">{{ requestRankingIcon(index) }}</span>
        <span class="name" @click="jumpToPortrait(rank.authorId)">{{
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
import { Select, Option } from 'element-ui';
import { getRankingIcon } from './ranking';
import { getAuthorBasicRanking } from '~/api';
import { sortKey } from '~/interfaces/requests/ranking/RankingPayload';
import NoDataPrompt from '~/components/mixins/NoDataPrompt';
import RankingTimeRange from '~/components/ranking/rankingOpt';

export default Vue.extend({
  name: 'AuthorBasicRanking',
  components: {
    [Select.name]: Select,
    [Option.name]: Option
  },
  mixins: [NoDataPrompt, RankingTimeRange],
  props: {
    ranking: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      authorBasicRankingResponse: this.ranking,
      sortKey: 'acceptanceCount' as sortKey,
      year: new Date().getFullYear(),
      showInterest: false, // 是否显示interest
      whichInterestToShow: '' // 显示哪个interest
    };
  },
  methods: {
    async requestAuthorBasicRanking() {
      try {
        const authorBasicRankingRes = await getAuthorBasicRanking({
          sortKey: this.sortKey,
          year: this.year
        });
        this.authorBasicRankingResponse = authorBasicRankingRes.data;
      } catch (e) {
        this.$message(e.toString());
      }
    },
    requestRankingIcon(rank: number): string {
      return getRankingIcon(rank);
    },
    jumpToPortrait(authorId: string) {
      this.$router.push({
        path: '/portrait/author',
        query: { authorId, sortKey: 'recent', page: '1' }
      });
    },
    // 只展示特定的研究兴趣
    showSpecifiedInterest(event: Event) {
      console.log('invoked');
      this.whichInterestToShow = (event.target as HTMLElement).getAttribute(
        'interest-index'
      ) as string;
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
