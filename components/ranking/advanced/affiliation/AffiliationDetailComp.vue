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
          :content="rank.affiliationName"
        >
          <span class="name" @click="jumpToPortrait"
            >{{ rank.affiliationName }}
          </span>
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
            :id="rank.affiliationName.replace(/[^a-zA-Z]/g, '') + 'bar'"
            style="height: 250px; width:100%"
          ></div>
        </div>
      </div>
      <div class="info">
        <div class="title">
          <i class="el-icon-magic-stick icon"></i> Keywords
        </div>
        <div class="detail-content">
          <div
            :id="rank.affiliationName.replace(/[^a-zA-Z]/g, '') + 'wordcloud'"
            style="height: 250px; width:100%"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Tooltip, Icon, Tag } from 'element-ui';
import { mapGetters } from 'vuex';
import { AffiliationDetailRankingResponse } from 'interfaces/responses/ranking/advanced/AffiliationAdvancedRankingResponse';
import { getAffiliationDetailRankingById } from '@/api/index.ts';
import { createBarChart } from '@/components/charts/bar';
import { createWordCloud } from '~/components/charts/wordcloud';

export default Vue.extend({
  name: 'AffiliationDetailComp',
  components: {
    [Tooltip.name]: Tooltip,
    [Icon.name]: Icon,
    [Tag.name]: Tag
  },
  props: {
    rank: {
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
      rankingDetail: {} as AffiliationDetailRankingResponse,
      cachedRankingDetail: new Map<string, AffiliationDetailRankingResponse>(),
      isLoading: false
    };
  },
  // 用来处理异步脚本的加载效果
  computed: {
    ...mapGetters('ranking', {
      isRankingEchartsLoaded: 'isEchartsLoaded',
      isRankingAffiliationWordCloudLoaded: 'isAffiliationWordCloudLoaded',
      isRankingAuthorWordCloudLoaded: 'isAuthorWordCloudLoaded'
    }),
    ...mapGetters('portrait', {
      isPortraitEchartsLoaded: 'isEchartsLoaded',
      isPortraitAffiliationWordCloudLoaded: 'isAffiliationWordCloudLoaded',
      isPortraitKeywordWordCloudLoaded: 'isKeywordWordCloudLoaded'
    }),
    isEchartsLoaded(): boolean {
      return this.isRankingEchartsLoaded || this.isPortraitEchartsLoaded;
    },
    isWordCloudLoaded(): boolean {
      return (
        this.isRankingAffiliationWordCloudLoaded ||
        this.isRankingAuthorWordCloudLoaded ||
        this.isPortraitAffiliationWordCloudLoaded ||
        this.isPortraitKeywordWordCloudLoaded
      );
    },
    dropdownDisabledStyle(): { [key: string]: string | number } {
      return this.isWordCloudLoaded
        ? {}
        : { opacity: 0.6, cursor: 'not-allowed' };
    }
  },
  watch: {
    isEchartsLoaded(val) {
      if (val) {
        this.initChart();
      }
    },
    // 数据更新时关闭所有打开的详情
    '$route.query'(cur, last) {
      this.showDetail = false;
      // 年份范围发生变化时，清空缓存
      const isTimeRangeChanged =
        cur.startYear !== last.startYear || cur.endYear !== last.endYear;
      if (isTimeRangeChanged) {
        this.cachedRankingDetail.clear();
      }
    }
  },
  methods: {
    initChart() {
      this.$nextTick(() => {
        const selector = this.rank.affiliationName.replace(/[^a-zA-Z]/g, '');
        createBarChart(selector + 'bar', this.rankingDetail.publicationTrend);
        createWordCloud(selector + 'wordcloud', this.rankingDetail.keywords);
      });
    },
    requestShowDetail() {
      // 加载完之后才能进行操作
      if (this.isWordCloudLoaded) {
        this.showDetail = !this.showDetail;
        this.requestRankingDetail();
      }
    },
    jumpToPortrait() {
      this.$router.push({
        path: '/portrait/affiliation',
        query: {
          affiliation: this.rank.affiliationId
        }
      });
    },
    async requestRankingDetail() {
      this.isLoading = true;
      try {
        const cache = this.cachedRankingDetail.get(this.rank.affiliationId);
        if (cache) {
          this.rankingDetail = cache;
        } else {
          const rankingDetailRes = await getAffiliationDetailRankingById(
            this.rank.affiliationId
          );
          this.rankingDetail = rankingDetailRes.data;
          // 此处缓存可能有内存占用过大的问题，不过考虑到一页只有20个，应该不会出问题
          this.cachedRankingDetail.set(
            this.rank.affiliationId,
            this.rankingDetail
          );
        }
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
