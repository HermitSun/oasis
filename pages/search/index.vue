<template>
  <div>
    <!--此处可以考虑重构，单独分离一个搜索框出来-->
    <div class="searchPage-header">
      <img
        src="~/assets/logo.png"
        class="searchPage-header__logo"
        alt="oasis"
        style="cursor: pointer"
        @click="$router.push('/')"
      />
      <label>
        <input
          v-model="searchContent"
          class="basic-search__input"
          type="text"
          @keyup.enter="startAnotherBasicSearch(searchContent)"
        />
      </label>
      <button
        class="mobile-hidden advanced-search__button"
        style="margin-left: 20px"
        @click="showAdvancedSearch = true"
      >
        Advanced Search
      </button>
      <AdvancedSearchComp
        v-if="showAdvancedSearch"
        @close="showAdvancedSearch = false"
      />
      <!-- TODO 响应式布局解决方案 -->
    </div>
    <div v-loading="isLoading" class="searchPage-content">
      <!--About 3190 Results-->
      <div style="margin: 10px 0">
        <span class="searchPage-content__hint-text" style="margin-left:10px">
          About
        </span>
        <span class="searchPage-content__result-text" style="margin-left:5px">
          {{ resultCount }}
        </span>
        <span class="searchPage-content__hint-text" style="margin-left:5px">
          Results
        </span>
      </div>
      <!--搜索结果+过滤条件-->
      <div class="flex-left-left-row">
        <!--搜索结果-->
        <div class="searchPage-content__result" style="text-align: left">
          <template>
            <div class="flex-space-between">
              <span
                style="margin-right: 10px"
                class="searchPage-content__sub-hint"
                >Papers</span
              >
              <!--<span class="searchPage-time-range">-->
              <!--Time Range:-->
              <!--<input-->
              <!--v-model="startYear"-->
              <!--style="width: 53px;margin: 0 5px"-->
              <!--size="4"-->
              <!--/>-<input-->
              <!--v-model="endYear"-->
              <!--style="width: 53px;margin-left: 5px"-->
              <!--size="4"-->
              <!--/>-->
              <!--<button-->
              <!--class="basic-search__button"-->
              <!--style="width:50px;margin-left:10px"-->
              <!--@click="doTimeChangedSearch"-->
              <!--&gt;-->
              <!--<img-->
              <!--src="~/assets/icon/icon-search.png"-->
              <!--width="20"-->
              <!--style="margin-bottom:10px"-->
              <!--alt="search"-->
              <!--/>-->
              <!--</button>-->
              <!--</span>-->
              <span style="float: right" class="searchPage-content__sub-hint">
                Sort By
              </span>
            </div>
          </template>
          <!--展示搜索内容-->
          <p
            v-if="searchResponse.length === 0"
            style="min-height: 400px; line-height: 400px; text-align: center"
          >
            暂时没有数据...
          </p>
          <div
            v-for="res in searchResponse"
            :key="res.id"
            style="margin-bottom: 20px"
          >
            <SearchResComp :res="res" />
          </div>
          <!--分页-->
          <el-pagination
            layout="prev, pager, next"
            :current-page="page"
            :total="resultCount"
            background
            style="text-align: center; margin-bottom: 20px"
            @current-change="showNextPage"
          />
        </div>
        <!--过滤条件-->
        <div class="searchPage-content__filter">
          <span class="searchPage-content__sub-hint">Filter By</span>
          <div class="filter">
            <div class="filter-wrapper">
              <div class="hint">
                Time Range
              </div>
              <div class="divider"></div>
            </div>
            <div class="filter-wrapper">
              <div class="hint">
                Authors
              </div>
              <div class="divider"></div>
            </div>
            <div class="filter-wrapper">
              <div class="hint">
                Affiliations
              </div>
              <div class="divider"></div>
            </div>
            <div class="filter-wrapper">
              <div class="hint">
                Journals
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="searchPage-content__result"
      style="text-align: left;margin:10px 0"
    >
      <template>
        <span class="searchPage-content__hint-text" style="margin-left:10px">
          About
        </span>
        <span class="searchPage-content__result-text" style="margin-left:5px">
          {{ resultCount }}
        </span>
        <span class="searchPage-content__hint-text" style="margin-left:5px">
          Results
        </span>
        <div class="searchPage-time-range" style="float: right">
          Time Range:
          <input
            v-model="startYear"
            style="width: 53px;margin: 0 5px"
            size="4"
          />-<input
            v-model="endYear"
            style="width: 53px;margin-left: 5px"
            size="4"
          />
          <button
            class="basic-search__button"
            style="width:50px;margin-left:10px"
            @click="doTimeChangedSearch"
          >
            <img
              src="~/assets/icon/icon-search.png"
              width="20"
              style="margin-bottom:10px"
              alt="search"
            />
          </button>
        </div>
      </template>
    </div>
    <!--展示搜索内容-->
    <p
      v-if="searchResponse.length === 0"
      style="min-height: 400px; line-height: 400px; text-align: center"
    >
      暂时没有数据...
    </p>
    <div
      v-for="res in searchResponse"
      :key="res.id"
      style="margin-bottom: 20px"
    >
      <SearchResComp :res="res" />
    </div>
    <client-only>
      <el-pagination
        layout="prev, pager, next"
        :current-page="page"
        :total="totalRecords"
        :pager-count="pagerSize"
        background
        style="text-align: center; margin-bottom: 10px"
        @current-change="showNextPage"
      />
      <p
        v-if="page === 100"
        style="color: #C0C4CC; font-style: italic; text-align: center; margin-bottom: 10px"
      >
        我们已为您隐藏了相关度较低的搜索结果。
      </p>
    </client-only>
  </div>

  <!--分页-->
  <!--交给客户端渲染，因为分页的大小会随客户端大小而发生变化-->
