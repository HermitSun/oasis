<template>
  <div class="divide">
    <KeywordAdvancedComp :rankings="rankings" class="advanced-ranking-list" />
    <div id="webgl" class="advanced-ranking-3D-charts mobile-hidden"></div>
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
import { Echarts3DBarOption } from '~/components/charts/echarts';

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
  async asyncData() {
    if (!cache.cached) {
      // TODO 添加可选择的sortKey和year
      const keywordAdvancedRankingRes = await getKeywordAdvancedRanking({
        sortKey: 'acceptanceCount',
        startYear: 2019,
        endYear: 2019
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
    onEchartsLoad() {
      echarts
        .init(document.getElementById('webgl') as HTMLDivElement)
        .setOption(
          Echarts3DBarOption(
            this.keyword3DTrend.keywords,
            this.keyword3DTrend.years,
            this.keyword3DTrend.value
          )
        );
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
