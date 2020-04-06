<template>
  <div>
    <div class="homepage-header">
      <img src="~/assets/logo.png" class="homepage-header__logo" alt="oasis" />
      <label>
        <input
          v-model="keyword"
          class="basic-search__input"
          type="text"
          style="margin-top: 25px;"
          @keyup.enter="sendBasicSearch"
        />
      </label>
      <div class="flex-center-row" style="margin-top: 15px">
        <button class="basic-search__button" @click="sendBasicSearch">
          OASIS Search
        </button>
        <div style="width: 15px"></div>
        <button
          class="advanced-search__button"
          @click="showAdvancedSearch = true"
        >
          Advanced Search
        </button>
        <AdvancedSearchComp
          v-if="showAdvancedSearch"
          @close="showAdvancedSearch = false"
        />
      </div>
    </div>
    <div class="homepage-content">
      <div class="homepage-content__abstract">
        <Subtitle title="📄 OASIS NEWS" />
        <div
          v-for="abstract in abstractResponse"
          :key="abstract.id"
          style="margin-bottom: 5px"
        >
          <AbstractComp :abstract="abstract" />
        </div>
      </div>

      <div class="homepage-content__ranking">
        <Subtitle title="🏆 OASIS RANKINGS" />
        <div class="homepage-content__rankings">
          <AuthorBasicRanking :ranking="authorRanking" class="rank" />
          <JournalBasicRanking :ranking="journalRanking" class="rank" />
          <ConferenceBasicRanking :ranking="conferenceRanking" class="rank" />
          <AffiliationBasicRanking :ranking="affiliationRanking" class="rank" />
          <KeywordBasicRanking :ranking="keywordRanking" class="rank" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Message } from 'element-ui';
import {
  getActivePaperAbstract,
  getAffiliationBasicRanking,
  getAuthorBasicRanking,
  getConferenceBasicRanking,
  getJournalBasicRanking,
  getKeywordBasicRanking
} from '~/api';
import AbstractComp from '~/components/abstract/AbstractComp.vue';
import AdvancedSearchComp from '~/components/search/AdvancedSearchComp.vue';
import AuthorBasicRanking from '~/components/ranking/AuthorBasicRanking.vue';
import AffiliationBasicRanking from '~/components/ranking/AffiliationBasicRanking.vue';

import { ActivePaperAbstractResponse } from '~/interfaces/responses/abstract/ActivePaperAbstractResponse';
import { BasicRankingResponse } from '~/interfaces/responses/ranking/basic/BasicRankingResponse';
import { AuthorBasicRankingResponse } from '~/interfaces/responses/ranking/basic/AuthorBasicRankingResponse';
import { HomePageComp } from '~/interfaces/pages/HomePageComp';
import Subtitle from '~/components/public/Subtitle.vue';
import ConferenceBasicRanking from '~/components/ranking/ConferenceBasicRanking.vue';
import KeywordBasicRanking from '~/components/ranking/KeywordBasicRanking.vue';
import JournalBasicRanking from '~/components/ranking/JournalBasicRanking.vue';

// SSR需要的方法，无状态
async function requestActivePaperAbstract() {
  const res: { abstractResponse: ActivePaperAbstractResponse[] } = {
    abstractResponse: []
  };
  try {
    const activePaperAbstractRes = await getActivePaperAbstract();
    res.abstractResponse = activePaperAbstractRes.data;
  } catch (e) {
    Message.error(e.toString());
  }
  return res;
}

async function requestAffiliationBasicRanking() {
  const res: { affiliationRanking: BasicRankingResponse[] } = {
    affiliationRanking: []
  };
  try {
    const affiliationBasicRankingRes = await getAffiliationBasicRanking({
      sortKey: 'acceptanceCount',
      year: new Date().getFullYear() - 1 // TODO 去掉 - 1
    });
    res.affiliationRanking = affiliationBasicRankingRes.data;
  } catch (e) {
    Message.error(e.toString());
  }
  return res;
}

