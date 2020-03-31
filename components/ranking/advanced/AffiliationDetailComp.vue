<template>
  <div class="ranking-advanced-detail">
    <div class="basic">
      <span class="value" @click="requestShowDetail">{{
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
            Publication Trend
          </div>
          <div class="content">
            {{ rankingDetail.publicationTrend }}
          </div>
        </div>
        <div class="info">
          <div class="title">
            Keywords
          </div>
          <div class="content">
            {{ rankingDetail.keywords }}
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
export default Vue.extend({
  name: 'AffiliationDetailComp',
  props: {
    rank: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      showDetail: false,
      rankingDetail: {} as AffiliationDetailRankingResponse,
      cachedRankingDetail: {} as AffiliationDetailRankingResponse
    };
  },
  methods: {
    requestShowDetail() {
      this.showDetail = !this.showDetail;
      console.log(this.rankingDetail);
      console.log(this.cachedRankingDetail);
      if (Object.keys(this.cachedRankingDetail).length === 0) {
        this.requestRankingDetail();
      } else {
        this.rankingDetail = this.cachedRankingDetail;
      }
    },
    async requestRankingDetail() {
      try {
        const rankingDetailRes = await getAffiliationDetailRankingById(
          this.rank.affiliationId
        );
        this.rankingDetail = rankingDetailRes.data;
        this.cachedRankingDetail = this.rankingDetail;
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
