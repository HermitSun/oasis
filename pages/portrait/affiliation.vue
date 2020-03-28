<template>
  <div>
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

export default Vue.extend({
  name: 'Affiliation',
  components: {
    Subtitle,
    PaperInfoComp
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
    return {
      affiliationPortrait: affiliationPortraitRes.data,
      affiliationPapers: affiliationPapersRes.data.papers,
      affiliationPaperSize: affiliationPapersRes.data.size,
      affiliationInterest: affiliationInterestRes.data,
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
