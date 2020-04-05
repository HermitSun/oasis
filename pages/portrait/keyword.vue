<template>
  <div>
    <SearchBar />
    <div class="portrait">
      <div class="profile-module">
        <PortraitProfileComp :profile="profile" />
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
import { PortraitResponse } from '~/interfaces/responses/portrait/PortraitResponse';
import { getKeywordPapers, getKeywordPortrait } from '~/api';
import { Message } from '~/node_modules/element-ui';
import { SearchResponse } from '~/interfaces/responses/search/SearchResponse';
import { KeywordPapersPayload } from '~/interfaces/requests/portrait/keyword/KeywordPaperPayload';
import Subtitle from '~/components/public/Subtitle.vue';
import PapersSubtitle from '~/components/public/PapersSubtitle.vue';
import SearchBar from '~/components/search/SearchBar.vue';
import PortraitProfileComp from '~/components/portrait/PortraitProfileComp.vue';
import PaperInfoComp from '~/components/portrait/PaperInfoComp.vue';
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
    SearchBar
  },
  async asyncData({ query }) {
    const keyword = query.keyword as string;
    const sortKey = 'recent';
    const page = 1;
    // TODO const sortKey = query.sortKey
    // TODO const page = query.page
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
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
