<template>
  <div class="ranking-advanced-detail">
    <div class="basic" @click="requestShowDetail">
      <span class="name" @click="jumpToPortrait">{{
        rank.affiliationName
      }}</span>
      <span class="value">{{ rank.count }}</span>
      <span class="value">{{ rank.citation }}</span>
      <span class="value">{{ rank.authorNum }}</span>
    </div>
    <div v-if="showDetail">
      <div class="divider"></div>
      <div class="detail">
        <div class="info">
          <div class="title">
            📉 Publication Trend
          </div>
          <div class="content">
            <div id="bar"></div>
          </div>
        </div>
        <div class="info">
          <div class="title">
            📃 Keywords
          </div>
          <div class="content">
            <InterestWordCloud :interests="rankingDetail.keywords" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { AffiliationDetailRankingResponse } from '~/interfaces/responses/ranking/advanced/AffiliationAdvancedRankingResponse';
import { getAffiliationDetailRankingById } from '~/api';
import { createBarChart } from '~/utils/charts/bar';
import InterestWordCloud from '~/components/interest/InterestWordCloud.vue';
export default Vue.extend({
  name: 'AffiliationDetailComp',
  components: {
    InterestWordCloud
  },
  props: {
    rank: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      showDetail: false,
      rankingDetail: {} as AffiliationDetailRankingResponse
      // cachedRankingDetail: {} as AffiliationDetailRankingResponse
    };
  },
  methods: {
    requestShowDetail() {
      this.showDetail = !this.showDetail;
      this.requestRankingDetail();
      // } else {
      //   this.rankingDetail = this.cachedRankingDetail;
      // }
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
      try {
        const rankingDetailRes = await getAffiliationDetailRankingById(
          this.rank.affiliationId
        );
        this.rankingDetail = rankingDetailRes.data;
        createBarChart('#bar', this.rankingDetail.publicationTrend, {
          width: 500,
          height: 400,
          barMargin: 20,
          tooltipThreshold: 15
        });
        // this.cachedRankingDetail = this.rankingDetail;
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
