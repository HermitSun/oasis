<template>
  <div class="ranking-advanced-detail">
    <div class="basic" @click="requestShowDetail">
      <span class="name" @click="jumpToPortrait">{{ rank.authorName }}</span>
      <span class="value">{{ rank.count }}</span>
      <span class="value">{{ rank.citation }}</span>
      <span class="value">
        <div :id="rank.authorName.split(' ')[0]"></div>
      </span>
    </div>
    <div v-if="showDetail">
      <div class="divider"></div>
      <div class="detail">
        <div class="info">
          <div class="title">
            📃 Keywords
          </div>
          <div class="content">
            <InterestWordCloud :interests="rankingDetail.keywords" />
          </div>
        </div>
        <div class="info">
          <div class="title">
            📜 Most Influential Papers
          </div>
          <div class="content">
            <div
              v-for="(paper, index) in rankingDetail.mostInfluentialPapers"
              :key="index"
              style="margin-bottom: 10px"
            >
              <PaperInfoComp :paper="paper" />
            </div>
          </div>
        </div>
        <div class="info">
          <div class="title">
            📝 Most Recent Papers
          </div>
          <div class="content">
            <div
              v-for="(paper, index) in rankingDetail.mostRecentPapers"
              :key="index"
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
import { getAuthorDetailRankingById } from '~/api';
import { AuthorDetailRankingResponse } from '~/interfaces/responses/ranking/advanced/AuthorAdvancedRankingResponse';
import PaperInfoComp from '~/components/ranking/advanced/PaperInfoComp.vue';
import InterestWordCloud from '~/components/interest/InterestWordCloud.vue';
import { createBarChart } from '~/utils/charts/bar';

export default Vue.extend({
  name: 'AuthorDetailComp',
  components: {
    PaperInfoComp,
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
      rankingDetail: {} as AuthorDetailRankingResponse,
      cachedRankingDetail: {} as AuthorDetailRankingResponse
    };
  },
  mounted() {
    const selector = '#' + this.rank.authorName.split(' ')[0];
    createBarChart(selector, this.rank.publicationTrend, {
      width: 150,
      height: 80,
      tooltipThreshold: 15
    });
  },
  methods: {
    requestShowDetail() {
      this.showDetail = !this.showDetail;
      if (Object.keys(this.cachedRankingDetail).length === 0) {
        this.requestRankingDetail();
      } else {
        this.rankingDetail = this.cachedRankingDetail;
      }
    },
    jumpToPortrait() {
      this.$router.push({
        path: '/portrait/author',
        query: {
          authorId: this.rank.authorId
        }
      });
    },
    async requestRankingDetail() {
      try {
        const rankingDetailRes = await getAuthorDetailRankingById(
          this.rank.authorId
        );
        this.rankingDetail = rankingDetailRes.data;
        this.cachedRankingDetail = this.rankingDetail;
        console.log(this.rankingDetail.keywords);
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
