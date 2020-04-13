<template>
  <div>
    <!--搜索框-->
    <SearchBar
      :keyword="searchContent"
      :start-year="startYear"
      :end-year="endYear"
    />
    <!--搜索内容-->
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
        <div
          class="searchPage-content__result"
          style="text-align: left"
          :style="
            mode === 'advanced' || searchResponse.length === 0
              ? { width: '100%' }
              : {}
          "
        >
          <!--TODO 优化样式-->
          <template>
            <div class="flex-space-between">
              <span
                style="margin-right: 10px"
                class="searchPage-content__sub-hint"
                >Papers</span
              >
              <span style="float: right" class="searchPage-content__sub-hint">
                Sort By
                <el-select
                  v-model="sortKey"
                  size="mini"
                  @change="changeSortKey"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
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
          <!--交给客户端渲染，因为分页的大小会随客户端大小而发生变化-->
          <client-only>
            <el-pagination
              layout="prev, pager, next"
              :current-page="page"
              :total="totalRecords"
              :pager-count="pagerSize"
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
        <!--过滤条件-->
        <!--可以考虑抽取一个组件，利于后续优化-->
        <div
          v-if="mode === 'basic' && searchResponse.length !== 0"
          class="searchPage-content__filter mobile-hidden"
        >
          <span class="searchPage-content__sub-hint">Filter By</span>
          <div class="filter" style="margin-top: 15px">
            <div class="filter-wrapper">
              <div class="hint">
                Time Range
              </div>
              <div class="searchPage-time-range">
                <input
                  v-model="startYear"
                  style="margin: 0 5px"
                  size="4"
                  aria-label="startYear"
                  @change="sendSearchFilter"
                />～<input
                  v-model="endYear"
                  style="margin-left: 5px"
                  size="4"
                  aria-label="endYear"
                  @change="sendSearchFilter"
                />
                <div class="error">
                  {{ getYearError(startYear, endYear) }}
                </div>
              </div>
            </div>
            <!--具体的筛选内容-->
            <div id="filter-content" style="min-height: 400px; width: 100%">
              <div v-if="filters.authors.length !== 0" class="filter-wrapper">
                <div class="divider"></div>
                <div class="hint">
                  Authors
                </div>
                <div class="options">
                  <el-checkbox-group
                    v-model="checkedAuthors"
                    @change="sendSearchFilter"
                  >
                    <el-checkbox
                      v-for="(author, index) in filters.authors"
                      :key="index"
                      :label="author.name"
                    >
                      <span class="option"
                        >{{ author.name }}({{ author.count }})</span
                      >
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
              <div
                v-if="filters.affiliations.length !== 0"
                class="filter-wrapper"
              >
                <div class="divider"></div>
                <div class="hint">
                  Affiliations
                </div>
                <div class="options">
                  <el-checkbox-group
                    v-model="checkedAffiliations"
                    @change="sendSearchFilter"
                  >
                    <el-checkbox
                      v-for="(affiliation, index) in filters.affiliations"
                      :key="index"
                      :label="affiliation.name"
                    >
                      <span class="option"
                        >{{ affiliation.name }}({{ affiliation.count }})
                      </span>
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
              <div v-if="filters.journals.length !== 0" class="filter-wrapper">
                <div class="divider"></div>
                <div class="hint">
                  Journals
                </div>
                <div class="options">
                  <el-checkbox-group
                    v-model="checkedJournals"
                    @change="sendSearchFilter"
                  >
                    <el-checkbox
                      v-for="(journal, index) in filters.journals"
                      :key="'journal-checkbox' + index"
                      :label="journal.name"
                    >
                      <span class="option"
                        >{{ journal.name }}({{ journal.count }})</span
                      >
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Pagination,
  Select,
  Option,
  Message,
  CheckboxGroup,
  Checkbox
} from 'element-ui';
import {
  basicSearch,
  advancedSearch,
  getBasicSearchFilterCondition,
  basicFilterSearch
} from '~/api';
import SearchBar from '~/components/search/SearchBar.vue';
import SearchResComp from '~/components/search/SearchResComp.vue';
import PaginationMaxSizeLimit from '~/components/mixins/PaginationMaxSizeLimit';
import { SearchPageComp } from '~/interfaces/pages/search/SearchPageComp';
import {
  AdvancedSearchPayload,
  BasicSearchPayload,
  FilterSearchPayload,
  sortKey
} from '~/interfaces/requests/search/SearchPayload';
import { isMobile } from '~/utils/breakpoint';
import searchSortKeyOptions from '~/components/search/SearchSortKeyOptions';
import {
  FilterTag,
  SearchFilterResponse
} from '~/interfaces/responses/search/SearchFilterResponse';
import loadingConfig from '~/components/portrait/loadingConfig';
import { SearchFullResponse } from '~/interfaces/responses/search/SearchResponse';

