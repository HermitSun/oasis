<template>
  <div v-loading="isLoading" class="ranking-advanced-detail">
    <div class="basic">
      <span class="name-wrapper">
        <span class="index"
          >{{ index }}
          <span class="icon">
            <img
              v-if="!showDetail"
              src="../../../assets/icon/icon-arrow-right.svg"
              width="30"
              @click="requestShowDetail"
            />
            <img
              v-if="showDetail"
              src="../../../assets/icon/icon-arrow-top.svg"
              width="30"
              @click="requestShowDetail"
            />
          </span>
        </span>
        <span class="name" style="padding-left: 10px;" @click="jumpToPortrait"
          >{{ rank.affiliationName }}
          <img
            src="../../../assets/icon/icon-share.svg"
            width="20"
            class="icon"
          />
        </span>
      </span>
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
            <div :id="rank.affiliationName.replace(/[^a-zA-Z]/g, '')"></div>
          </div>
        </div>
        <div class="info">
          <div class="title">
            📃 Keywords
          </div>
          <div class="content">
            <InterestWordCloud
              v-if="showWordCloud"
              id="wordCloud"
              :interests="rankingDetail.keywords"
            />
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
      isLoading: false
    };
  },
  methods: {
    requestShowDetail() {
      this.showDetail = !this.showDetail;
      this.requestRankingDetail();
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
        const selector =
          '#' + this.rank.affiliationName.replace(/[^a-zA-Z]/g, '');
        createBarChart(selector, this.rankingDetail.publicationTrend, {
          width: 500,
          height: 400,
          barMargin: 20,
          tooltipThreshold: 15
        });

        // TODO 控制word-cloud高度
        // const elementWordCloud = document.getElementById('wordCloud') as any;
        // const elementPublicationTrend = document.getElementById(
        //   this.rank.affiliationName.replace(/[^a-zA-Z]/g, '')
        // ) as HTMLElement;
        // elementWordCloud.style.height =
        //   elementPublicationTrend.offsetHeight - 60 + 'px';
        // console.log(elementPublicationTrend.offsetHeight);
        // console.log(elementWordCloud.offsetHeight);
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
@import '../../../stylesheets/index.less';
</style>
