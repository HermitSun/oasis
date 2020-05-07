<template>
  <div>
    <SearchBarComp />
    <div class="portrait">
      <div class="profile-module">
        <PortraitProfileComp id="portrait" :profile="profile" />
        <div class="module">
          <Subtitle title="📉 Citation Trend" />
          <div id="citation-bar" class="content"></div>
        </div>
        <div class="module">
          <Subtitle title="📈 Publication Trends" />
          <div id="publication-bar" class="content"></div>
        </div>
      </div>
      <div class="keyword-main">
        <div class="keyword-main__authors portrait-module">
          <Subtitle title="🏆 Top Authors" />
          <AuthorAdvancedComp :rankings="authorRanking" />
        </div>
        <div class="keyword-main__affiliations portrait-module">
          <Subtitle title="🏆 Top Affiliations" />
          <AffiliationAdvancedComp :rankings="affiliationRanking" />
        </div>
      </div>
      <div class="portrait-module">
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Pagination, Loading, Message } from 'element-ui';
import { PortraitResponse } from '~/interfaces/responses/portrait/PortraitResponse';
import {
  getAffiliationDetailRankingByKeyword,
  getAuthorDetailRankingByKeyword,
  getKeywordPapers,
  getKeywordPortrait
} from '~/api';
import { SearchResponse } from '~/interfaces/responses/search/SearchResponse';
import { KeywordPapersPayload } from '~/interfaces/requests/portrait/keyword/KeywordPaperPayload';
import Subtitle from '~/components/public/Subtitle.vue';
import PapersSubtitle from '~/components/public/PapersSubtitle.vue';
import SearchBarComp from '~/components/search/SearchBarComp.vue';
import PortraitProfileComp from '~/components/portrait/PortraitProfileComp.vue';
import PaperInfoComp from '~/components/portrait/PaperInfoComp.vue';
import { createBarChart } from '~/components/charts/bar';
import portraitBarConfig from '~/components/portrait/barConfig';
import { sortKey } from '~/interfaces/requests/search/SearchPayload';
import loadingConfig from '~/components/portrait/loadingConfig';
import PaginationMaxSizeLimit from '~/components/mixins/PaginationMaxSizeLimit';
import { AffiliationAdvancedRankingResponse } from '~/interfaces/responses/ranking/advanced/AffiliationAdvancedRankingResponse';
import { AuthorAdvancedRankingResponse } from '~/interfaces/responses/ranking/advanced/AuthorAdvancedRankingResponse';
import authorAdvancedRankingMockData from '~/server/mock/ranking/author/authorAdvancedRankingMockData';
import affiliationAdvancedRankingMockData from '~/server/mock/ranking/affiliation/affiliationAdvancedRankingMockData';
import AuthorAdvancedComp from '@/components/ranking/advanced/author/AuthorAdvancedComp.vue';
import AffiliationAdvancedComp from '@/components/ranking/advanced/affiliation/AffiliationAdvancedComp.vue';

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
    const authorRankingResponse = await getAuthorDetailRankingByKeyword(
      keyword
    );
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
      keyword
    );
    res.affiliationRanking = affiliationRankingResponse.data;
  } catch (e) {
    Message.error(e.toString());
  }
  return res;
}

export default Vue.extend({
  name: 'Keyword',
  components: {
    PaperInfoComp,
    PapersSubtitle,
    PortraitProfileComp,
    SearchBarComp,
    Subtitle,
    AuthorAdvancedComp,
    AffiliationAdvancedComp,
    [Pagination.name]: Pagination
  },
  mixins: [PaginationMaxSizeLimit],
  async asyncData({ query }) {
    const keyword = query.keyword as string;
    const sortKey = 'recent';
    const page = 1;
    const portraitRes = await requestPortrait(keyword);
    const profile = {
      name: keyword,
      statistics: [
        {
          prop: '📝 Papers',
          number: portraitRes.portrait.count
        },
        {
          prop: '📃 Citations',
          number: portraitRes.portrait.citation
        },
        {
          prop: '💻 Authors',
          number: portraitRes.portrait.authorNum
        }
      ]
    };
    const citationTrend = portraitRes.portrait.citationTrend;
    const publicationTrend = portraitRes.portrait.publicationTrends;

    const papersReq = requestPapers({ keyword, page, sortKey });

    let authorRankingReq = await requestAuthorDetailRankingByKeyword(keyword);
    // TODO delete
    authorRankingReq = { authorRanking: authorAdvancedRankingMockData.data };
    let affiliationRankingReq = await requestAffiliationDetailRankingByKeyword(
      keyword
    );
    affiliationRankingReq = {
      affiliationRanking: affiliationAdvancedRankingMockData.data
    };

    return {
      ...query,
      keyword,
      profile,
      citationTrend,
      publicationTrend,
      ...(await papersReq),
      ...(await authorRankingReq),
      ...(await affiliationRankingReq)
    };
  },
  data() {
    return {
      page: 1,
      sortKey: 'recent' as sortKey
    } as any;
  },
  mounted() {
    createBarChart(
      '#citation-bar',
      this.citationTrend,
      portraitBarConfig(
        document.getElementById('portrait') as any,
        Math.max(...this.citationTrend)
      )
    );
    createBarChart(
      '#publication-bar',
      this.publicationTrend,
      portraitBarConfig(
        document.getElementById('portrait') as any,
        Math.max(...this.publicationTrend)
      )
    );
  },
  methods: {
    // 展示**指定页码**的内容
    // 这名字起得不好
    async showNextPage(page: number) {
      this.page = page;
      const loadingInstance = Loading.service(
        loadingConfig(document.getElementById('papers') as any)
      );
      await requestPapers({
        keyword: this.keyword,
        page: this.page,
        sortKey: this.sortKey
      }).then((res) => {
        this.papers = res.papers;
        loadingInstance.close();
      });
    },
    async changeSortKey(newSortKey: sortKey) {
      console.log('newSortKey' + newSortKey);
      this.page = 1;
      this.sortKey = newSortKey;
      const loadingInstance = Loading.service(
        loadingConfig(document.getElementById('papers') as any)
      );
      await requestPapers({
        keyword: this.keyword,
        page: this.page,
        sortKey: this.sortKey
      }).then((res) => {
        this.papers = res.papers;
        loadingInstance.close();
      });
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