async function requestBasicSearchFilterCondition(keyword: string) {
  const res: { filters: SearchFilterResponse } = {
    // 设置默认值
    filters: {
      authors: [],
      affiliations: [],
      conferences: [],
      journals: []
    }
  };
  try {
    const filterResponse = await getBasicSearchFilterCondition({ keyword });
    res.filters = filterResponse.data;
  } catch (e) {
    Message.error(e.toString());
  }
  return res;
}

const defaultSortKey = 'related';
export default Vue.extend({
  name: 'IndexVue',
  components: {
    SearchBar,
    SearchResComp,
    [Pagination.name]: Pagination,
    [Select.name]: Select,
    [Option.name]: Option,
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox
  },
  // 限制分页的最大页数
  mixins: [PaginationMaxSizeLimit],
  // 数据根据路由在服务端进行渲染
  async asyncData({ query }) {
    const { mode, ...args } = query;
    // 这里非常不优雅，但是没有办法
    // 增加默认值，相当于静默失败，避免500
    let searchData: SearchFullResponse = { papers: [], size: 0 };
    let searchRes;
    if (mode === 'basic') {
      searchRes = await basicSearch((args as unknown) as BasicSearchPayload);
    } else {
      searchRes = await advancedSearch({
        ...args,
        startYear: Number(query.startYear),
        endYear: Number(query.endYear)
      } as AdvancedSearchPayload);
    }
    if (searchRes && searchRes.data) {
      searchData = searchRes.data;
    }

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
      isLoading: false, // 是否正在加载
      isError: false,
      options: searchSortKeyOptions,
      filters: {
        authors: [] as FilterTag[],
        affiliations: [] as FilterTag[],
        conferences: [] as FilterTag[],
        journals: [] as FilterTag[]
      },
      checkedAuthors: [] as string[],
      checkedAffiliations: [] as string[],
      checkedConferences: [] as string[],
      checkedJournals: [] as string[]
    } as SearchPageComp;
  },
  computed: {
    // 分页的大小
    // 在移动端的客户端渲染为5个
    pagerSize(): number {
      return process.client && isMobile() ? 5 : 7;
    }
  },
  // 路由发生改变后在客户端进行渲染，服务端只负责首次渲染
  // 在SSR时路由是非响应的，需要手动watch
  watch: {
    $route: {
      async handler({ query }) {
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
        await requestBasicSearchFilterCondition(this.keyword as string).then(
          (res) => (this.filters = res.filters)
        );
      }
    }
  },
  mounted() {
    // 暂时性的解决一下高级搜索首次加载不显示的问题(#24)
    if (this.mode === 'advanced') {
      this.searchContent = '';
      if (this.author) {
        this.searchContent += this.author + ' ';
      }
      if (this.affiliation) {
        this.searchContent += this.affiliation + ' ';
      }
      if (this.publicationName) {
        this.searchContent += this.publicationName + ' ';
      }
      if (this.keyword) {
        this.searchContent += this.keyword;
      }
      this.searchContent = this.searchContent.trim();
    }
    this.getSearchFilter();
  },
  methods: {
    // 统一的搜索方法
    doSearch() {
      console.log(this.mode);
      if (this.mode === 'basic') {
        this.searchContent = String(this.keyword);
        this.requestBasicSearch({
          keyword: this.searchContent,
          page: this.page,
          sortKey: this.sortKey
        });
      } else if (this.mode === 'advanced') {
        this.searchContent = (
          this.author +
          ' ' +
          this.affiliation +
          ' ' +
          this.publicationName +
          ' ' +
          this.keyword
        ).trim();
        this.requestAdvancedSearch({
          keyword: this.keyword,
          page: this.page,
          author: this.author,
          affiliation: this.affiliation,
          publicationName: this.publicationName,
          startYear: Number(this.startYear),
          endYear: Number(this.endYear),
          sortKey: this.sortKey
        });
      }
    },
    // 基础搜索
    async requestBasicSearch(args: BasicSearchPayload) {
      this.isLoading = true;
      try {
        const basicSearchRes = await basicSearch(args);
        // 增加默认值，相当于静默失败，避免500
        // size不变
        const searchData =
          basicSearchRes && basicSearchRes.data
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
    // 二次搜索
    async requestBasicFilterSearch(args: FilterSearchPayload) {
      this.isLoading = true;
      try {
        const basicFilterSearchRes = await basicFilterSearch(args);
        // 增加默认值，相当于静默失败，避免500
        // size不变
        const searchData =
          basicFilterSearchRes && basicFilterSearchRes.data
            ? basicFilterSearchRes.data
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
    async requestAdvancedSearch(args: AdvancedSearchPayload) {
      this.isLoading = true;
      try {
        const advancedSearchRes = await advancedSearch(args);
        // 增加默认值，相当于静默失败，避免500
        // size不变
        const searchData =
          advancedSearchRes && advancedSearchRes.data
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
    },
    // 切换sortKey
    changeSortKey(sortKey: sortKey) {
      if (this.mode === 'basic') {
        this.$router.push({
          path: '/search',
          query: {
            mode: 'basic',
            keyword: this.keyword,
            startYear: String(this.startYear), // 开始日期
            endYear: String(this.endYear), // 结束日期
            page: '1',
            sortKey
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
            page: '1',
            sortKey
          }
        });
      }
    },
    // 二次筛选
    async getSearchFilter() {
      const query = this.$route.query;
      // 高级搜索时不提供二次筛选
      if (query.mode === 'basic') {
        const loading = this.$loading(loadingConfig('#filter-content'));
        const filtersRes = await requestBasicSearchFilterCondition(
          query.keyword as string
        );
        this.filters = filtersRes.filters;
        loading.close();
      }
    },

    // 根据二次筛选条件发送搜索请求
    async sendSearchFilter() {
      const author = this.checkedAuthors.join(' ');
      const affiliation = this.checkedAffiliations.join(' ');
      const publicationName =
        this.checkedJournals.join(' ') + this.checkedConferences.join(' ');
      const keyword = this.keyword;
      const page = 1;
      const startYear = this.startYear;
      const endYear = this.endYear;
      const sortKey = this.sortKey;

      if (!this.isError) {
        this.showNextPage(1); // 刷新路由
        await this.requestBasicFilterSearch({
          author,
          affiliation,
          publicationName,
          keyword,
          page,
          startYear,
          endYear,
          sortKey
        });
      }
    },
    getYearError(startYear: string, endYear: string) {
      let isYearError = false;
      const reg = new RegExp('^[0-9]*$');
      if (!reg.test(startYear) || !reg.test(endYear)) {
        isYearError = true;
      } else if (
        Number(startYear) > Number(endYear) ||
        Number(startYear) < 0 ||
        Number(endYear) < 0
      ) {
        isYearError = true;
      }
      if (isYearError) {
        this.isError = true;
        return 'Invalid time range';
      }
      return '';
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';

/*每个选项一行*/
.el-checkbox {
  width: 100%;
}
</style>
