<template>
  <div>
    <!--搜索框-->
    <SearchBarComp
      v-model="keyword"
      @keyword-change="startAnotherBasicSearch"
    />
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
      <div class="profile-module">
        <div class="module">
          <Subtitle title="🌥 Keywords" />
          <div id="pie" class="chart content"></div>
        </div>
      </div>
      <div class="affiliation-main">
        <div class="affiliation-main__authors portrait-module">
          <Subtitle title="🏆 Top Authors" />
          <AuthorAdvancedComp id="authors" :rankings="authorDetailRanking" />
        </div>
        <div class="affiliation-main__paper portrait-module">
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
          <!--分页-->
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Pagination, Loading, Message } from 'element-ui';
import Subtitle from '../../components/public/Subtitle.vue';
import {
  getAffiliationInterest,
  getAffiliationPapers,
  getAffiliationPortrait,
  getAuthorDetailRanking
} from '~/api';
import PaperInfoComp from '~/components/portrait/PaperInfoComp.vue';
import PortraitProfileComp from '~/components/portrait/PortraitProfileComp.vue';
import SearchBarComp from '~/components/search/SearchBarComp.vue';
import { PortraitResponse } from '~/interfaces/responses/portrait/PortraitResponse';
import { SearchResponse } from '~/interfaces/responses/search/SearchResponse';
import { AffiliationPapersPayload } from '~/interfaces/requests/portrait/affiliation/AffiliationPaperPayload';
import { InterestResponse } from '~/interfaces/responses/interest/InterestResponse';
import { AuthorAdvancedRankingResponse } from '~/interfaces/responses/ranking/advanced/AuthorAdvancedRankingResponse';
import PapersSubtitle from '~/components/public/PapersSubtitle.vue';
import { getClientWidth } from '~/utils/breakpoint';
import { createPieChart } from '~/components/charts/pie';
import getSizeById from '~/utils/charts/getSizeById';
import { createBarChart } from '~/components/charts/bar';
import portraitBarConfig from '~/components/portrait/barConfig';
import { sortKey } from '~/interfaces/requests/portrait/PortraitPublic';
import loadingConfig from '~/components/portrait/loadingConfig';
import PaginationMaxSizeLimit from '~/components/mixins/PaginationMaxSizeLimit';
import StartAnotherBasicSearch from '~/components/mixins/StartAnotherBasicSearch';
import AuthorAdvancedComp from '@/components/ranking/advanced/author/AuthorAdvancedComp.vue';
import { PortraitAffiliationPageComp } from '~/interfaces/pages/portrait/PortraitAffiliationPageComp';

async function requestPortrait(affiliation: string) {
  const res: { portrait: PortraitResponse } = {
    portrait: {} as PortraitResponse
  };
  try {
    const portraitResponse = await getAffiliationPortrait(affiliation);
    res.portrait = portraitResponse.data;
  } catch (e) {
    Message.error(e.toString());
  }
  return res;
}

async function requestPapers(args: AffiliationPapersPayload) {
  const res: { papers: SearchResponse[]; resultCount: number } = {
    papers: [],
    resultCount: 0
  };
  try {
    const papersResponse = await getAffiliationPapers(args);
    res.papers = papersResponse.data.papers;
    res.resultCount = papersResponse.data.size;
  } catch (e) {
    Message.error(e.toString());
  }
  return res;
}

async function requestInterests(affiliation: string) {
  const res: { interests: InterestResponse[] } = { interests: [] };
  try {
    const interestsResponse = await getAffiliationInterest(affiliation);
    res.interests = interestsResponse.data;
  } catch (e) {
    Message.error(e.toString());
  }
  return res;
}

async function requestAuthorDetailRanking(affiliation: string) {
  const res: { authorDetailRanking: AuthorAdvancedRankingResponse[] } = {
    authorDetailRanking: []
  };
  try {
    const authorDetailRankingResponse = await getAuthorDetailRanking(
      affiliation
    );
    res.authorDetailRanking = authorDetailRankingResponse.data;
  } catch (e) {
    Message.error(e.toString());
  }
  return res;
}

export default Vue.extend({
  name: 'Affiliation',
  components: {
    AuthorAdvancedComp,
    PaperInfoComp,
    PapersSubtitle,
    PortraitProfileComp,
    SearchBarComp,
    Subtitle,
    [Pagination.name]: Pagination
  },
  mixins: [PaginationMaxSizeLimit, StartAnotherBasicSearch],
  async asyncData({ query }) {
    const affiliation = query.affiliation as string;
    const sortKey = 'recent';
    const page = 1;

    const [
      portraitRes,
      papersRes,
      interestsRes,
      affiliationAuthorRankingRes
    ] = await Promise.all([
      requestPortrait(affiliation),
      requestPapers({ affiliation, page, sortKey }),
      requestInterests(affiliation),
      requestAuthorDetailRanking(affiliation)
    ]);

    const profile = {
      name: affiliation,
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

    return {
      ...query,
      affiliation,
      profile,
      citationTrend,
      publicationTrend,
      ...papersRes,
      ...interestsRes,
      ...affiliationAuthorRankingRes
    };
  },
  data() {
    return {
      page: 1,
      sortKey: 'recent' as sortKey
    } as PortraitAffiliationPageComp;
  },
  mounted() {
    // 本人垃圾前端
    if (getClientWidth() > 768) {
      const elementAuthors = document.getElementById('authors') as HTMLElement;
      const elementPapers = document.getElementById('papers') as HTMLElement;
      elementAuthors.style.height = elementPapers.offsetHeight - 60 + 'px';
    }
    this.initCharts();
  },
  methods: {
    initCharts() {
      setTimeout(() => {
        createBarChart(
          '#citation-bar',
          this.citationTrend,
          portraitBarConfig(
            document.getElementById('portrait') as HTMLElement,
            Math.max(...this.citationTrend)
          )
        );
        createBarChart(
          '#publication-bar',
          this.publicationTrend,
          portraitBarConfig(
            document.getElementById('portrait') as HTMLElement,
            Math.max(...this.publicationTrend)
          )
        );
      }, 0);
      setTimeout(() => {
        createPieChart(
          '#pie',
          this.interests
            .map((i) => ({ label: i.name, value: i.value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 20),
          {
            width: getSizeById('pie').width,
            height: getSizeById('pie').height,
            // 点击后跳转到对应的研究方向画像
            segmentClick: ({ data }) => {
              this.$router.push({
                path: '/portrait/keyword',
                query: {
                  keyword: data.label
                }
              });
            }
          }
        );
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
        affiliation: this.affiliation,
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

.affiliation-main {
  @media @min-pad-width {
    .flex-left-left-row;
    .affiliation-main__authors {
      width: 50vw;
    }

    .affiliation-main__paper {
      width: 50vw;
    }
  }
}
</style>

<style lang="less">
g[class^='p'][class$='arc'] {
  cursor: pointer;
}
</style>
