<template>
  <div>
    <SearchBar />
    <div class="portrait">
      <div class="profile-module">
        <div class="module">
          <PortraitProfileComp :profile="profile" />
        </div>
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
        <div class="module" style="margin-right: 10px">
          <Subtitle title="🌥 Keywords WordCloud" />
          <div id="pie" class="chart content"></div>
        </div>
        <div class="module">
          <Subtitle title="🎓 Scholar Network" />
          <div id="force" class="chart"></div>
        </div>
      </div>
    </div>
    <div class="portrait-module">
      <PapersSubtitle title="📝 All Papers" />
      <div v-for="paper in papers" :key="paper.id" style="margin-bottom: 20px">
        <!--TODO 这里也要做一下分页 且尽量保持paper和ranking两边高度一致 论文条数属性为size-->
        <PaperInfoComp :paper="paper" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SearchBar from '~/components/search/SearchBar.vue';
import Subtitle from '~/components/public/Subtitle.vue';
import PapersSubtitle from '~/components/public/PapersSubtitle.vue';
import PaperInfoComp from '~/components/portrait/PaperInfoComp.vue';
import PortraitProfileComp from '~/components/portrait/PortraitProfileComp.vue';
import {
  getAuthorPapersById,
  getAuthorPortraitById,
  getResearcherInterest
} from '~/api';
import { Message } from '~/node_modules/element-ui';
import { AuthorPortraitResponse } from '~/interfaces/responses/portrait/AuthorResponse';
import { AuthorPapersPayload } from '~/interfaces/requests/portrait/author/AuthorPaperPayload';
import { SearchResponse } from '~/interfaces/responses/search/SearchResponse';
import { InterestResponse } from '~/interfaces/responses/interest/InterestResponse';
import { createPieChart } from '~/utils/charts/pie';
import { createForceChart } from '~/utils/charts/force';
import getSizeById from '~/utils/charts/getSizeById';
import { createBarChart } from '~/utils/charts/bar';

async function requestPortrait(authorId: string) {
  const res: { portrait: AuthorPortraitResponse } = {
    portrait: {} as AuthorPortraitResponse
  };
  try {
    const portraitResponse = await getAuthorPortraitById(authorId);
    res.portrait = portraitResponse.data;
  } catch (e) {
    Message.error(e.toString());
  }
  return res;
}

async function requestPapers(args: AuthorPapersPayload) {
  const res: { papers: SearchResponse[]; size: number } = {
    papers: [],
    size: 0
  };
  try {
    const papersResponse = await getAuthorPapersById(args);
    res.papers = papersResponse.data.papers;
    res.size = papersResponse.data.size;
  } catch (e) {
    Message.error(e.toString());
  }
  return res;
}

async function requestInterests(authorId: string) {
  const res: { interests: InterestResponse[] } = { interests: [] };
  try {
    const interestsResponse = await getResearcherInterest({ authorId });
    res.interests = interestsResponse.data;
  } catch (e) {
    Message.error(e.toString());
  }
  return res;
}

export default Vue.extend({
  name: 'Author',
  components: {
    Subtitle,
    PapersSubtitle,
    PaperInfoComp,
    PortraitProfileComp,
    SearchBar
  },
  async asyncData({ query }) {
    const authorId = query.authorId;
    const sortKey = 'recent';
    const page = 1;
    // TODO const sortKey = query.sortKey
    // TODO const page = query.page
    const portraitRes = await requestPortrait(authorId);
    console.log(portraitRes);
    const profile = {
      name: portraitRes.portrait.name,
      statistics: [
        {
          prop: '💻 Affiliation',
          number: portraitRes.portrait.affiliation
        },
        {
          prop: '📝 Papers',
          number: portraitRes.portrait.count
        },
        {
          prop: '📃 Citations',
          number: portraitRes.portrait.citation
        }
      ]
    };
    const citationTrend = portraitRes.portrait.citationTrend;
    const publicationTrend = portraitRes.portrait.publicationTrends;

    const papersReq = requestPapers({ authorId, page, sortKey });
    const interestsReq = requestInterests(authorId);
    return {
      ...query,
      authorId,
      profile,
      citationTrend,
      publicationTrend,
      ...(await papersReq),
      ...(await interestsReq)
    };
  },
  data() {
    return {} as any;
  },
  async mounted() {
    await requestInterests(this.authorId).then((interestsReq) =>
      createPieChart(
        '#pie',
        interestsReq.interests
          .map((i) => {
            return {
              label: i.name,
              value: i.value
            };
          })
          .sort((a, b) => b.value - a.value)
          .slice(0, 20),
        {
          width: getSizeById('pie').width,
          height: getSizeById('pie').height
        }
      )
    );

    const data = await import('../../pages/charts/data.json');
    createForceChart('#force', data, {
      width: 600,
      height: 600,
      // nodeColor: '#666',
      nodeRadius: (_) => Math.random() * 10,
      tooltip: (d) => `<p>id: ${d.id}</p>`,
      draggable: true
    });
    createBarChart('#citation-bar', this.citationTrend, {
      width: 150,
      height: 100,
      barColor: 'black',
      tooltipThreshold: 15,
      hover: {
        mouseOverColor: (_) => 'rgb(100, 0, 0)'
      }
    });
    createBarChart('#publication-bar', this.publicationTrend, {
      width: 150,
      height: 100,
      barColor: 'black',
      tooltipThreshold: 15,
      hover: {
        mouseOverColor: (_) => 'rgb(100, 0, 0)'
      }
    });
  }
});
</script>
<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
