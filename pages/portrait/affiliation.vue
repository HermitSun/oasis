<template>
  <div>
    <div style="padding: 20px">
      <div class="affiliation-basic">
        <PortraitProfileComp :profile="affiliationProfile" />
        <div>研究方向词云</div>
      </div>
      <div class="affiliation-basic">
        <div>Citation Trend</div>
        <div>Publication Trends</div>
      </div>
      <div class="affiliation-main">
        <div class="affiliation-main__authors portrait-module">
          <Subtitle title="🏆 Top Authors" />
        </div>
        <div class="affiliation-main__paper portrait-module">
          <Subtitle title="📝 All Paper" />
          <div
            v-for="paper in affiliationPapers"
            :key="paper.id"
            style="margin-bottom: 20px"
          >
            <!--TODO 这里也要做一下分页-->
            <PaperInfoComp :paper="paper" />
          </div>
        </div>
      </div>
      <div id="bar">
        bar chart test
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Subtitle from '../../components/public/Subtitle.vue';
import {
  getAffiliationInterest,
  getAffiliationPortrait,
  getAffiliatonPapers
} from '~/api';
import Bar from '~/utils/charts/bar';
import PaperInfoComp from '~/components/portrait/PaperInfoComp.vue';
import PortraitProfileComp from '~/components/portrait/PortraitProfileComp.vue';

export default Vue.extend({
  name: 'Affiliation',
  components: {
    Subtitle,
    PaperInfoComp,
    PortraitProfileComp
  },
  async asyncData({ query }) {
    const affiliation = 'Tsinghua University';
    // TODO const affiliation = query.affiliation;
    const affiliationPortraitRes = await getAffiliationPortrait(affiliation);
    const affiliationPapersRes = await getAffiliatonPapers({
      affiliation,
      page: 1,
      sorKey: 'recent'
    });
    const affiliationInterestRes = await getAffiliationInterest(affiliation);
    const affiliationProfile = {
      name: affiliation,
      statistics: [
        { prop: '📝 Papers', number: affiliationPortraitRes.data.count },
        { prop: '📃 Citations', number: affiliationPortraitRes.data.citation },
        { prop: '💻 Authors', number: affiliationPortraitRes.data.authorNum }
      ]
    };
    return {
      affiliationProfile,
      affiliationCitationTrend: affiliationPortraitRes.data.citationTrend,
      affiliationPublicationTrend:
        affiliationPortraitRes.data.publicationTrends,
      affiliationPapers: affiliationPapersRes.data.papers,
      affiliationPaperSize: affiliationPapersRes.data.size,
      affiliationInterest: affiliationInterestRes.data,
      affiliation,
      ...query
    };
  },
  mounted(): void {
    const bar = new Bar('#bar');
    bar.addColor();
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';

.affiliation-basic {
  margin: 10px 0;
  @media @min-pad-width {
    .flex-space-between;
  }
}

.affiliation-main {
  @media @min-pad-width {
    .flex-left-left-row;
    .affiliation-main__authors {
      width: 45vw;
    }

    .affiliation-main__paper {
      width: 55vw;
    }
  }
}
</style>
