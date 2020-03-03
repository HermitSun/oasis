<template>
  <div>
    <div class="homepage-header">
      <img src="../assets/logo.png" class="homepage-header__logo" alt="oasis" />
      <AdvancedSearchComp></AdvancedSearchComp>
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
        <button class="basic-search__button">OASIS搜索</button>
        <div style="width: 15px"></div>
        <button>高级搜索</button>
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
import AdvancedSearchComp from "../components/search/AdvancedSearchComp.vue";
import { getActivePaperAbstract } from "@/api";
import { SearchResponse } from "@/interfaces/responses/search/SearchResponse";
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
      abstractResponse: [] as SearchResponse[]
    };
  },
  methods: {
    async sendBasicSearch() {
      // TODO 判断搜索字符是否为空
      if (this.keyword !== "") {
        this.$router.push({
          path: "/search",
          query: {
            searchMode: "basic",
            keyword: this.keyword
          }
        });
      }
    },
    async requestActivePaperAbstract() {
      const activePaperAbstractRes = await getActivePaperAbstract();
      this.abstractResponse = activePaperAbstractRes.data;
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
  width: 30%;
}

.homepage-content {
  .homepage-content__abstract {
    .gray-background;
  }
  .homepage-content__ranking {
    .gray-background;
  }
}
</style>
