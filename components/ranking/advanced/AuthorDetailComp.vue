<template>
  <div class="ranking-advanced-detail">
    <div class="basic" @click="requestShowDetail">
      <span class="name" @click="jumpToPortrait">{{ rank.authorName }}</span>
      <span class="value">{{ rank.count }}</span>
      <span class="value">{{ rank.citation }}</span>
      <span class="value">{{ rank.publicationTrend }}</span>
    </div>
    <div v-if="showDetail">
      <div class="divider"></div>
      <div class="detail">
        <div class="info">
          <div class="title">
            📃 Keywords
          </div>
          <div class="content">
            <!--{{ rankingDetail.keywords }}-->
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
export default Vue.extend({
  name: 'AuthorDetailComp',
  components: {
    PaperInfoComp
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
