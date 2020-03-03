<template>
  <div>
    <div class="searchPage-header">
      <img
        src="../assets/logo.png"
        class="searchPage-header__logo"
        alt="oasis"
      />
      <label>
        <input
          class="basic-search__input"
          type="text"
          v-model="searchContent"
          @keyup.enter="requestBasicSearch(searchContent, startYear, endYear)"
        />
      </label>
    </div>
    <div class="searchPage-content">
      <div
        class="searchPage-content__result"
        style="text-align: left;margin:10px 0"
      >
        <template>
          <span class="searchPage-content__hint-text" style="margin-left:10px"
            >About</span
          >
          <span
            class="searchPage-content__result-text"
            style="margin-left:5px"
            >{{ resultCount }}</span
          >
          <span class="searchPage-content__hint-text" style="margin-left:5px"
            >Results</span
          >
        </template>
      </div>
      <div
        v-for="res in searchResponse"
        style="margin-bottom: 20px"
        :key="res.id"
      >
        <SearchResComp :res="res"></SearchResComp>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { advancedSearch, basicSearch } from "@/api";
import { SearchResponse } from "@/interfaces/responses/search/SearchResponse";
import SearchResComp from "@/components/search/SearchResComp.vue";

export default Vue.extend({
  name: "SearchPage",
  props: {
    mode: String,
    keyword: String
  },
  components: {
    SearchResComp
  },
  data() {
    return {
      searchMode: "",
      searchContent: "",
      startYear: "2010",
      endYear: "2020",
      resultCount: 314208101, // TODO  添加获取resultCount的接口
      searchResponse: [] as SearchResponse[]
    };
  },
  mounted() {
    console.log(this.mode, this.keyword);
    // const routerQuery = this.$route.query;
    // const searchMode = routerQuery.searchMode;
    if (this.mode === "basic") {
      this.searchContent = String(this.keyword);
      this.requestBasicSearch(this.searchContent, this.startYear, this.endYear);
    } else if (this.mode === "advanced") {
      this.requestAdvancedSearch();
    }
  },
  methods: {
    async requestBasicSearch(
      keyword: string,
      startYear: string,
      endYear: string
    ) {
      // if (this.keyword !== "") {
      const basicSearchRes = await basicSearch({
        keyword: keyword,
        page: 1,
        startYear: startYear,
        endYear: endYear
      });
      this.searchResponse = basicSearchRes.data;
    },
    async requestAdvancedSearch() {
      const advancedSearchRes = await advancedSearch({
        page: 1
      });
      this.searchResponse = advancedSearchRes.data;
    }
  }
});
</script>

<style scoped lang="less">
@import "../../src/stylesheets/index.less";
</style>
