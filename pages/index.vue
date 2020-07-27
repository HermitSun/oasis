<template>
  <div>
    <div>
      <SearchBarComp />
      <div class="homepage-header">
        <!--<img-->
        <!--src="~/assets/logo.png"-->
        <!--class="homepage-header__logo"-->
        <!--alt="oasis"-->
        <!--/>-->
        <h1 style="font-size: 5.5rem;letter-spacing:10px">
          OASIS
        </h1>
        <p style="font-size: 1.4rem;width: 45vw;margin-top:25px">
          Provide Comprehensive Search and Mining Services for Researcher Social
          Networks
        </p>
        <!--搜索框，增加一个aria属性来提高accessibility-->
        <input
          v-model="keyword"
          class="homepage-header__input basic-search__input"
          type="text"
          style="margin-top: 80px;"
          aria-label="search"
          @keyup.enter="sendBasicSearch"
        />
        <div class="flex-center-row" style="margin-top: 30px">
          <el-button
            type="primary"
            plain
            round
            @click="showAdvancedSearch = true"
          >
            Advanced Search
          </el-button>
          <AdvancedSearchComp
            v-if="showAdvancedSearch"
            @close="showAdvancedSearch = false"
          />
          <div style="width: 20px"></div>
          <el-button type="primary" round @click="showCommandSearch = true">
            Command Search
          </el-button>
          <CommandSearchComp
            v-if="showCommandSearch"
            @close="showCommandSearch = false"
          />
        </div>
      </div>
      <!--<div class="homepage-header__talents">-->
      <!--<div-->
      <!--v-for="(talent, index) in talents"-->
      <!--:key="index"-->
      <!--class="homepage-header__talent"-->
      <!--&gt;-->
      <!--<TalentBaseBasicComp :talent="talent" />-->
      <!--</div>-->
      <!--</div>-->
    </div>
    <div class="homepage-content">
      <div class="tab">
        <div class="intro-title">
          OASIS RANKING
        </div>
        <div style="margin: 30px 0">
          <el-tabs tab-position="right">
            <el-tab-pane label="Author">
              <AuthorBasicRanking :ranking="authorRanking" class="rank" />
            </el-tab-pane>
            <el-tab-pane label="Affiliation">
              <AffiliationBasicRanking
                :ranking="affiliationRanking"
                class="rank"
              />
            </el-tab-pane>
            <el-tab-pane label="Journal">
              <JournalBasicRanking :ranking="journalRanking" class="rank" />
            </el-tab-pane>
            <el-tab-pane label="Conference">
              <ConferenceBasicRanking
                :ranking="conferenceRanking"
                class="rank"
              />
            </el-tab-pane>
            <el-tab-pane label="Keyword">
              <KeywordBasicRanking :ranking="keywordRanking" class="rank" />
            </el-tab-pane>
          </el-tabs>
        </div>
        <div style="width: 100%;text-align: center;margin-top: 20px">
          <el-button
            type="primary"
            plain
            @click="$router.push('/ranking/author')"
          >
            See Ranking Details
          </el-button>
        </div>
      </div>
      <div class="tab">
        <div class="intro-title">
          TALENTS BASE
        </div>
        <div class="homepage-content__talents">
          123
        </div>
      </div>
    </div>
    <!--<div class="homepage-content__right">-->
    <!--<div class="homepage-content__ranking">-->
    <!--<Subintro-title intro-title="🏆 OASIS RANKINGS" />-->
    <!--<div class="homepage-content__rankings">-->
    <!--<AuthorBasicRanking :ranking="authorRanking" class="rank" />-->
    <!--<AffiliationBasicRanking-->
    <!--:ranking="affiliationRanking"-->
    <!--class="rank"-->
    <!--/>-->
    <!--<JournalBasicRanking :ranking="journalRanking" class="rank" />-->
    <!--<ConferenceBasicRanking :ranking="conferenceRanking" class="rank" />-->
    <!--<KeywordBasicRanking :ranking="keywordRanking" class="rank" />-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Message, Button, Tabs, TabPane } from 'element-ui';
import {
  getAffiliationBasicRanking,
  getAuthorBasicRanking,
  getConferenceBasicRanking,
  getJournalBasicRanking,
  getKeywordBasicRanking
} from '~/api';
import AdvancedSearchComp from '~/components/search/AdvancedSearchComp.vue';
import AuthorBasicRanking from '~/components/ranking/AuthorBasicRanking.vue';
import AffiliationBasicRanking from '~/components/ranking/AffiliationBasicRanking.vue';
import { BasicRankingResponse } from '~/interfaces/responses/ranking/basic/BasicRankingResponse';
import { AuthorBasicRankingResponse } from '~/interfaces/responses/ranking/basic/AuthorBasicRankingResponse';
import { HomePageComp } from '~/interfaces/pages/HomePageComp';
import ConferenceBasicRanking from '~/components/ranking/ConferenceBasicRanking.vue';
import KeywordBasicRanking from '~/components/ranking/KeywordBasicRanking.vue';
import JournalBasicRanking from '~/components/ranking/JournalBasicRanking.vue';
import CommandSearchComp from '~/components/search/CommandSearchComp.vue';
import SearchBarComp from '~/components/search/SearchBarComp.vue';

async function requestAffiliationBasicRanking() {
  const res: { affiliationRanking: BasicRankingResponse[] } = {
    affiliationRanking: []
  };
  try {
    const affiliationBasicRankingRes = await getAffiliationBasicRanking({
      sortKey: 'acceptanceCount',
      year: new Date().getFullYear()
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
      year: new Date().getFullYear()
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
      year: new Date().getFullYear()
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
      year: new Date().getFullYear()
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
      Number(new Date().getFullYear())
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

export default Vue.extend({
  name: 'Index',
  components: {
    AdvancedSearchComp,
    AffiliationBasicRanking,
    AuthorBasicRanking,
    CommandSearchComp,
    ConferenceBasicRanking,
    KeywordBasicRanking,
    JournalBasicRanking,
    SearchBarComp,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [Button.name]: Button
  },
  // 渲染初始数据
  async asyncData() {
    const [
      affiliationRankingRes,
      authorRankingRes,
      conferenceRankingRes,
      journalRankingRes,
      keywordRankingRes
    ] = await Promise.all([
      requestAffiliationBasicRanking(),
      requestAuthorBasicRanking(),
      requestConferenceBasicRanking(),
      requestJournalBasicRanking(),
      requestKeywordBasicRanking()
    ]);

    return {
      ...affiliationRankingRes,
      ...authorRankingRes,
      ...conferenceRankingRes,
      ...journalRankingRes,
      ...keywordRankingRes
    };
  },
  data() {
    return {
      keyword: '',
      showAdvancedSearch: false,
      showCommandSearch: false
    } as HomePageComp;
  },
  async mounted() {
    // const res = await getActivePaperAbstract();
    // console.log(res.data);
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
  z-index: 100;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  background: url(../assets/background.jpg) no-repeat;
  background-size: 100%;
  height: @homepage-header-height;
  padding: 0 150px;

  .homepage-header__logo {
    .mobile-width(70vw);
    .pc-height__mobile(33vh);
  }

  .homepage-header__input {
    .mobile-width(90vw);
    .pc-width__mobile(40vw);
  }
}
.homepage-content {
  padding: 20px 100px;
}
</style>
