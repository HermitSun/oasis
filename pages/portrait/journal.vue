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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { PortraitResponse } from '~/interfaces/responses/portrait/PortraitResponse';
import { getJournalInterest, getJournalPortrait } from '~/api';
import { Message } from '~/node_modules/element-ui';
import { InterestResponse } from '~/interfaces/responses/interest/InterestResponse';
import Subtitle from '~/components/public/Subtitle.vue';
import SearchBar from '~/components/search/SearchBar.vue';
import PortraitProfileComp from '~/components/portrait/PortraitProfileComp.vue';

async function requestPortrait(journal: string) {
  const res: { portrait: PortraitResponse } = {
    portrait: {} as PortraitResponse
  };
  try {
    const portraitResponse = await getJournalPortrait(journal);
    res.portrait = portraitResponse.data;
  } catch (e) {
    Message.error(e.toString());
  }
  return res;
}

async function requestInterests(journal: string) {
  const res: { interests: InterestResponse[] } = { interests: [] };
  try {
    const interestsResponse = await getJournalInterest(journal);
    res.interests = interestsResponse.data;
  } catch (e) {
    Message.error(e.toString());
  }
  return res;
}
export default Vue.extend({
  name: 'Journal',
  components: {
    Subtitle,
    PortraitProfileComp,
    SearchBar
  },
  async asyncData({ query }) {
    const journal = query.journal;
    const portraitRes = await requestPortrait(journal);
    const profile = {
      name: journal,
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

    const interestsReq = requestInterests(journal);

    return {
      ...query,
      journal,
      profile,
      citationTrend,
      publicationTrend,
      ...(await interestsReq)
    };
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
