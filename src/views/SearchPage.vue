<template>
  <div>
    <!--此处可以考虑重构，单独分离一个搜索框出来-->
    <div class="searchPage-header">
      <img
        src="../assets/logo.png"
        class="searchPage-header__logo"
        alt="oasis"
        @click="$router.push('/')"
        style="cursor: pointer"
      />
      <label>
        <input
          class="basic-search__input"
          type="text"
          v-model="searchContent"
          @keyup.enter="startAnotherSearch(searchContent)"
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
      <!--展示搜索内容-->
      <p v-if="searchResponse.length === 0" style="min-height: 400px">
        暂时没有数据...
      </p>
      <div
        v-for="res in searchResponse"
        style="margin-bottom: 20px"
        :key="res.id"
      >
        <SearchResComp :res="res"></SearchResComp>
      </div>
    </div>
    <!--分页-->
    <el-pagination
      @current-change="showNextPage"
      layout="prev, pager, next"
      :current-page="page"
      :total="resultCount"
      background
    />
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
    keyword: String,
    page: Number
  },
  components: {
    SearchResComp
  },
  data() {
    return {
      searchMode: "",
      searchContent: "",
      startYear: "2001",
      endYear: "2020",
      resultCount: 314208101,
      searchResponse: [] as SearchResponse[]
    };
  },
  watch: {
    $route: "doSearch"
  },
  mounted() {
    this.doSearch();
  },
  methods: {
    doSearch() {
      if (this.mode === "basic") {
        this.searchContent = String(this.keyword);
        this.requestBasicSearch(
          this.searchContent,
          this.startYear,
          this.endYear,
          this.page
        );
      } else if (this.mode === "advanced") {
        this.requestAdvancedSearch();
      }
    },
    // 基础搜索
    async requestBasicSearch(
      keyword: string,
      startYear: string,
      endYear: string,
      page = 1
    ) {
      const basicSearchRes = await basicSearch({
        keyword: keyword,
        page: page,
        startYear: startYear,
        endYear: endYear
      });
      this.searchResponse = basicSearchRes.data.papers;
      this.resultCount = basicSearchRes.data.size;
    },
    // 高级搜索
    async requestAdvancedSearch() {
      const advancedSearchRes = await advancedSearch({
        page: this.page
      });
      this.searchResponse = advancedSearchRes.data.papers;
    },
    // 展示下一页的搜索结果
    showNextPage(page: string) {
      this.$router.push({
        path: "/search",
        query: {
          mode: "basic",
          keyword: this.keyword,
          page: page
        }
      });
    },
    // 开始另一次搜索（关键字不同）
    startAnotherSearch(keyword: string) {
      this.$router.push({
        path: "/search",
        query: {
          mode: "basic",
          keyword,
          page: "1"
        }
      });
    }
  }
});
</script>

<style scoped lang="less">
@import "../../src/stylesheets/index.less";
</style>
