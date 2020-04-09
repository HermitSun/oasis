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
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Message } from 'element-ui';
import { PortraitResponse } from '~/interfaces/responses/portrait/PortraitResponse';
import { getJournalInterest, getJournalPortrait } from '~/api';
import { InterestResponse } from '~/interfaces/responses/interest/InterestResponse';
import Subtitle from '~/components/public/Subtitle.vue';
import SearchBar from '~/components/search/SearchBar.vue';
import PortraitProfileComp from '~/components/portrait/PortraitProfileComp.vue';
import { createBarChart } from '~/components/charts/bar';
import { createPieChart } from '~/components/charts/pie';
import getSizeById from '~/utils/charts/getSizeById';
import portraitBarConfig from '~/components/portrait/barConfig';

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
    const journal = query.journal as string;
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
  },
  data() {
    return {} as any;
  },
  mounted(): void {
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
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
