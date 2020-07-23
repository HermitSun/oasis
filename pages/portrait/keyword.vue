<template>
  <div v-if="showPortrait" class="portrait">
    <div class="profile">
      <PortraitProfileComp
        id="portrait"
        :profile="profile"
        type="Keyword"
        icon="el-icon-magic-stick"
      />
    </div>
    <div class="detail">
      <el-tabs tab-position="top" class="tabs">
        <el-tab-pane label="Statistics" class="tab">
          <div class="module">
            <div class="card-title">
              <i class="el-icon-data-analysis icon"></i> Citation Amount
              Statistics
            </div>
            <div id="citation-bar" class="content"></div>
          </div>
          <div class="module">
            <div class="card-title">
              <i class="el-icon-data-analysis icon"></i> Publication Amount
              Statistics
            </div>
            <div id="publication-bar" class="content"></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Top Authors" class="tab">
          <div class="module">
            <AuthorAdvancedComp :rankings="authorRanking" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="Top Affiliations" class="tab">
          <div class="module">
            <AffiliationAdvancedComp :rankings="affiliationRanking" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="Related Papers" class="tab">
          <PapersSubtitle
            title="📝 All Papers"
            :sort-key="sortKey"
            @changeSortKey="changeSortKey"
          />
          <div id="papers">
            <div
              v-for="paper in papers"
              :key="paper.id"
              style="margin-bottom: 20px"
            >
              <PaperInfoComp :paper="paper" />
            </div>
          </div>
          <el-pagination
            layout="prev, pager, next"
            :current-page="page"
            :total="totalRecords"
            :pager-count="pagerSize"
            hide-on-single-page
            small
            style="text-align: center; margin-bottom: 10px"
            @current-change="showNextPage"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Pagination, Loading, Message, Tabs, TabPane, Icon } from 'element-ui';
import { PortraitResponse } from '~/interfaces/responses/portrait/PortraitResponse';
import {
  getAffiliationDetailRankingByKeyword,
  getAuthorDetailRankingByKeyword,
  getKeywordPapers,
  getKeywordPortrait
} from '~/api';
import { SearchResponse } from '~/interfaces/responses/search/SearchResponse';
import { KeywordPapersPayload } from '~/interfaces/requests/portrait/keyword/KeywordPaperPayload';
import PapersSubtitle from '~/components/public/PapersSubtitle.vue';
import PortraitProfileComp from '~/components/portrait/PortraitProfileComp.vue';
import PaperInfoComp from '~/components/portrait/PaperInfoComp.vue';
import { createBarChart } from '~/components/charts/bar';
import { sortKey } from '~/interfaces/requests/portrait/PortraitPublic';
import loadingConfig from '~/components/portrait/loadingConfig';
import PaginationMaxSizeLimit from '~/components/mixins/PaginationMaxSizeLimit';
import { AffiliationAdvancedRankingResponse } from '~/interfaces/responses/ranking/advanced/AffiliationAdvancedRankingResponse';
import { AuthorAdvancedRankingResponse } from '~/interfaces/responses/ranking/advanced/AuthorAdvancedRankingResponse';
import AuthorAdvancedComp from '@/components/ranking/advanced/author/AuthorAdvancedComp.vue';
import AffiliationAdvancedComp from '@/components/ranking/advanced/affiliation/AffiliationAdvancedComp.vue';
import { PortraitKeywordPageComp } from '~/interfaces/pages/portrait/PortraitKeywordPageComp';

async function requestPortrait(keyword: string) {
  const res: { portrait: PortraitResponse } = {
    portrait: {} as PortraitResponse
  };
  try {
    const portraitResponse = await getKeywordPortrait(keyword);
    res.portrait = portraitResponse.data;
  } catch (e) {
    Message.error(e.toString());
  }
  return res;
}

async function requestPapers(args: KeywordPapersPayload) {
  const res: { papers: SearchResponse[]; resultCount: number } = {
    papers: [],
    resultCount: 0
  };
  try {
    const papersResponse = await getKeywordPapers(args);
    res.papers = papersResponse.data.papers;
    res.resultCount = papersResponse.data.size;
  } catch (e) {
    Message.error(e.toString());
  }
  return res;
}

async function requestAuthorDetailRankingByKeyword(keyword: string) {
  const res: { authorRanking: AuthorAdvancedRankingResponse[] } = {
    authorRanking: [] as AuthorAdvancedRankingResponse[]
  };
  try {
    const authorRankingResponse = await getAuthorDetailRankingByKeyword({
      keyword,
      sortKey: 'acceptanceCount',
      startYear: 2019,
      endYear: 2020
    });
    res.authorRanking = authorRankingResponse.data;
  } catch (e) {
    Message.error(e.toString());
  }
  return res;
}

