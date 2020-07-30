<template>
  <div v-loading="isLoading" class="ranking-advanced-detail">
    <div class="basic">
      <span class="name-wrapper">
        <span class="index">
          <span class="number">{{ index }}</span>
          <el-button
            v-if="!showDetail"
            type="primary"
            circle
            plain
            size="mini"
            icon="el-icon-arrow-right"
            :style="dropdownDisabledStyle"
            @click="requestShowDetail"
          />
          <el-button
            v-if="showDetail"
            type="primary"
            circle
            size="mini"
            icon="el-icon-arrow-up"
            @click="requestShowDetail"
          />
        </span>
        <el-tooltip
          trigger="hover"
          placement="top-start"
          :content="rank.keyword"
        >
          <span class="name" @click="jumpToPortrait">{{ rank.keyword }} </span>
        </el-tooltip>
      </span>
      <span class="value">
        <span class="mobile-hidden">{{ rank.citation }}</span>
        <span class="pc-hidden_mobile"
          ><el-tag size="small"
            >{{ rank.citation }}<br />citation
          </el-tag></span
        >
      </span>
      <span class="value">
        <span class="mobile-hidden">{{ rank.count }}</span>
        <span class="pc-hidden_mobile"
          ><el-tag size="small">{{ rank.count }}<br />acceptance </el-tag></span
        >
      </span>
      <span class="value">
        <span class="mobile-hidden">{{ rank.authorNum }}</span>
        <span class="pc-hidden_mobile"
          ><el-tag size="small">{{ rank.authorNum }}<br />authors</el-tag></span
        >
      </span>
    </div>
    <!--关闭时没必要完全销毁组件，隐藏即可-->
    <!--避免重复渲染的开销-->
    <div v-show="showDetail" class="detail">
      <div class="info">
        <div class="title">
          <i class="el-icon-data-line icon"></i> Publication Trend
        </div>
        <div class="detail-content">
          <div
            :id="rank.keyword.replace(/[^a-zA-Z]/g, '')"
            style="height: 250px;width: 100%"
          ></div>
        </div>
      </div>
      <div class="info">
        <div class="title">
          <i class="el-icon-document icon"></i> Most Influential Papers
        </div>
        <div class="detail-content">
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
</template>

<script lang="ts">
import Vue from 'vue';
import { Tooltip, Icon, Tag } from 'element-ui';
import { mapGetters } from 'vuex';
import PaperInfoComp from '~/components/ranking/advanced/PaperInfoComp.vue';
import { getKeywordDetailRanking } from '~/api';
import { KeywordDetailRankingResponse } from '~/interfaces/responses/ranking/advanced/KeywordAdvancedRankingResponse';
import { createBarChart } from '~/components/charts/bar';

export default Vue.extend({
  name: 'KeywordDetailComp',
  components: {
    PaperInfoComp,
    [Icon.name]: Icon,
    [Tooltip.name]: Tooltip,
    [Tag.name]: Tag
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
        const selector = this.rank.keyword.replace(/[^a-zA-Z]/g, '');
        createBarChart(selector, this.rankingDetail.publicationTrend);
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
