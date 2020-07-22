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
          :content="rank.authorName"
        >
          <span class="name" @click="jumpToPortrait"
            >{{ rank.authorName }}
          </span>
        </el-tooltip>
      </span>
      <span class="value">{{ rank.citation }}</span>
      <span class="value">{{ rank.count }}</span>
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
            <i class="el-icon-magic-stick icon"></i> Keywords
          </div>
          <div class="content">
            <div
              :id="rank.authorName.replace(/[^a-zA-Z]/g, '') + 'wordcloud'"
            ></div>
          </div>
        </div>
        <div class="info">
          <div class="title">
            <i class="el-icon-document icon"></i> Most Influential Papers
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
            <i class="el-icon-notebook-1 icon"></i> Most Recent Papers
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
import { Button, Tooltip, Icon } from 'element-ui';
import { mapGetters } from 'vuex';
import { AuthorDetailRankingResponse } from 'interfaces/responses/ranking/advanced/AuthorAdvancedRankingResponse';
import { getAuthorDetailRankingById } from '@/api';
import PaperInfoComp from '@/components/ranking/advanced/PaperInfoComp.vue';
import { createBarChart } from '@/components/charts/bar';
import { createWordCloud } from '~/components/charts/wordcloud';

export default Vue.extend({
  name: 'AuthorDetailComp',
  components: {
    PaperInfoComp,
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
      rankingDetail: {} as AuthorDetailRankingResponse,
      cachedRankingDetail: {} as AuthorDetailRankingResponse,
      isLoading: false
    };
  },
  // 用来处理异步脚本的加载效果
  // 此处会与store紧耦合
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
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      setTimeout(() => {
        const selector = this.rank.authorName.replace(/[^a-zA-Z]/g, '');
        createBarChart(
          selector + this.rank.authorId,
          this.rank.publicationTrend
        );
        console.log(selector);
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
