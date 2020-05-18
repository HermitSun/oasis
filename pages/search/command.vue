<template>
  <div>
    <!--搜索框-->
    <SearchBarComp
      v-model="searchContent"
      @keyword-change="startAnotherBasicSearch"
    />
    <!--搜索内容-->
    <div v-loading="isLoading" class="searchPage-content">
      <!--About 3190 Results-->
      <div style="margin: 10px 0">
        <SearchResHeaderComp :result-count="resultCount" />
      </div>
      <!--搜索结果+过滤条件-->
      <div class="flex-left-left-row">
        <!--搜索结果-->
        <div
          class="searchPage-content__result"
          style="text-align: left; width: 100%"
        >
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Checkbox,
  CheckboxGroup,
  Option,
  Pagination,
  Select
} from 'element-ui';
import { commandSearch } from '~/api';
import SearchBarComp from '~/components/search/SearchBarComp.vue';
import SearchResComp from '~/components/search/SearchResComp.vue';
import PaginationMaxSizeLimit from '~/components/mixins/PaginationMaxSizeLimit';
import {
  CommandSearchPayload,
  sortKey
} from '~/interfaces/requests/search/SearchPayload';
import SearchResHeaderComp from '~/components/search/SearchResHeaderComp.vue';
import SearchSortKeyComp from '~/components/search/SearchSortKeyComp.vue';
import { CommandSearchPageComp } from '~/interfaces/pages/search/CommandSearchPageComp';

const defaultSortKey = 'related';

export default Vue.extend({
  name: 'SearchCommand',
  components: {
    SearchBarComp,
    SearchResComp,
    SearchResHeaderComp,
    SearchSortKeyComp,
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
    // 增加默认值，相当于静默失败，避免500
    const searchRes = await commandSearch({
      ...query
    } as CommandSearchPayload);
    const searchData =
      searchRes && searchRes.data ? searchRes.data : { papers: [], size: 0 };

    return {
      searchResponse: searchData.papers,
      resultCount: searchData.size,
      ...query,
      page: Number(query.page),
      // 保留这个属性是为了在高级搜索时显示更精细的搜索内容
      searchContent: query.query
    };
  },
  data() {
    return {
      // common
      isLoading: false, // 是否正在加载
      showCommandSearch: false
    } as CommandSearchPageComp;
  },
  // 路由发生改变后在客户端进行渲染，服务端只负责首次渲染
  // 在SSR时路由是非响应的，需要手动watch
  watch: {
    $route: {
      handler({ query }) {
        // 手动更新路由
        this.query = query.query;
        this.page = Number(query.page);
        this.sortKey = query.sortKey;
        // 然后进行搜索
        this.doSearch();
      }
    }
  },
  mounted() {
    // 解决一下高级搜索首次加载输入框无内容的问题
    // @see issue #24[[http://212.129.149.40/rubiks-cube/frontend-oasis/issues/24]]
    this.setReadableSearchContent();
  },
  methods: {
    // 更具有可读性的搜索内容
    setReadableSearchContent() {
      this.searchContent = this.query;
    },
    // 统一的搜索方法
    doSearch() {
      this.setReadableSearchContent();
      this.requestCommandSearch({
        query: this.query,
        // sortKey: this.sortKey,
        page: this.page
      });
    },
    // 组合搜索
    async requestCommandSearch(args: CommandSearchPayload) {
      this.isLoading = true;
      try {
        const commandSearchRes = await commandSearch(args);
        // 增加默认值，相当于静默失败，避免500
        // size不变
        const searchData =
          commandSearchRes && commandSearchRes.data
            ? commandSearchRes.data
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
      this.showSpecifiedPage(this.query, page.toString(), this.sortKey);
    },
    // 跳转到指定页面
    showSpecifiedPage(query, page, sortKey: sortKey) {
      this.$router.push({
        path: '/search/command',
        query: {
          query,
          page,
          sortKey
        }
      });
    },
    // 切换sortKey
    // 切换后重置日期
    // @see issue #35[[http://212.129.149.40/rubiks-cube/frontend-oasis/issues/35]]
    changeSortKey(newSortKey: sortKey) {
      this.sortKey = newSortKey;
      this.showSpecifiedPage(this.query, 1, newSortKey);
    },
    // 开始另一次搜索（关键字不同）
    // 默认为普通搜索，此时相当于返回basic search页面
    startAnotherBasicSearch(keyword: string) {
      this.$router.push({
        path: '/search/basic',
        query: {
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
