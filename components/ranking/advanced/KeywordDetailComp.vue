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
              <div :id="rank.keyword"></div>
            </span>
          </div>
        </div>
        <div class="info">
          <div class="title">
            📜 Most Influential Papers
          </div>
          <div class="content">
            <div
              v-for="(paper, i) in rank.mostInfluentialPapers"
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
import PaperInfoComp from './PaperInfoComp.vue';
import { createBarChart } from '~/components/charts/bar';
import { AuthorAdvancedRankingResponse } from '~/interfaces/responses/ranking/advanced/AuthorAdvancedRankingResponse';
import { AffiliationAdvancedRankingResponse } from '~/interfaces/responses/ranking/advanced/AffiliationAdvancedRankingResponse';
import {
  getAffiliationDetailRankingByKeyword,
  getAuthorDetailRankingByKeyword
} from '~/api';
import authorAdvancedRankingMockData from '~/server/mock/ranking/author/authorAdvancedRankingMockData';

import affiliationAdvancedRankingMockData from '~/server/mock/ranking/affiliation/affiliationAdvancedRankingMockData';

export default Vue.extend({
  name: 'KeywordDetailComp',
  components: {
    PaperInfoComp
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
      isLoading: false,
      authorRanking: [] as AuthorAdvancedRankingResponse[],
      affiliationRanking: [] as AffiliationAdvancedRankingResponse[]
    };
  },
  mounted() {
    const selector = '#' + this.rank.keyword;
    createBarChart(selector, this.rank.publicationTrend, {
      width: 150,
      height: 80,
      tooltipThreshold: 15
    });
  },
  methods: {
    requestShowDetail() {
      this.showDetail = !this.showDetail;
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
        let authorRankingRes = await getAuthorDetailRankingByKeyword(
          this.rank.keyword
        );
        // TODO delete
        authorRankingRes = authorAdvancedRankingMockData;
        let affiliationRankingRes = await getAffiliationDetailRankingByKeyword(
          this.rank.keyword
        );
        affiliationRankingRes = affiliationAdvancedRankingMockData;
        this.authorRanking = authorRankingRes.data;
        this.affiliationRanking = affiliationRankingRes.data;
        this.isLoading = false;
      } catch (e) {
        this.$message.error(e.toString());
      }
    }
  }
});
</script>

<style scoped lang="less">
@import '../../../stylesheets/index.less';
</style>
