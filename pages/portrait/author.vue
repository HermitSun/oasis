<template>
  <div>
    <SearchBar />
    <div class="portrait">
      <div class="profile-module">
        <PortraitProfileComp :profile="profile" />
        <div class="module">
          <Subtitle title="🌥 Keywords WordCloud" />
          <!--<div>{{ interests }}</div>-->
        </div>
        <div class="module">
          <Subtitle title="📉 Citation Trend" />
          <div>{{ citationTrend }}</div>
        </div>
        <div class="module">
          <Subtitle title="📈 Publication Trends" />
          <div>{{ publicationTrend }}</div>
        </div>
        <div class="module">
          <Subtitle title="学者关系图" />
        </div>
      </div>
      <div class="portrait-module">
        <PapersSubtitle title="📝 All Papers" />
        <div
          v-for="paper in papers"
          :key="paper.id"
          style="margin-bottom: 20px"
        >
          <!--TODO 这里也要做一下分页 且尽量保持paper和ranking两边高度一致 论文条数属性为size-->
          <PaperInfoComp :paper="paper" />
        </div>
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
  data() {
    return {
      profile: {},
      citationTrend: [] as number[],
      publicationTrend: [] as number[],
      papers: [] as SearchResponse[],
      interest: [] as InterestResponse[]
    };
  },
  async mounted() {
    const authorId = '37278889300';
    const sortKey = 'recent';
    const page = 1;
    // TODO const authorId = query.authorId;
    // TODO const sortKey = query.sortKey
    // TODO const page = query.page
    const portraitRes = await requestPortrait(authorId);
    this.profile = {
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
    this.citationTrend = portraitRes.portrait.citationTrend;
    this.publicationTrend = portraitRes.portrait.publicationTrends;

    const q = await requestPapers({ authorId, page, sortKey });
    this.papers = q.papers;
    const q2 = await requestInterests(authorId);
    this.interest = q2.interests;
  }
  // async asyncData({ query }) {
  //   const authorId = '37278889300';
  //   const sortKey = 'recent';
  //   const page = 1;
  //   // TODO const authorId = query.authorId;
  //   // TODO const sortKey = query.sortKey
  //   // TODO const page = query.page
  //   const portraitRes = await requestPortrait(authorId);
  //   const profile = {
  //     name: portraitRes.portrait.name,
  //     statistics: [
  //       {
  //         prop: '💻 Affiliation',
  //         number: portraitRes.portrait.affiliation
  //       },
  //       {
  //         prop: '📝 Papers',
  //         number: portraitRes.portrait.count
  //       },
  //       {
  //         prop: '📃 Citations',
  //         number: portraitRes.portrait.citation
  //       }
  //     ]
  //   };
  //   const citationTrend = portraitRes.portrait.citationTrend;
  //   const publicationTrend = portraitRes.portrait.publicationTrends;
  //
  //   const papersReq = requestPapers({ authorId, page, sortKey });
  //   const interestsReq = requestInterests(authorId);
  //
  //   return {
  //     ...query,
  //     profile,
  //     citationTrend,
  //     publicationTrend,
  //     ...(await papersReq),
  //     ...(await interestsReq)
  //   };
  // }
});
</script>
<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
