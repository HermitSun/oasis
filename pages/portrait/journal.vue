<template>
  <div class="portrait">
    <div class="profile">
      <PortraitProfileComp
        id="portrait"
        :profile="profile"
        type="Journal"
        icon="el-icon-collection"
      />
    </div>
    <div class="detail-no_tabs">
      <div class="module">
        <div class="card-title">
          <i class="el-icon-data-analysis icon"></i> Citation Amount Statistics
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
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Message } from 'element-ui';
import { PortraitResponse } from '~/interfaces/responses/portrait/PortraitResponse';
import { getJournalInterest, getJournalPortrait } from '~/api';
import { InterestResponse } from '~/interfaces/responses/interest/InterestResponse';
import PortraitProfileComp from '~/components/portrait/PortraitProfileComp.vue';
import { createBarChart } from '~/components/charts/bar';
import { createPieChart } from '~/components/charts/pie';
import { PortraitJournalPageComp } from '~/interfaces/pages/portrait/PortraitJournalPageComp';

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
    PortraitProfileComp
  },
  async asyncData({ query }) {
    const journal = query.journal as string;

    const [portraitRes, interestsRes] = await Promise.all([
      requestPortrait(journal),
      requestInterests(journal)
    ]);

    const profile = {
      name: journal,
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
      journal,
      profile,
      citationTrend,
      publicationTrend,
      ...interestsRes
    };
  },
  data() {
    return {} as PortraitJournalPageComp;
  },
  mounted() {
    this.initCharts();
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
      });
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
