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
              alt="icon-arrow-right"
              width="30"
              :style="dropdownDisabledStyle"
              @click="requestShowDetail"
            />
            <img
              v-if="showDetail"
              src="~/assets/icon/icon-arrow-top.svg"
              alt="icon-arrow-top"
              width="30"
              @click="requestShowDetail"
            />
          </span>
        </span>
        <span class="name" style="padding-left: 10px;" @click="jumpToPortrait"
          >{{ rank.affiliationName }}
          <img
            src="~/assets/icon/icon-share.svg"
            width="20"
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
import { mapGetters } from 'vuex';
import { AffiliationDetailRankingResponse } from 'interfaces/responses/ranking/advanced/AffiliationAdvancedRankingResponse';
import { getAffiliationDetailRankingById } from '@/api/index.ts';
import { createBarChart } from '@/components/charts/bar';
import InterestWordCloud from '@/components/interest/InterestWordCloud.vue';

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
      cachedRankingDetail: {} as AffiliationDetailRankingResponse,
      isLoading: false
    };
  },
  // 用来处理异步脚本的加载效果
  computed: {
    ...mapGetters('ranking', {
      isRankingAffiliationWordCloudLoaded: 'isAuthorWordCloudLoaded'
    }),
    ...mapGetters('portrait', {
      isPortraitKeywordWordCloudLoaded: 'isKeywordWordCloudLoaded'
    }),
    isWordCloudLoaded(): boolean {
      return (
        this.isRankingAffiliationWordCloudLoaded ||
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
@import '../../../../stylesheets/index.less';
</style>
