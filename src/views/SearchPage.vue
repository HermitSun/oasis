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
          @keyup.enter="startAnotherBasicSearch(searchContent)"
        />
      </label>
      <button
        class="advanced-search__button"
        style="margin-left: 20px"
        @click="showAdvancedSearch = true"
      >
        Advanced Search
      </button>
      <AdvancedSearchComp
        v-if="showAdvancedSearch"
        v-on:close="showAdvancedSearch = false"
      ></AdvancedSearchComp>
      <!-- TODO 响应式布局解决方案 -->
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
          <div class="searchPage-time-range" style="float: right">
            Time Range:
            <input
              v-model="newStartYear"
              style="width: 53px;margin: 0 5px"
              size="4"
            />-<input
              v-model="newEndYear"
              style="width: 53px;margin-left: 5px"
              size="4"
            />
            <button
              class="basic-search__button"
              style="width:50px;margin-left:10px"
              @click="doTimeChangedSearch"
            >
              <img
                src="../assets/icon/icon-search.png"
                width="20"
                style="margin-bottom:10px"
                alt="search"
              />
            </button>
          </div>
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
      :total="pageNum"
      background
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { advancedSearch, basicSearch } from "@/api";
import { SearchResponse } from "@/interfaces/responses/search/SearchResponse";
import SearchResComp from "@/components/search/SearchResComp.vue";
import { AdvancedSearchData } from "@/interfaces/components/search/SearchData";
import AdvancedSearchComp from "@/components/search/AdvancedSearchComp.vue";

export default Vue.extend({
  name: "SearchPage",
  props: {
    mode: String,
    keyword: String,
    page: Number,
    author: String,
    affiliation: String,
    conferenceName: String,
    startYear: String,
    endYear: String
  },
  components: {
    SearchResComp,
    AdvancedSearchComp
  },
  data() {
    return {
      searchMode: "",
      searchContent: "",
      newStartYear: this.startYear,
      newEndYear: this.endYear,
      resultCount: 314208101,
      searchResponse: [] as SearchResponse[],

      showAdvancedSearch: false
    };
  },
  computed: {
    // 计算正确的页数
    pageNum(): number {
      return Math.ceil(this.resultCount / 10);
    }
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
        this.requestBasicSearch();
      } else if (this.mode === "advanced") {
        this.searchContent =
          this.author +
          " " +
          this.affiliation +
          " " +
          this.conferenceName +
          " " +
          this.keyword;
        this.newStartYear = this.startYear;
        this.newEndYear = this.endYear;
        this.requestAdvancedSearch();
      }
    },
    doTimeChangedSearch() {
      this.showNextPage("1");
    },
    // 基础搜索
    async requestBasicSearch() {
      const basicSearchRes = await basicSearch({
        keyword: this.searchContent,
        page: this.page,
        startYear: this.newStartYear,
        endYear: this.newEndYear
      });
      this.searchResponse = basicSearchRes.data.papers;
      this.resultCount = basicSearchRes.data.size;
    },
    // 高级搜索
    async requestAdvancedSearch() {
      const advancedSearchData: AdvancedSearchData = {
        keyword: this.keyword,
        page: this.page,
        author: this.author,
        affiliation: this.affiliation,
        conferenceName: this.conferenceName,
        startYear: this.newStartYear,
        endYear: this.newEndYear
      };
      // TODO 暂时未过滤为空字符串的关键字
      const advancedSearchRes = await advancedSearch(advancedSearchData);
      this.searchResponse = advancedSearchRes.data.papers;
      this.resultCount = advancedSearchRes.data.size;
    },

    // 展示下一页的搜索结果
    showNextPage(page: string) {
      if (this.mode === "basic") {
        this.$router.push({
          path: "/search",
          query: {
            mode: "basic",
            keyword: this.keyword,
            startYear: this.newStartYear,
            endYear: this.newEndYear,
            page: page
          }
        });
      } else if (this.mode === "advanced") {
        this.$router.push({
          path: "/search",
          query: {
            mode: "advanced",
            author: this.author,
            affiliation: this.affiliation, // 机构
            conferenceName: this.conferenceName, // 会议
            keyword: this.keyword, // 研究关键字
            startYear: this.newStartYear, // 开始日期
            endYear: this.newEndYear, // 结束日期
            page: page
          }
        });
      }
    },

    // 开始另一次搜索（关键字不同）回车时默认为普通搜索
    startAnotherBasicSearch(keyword: string) {
      this.$router.push({
        path: "/search",
        query: {
          mode: "basic",
          keyword: keyword,
          page: "1",
          startYear: this.newStartYear, // 开始日期
          endYear: this.newEndYear
        }
      });
    }
  }
});
</script>

<style scoped lang="less">
@import "../../src/stylesheets/index.less";
</style>
