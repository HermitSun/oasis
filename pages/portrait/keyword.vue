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
          :total="size"
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
import { getKeywordPapers, getKeywordPortrait } from '~/api';
import { SearchResponse } from '~/interfaces/responses/search/SearchResponse';
import { KeywordPapersPayload } from '~/interfaces/requests/portrait/keyword/KeywordPaperPayload';
import Subtitle from '~/components/public/Subtitle.vue';
import PapersSubtitle from '~/components/public/PapersSubtitle.vue';
import SearchBar from '~/components/search/SearchBar.vue';
import PortraitProfileComp from '~/components/portrait/PortraitProfileComp.vue';
import PaperInfoComp from '~/components/portrait/PaperInfoComp.vue';
import { createBarChart } from '~/utils/charts/bar';
import portraitBarConfig from '~/components/portrait/barConfig';
import { isMobile } from '~/utils/breakpoint';
import { sortKey } from '~/interfaces/requests/search/SearchPayload';
import loadingConfig from '~/components/portrait/loadingConfig';

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
  const res: { papers: SearchResponse[]; size: number } = {
    papers: [],
    size: 0
  };
  try {
    const papersResponse = await getKeywordPapers(args);
    res.papers = papersResponse.data.papers;
    res.size = papersResponse.data.size;
  } catch (e) {
    Message.error(e.toString());
  }
  return res;
}

export default Vue.extend({
  name: 'Keyword',
  components: {
    Subtitle,
    PapersSubtitle,
    PaperInfoComp,
    PortraitProfileComp,
    SearchBar,
    [Pagination.name]: Pagination
  },
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

    return {
      ...query,
      keyword,
      profile,
      citationTrend,
      publicationTrend,
      ...(await papersReq)
    };
  },
  data() {
    return {
      page: 1,
      sortKey: 'recent' as sortKey
    } as any;
  },
  computed: {
    pagerSize(): number {
      return isMobile() ? 5 : 7;
    }
  },
  mounted(): void {
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
</style>
