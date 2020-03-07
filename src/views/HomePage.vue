<template>
  <div>
    <div class="homepage-header">
      <img src="../assets/logo.png" class="homepage-header__logo" alt="oasis" />
      <label>
        <input
          class="basic-search__input"
          type="text"
          style="margin-top: 25px;"
          v-model="keyword"
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
          v-on:close="showAdvancedSearch = false"
        ></AdvancedSearchComp>
      </div>
    </div>
    <div class="homepage-content">
      <div class="homepage-content__abstract">
        <div class="subtitle">📄 OASIS NEWS</div>
        <div class="subtitle-divider"></div>
        <div
          v-for="abstract in abstractResponse"
          :key="abstract.id"
          style="margin-bottom: 5px"
        >
          <AbstractComp :abstract="abstract"></AbstractComp>
        </div>
      </div>

      <div class="homepage-content__ranking">
        <div class="subtitle">🏆 OASIS RANKINGS</div>
        <div class="subtitle-divider"></div>
        <div>
          <AuthorBasicRanking></AuthorBasicRanking>
          <AffiliationBasicRanking></AffiliationBasicRanking>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AdvancedSearchComp from "@/components/search/AdvancedSearchComp.vue";
import { getActivePaperAbstract } from "@/api";
import { ActivePaperAbstractResponse } from "@/interfaces/responses/abstract/ActivePaperAbstractResponse";
import AbstractComp from "../components/abstract/AbstractComp.vue";
import AuthorBasicRanking from "../components/ranking/AuthorBasicRanking.vue";
import AffiliationBasicRanking from "../components/ranking/AffiliationBasicRanking.vue";

export default Vue.extend({
  name: "HomePage",
  components: {
    AdvancedSearchComp,
    AbstractComp,
    AuthorBasicRanking,
    AffiliationBasicRanking
  },
  mounted() {
    this.requestActivePaperAbstract();
  },
  data() {
    return {
      keyword: "",
      abstractResponse: [] as ActivePaperAbstractResponse[],
      showAdvancedSearch: false
    };
  },
  methods: {
    async sendBasicSearch() {
      // TODO 判断搜索字符是否为空
      const defaultPage = "1";
      if (this.keyword !== "") {
        await this.$router.push({
          path: "/search",
          query: {
            mode: "basic",
            keyword: this.keyword,
            page: defaultPage,
            startYear: "2001",
            endYear: "2020"
          }
        });
      }
    },
    async requestActivePaperAbstract() {
      try {
        const activePaperAbstractRes = await getActivePaperAbstract();
        this.abstractResponse = activePaperAbstractRes.data;
      } catch (e) {
        this.$message.error(e.toString());
      }
    }
  }
});
</script>

<style scoped lang="less">
@import "../../src/stylesheets/index.less";

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
