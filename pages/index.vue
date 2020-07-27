<template>
  <div>
    <div>
      <SearchBarComp id="topAnchor" />
      <div class="homepage-header">
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
          OASIS SEARCH
        </div>
        <el-carousel
          :autoplay="false"
          type="card"
          arrow="always"
          height="550px"
        >
          <el-carousel-item key="0">
            <div class="homepage-content__carousel_1">
              <div class="module">
                <img
                  src="../assets/basic-search1.png"
                  alt="basic-search"
                  class="pic"
                />
                <div class="text" style="text-align: left;padding-right: 20px">
                  <span class="title"
                    ><b>Powerful</b> Academic Search Engine</span
                  >
                  <span class="intro">
                    OASIS provides a <b>simple</b> way to broadly search for
                    paper. We returns the most relevant results first, based on
                    an item's full text, author, source.
                  </span>
                </div>
              </div>
              <div class="module">
                <div class="text" style="text-align: right;padding-left: 20px">
                  <span class="title"
                    ><b>Much More</b> than<br />
                    Basic Search</span
                  >
                  <span class="intro"
                    ><b>Advanced Search</b> allows users to specify additional
                    requirements for a search. <b>Command Search </b>can satisfy
                    complex search needs through a query with operators.</span
                  >
                </div>
                <img
                  src="../assets/basic-search2.png"
                  alt="basic-search"
                  class="pic"
                />
              </div>
            </div>
          </el-carousel-item>
          <el-carousel-item key="1">
            <!--<div class="homepage-content__carousel_1"></div>-->
            <img
              src="../assets/command-search.png"
              alt="command-search"
              class="homepage-content__carousel"
            />
          </el-carousel-item>
          <el-carousel-item key="2">
            <img
              src="../assets/advanced-search.png"
              alt="advanced-search"
              class="homepage-content__carousel"
            />
          </el-carousel-item>
        </el-carousel>
        <div style="width: 100%;text-align: center;margin-top: 20px">
          <el-button type="primary" plain @click="jumpToAnchor">
            Start Searching
          </el-button>
        </div>
      </div>
      <div class="tab">
        <div class="intro-title">
          OASIS RANKING
        </div>
        <div style="margin: 30px 0">
          <el-tabs tab-position="right">
            <el-tab-pane label="Author" lazy>
              <AuthorBasicRanking :ranking="authorRanking" class="rank" />
            </el-tab-pane>
            <el-tab-pane label="Affiliation" lazy>
              <AffiliationBasicRanking
                :ranking="affiliationRanking"
                class="rank"
              />
            </el-tab-pane>
            <el-tab-pane label="Journal" lazy>
              <JournalBasicRanking :ranking="journalRanking" class="rank" />
            </el-tab-pane>
            <el-tab-pane label="Conference" lazy>
              <ConferenceBasicRanking
                :ranking="conferenceRanking"
                class="rank"
              />
            </el-tab-pane>
            <el-tab-pane label="Keyword" lazy>
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
          <img
            src="../assets/talents.png"
            alt="talents"
            class="mobile-hidden"
            style="width: 40%"
          />
          <div class="text">
            <div class="title">
              Stand on the Shoulders of <b>Giants</b>.<br />
            </div>
            <div class="content">
              OASIS makes the collection of talents on hot topics and recommend
              lists of "Must Reading Papers" for you, the selection of "Must
              Reading Papers" on these topics are calculated by big data.
            </div>
          </div>
        </div>
        <div style="width: 100%;text-align: center;margin-top: 20px">
          <el-button type="primary" plain @click="$router.push('/talent')">
            See All Talents Bases
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Message,
  Button,
  Tabs,
  TabPane,
  Carousel,
  CarouselItem
} from 'element-ui';
import {
  getAffiliationBasicRanking,
  getAuthorBasicRanking,
  getConferenceBasicRanking,
  getJournalBasicRanking,
  getKeywordBasicRanking
} from '~/api';
import { BasicRankingResponse } from '~/interfaces/responses/ranking/basic/BasicRankingResponse';
import { AuthorBasicRankingResponse } from '~/interfaces/responses/ranking/basic/AuthorBasicRankingResponse';
import { HomePageComp } from '~/interfaces/pages/HomePageComp';
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
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    AdvancedSearchComp: () =>
      import('~/components/search/AdvancedSearchComp.vue'),
    AffiliationBasicRanking: () =>
      import('~/components/ranking/AffiliationBasicRanking.vue'),
    AuthorBasicRanking: () =>
      import('~/components/ranking/AuthorBasicRanking.vue'),
    CommandSearchComp: () =>
      import('~/components/search/CommandSearchComp.vue'),
    ConferenceBasicRanking: () =>
      import('~/components/ranking/ConferenceBasicRanking.vue'),
    KeywordBasicRanking: () =>
      import('~/components/ranking/KeywordBasicRanking.vue'),
    JournalBasicRanking: () =>
      import('~/components/ranking/JournalBasicRanking.vue'),
    SearchBarComp,
    [Button.name]: Button,
    [Carousel.name]: Carousel,
    [CarouselItem.name]: CarouselItem
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
    },
    jumpToAnchor() {
      (document as any).querySelector('#topAnchor').scrollIntoView(true);
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

  .homepage-content__talents {
    .flex-space-between;

    .text {
      width: 50%;
      .flex-center-column;
      padding-right: 50px;
      text-align: left;

      .title {
        width: 100%;
        font-size: 2.4rem;
        color: @background-blue;
        font-weight: 500;
        .overflow-hidden-height(2);
        letter-spacing: 1px;
        margin: 20px 0;
      }

      .content {
        margin-top: 10px;
        width: 100%;
        display: inline-block;
        font-size: @sub-middle-font;
        color: @font-dark;
        .overflow-hidden-height(5);
        letter-spacing: 0.5px;
        line-height: 1.5rem;
      }
    }
  }

  .homepage-content__pic {
    margin: 10px;
    border-radius: 20px;
    width: 96%;
    box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.2);
  }

  .homepage-content__carousel {
    .homepage-content__pic;
    object-fit: fill;
  }

  .homepage-content__carousel_1 {
    .homepage-content__pic;
    background: white;
    height: 95%;

    .module {
      .flex-left-center-row;
      padding: 0 20px;
      height: 50%;

      .pic {
        width: 50%;
      }

      .text {
        width: 50%;
        .flex-left-left-column;

        .title {
          width: 100%;
          font-size: @sub-large-font;
          color: @background-blue;
          font-weight: 500;
          .overflow-hidden-height(2);
          letter-spacing: 1px;
        }

        .intro {
          margin-top: 10px;
          width: 100%;
          display: inline-block;
          font-size: @small-font;
          color: @font-dark;
          .overflow-hidden-height(5);
          letter-spacing: 0.5px;
          line-height: 1.2rem;
        }
      }
    }
  }
}
</style>
