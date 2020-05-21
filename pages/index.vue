<template>
  <div>
    <div class="homepage-header">
      <img src="~/assets/logo.png" class="homepage-header__logo" alt="oasis" />
      <!--搜索框，增加一个aria属性来提高accessibility-->
      <input
        v-model="keyword"
        class="homepage-header__input basic-search__input"
        type="text"
        style="margin-top: 25px;"
        aria-label="search"
        @keyup.enter="sendBasicSearch"
      />
      <div class="flex-center-row" style="margin-top: 15px">
        <button
          class="basic-search__button_small pc-hidden_mobile"
          @click="sendBasicSearch"
        >
          <img
            src="../assets/icon/icon-search.png"
            style="height: 28px"
            alt="icon-search"
          />
        </button>
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
        <div style="width: 15px"></div>
        <button
          class="basic-search__button mobile-hidden"
          @click="showCommandSearch = true"
        >
          Command Search
        </button>
        <CommandSearchComp
          v-if="showCommandSearch"
          @close="showCommandSearch = false"
        />
      </div>
      <div class="homepage-header__talents">
        <div v-for="(talent, index) in talents" :key="index">
          <TalentBaseBasicComp :talent="talent" />
        </div>
      </div>
    </div>
    <div class="homepage-content">
      <div class="homepage-content__left">
        <div class="homepage-content__talents">
          <Subtitle title="🎓  TALENTS BASE" />
          <div v-for="(talent, index) in talents" :key="index">
            <TalentBaseComp :talent="talent" />
          </div>
        </div>
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
      </div>
      <div class="homepage-content__right">
        <div class="homepage-content__ranking">
          <Subtitle title="🏆 OASIS RANKINGS" />
          <div class="homepage-content__rankings">
            <AuthorBasicRanking :ranking="authorRanking" class="rank" />
            <AffiliationBasicRanking
              :ranking="affiliationRanking"
              class="rank"
            />
            <JournalBasicRanking :ranking="journalRanking" class="rank" />
            <ConferenceBasicRanking :ranking="conferenceRanking" class="rank" />
            <KeywordBasicRanking :ranking="keywordRanking" class="rank" />
          </div>
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
  getActiveTalentsBase,
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
import CommandSearchComp from '~/components/search/CommandSearchComp.vue';
import { ActiveTalentsBaseResponse } from '~/interfaces/responses/talent/ActiveTalentsBaseResponse';
import TalentBaseComp from '~/components/talent/TalentBaseComp.vue';
import TalentBaseBasicComp from '~/components/talent/TalentBaseBasicComp.vue';

// SSR需要的方法，无状态
async function requestActivePaperAbstract() {
  const res: { abstractResponse: ActivePaperAbstractResponse[] } = {
    abstractResponse: []
  };
  try {
    const activePaperAbstractRes = await getActivePaperAbstract();
    if (activePaperAbstractRes.code === 200) {
      res.abstractResponse = activePaperAbstractRes.data;
    } else {
      Message.error(activePaperAbstractRes.msg);
    }
  } catch (e) {
    Message.error('网络异常');
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
    if (affiliationBasicRankingRes.code === 200) {
      res.affiliationRanking = affiliationBasicRankingRes.data;
    } else {
      Message.error(affiliationBasicRankingRes.msg);
    }
  } catch (e) {
    Message.error('网络异常');
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
    if (authorBasicRankingRes.code === 200) {
      res.authorRanking = authorBasicRankingRes.data;
    } else {
      Message.error(authorBasicRankingRes.msg);
    }
  } catch (e) {
    Message.error('网络异常');
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
    if (conferenceBasicRankingRes.code === 200) {
      res.conferenceRanking = conferenceBasicRankingRes.data;
    } else {
      Message.error(conferenceBasicRankingRes.msg);
    }
  } catch (e) {
    Message.error('网络异常');
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
    if (journalBasicRankingRes.code === 200) {
      res.journalRanking = journalBasicRankingRes.data;
    } else {
      Message.error(journalBasicRankingRes.msg);
    }
  } catch (e) {
    Message.error('网络异常');
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
    if (keywordBasicRankingRes.code === 200) {
      res.keywordRanking = keywordBasicRankingRes.data;
    } else {
      Message.error(keywordBasicRankingRes.msg);
    }
  } catch (e) {
    Message.error('网络异常');
  }
  return res;
}

