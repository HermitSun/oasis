<template>
  <div class="page">
    <!--搜索框-->
    <SearchBarComp
      v-model="keyword"
      @keyword-change="startAnotherBasicSearch"
    />
    <!--搜索内容-->
    <div v-loading="isLoading" class="searchPage-content">
      <!--结果数量-->
      <div>
        <SearchResHeaderComp :result-count="resultCount" />
      </div>
      <!--搜索结果+过滤条件-->
      <div class="flex-left-left-row">
        <!--搜索结果-->
        <div class="searchPage-content__result" style="text-align: left">
          <!--TODO 优化样式-->
          <SearchSortKeyComp
            :sort-key="sortKey"
            @changeSortKey="changeSortKey"
          />
          <!--展示搜索内容-->
          <p
            v-if="searchResponse.length === 0"
            style="min-height: 400px; line-height: 600px; text-align: center"
          >
            暂时没有数据...
          </p>
          <div v-for="res in searchResponse" :key="res.id">
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
        <SearchFilterComp
          ref="searchFilter"
          :keyword="keyword"
          @filter-change="doFilterSearch"
        />
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
  getBasicSearchFilterCondition,
  basicFilterSearch
} from '~/api';
import SearchBarComp from '~/components/search/SearchBarComp.vue';
import SearchResComp from '~/components/search/SearchResComp.vue';
import PaginationMaxSizeLimit from '~/components/mixins/PaginationMaxSizeLimit';
import { SearchPageComp } from '~/interfaces/pages/search/SearchPageComp';
import {
  BasicSearchPayload,
  FilterSearchPayload,
  sortKey
} from '~/interfaces/requests/search/SearchPayload';
import searchSortKeyOptions from '~/components/search/SearchSortKeyOptions';
import { SearchFilterResponse } from '~/interfaces/responses/search/SearchFilterResponse';
import SearchFilterComp from '~/components/search/SearchFilterComp.vue';
import {
  OasisSearchFilter,
  SearchFilterChangedPayload
} from '~/interfaces/components/search/SearchFilterComp';
import SearchResHeaderComp from '~/components/search/SearchResHeaderComp.vue';
import SearchSortKeyComp from '~/components/search/SearchSortKeyComp.vue';

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

const defaultSortKey: sortKey = 'related';

