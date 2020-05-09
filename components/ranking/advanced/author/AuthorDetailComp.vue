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
              :style="dropdownDisabledStyle"
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
          >{{ rank.authorName }}
          <img
            src="~/assets/icon/icon-share.svg"
            class="icon"
            alt="icon-share"
          />
        </span>
      </span>
      <span class="value">{{ rank.count }}</span>
      <span class="value">{{ rank.citation }}</span>
      <span class="value">
        <!--提前设定宽和高，避免重排-->
        <div
          :id="rank.authorName.replace(/[^a-zA-Z]/g, '') + rank.authorId"
          style="width: 100%; height: 80px;"
        ></div>
      </span>
    </div>
    <!--关闭时没必要完全销毁组件，隐藏即可-->
    <!--避免重复渲染的开销-->
    <div v-show="showDetail">
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
              v-for="(paper, i) in rankingDetail.mostInfluentialPapers"
              :key="i"
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
              v-for="(paper, i) in rankingDetail.mostRecentPapers"
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
import { mapGetters } from 'vuex';
import { AuthorDetailRankingResponse } from 'interfaces/responses/ranking/advanced/AuthorAdvancedRankingResponse';
import { getAuthorDetailRankingById } from '@/api';
import PaperInfoComp from '@/components/ranking/advanced/PaperInfoComp.vue';
import InterestWordCloud from '@/components/interest/InterestWordCloud.vue';
import { createBarChart } from '@/components/charts/bar';

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
      cachedRankingDetail: {} as AuthorDetailRankingResponse,
      isLoading: false
    };
  },
  // 用来处理异步脚本的加载效果
  computed: {
    ...mapGetters('ranking', ['isAuthorWordCloudLoaded']),
    dropdownDisabledStyle(): { [key: string]: string | number } {
      return this.isAuthorWordCloudLoaded
        ? {}
        : { opacity: 0.6, cursor: 'not-allowed' };
    }
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
      // 加载完之后才能进行操作
      if (this.isAuthorWordCloudLoaded) {
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
        path: '/portrait/author',
        query: {
          authorId: this.rank.authorId
        }
      });
    },
    async requestRankingDetail() {
      this.isLoading = true;
      try {
        const rankingDetailRes = await getAuthorDetailRankingById(
          this.rank.authorId
        );
        this.rankingDetail = rankingDetailRes.data;
        this.cachedRankingDetail = this.rankingDetail;
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