async function requestActiveTalentsBase() {
  const res: { talents: ActiveTalentsBaseResponse[] } = {
    talents: []
  };
  try {
    const activeTalentsBaseRes = await getActiveTalentsBase();
    if (activeTalentsBaseRes.code === 200) {
      res.talents = activeTalentsBaseRes.data;
    } else {
      Message.error(activeTalentsBaseRes.msg);
    }
  } catch (e) {
    Message.error('网络异常');
  }
  return res;
}

export default Vue.extend({
  name: 'HomePage',
  components: {
    AbstractComp,
    TalentBaseComp,
    TalentBaseBasicComp,
    AdvancedSearchComp,
    AffiliationBasicRanking,
    AuthorBasicRanking,
    CommandSearchComp,
    ConferenceBasicRanking,
    KeywordBasicRanking,
    JournalBasicRanking,
    Subtitle
  },
  // 渲染初始数据
  async asyncData() {
    const [
      abstractRes,
      affiliationRankingRes,
      authorRankingRes,
      conferenceRankingRes,
      journalRankingRes,
      keywordRankingRes,
      activeTalentsBaseRes
    ] = await Promise.all([
      requestActivePaperAbstract(),
      requestAffiliationBasicRanking(),
      requestAuthorBasicRanking(),
      requestConferenceBasicRanking(),
      requestJournalBasicRanking(),
      requestKeywordBasicRanking(),
      requestActiveTalentsBase()
    ]);

    return {
      ...abstractRes,
      ...affiliationRankingRes,
      ...authorRankingRes,
      ...conferenceRankingRes,
      ...journalRankingRes,
      ...keywordRankingRes,
      ...activeTalentsBaseRes
    };
  },
  data() {
    return {
      keyword: '',
      showAdvancedSearch: false,
      showCommandSearch: false
    } as HomePageComp;
  },
  methods: {
    async sendBasicSearch() {
      const defaultPage = '1';
      if (this.keyword !== '') {
        await this.$router.push({
          path: '/search/basic',
          query: {
            keyword: this.keyword,
            page: defaultPage,
            // 默认数据，主要是为了显示，其实并没有什么实际作用
            startYear: '1963',
            endYear: new Date().getFullYear().toString(),
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
  @media @max-mobile-width {
    padding-bottom: 20vh;
  }

  .homepage-header__logo {
    .pc-width__mobile(30vw);
    .mobile-width(70vw);
  }

  .homepage-header__input {
    .mobile-width(90vw);
  }

  .homepage-header__talents {
    .pc-width__mobile(0.8 * @search-input-width__pc);
    .mobile-width(0.8 * @search-input-width__mobile);
    .flex-space-between;
    flex-flow: row wrap;
    margin-top: 30px;
    padding: 10px;
  }
}

.homepage-content {
  @media @min-pc-width {
    .flex-left-left-row;
    .homepage-content__left {
      width: 75%;
    }

    .homepage-content__right {
      width: 25%;
    }
  }

  .homepage-content__abstract {
    .gray-background;
  }

  .homepage-content__talents {
    .gray-background;
  }

  .homepage-content__ranking {
    .gray-background;

    .homepage-content__rankings {
      /*<!--@media @min-pc-width {-->*/
      /*<!--.flex-space-between;-->*/
      /*<!--.rank {-->*/
      /*<!--margin: 0 10px;-->*/
      /*<!--width: 20%;-->*/
      /*<!--}-->*/
      /*<!--}-->*/
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
