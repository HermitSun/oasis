<template>
  <div class="ranking">
    <div class="title">
      Top Authors
      <span class="sortKey"
        >{{ sortKey === "acceptanceCount" ? "count" : "citation" }}
        <svg
          class="icon"
          width="20px"
          height="20px"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          @click="changeSortKey"
        >
          <path
            d="M832 592c0 10.752-3.968 20.096-11.904 28.096l-280 280C532.096 908.096 522.752 912 512 912c-10.816 0-20.16-3.904-28.096-11.904L203.904 620.096C195.904 612.096 192 602.752 192 592s3.904-20.096 11.904-28.096C211.84 555.904 221.184 552 232 552l560 0c10.752 0 20.096 3.904 28.096 11.904C828.032 571.904 832 581.248 832 592zM832 384c0 10.752-3.968 20.096-11.904 28.096-8 8-17.344 11.904-28.096 11.904l-560 0c-10.816 0-20.16-3.904-28.096-11.904C195.904 404.096 192 394.752 192 384s3.904-20.096 11.904-28.096l280-280C491.84 67.968 501.184 64 512 64c10.752 0 20.096 3.968 28.096 11.904l280 280C828.032 363.904 832 373.248 832 384z"
            fill="#418BAF"
          ></path>
        </svg>
      </span>
    </div>
    <!--现在的解决方案不支持key的变动，所以最好不要对列表进行修改-->
    <div
      v-for="(rank, index) in authorBasicRankingResponse"
      :key="index"
      class="info"
    >
      <span class="icon">{{ requestRankingIcon(index) }}</span>
      <el-popover
        trigger="click"
        width="500"
        @show="showInterest = true"
        @hide="showInterest = false"
        @click.native="showSpecifiedInterest"
      >
        <!--双等号可以不用强制类型转换-->
        <!--加锁以避免额外的渲染-->
        <ResearcherInterest
          v-if="showInterest && index == whichInterestToShow"
          :researcher-id="rank.researcherId"
        />
        <span class="name" slot="reference" :interest-index="index">
          {{ rank.name }}
        </span>
      </el-popover>
      <span class="count">{{ rank.count }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AuthorBasicRankingResponse } from "@/interfaces/responses/ranking/AuthorBasicRankingResponse";
import { sortKey } from "@/interfaces/components/ranking/RankingData";
import { getAuthorBasicRanking } from "@/api";
import { getRankingIcon } from "@/components/ranking/ranking";
import ResearcherInterest from "@/components/interest/ResearcherInterest.vue";

export default Vue.extend({
  name: "AuthorBasicRanking",
  components: {
    ResearcherInterest
  },
  data() {
    return {
      authorBasicRankingResponse: [] as AuthorBasicRankingResponse[],
      sortKey: "acceptanceCount" as sortKey,
      showInterest: false, // 是否显示interest
      whichInterestToShow: "" // 显示哪个interest
    };
  },
  mounted(): void {
    this.requestAuthorBasicRanking();
  },
  methods: {
    async requestAuthorBasicRanking() {
      const authorBasicRankingRes = await getAuthorBasicRanking({
        sortKey: this.sortKey
      });
      this.authorBasicRankingResponse = authorBasicRankingRes.data;
    },
    requestRankingIcon(rank: number): string {
      return getRankingIcon(rank);
    },
    changeSortKey() {
      this.sortKey =
        this.sortKey === "citationCount" ? "acceptanceCount" : "citationCount";
      this.requestAuthorBasicRanking();
    },
    // 只展示特定的研究兴趣
    showSpecifiedInterest(event: Event) {
      this.whichInterestToShow = (event.target as HTMLElement).getAttribute(
        "interest-index"
      ) as string;
    }
  }
});
</script>

<style scoped lang="less">
@import "../../../src/stylesheets/index.less";
</style>
