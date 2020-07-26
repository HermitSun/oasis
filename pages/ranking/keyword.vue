<template>
  <div class="divide">
    <KeywordAdvancedComp :rankings="rankings" />
    <!--<div id="webgl" class="advanced-ranking-3D-charts mobile-hidden"></div>-->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getKeyword3DTrend, getKeywordAdvancedRanking } from '~/api';
import KeywordAdvancedComp from '@/components/ranking/advanced/keyword/KeywordAdvancedComp.vue';
import { KeywordAdvancedRankingResponse } from '~/interfaces/responses/ranking/advanced/KeywordAdvancedRankingResponse';
import { Keyword3DTrendResponse } from '~/interfaces/responses/charts/3DTrendResponse';
import { Message } from '~/node_modules/element-ui';
import AsyncLoadEcharts from '~/components/mixins/AsyncLoadEcharts';

const cache = {
  data: [] as KeywordAdvancedRankingResponse[],
  cached: false,
  expires: 300 * 1000 // 300s过期
};
let cacheTimer: NodeJS.Timeout;

export default Vue.extend({
  name: 'Keyword',
  components: { KeywordAdvancedComp },
  mixins: [AsyncLoadEcharts],
  props: {
    /**
     * advancedRankOpt: 包含sortKey,startYear, endYear
     */
    advancedRankOpt: {
      type: Object,
      default: () => ({})
    }
  },
  async asyncData({ query }) {
    console.log(query);
    if (!cache.cached) {
      const sortKey = query.sortKey
        ? (query.sortKey as any)
        : 'acceptanceCount';
      const keywordAdvancedRankingRes = await getKeywordAdvancedRanking({
        sortKey,
        startYear: query.startYear ? Number(query.startYear) : 2015,
        endYear: query.endYear ? Number(query.endYear) : 2020
      });
      cache.data =
        keywordAdvancedRankingRes && keywordAdvancedRankingRes.data
          ? keywordAdvancedRankingRes.data
          : [];
      cache.cached = true;
    }
    const keyword3DTrendRes: {
      keyword3DTrend: Keyword3DTrendResponse;
    } = {
      keyword3DTrend: {
        keywords: [],
        years: [],
        value: [[]]
      }
    };
    try {
      const keyword3DTrendResponse = await getKeyword3DTrend();
      keyword3DTrendRes.keyword3DTrend = keyword3DTrendResponse.data;
    } catch (e) {
      Message.error(e.toString());
    }

    return {
      rankings: cache.data,
      keyword3DTrend: keyword3DTrendRes.keyword3DTrend
    };
  },
  data() {
    return {} as any;
  },
  watch: {
    $route: {
      handler() {
        this.requestKeywordAdvancedRanking();
      }
    }
  },
  activated() {
    clearTimeout(cacheTimer);
  },
  deactivated() {
    cacheTimer = setTimeout(() => {
      cache.data = [];
      cache.cached = false;
    }, cache.expires);
  },
  methods: {
    // onEchartsLoad() {
    //   echarts
    //     .init(document.getElementById('webgl') as HTMLDivElement)
    //     .setOption(
    //       Echarts3DBarOption(
    //         this.keyword3DTrend.keywords,
    //         this.keyword3DTrend.years,
    //         this.keyword3DTrend.value
    //       )
    //     );
    // }
    async requestKeywordAdvancedRanking() {
      try {
        const sortKey = this.$route.query.sortKey
          ? (this.$route.query.sortKey as any)
          : 'acceptanceCount'; // TODO 奇怪呢 没法导入sortKey类型
        const startYear = this.$route.query.startYear
          ? Number(this.$route.query.startYear)
          : 2015;
        const endYear = this.$route.query.endYear
          ? Number(this.$route.query.endYear)
          : 2020;
        const keywordAdvancedRankingRes = await getKeywordAdvancedRanking({
          sortKey,
          startYear,
          endYear
        });
        // TODO 为了不报错这么写的 到底该咋写呢
        (this as any).rankings = keywordAdvancedRankingRes.data;
      } catch (e) {
        this.$message(e.toString());
      }
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
