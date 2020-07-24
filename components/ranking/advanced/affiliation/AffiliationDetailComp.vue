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
      <span class="value">{{ rank.citation }}</span>
      <span class="value">{{ rank.count }}</span>
      <span class="value">{{ rank.authorNum }}</span>
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
import { Button, Tooltip, Icon } from 'element-ui';
import { mapGetters } from 'vuex';
import { AffiliationDetailRankingResponse } from 'interfaces/responses/ranking/advanced/AffiliationAdvancedRankingResponse';
import { getAffiliationDetailRankingById } from '@/api/index.ts';
import { createBarChart } from '@/components/charts/bar';
import { createWordCloud } from '~/components/charts/wordcloud';

export default Vue.extend({
  name: 'AffiliationDetailComp',
  components: {
    [Button.name]: Button,
    [Tooltip.name]: Tooltip,
    [Icon.name]: Icon
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
      cachedRankingDetail: {} as AffiliationDetailRankingResponse,
      isLoading: false
    };
  },
  // 用来处理异步脚本的加载效果
  computed: {
    ...mapGetters('ranking', {
      isRankingAffiliationWordCloudLoaded: 'isAffiliationWordCloudLoaded',
      isRankingAuthorWordCloudLoaded: 'isAuthorWordCloudLoaded'
    }),
    ...mapGetters('portrait', {
      isPortraitAffiliationWordCloudLoaded: 'isAffiliationWordCloudLoaded',
      isPortraitKeywordWordCloudLoaded: 'isKeywordWordCloudLoaded'
    }),
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
  methods: {
    initChart() {
      setTimeout(() => {
        const selector = this.rank.affiliationName.replace(/[^a-zA-Z]/g, '');
        createBarChart(selector + 'bar', this.rankingDetail.publicationTrend);
        createWordCloud(selector + 'wordcloud', this.rankingDetail.keywords);
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
        path: '/portrait/affiliation',
        query: {
          affiliation: this.rank.affiliationId
        }
      });
    },
    async requestRankingDetail() {
      this.isLoading = true;
      try {
        const rankingDetailRes = await getAffiliationDetailRankingById(
          this.rank.affiliationId
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
