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
        <div class="subtitle">
          📄 OASIS NEWS
        </div>
        <div class="subtitle-divider"></div>
        <div
          v-for="abstract in abstractResponse"
          :key="abstract.id"
          style="margin-bottom: 5px"
        >
          <AbstractComp :abstract="abstract" />
        </div>
      </div>

      <div class="homepage-content__ranking">
        <div class="subtitle">
          🏆 OASIS RANKINGS
        </div>
        <div class="subtitle-divider"></div>
        <div>
          <AuthorBasicRanking :ranking="authorRanking" />
          <AffiliationBasicRanking :ranking="affiliationRanking" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Message } from 'element-ui';
import axios from 'axios';
import {
  getActivePaperAbstract,
  getAffiliationBasicRanking,
  getAuthorBasicRanking
} from '~/api';
import AbstractComp from '~/components/abstract/AbstractComp.vue';
import AdvancedSearchComp from '~/components/search/AdvancedSearchComp.vue';
import AuthorBasicRanking from '~/components/ranking/AuthorBasicRanking.vue';
import AffiliationBasicRanking from '~/components/ranking/AffiliationBasicRanking.vue';
import { ActivePaperAbstractResponse } from '~/interfaces/responses/abstract/ActivePaperAbstractResponse';
import { AffiliationBasicRankingResponse } from '~/interfaces/responses/ranking/AffiliationBasicRankingResponse';
import { AuthorBasicRankingResponse } from '~/interfaces/responses/ranking/AuthorBasicRankingResponse';
import { HomePageComp } from '~/interfaces/pages/HomePageComp';

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
  const res: { affiliationRanking: AffiliationBasicRankingResponse[] } = {
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

export default Vue.extend({
  name: 'HomePage',
  components: {
    AbstractComp,
    AdvancedSearchComp,
    AuthorBasicRanking,
    AffiliationBasicRanking
  },
  // 渲染初始数据
  async asyncData() {
    const abstract = await requestActivePaperAbstract();
    const affiliationRanking = await requestAffiliationBasicRanking();
    const authorRanking = await requestAuthorBasicRanking();

    return {
      ...abstract,
      ...affiliationRanking,
      ...authorRanking
    };
  },
  data() {
    return {
      keyword: '',
      showAdvancedSearch: false
    } as HomePageComp;
  },
  mounted() {
    console.log(this.abstractResponse);
    axios.get('/api/echo/123').then((res) => {
      console.log(res);
    });
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
  @media (max-width: 568px) {
    width: 60vw;
  }
}

.homepage-content {
  .homepage-content__abstract {
    .gray-background;
  }

  .homepage-content__ranking {
    .gray-background;
  }

  @media (min-width: 992px) {
    display: flex;
    flex-direction: row;
    .homepage-content__abstract {
      width: 75vw;
    }

    .homepage-content__ranking {
      width: 25vw;
    }
  }
}
</style>
