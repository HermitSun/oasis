<template>
  <div :id="'detail' + index" class="ranking-advanced-detail">
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
        <span class="name" @click="jumpToPortrait"
          >{{ rank.authorName }}
          <img src="../../../assets/icon/icon-share.svg" class="icon" />
        </span>
      </span>
      <span class="value">{{ rank.count }}</span>
      <span class="value">{{ rank.citation }}</span>
      <span class="value">
        <div
          :id="rank.authorName.replace(/[^a-zA-Z]/g, '') + rank.authorId"
        ></div>
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
            <InterestWordCloud
              v-if="showWordCloud"
              :interests="rankingDetail.keywords"
            />
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
import loadingConfig from '~/components/portrait/loadingConfig';
import { Loading } from '~/node_modules/element-ui';

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
      rankingDetail: {} as AuthorDetailRankingResponse,
      cachedRankingDetail: {} as AuthorDetailRankingResponse
    };
  },
  mounted() {
    const selector =
      '#' + this.rank.authorName.replace(/[^a-zA-Z]/g, '') + this.rank.authorId;
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
      const loadingInstance = Loading.service(
        loadingConfig(document.getElementById('detail' + this.index) as any)
      );
      console.log('detail' + this.index);
      console.log(document.getElementById('detail' + this.index));
      try {
        const rankingDetailRes = await getAuthorDetailRankingById(
          this.rank.authorId
        );
        this.rankingDetail = rankingDetailRes.data;
        this.cachedRankingDetail = this.rankingDetail;
        loadingInstance.close();
        this.showWordCloud = true;
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