async function requestAffiliationDetailRankingByKeyword(keyword: string) {
  const res: { affiliationRanking: AffiliationAdvancedRankingResponse[] } = {
    affiliationRanking: [] as AffiliationAdvancedRankingResponse[]
  };
  try {
    const affiliationRankingResponse = await getAffiliationDetailRankingByKeyword(
      {
        keyword,
        sortKey: 'acceptanceCount',
        startYear: 2019,
        endYear: 2020
      }
    );
    res.affiliationRanking = affiliationRankingResponse.data;
  } catch (e) {
    Message.error(e.toString());
  }
  return res;
}

async function fetchData(query: KeywordPapersPayload) {
  const keyword = query.keyword;
  const sortKey = query.sortKey || 'recent';
  const page = query.page ? Number(query.page) : 1;

  const [
    portraitRes,
    papersRes,
    authorRankingRes,
    affiliationRankingRes
  ] = await Promise.all([
    requestPortrait(keyword),
    requestPapers({ keyword, page, sortKey }),
    requestAuthorDetailRankingByKeyword(keyword),
    requestAffiliationDetailRankingByKeyword(keyword)
  ]);

  const profile = {
    name: keyword,
    statistics: [
      {
        icon: 'el-icon-document',
        prop: 'Papers',
        number: portraitRes.portrait.count
      },
      {
        icon: 'el-icon-data-analysis',
        prop: 'Citations',
        number: portraitRes.portrait.citation
      },
      {
        icon: 'el-icon-user',
        prop: 'Authors',
        number: portraitRes.portrait.authorNum
      }
    ]
  };
  const citationTrend = portraitRes.portrait.citationTrend;
  const publicationTrend = portraitRes.portrait.publicationTrends;

  return {
    ...query,
    keyword,
    profile,
    citationTrend,
    publicationTrend,
    ...papersRes,
    ...authorRankingRes,
    ...affiliationRankingRes
  };
}

export default Vue.extend({
  name: 'Keyword',
  components: {
    [Icon.name]: Icon,
    [Pagination.name]: Pagination,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    AffiliationAdvancedComp,
    AuthorAdvancedComp,
    PaperInfoComp,
    PapersSubtitle,
    PortraitProfileComp
  },
  mixins: [PaginationMaxSizeLimit],
  asyncData({ query, redirect }) {
    // 提高健壮性
    if (!query.keyword) {
      redirect('/404');
    }
    return fetchData((query as unknown) as KeywordPapersPayload);
  },
  data() {
    return {
      showPortrait: true,
      page: 1,
      sortKey: 'recent' as sortKey
    } as PortraitKeywordPageComp;
  },
  watch: {
    async '$route.query'(query) {
      if (!query.keyword) {
        this.$router.push('/404');
      }
      this.showPortrait = false;
      const loading = this.$loading(loadingConfig('.portrait-wrapper'));
      // 重新获取数据
      const data = await fetchData(query as KeywordPapersPayload);
      this.keyword = data.keyword;
      this.page = data.page;
      this.sortKey = data.sortKey;
      this.profile = data.profile;
      this.citationTrend = data.citationTrend; // 被引用趋势
      this.publicationTrend = data.citationTrend; // 发论文趋势
      this.papers = data.papers;
      this.resultCount = data.resultCount;
      // 加载完成后加载图表
      this.showPortrait = true;
      loading.close();
      this.initCharts();
    }
  },
  mounted() {
    this.initCharts();
  },
  methods: {
    initCharts() {
      setTimeout(() => {
        createBarChart('citation-bar', this.citationTrend);
        createBarChart('publication-bar', this.publicationTrend);
      }, 0);
    },
    // 展示**指定页码**的内容
    // 这名字起得不好
    showNextPage(page: number) {
      this.page = page;
      this.getPapers();
    },
    changeSortKey(newSortKey: sortKey) {
      console.log('newSortKey' + newSortKey);
      this.page = 1;
      this.sortKey = newSortKey;
      this.getPapers();
    },
    // 获取papers的方法，共用行为
    async getPapers() {
      const loadingInstance = Loading.service(
        loadingConfig(document.getElementById('papers') as HTMLElement)
      );
      const papersRes = await requestPapers({
        keyword: this.keyword,
        page: this.page,
        sortKey: this.sortKey
      });
      this.papers = papersRes.papers;
      loadingInstance.close();
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';

.keyword-main {
  @media @min-pad-width {
    .flex-left-left-row;
    .keyword-main__authors {
      width: 50vw;
    }

    .keyword-main__affiliations {
      width: 50vw;
    }
  }
}
</style>
