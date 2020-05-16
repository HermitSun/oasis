<template>
  <div v-loading="isLoading" class="ranking-advanced-detail">
    <div class="basic">
      <span class="name-wrapper">
        <span class="index"
          >{{ index }}
          <span class="icon">
            <img
              v-if="!showDetail"
              src="~/assets/icon/icon-arrow-right.svg"
              width="30"
              alt="icon-arrow-right"
              :style="dropdownDisabledStyle"
              @click="requestShowDetail"
            />
            <img
              v-if="showDetail"
              src="~/assets/icon/icon-arrow-top.svg"
              width="30"
              alt="icon-arrow-top"
              @click="requestShowDetail"
            />
          </span>
        </span>
        <span class="name" @click="jumpToPortrait"
          >{{ rank.keyword }}
          <img
            src="~/assets/icon/icon-share.svg"
            class="icon"
            alt="icon-share"
          />
        </span>
      </span>
      <span class="value">{{ rank.count }}</span>
      <span class="value">{{ rank.citation }}</span>
      <span class="value">{{ rank.authorNum }}</span>
    </div>
    <!--关闭时没必要完全销毁组件，隐藏即可-->
    <!--避免重复渲染的开销-->
    <div v-show="showDetail">
      <div class="divider"></div>
      <div class="detail">
        <div class="info">
          <div class="title">
            📈 Publication Trend
          </div>
          <div class="content">
            <span class="value">
              <div :id="rank.keyword.replace(/[^a-zA-Z]/g, '')"></div>
            </span>
          </div>
        </div>
        <div class="info">
          <div class="title">
            📜 Most Influential Papers
          </div>
          <div class="content">
            <div
              v-for="(paper, i) in rankingDetail.mostInfluentialPapers"
              :key="i"
              style="margin-bottom: 10px"
            >
              <PaperInfoComp :paper="paper" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import PaperInfoComp from '../PaperInfoComp.vue';
import { getKeywordDetailRanking } from '~/api';
import { KeywordDetailRankingResponse } from '~/interfaces/responses/ranking/advanced/KeywordAdvancedRankingResponse';
import { createBarChart } from '@/components/charts/bar';

export default Vue.extend({
  name: 'KeywordDetailComp',
  components: {
    PaperInfoComp
  },
  props: {
    rank: {
      /**
       * type: KeywordAdvancedRankingResponse
       */
      type: Object,
      default: () => ({})
    },
    index: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      showDetail: false,
      showWordCloud: false,
      rankingDetail: {} as KeywordDetailRankingResponse,
      cachedRankingDetail: {} as KeywordDetailRankingResponse,
      isLoading: false
    };
  },
  computed: {
    ...mapGetters('ranking', {
      isRankingWordCloudWordCloudLoaded: 'isKeywordWordCloudLoaded'
    }),
    isWordCloudLoaded(): boolean {
      return this.isRankingWordCloudWordCloudLoaded;
    },
    dropdownDisabledStyle(): { [key: string]: string | number } {
      return this.isWordCloudLoaded
        ? {}
        : { opacity: 0.6, cursor: 'not-allowed' };
    }
  },
  methods: {
    initChart() {
      setTimeout(() => {
        const selector = '#' + this.rank.keyword.replace(/[^a-zA-Z]/g, '');
        // 这一块目前还没看到有统一抽取的必要性，也许后面会需要抽出来做一个单独的初始化图表的函数
        const chartWidth = 500;
        const chartHeight = 400;
        const maxHeight = Math.max(...this.rankingDetail.publicationTrend);
        createBarChart(selector, this.rankingDetail.publicationTrend, {
          width: chartWidth,
          height: chartHeight,
          barHeight: (d: number) =>
            maxHeight === 0 ? 0 : (d / maxHeight) * (chartHeight - 20),
          barMargin: 20,
          tooltipThreshold: maxHeight
        });
      }, 0);
    },
    requestShowDetail() {
      // 加载完之后才能进行操作
      if (this.isWordCloudLoaded) {
        this.showDetail = !this.showDetail;
        if (Object.keys(this.cachedRankingDetail).length === 0) {
          this.requestRankingDetail();
        } else {
          this.rankingDetail = this.cachedRankingDetail;
        }
      }
    },
    jumpToPortrait() {
      this.$router.push({
        path: '/portrait/keyword',
        query: {
          keyword: this.rank.keyword
        }
      });
    },
    async requestRankingDetail() {
      this.isLoading = true;
      try {
        console.log(this.rank);
        const rankingDetailRes = await getKeywordDetailRanking(
          this.rank.keyword
        );
        this.rankingDetail = rankingDetailRes.data;
        this.cachedRankingDetail = this.rankingDetail;

        this.initChart();

        this.showWordCloud = true;
        this.isLoading = false;
      } catch (e) {
        this.$message.error(e.toString());
      }
    }
  }
});
</script>

<style scoped lang="less">
@import '../../../../stylesheets/index.less';
</style>
