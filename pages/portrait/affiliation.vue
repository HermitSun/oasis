<template>
  <div>
    <SearchBar />
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
          <div class="ranking-advanced">
            <div class="header">
              <span class="prop">Author</span>
              <span class="prop">Count</span>
              <span class="prop">Citation</span>
              <span class="prop">Publication Trend</span>
            </div>
            <div id="authors" class="body" style="overflow: scroll">
              <div
                v-for="(rank, index) in authorDetailRanking"
                :key="index"
                style="margin-bottom: 5px"
              >
                <AuthorDetailComp :rank="rank" />
              </div>
            </div>
          </div>
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
          <el-pagination
            layout="prev, pager, next"
            :current-page="page"
            :total="size"
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
import { Pagination, Loading } from 'element-ui';
import Subtitle from '../../components/public/Subtitle.vue';
import {
  getAffiliationInterest,
  getAffiliationPapers,
  getAffiliationPortrait,
  getAuthorDetailRanking
} from '~/api';
import PaperInfoComp from '~/components/portrait/PaperInfoComp.vue';
import PortraitProfileComp from '~/components/portrait/PortraitProfileComp.vue';
import SearchBar from '~/components/search/SearchBar.vue';
import AuthorDetailComp from '~/components/ranking/advanced/AuthorDetailComp.vue';
import { PortraitResponse } from '~/interfaces/responses/portrait/PortraitResponse';
import { Message } from '~/node_modules/element-ui';
import { SearchResponse } from '~/interfaces/responses/search/SearchResponse';
import { AffiliationPapersPayload } from '~/interfaces/requests/portrait/affiliation/AffiliationPaperPayload';
import { InterestResponse } from '~/interfaces/responses/interest/InterestResponse';
import { AuthorAdvancedRankingResponse } from '~/interfaces/responses/ranking/advanced/AuthorAdvancedRankingResponse';
import PapersSubtitle from '~/components/public/PapersSubtitle.vue';
import { getClientWidth } from '~/utils/breakpoint';
import { createPieChart } from '~/utils/charts/pie';
import getSizeById from '~/utils/charts/getSizeById';
import { createBarChart } from '~/utils/charts/bar';
import portraitBarConfig from '~/components/portrait/barConfig';
import { sortKey } from '~/interfaces/requests/search/SearchPayload';
import loadingConfig from '~/components/portrait/loadingConfig';

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
  const res: { papers: SearchResponse[]; size: number } = {
    papers: [],
    size: 0
  };
  try {
    const papersResponse = await getAffiliationPapers(args);
    res.papers = papersResponse.data.papers;
    res.size = papersResponse.data.size;
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
    Subtitle,
    PapersSubtitle,
    PaperInfoComp,
    PortraitProfileComp,
    SearchBar,
    AuthorDetailComp,
    [Pagination.name]: Pagination
  },
  async asyncData({ query }) {
    const affiliation = query.affiliation as string;
    const sortKey = 'recent';
    const page = 1;
    const portraitRes = await requestPortrait(affiliation);
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

    const papersReq = requestPapers({ affiliation, page, sortKey });
    const interestsReq = requestInterests(affiliation);
    const affiliationAuthorRankingReq = requestAuthorDetailRanking(affiliation);

    return {
      ...query,
      affiliation,
      profile,
      citationTrend,
      publicationTrend,
      ...(await papersReq),
      ...(await interestsReq),
      ...(await affiliationAuthorRankingReq)
    };
  },
  data() {
    return {
      page: 1,
      sortKey: 'recent' as sortKey
    } as any;
  },
  mounted(): void {
    // 本人垃圾前端
    if (getClientWidth() > 768) {
      const elementAuthors = document.getElementById('authors') as any;
      const elementPapers = document.getElementById('papers') as any;
      elementAuthors.style.height = elementPapers.offsetHeight - 60 + 'px';
    }
    createPieChart(
      '#pie',
      this.interests
        .map((i: { name: string; value: number }) => {
          return {
            label: i.name,
            value: i.value
          };
        })
        .sort(
          (
            a: { name: string; value: number },
            b: { name: string; value: number }
          ) => b.value - a.value
        )
        .slice(0, 20),
      {
        width: getSizeById('pie').width,
        height: getSizeById('pie').height
      }
    );
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
    async showNextPage() {
      this.page = this.page + 1;
      const loadingInstance = Loading.service(
        loadingConfig(document.getElementById('papers') as any)
      );
      await requestPapers({
        affiliation: this.affiliation,
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
        affiliation: this.affiliation,
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