async function requestAuthorBasicRanking() {
  const res: { authorRanking: AuthorBasicRankingResponse[] } = {
    authorRanking: []
  };
  try {
    const authorBasicRankingRes = await getAuthorBasicRanking({
      sortKey: 'acceptanceCount',
      year: new Date().getFullYear() - 1 // TODO 去掉 - 1
    });
    res.authorRanking = authorBasicRankingRes.data;
  } catch (e) {
    Message.error(e.toString());
  }
  return res;
}

async function requestConferenceBasicRanking() {
  const res: { conferenceRanking: BasicRankingResponse[] } = {
    conferenceRanking: []
  };
  try {
    const conferenceBasicRankingRes = await getConferenceBasicRanking({
      sortKey: 'acceptanceCount',
      year: new Date().getFullYear() - 1 // TODO 去掉 - 1
    });
    res.conferenceRanking = conferenceBasicRankingRes.data;
  } catch (e) {
    Message.error(e.toString());
  }
  return res;
}

async function requestJournalBasicRanking() {
  const res: { journalRanking: BasicRankingResponse[] } = {
    journalRanking: []
  };
  try {
    const journalBasicRankingRes = await getJournalBasicRanking({
      sortKey: 'acceptanceCount',
      year: new Date().getFullYear() - 1 // TODO 去掉 - 1
    });
    res.journalRanking = journalBasicRankingRes.data;
  } catch (e) {
    Message.error(e.toString());
  }
  return res;
}

async function requestKeywordBasicRanking() {
  const res: { keywordRanking: BasicRankingResponse[] } = {
    keywordRanking: []
  };
  try {
    const keywordBasicRankingRes = await getKeywordBasicRanking(
      Number(new Date().getFullYear() - 1)
    ); // TODO 去掉 - 1);
    res.keywordRanking = keywordBasicRankingRes.data;
  } catch (e) {
    Message.error(e.toString());
  }
  return res;
}

export default Vue.extend({
  name: 'HomePage',
  components: {
    AbstractComp,
    AdvancedSearchComp,
    AuthorBasicRanking,
    AffiliationBasicRanking,
    ConferenceBasicRanking,
    KeywordBasicRanking,
    JournalBasicRanking,
    Subtitle
  },
  // 渲染初始数据
  async asyncData() {
    const abstractReq = requestActivePaperAbstract();
    const affiliationRankingReq = requestAffiliationBasicRanking();
    const authorRankingReq = requestAuthorBasicRanking();
    const conferenceRankingReq = requestConferenceBasicRanking();
    const journalRankingReq = requestJournalBasicRanking();
    const keywordRankingReq = requestKeywordBasicRanking();
    // 并发执行请求，降低阻塞时间
    return {
      ...(await abstractReq),
      ...(await affiliationRankingReq),
      ...(await authorRankingReq),
      ...(await conferenceRankingReq),
      ...(await journalRankingReq),
      ...(await keywordRankingReq)
    };
  },
  data() {
    return {
      keyword: '',
      showAdvancedSearch: false
    } as HomePageComp;
  },
  methods: {
    async sendBasicSearch() {
      const defaultPage = '1';
      if (this.keyword !== '') {
        await this.$router.push({
          path: '/search',
          query: {
            mode: 'basic',
            keyword: this.keyword,
            page: defaultPage,
            startYear: '2001',
            endYear: '2020',
            sortKey: 'related'
          }
        });
      }
    }
  }
});
</script>

<style scoped lang="less">
@import '../stylesheets/index.less';

.homepage-header {
  .flex-center-column;
  background: @background-blue;
  height: @homepage-header-height;
}

.homepage-header .homepage-header__logo {
  width: 30vw;
  @media @max-mobile-width {
    width: 60vw;
  }
}

.homepage-content {
  .homepage-content__abstract {
    .gray-background;
  }

  .homepage-content__ranking {
    .gray-background;
    .homepage-content__rankings {
      @media @min-pc-width {
        .flex-space-between;
        flex-wrap: wrap;
        .rank {
          margin: 0 10px;
        }
      }
    }
  }
  /*
  @media @min-pc-width {
    .flex-left-left-row;
    .homepage-content__abstract {
      width: 75vw;
    }

    .homepage-content__ranking {
      width: 25vw;
    }
  }
  */
}
</style>
