<template>
  <div>
    <SearchBar />
    <div class="portrait">
      <div class="profile-module">
        <PortraitProfileComp :profile="profile" />
        <div class="module">
          <Subtitle title="🌥 Keywords WordCloud" />
          <InterestWordCloud :interests="interests" />
        </div>
        <div class="module">
          <Subtitle title="📉 Citation Trend" />
          <div>{{ citationTrend }}</div>
        </div>
        <div class="module">
          <Subtitle title="📈 Publication Trends" />
          <div>{{ publicationTrend }}</div>
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
          <PapersSubtitle title="📝 All Papers" />
          <div id="papers">
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
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
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
import InterestWordCloud from '~/components/interest/InterestWordCloud.vue';
import { getClientWidth } from '~/utils/breakpoint';

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
    InterestWordCloud
  },
  async asyncData({ query }) {
    const affiliation = query.affiliation as string;
    const sortKey = 'recent';
    const page = 1;
    // TODO const sortKey = query.sortKey
    // TODO const page = query.page
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
  mounted(): void {
    // 本人垃圾前端
    if (getClientWidth() > 768) {
      const elementAuthors = document.getElementById('authors') as any;
      const elementPapers = document.getElementById('papers') as any;
      elementAuthors.style.height = elementPapers.offsetHeight - 60 + 'px';
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
