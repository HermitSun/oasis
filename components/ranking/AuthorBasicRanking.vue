<template>
  <div class="ranking-basic">
    <div class="title">
      <span class="main" @click="$router.push('/ranking/author')"
        >Top Author
        <svg
          t="1586349933837"
          class="icon icon-share"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4243"
          width="15"
          height="15"
        >
          <path
            d="M534.656 534.656a32 32 0 1 1-45.312-45.312L850.752 128H672a32 32 0 1 1 0-64h192A96 96 0 0 1 960 160v192a32 32 0 1 1-64 0V173.248L534.656 534.656zM896 640a32 32 0 1 1 64 0v160a160 160 0 0 1-160 160h-576A160 160 0 0 1 64 800v-576A160 160 0 0 1 224 64H384a32 32 0 0 1 0 64H224A96 96 0 0 0 128 224v576A96 96 0 0 0 224 896h576a96 96 0 0 0 96-96V640z"
            fill="#581BFF"
          /></svg
      ></span>
      <span class="sortKey">
        {{
          sortKey === 'acceptanceCount'
            ? 'sort by acceptance count'
            : 'sort by citation'
        }}
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
            fill="#581BFF"
          />
        </svg>
      </span>
    </div>
    <!--无数据时的提示-->
    <div
      v-if="authorBasicRankingResponse.length === 0"
      :style="noDataPromptStyle"
    >
      暂无数据...
    </div>
    <!--排名内容-->
    <!--现在的解决方案不支持key的变动，所以最好不要对列表进行修改-->
    <div
      v-for="(rank, index) in authorBasicRankingResponse"
      :key="index"
      class="info"
    >
      <div class="name-wrapper">
        <span class="icon">{{ requestRankingIcon(index) }}</span>
        <span class="name" @click="jumpToPortrait(rank.authorId)">{{
          rank.name
        }}</span>
      </div>
      <div class="count">
        {{ rank.count }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getRankingIcon } from './ranking';
import { getAuthorBasicRanking } from '~/api';
import { sortKey } from '~/interfaces/requests/ranking/RankingPayload';
import NoDataPrompt from '~/components/mixins/NoDataPrompt';

export default Vue.extend({
  name: 'AuthorBasicRanking',
  mixins: [NoDataPrompt],
  props: {
    ranking: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      authorBasicRankingResponse: this.ranking,
      sortKey: 'acceptanceCount' as sortKey,
      showInterest: false, // 是否显示interest
      whichInterestToShow: '' // 显示哪个interest
    };
  },
  methods: {
    async requestAuthorBasicRanking() {
      try {
        const authorBasicRankingRes = await getAuthorBasicRanking({
          sortKey: this.sortKey,
          year: new Date().getFullYear() - 1 // TODO 去掉 - 1
        });
        this.authorBasicRankingResponse = authorBasicRankingRes.data;
      } catch (e) {
        this.$message(e.toString());
      }
    },
    requestRankingIcon(rank: number): string {
      return getRankingIcon(rank);
    },
    jumpToPortrait(authorId: string) {
      this.$router.push({
        path: '/portrait/author',
        query: { authorId, sortKey: 'recent', page: '1' }
      });
    },
    changeSortKey() {
      this.sortKey =
        this.sortKey === 'citationCount' ? 'acceptanceCount' : 'citationCount';
      this.requestAuthorBasicRanking();
    },
    // 只展示特定的研究兴趣
    showSpecifiedInterest(event: Event) {
      console.log('invoked');
      this.whichInterestToShow = (event.target as HTMLElement).getAttribute(
        'interest-index'
      ) as string;
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