export default Vue.extend({
  name: 'SearchBasic',
  components: {
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Option.name]: Option,
    [Pagination.name]: Pagination,
    [Select.name]: Select,
    SearchBarComp,
    SearchFilterComp,
    SearchResComp,
    SearchSortKeyComp,
    SearchResHeaderComp
  },
  // 限制分页的最大页数
  mixins: [PaginationMaxSizeLimit],
  // 数据根据路由在服务端进行渲染
  async asyncData({ query }) {
    // 这里非常不优雅，但是没有办法，因为类型实在是没有什么关系
    // 增加默认值，相当于静默失败，避免500
    const searchRes = await basicSearch(
      (query as unknown) as BasicSearchPayload
    );
    const searchData =
      searchRes && searchRes.data ? searchRes.data : { papers: [], size: 0 };
    // async data
    return {
      searchResponse: searchData.papers,
      resultCount: searchData.size,
      ...query,
      page: Number(query.page)
    };
  },
  data() {
    return {
      // common
      isLoading: false,
      // sort
      options: searchSortKeyOptions,
      // filter
      filters: {} as SearchFilterResponse,
      isError: false,
      isFilter: false // 是否正在过滤状态
    } as SearchPageComp;
  },
  // 路由发生改变后在客户端进行渲染，服务端只负责首次渲染
  // 在SSR时路由是非响应的，需要手动watch
  watch: {
    $route: {
      async handler({ query }) {
        // 手动更新路由
        this.keyword = query.keyword;
        this.author = query.author;
        this.affiliation = query.affiliation;
        this.publicationName = query.publicationName;
        this.field = query.field;
        this.page = Number(query.page);
        this.sortKey = query.sortKey;
        // 如果不是filter search，则发起常规的搜索
        // @see issue #33[[http://212.129.149.40/rubiks-cube/frontend-oasis/issues/33]]
        // 因为分页后也需要发起请求，所以把逻辑暂时移到这里
        // @see issue #41[[http://212.129.149.40/rubiks-cube/frontend-oasis/issues/41]]
        // const filter = this.$refs.searchFilter as OasisSearchFilter;
        // filter.resetDate();
        if (query.filter === 'true') {
          this.doFilterSearch({
            isValid: true,
            startYear: 1963,
            endYear: new Date().getFullYear(),
            ...this.filters
          });
        } else {
          this.doSearch();
        }
        // 这里可能成为性能瓶颈
        const filterRes = await requestBasicSearchFilterCondition(
          this.keyword as string
        );
        this.filters = filterRes.filters;
      }
    }
  },
  methods: {
    // 统一的搜索方法
    doSearch() {
      this.requestBasicSearch({
        keyword: this.keyword as string,
        page: this.page,
        sortKey: this.sortKey
      });
    },
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
    // 开始另一次搜索（关键字不同）
    // 回车时默认为普通搜索
    startAnotherBasicSearch(keyword: string) {
      this.showSpecifiedPage(
        keyword,
        String(this.startYear),
        String(this.endYear),
        '1',
        defaultSortKey
      );
    },
    // 展示指定页码的搜索结果
    // 主要是为了分页
    showNextPage(page: number, filter: 'true' | 'false' = 'false') {
      this.showSpecifiedPage(
        this.keyword as string,
        String(this.startYear),
        String(this.endYear),
        page.toString(),
        this.sortKey,
        filter
      );
    },
    // 跳转到指定页面
    showSpecifiedPage(
      keyword: string,
      startYear: string,
      endYear: string,
      page: string,
      sortKey: sortKey,
      filter: 'true' | 'false' = 'false'
    ) {
      this.$router.push({
        path: '/search/basic',
        query: {
          keyword,
          startYear, // 开始日期
          endYear, // 结束日期
          page,
          sortKey,
          filter
        }
      });
    },
    // 切换sortKey
    // 切换后重置日期
    // @see issue #35[[http://212.129.149.40/rubiks-cube/frontend-oasis/issues/35]]
    changeSortKey(newSortKey: sortKey) {
      this.sortKey = newSortKey;
      this.showSpecifiedPage(
        this.keyword as string,
        '1963',
        new Date().getFullYear().toString(),
        '1',
        newSortKey
      );
    },
    // filter
    // 使用二次筛选的条件进行搜索
    doFilterSearch(filter: SearchFilterChangedPayload) {
      // 表单验证通过后再进行搜索
      if (filter.isValid) {
        this.filters = filter;
        // 先判断filter是否为空
        const filterComp = this.$refs.searchFilter as OasisSearchFilter;
        // 为空则回到普通搜索
        if (filterComp.isEmpty()) {
          this.isFilter = false;
          // 回到第一页
          // 用这个方法主要是可以少写几行
          this.showNextPage(1, 'false');
        } else {
          this.isFilter = true;
          // 此处应用name中不会出现的字符来进行join
          // @see issue #44[[http://212.129.149.40/rubiks-cube/frontend-oasis/issues/44]]
          const separator = '#';
          // 来自组件的数据
          const author = filter.authors.join(separator);
          const affiliation = filter.affiliations.join(separator);
          const publicationName =
            filter.journals.join(separator) +
            filter.conferences.join(separator);
          const startYear = filter.startYear;
          const endYear = filter.endYear;
          // local data
          const keyword = this.keyword;
          const page = this.page;
          const sortKey = this.sortKey;
          // do search
          this.requestBasicFilterSearch({
            author,
            affiliation,
            publicationName,
            keyword,
            page,
            startYear,
            endYear,
            sortKey
          });
          this.showSpecifiedPage(
            keyword as string,
            String(startYear),
            String(endYear),
            '1',
            sortKey,
            'true'
          );
        }
      }
    },
    // 二次筛选搜索的逻辑
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
