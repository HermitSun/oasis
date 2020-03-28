<template>
  <div class="ranking-basic">
    <div class="title">
      Top Authors
      <span class="sortKey">
        {{ sortKey === 'acceptanceCount' ? 'count' : 'citation' }}
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
          />
        </svg>
      </span>
    </div>
    <!--现在的解决方案不支持key的变动，所以最好不要对列表进行修改-->
    <div
      v-for="(rank, index) in authorBasicRankingResponse"
      :key="index"
      class="info"
    >
      <div class="name-wrapper">
        <span class="icon">{{ requestRankingIcon(index) }}</span>
        <!--只在客户端渲染词云-->
        <client-only>
          <!--服务端渲染的占位符-->
          <span slot="placeholder" class="name">
            {{ rank.name }}
          </span>
          <!--真正的词云-->
          <el-popover
            trigger="click"
            @show="showInterest = true"
            @hide="showInterest = false"
            @click.native="showSpecifiedInterest"
          >
            <!--双等号可以不用强制类型转换-->
            <!--加锁以避免额外的渲染-->
            <!--此处判断authorId是为了应对低网速情况，低网速环境下可能会返回null-->
            <ResearcherInterest
              v-if="
                rank.authorId && showInterest && index == whichInterestToShow
              "
              :author-id="rank.authorId"
            />
            <span slot="reference" class="name" :interest-index="index">
              {{ rank.name }}
            </span>
          </el-popover>
        </client-only>
      </div>
      <div class="count">
        {{ rank.count }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Popover } from 'element-ui';
import { getRankingIcon } from './ranking';
import { getAuthorBasicRanking } from '~/api';
import ResearcherInterest from '~/components/interest/ResearcherInterest.vue';
import { sortKey } from '~/interfaces/requests/ranking/RankingPayload';

export default Vue.extend({
  name: 'AuthorBasicRanking',
  components: {
    ResearcherInterest,
    [Popover.name]: Popover
  },
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
