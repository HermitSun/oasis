<template>
  <div>
    <SearchBar />
    <div class="portrait">
      <div class="profile-module">
        <PortraitProfileComp id="portrait" :profile="profile" />
        <div class="module">
          <Subtitle title="🌥 Keywords" />
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
import { getConferenceInterest, getConferencePortrait } from '~/api';
import { InterestResponse } from '~/interfaces/responses/interest/InterestResponse';
import { Message } from '~/node_modules/element-ui';
import Subtitle from '~/components/public/Subtitle.vue';
import SearchBar from '~/components/search/SearchBar.vue';
import PortraitProfileComp from '~/components/portrait/PortraitProfileComp.vue';

async function requestPortrait(conference: string) {
  const res: { portrait: PortraitResponse } = {
    portrait: {} as PortraitResponse
  };
  try {
    const portraitResponse = await getConferencePortrait(conference);
    res.portrait = portraitResponse.data;
  } catch (e) {
    Message.error(e.toString());
  }
  return res;
}

async function requestInterests(conference: string) {
  const res: { interests: InterestResponse[] } = { interests: [] };
  try {
    const interestsResponse = await getConferenceInterest(conference);
    res.interests = interestsResponse.data;
  } catch (e) {
    Message.error(e.toString());
  }
  return res;
}
export default Vue.extend({
  name: 'Conference',
  components: {
    Subtitle,
    PortraitProfileComp,
    SearchBar
  },
  async asyncData({ query }) {
    const conference = query.conference as string;
    const portraitRes = await requestPortrait(conference);
    const profile = {
      name: conference,
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

    const interestsReq = requestInterests(conference);

    return {
      ...query,
      conference,
      profile,
      citationTrend,
      publicationTrend,
      ...(await interestsReq)
    };
  },
  data() {
    return {} as any;
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