</template>

<script lang="ts">
import Vue from 'vue';
import { Pagination } from 'element-ui';
import { basicSearch, advancedSearch } from '~/api';
import SearchResComp from '~/components/search/SearchResComp.vue';
import AdvancedSearchComp from '~/components/search/AdvancedSearchComp.vue';
import {
  SearchDataFromProp,
  SearchPageComp
} from '~/interfaces/pages/search/SearchPageComp';
import { sortKey } from '~/interfaces/requests/search/SearchPayload';
import { isMobile } from '~/utils/breakpoint';

const defaultSortKey = 'related';
const MAX_RECORDS = 100 * 10;

export default Vue.extend({
  name: 'IndexVue',
  components: {
    SearchResComp,
    AdvancedSearchComp,
    [Pagination.name]: Pagination
  },
  // 数据根据路由在服务端进行渲染
  async asyncData({ query }) {
    const searchPayload = {
      ...((query as unknown) as Required<SearchDataFromProp>),
      startYear: Number(query.startYear),
      endYear: Number(query.endYear)
    };
    // 这里非常不优雅，但是没有办法
    const searchRes = await basicSearch(searchPayload);
    // 增加默认值，相当于静默失败，避免500
    const searchData = searchRes.data
      ? searchRes.data
      : { papers: [], size: 0 };

    return {
      searchResponse: searchData.papers,
      resultCount: searchData.size,
      ...query,
      page: Number(query.page),
      // 保留这个属性是为了在高级搜索时显示更精细的搜索内容
      searchContent: query.keyword
    };
  },
  data() {
    return {
      showAdvancedSearch: false,
      isLoading: false // 是否正在加载
    } as SearchPageComp;
  },
  computed: {
    // 分页的大小
    // 在移动端的客户端渲染为5个
    pagerSize(): number {
      return process.client && isMobile() ? 5 : 7;
    },
    // 限制最大页数
    totalRecords(): number {
      return this.resultCount > MAX_RECORDS ? MAX_RECORDS : this.resultCount;
    }
  },
  // 路由发生改变后在客户端进行渲染，服务端只负责首次渲染
  // 在SSR时路由是非响应的，需要手动watch
  watch: {
    $route: {
      handler({ query }) {
        // 手动更新路由
        this.mode = query.mode;
        this.author = query.author;
        this.affiliation = query.affiliation;
        this.publicationName = query.publicationName;
        this.keyword = query.keyword;
        this.startYear = query.startYear;
        this.endYear = query.endYear;
        this.page = Number(query.page);
        this.sortKey = query.sortKey;
        // 然后进行搜索
        this.doSearch();
      }
    }
  },
  methods: {
    // 统一的搜索方法
    doSearch() {
      if (this.mode === 'basic') {
        this.searchContent = String(this.keyword);
        this.requestBasicSearch();
      } else if (this.mode === 'advanced') {
        this.searchContent =
          this.author +
          ' ' +
          this.affiliation +
          ' ' +
          this.publicationName +
          ' ' +
          this.keyword;
        this.requestAdvancedSearch();
      }
    },
    doTimeChangedSearch() {
      this.showNextPage(1);
    },
    // 基础搜索
    async requestBasicSearch() {
      this.isLoading = true;
      try {
        const basicSearchRes = await basicSearch({
          keyword: this.searchContent,
          page: this.page,
          startYear: Number(this.startYear),
          endYear: Number(this.endYear),
          sortKey: this.sortKey
        });
        // 增加默认值，相当于静默失败，避免500
        // size不变
        const searchData = basicSearchRes.data
          ? basicSearchRes.data
          : { papers: [], size: this.resultCount };
        this.searchResponse = searchData.papers;
        this.resultCount = searchData.size;
      } catch (e) {
        this.$message.error(e.toString());
        // 增加一个默认值
        this.searchResponse = [];
      } finally {
        this.isLoading = false;
      }
    },
    // 高级搜索
    async requestAdvancedSearch() {
      this.isLoading = true;
      try {
        const advancedSearchData = {
          keyword: this.keyword,
          page: this.page,
          author: this.author,
          affiliation: this.affiliation,
          publicationName: this.publicationName,
          startYear: Number(this.startYear),
          endYear: Number(this.endYear),
          sortKey: this.sortKey
        };
        const advancedSearchRes = await advancedSearch(advancedSearchData);
        // 增加默认值，相当于静默失败，避免500
        // size不变
        const searchData = advancedSearchRes.data
          ? advancedSearchRes.data
          : { papers: [], size: this.resultCount };
        this.searchResponse = searchData.papers;
        this.resultCount = searchData.size;
      } catch (e) {
        this.$message.error(e.toString());
        this.searchResponse = [];
      } finally {
        this.isLoading = false;
      }
    },

    // 展示下一页的搜索结果
    showNextPage(page: number) {
      if (this.mode === 'basic') {
        this.$router.push({
          path: '/search',
          query: {
            mode: 'basic',
            keyword: this.keyword,
            startYear: String(this.startYear), // 开始日期
            endYear: String(this.endYear), // 结束日期
            page: page.toString(),
            sortKey: this.sortKey as sortKey
          }
        });
      } else if (this.mode === 'advanced') {
        this.$router.push({
          path: '/search',
          query: {
            mode: 'advanced',
            author: this.author,
            affiliation: this.affiliation, // 机构
            publicationName: this.publicationName, // 会议|期刊
            keyword: this.keyword, // 研究关键字
            startYear: String(this.startYear), // 开始日期
            endYear: String(this.endYear), // 结束日期
            page: page.toString(),
            sortKey: this.sortKey as sortKey
          }
        });
      }
    },

    // 开始另一次搜索（关键字不同）回车时默认为普通搜索
    startAnotherBasicSearch(keyword: string) {
      this.$router.push({
        path: '/search',
        query: {
          mode: 'basic',
          keyword,
          page: '1',
          startYear: String(this.startYear), // 开始日期
          endYear: String(this.endYear), // 结束日期
          sortKey: defaultSortKey as sortKey
        }
      });
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
