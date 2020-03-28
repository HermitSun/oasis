<template>
  <div>
    <div class="affiliation-main">
      <div class="affiliation-main__authors">
        <Subtitle title="🏆 Top Authors" />
      </div>
      <div class="affiliation-main__paper">
        <Subtitle title="📝 All Paper" />
      </div>
    </div>
    <div id="bar">
      123
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

export default Vue.extend({
  name: 'Affiliation',
  components: {
    Subtitle
  },
  async asyncData({ query }) {
    const affiliation = 'Tsinghua University';
    // TODO() const affiliation = query.affiliation;
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
