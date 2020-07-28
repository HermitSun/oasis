<template>
  <div class="portrait">
    <div class="profile">
      <PortraitProfileComp
        id="portrait"
        :profile="profile"
        type="Affiliation"
        icon="el-icon-s-home"
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
          <div class="module">
            <div class="card-title">
              <i class="el-icon-pie-chart icon"></i> Paper Category
            </div>
            <div id="pie" class="chart content"></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Top Authors" class="tab">
          <AuthorAdvancedComp id="authors" :rankings="authorDetailRanking" />
        </el-tab-pane>
        <el-tab-pane label="Related Papers" class="tab" lazy>
          <PapersSubtitle
            :title="resultCount"
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
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { Pagination, Loading, Message, Tabs, TabPane, Icon } from 'element-ui';
import {
  getAffiliationInterest,
  getAffiliationPapers,
  getAffiliationPortrait,
  getAuthorDetailRanking
} from '~/api';
import PortraitProfileComp from '~/components/portrait/PortraitProfileComp.vue';
import { PortraitResponse } from '~/interfaces/responses/portrait/PortraitResponse';
import { SearchResponse } from '~/interfaces/responses/search/SearchResponse';
import { AffiliationPapersPayload } from '~/interfaces/requests/portrait/affiliation/AffiliationPaperPayload';
import { InterestResponse } from '~/interfaces/responses/interest/InterestResponse';
import { AuthorAdvancedRankingResponse } from '~/interfaces/responses/ranking/advanced/AuthorAdvancedRankingResponse';
import { createPieChart } from '~/components/charts/pie';
import { createBarChart } from '~/components/charts/bar';
import { sortKey } from '~/interfaces/requests/portrait/PortraitPublic';
import loadingConfig from '~/components/portrait/loadingConfig';
import PaginationMaxSizeLimit from '~/components/mixins/PaginationMaxSizeLimit';
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
    [Icon.name]: Icon,
    [Pagination.name]: Pagination,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    AuthorAdvancedComp: () =>
      import('~/components/ranking/advanced/author/AuthorAdvancedComp.vue'),
    PaperInfoComp: () => import('~/components/portrait/PaperInfoComp.vue'),
    PapersSubtitle: () => import('~/components/public/PapersSubtitle.vue'),
    PortraitProfileComp
  },
  mixins: [PaginationMaxSizeLimit],
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
  computed: {
    ...mapGetters('portrait', ['isEchartsLoaded'])
  },
  watch: {
    isEchartsLoaded(val) {
      if (val) {
        this.initCharts();
      }
    }
  },
  methods: {
    initCharts() {
      setTimeout(() => {
        createBarChart('citation-bar', this.citationTrend);
        createBarChart('publication-bar', this.publicationTrend);
      }, 0);
      setTimeout(() => {
        createPieChart(
          'pie',
          this.interests
            .map((i) => ({ label: i.name, value: i.value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 20)
          // {
          //   width: getSizeById('pie').width,
          //   height: getSizeById('pie').height,
          //   // 点击后跳转到对应的研究方向画像
          //   segmentClick: ({ data }) => {
          //     this.$router.push({
          //       path: '/portrait/keyword',
          //       query: {
          //         keyword: data.label
          //       }
          //     });
          //   }
          // }
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
</style>

<style lang="less">
g[class^='p'][class$='arc'] {
  cursor: pointer;
}
</style>
