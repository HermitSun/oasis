<template>
  <div>
    affiliationPortrait
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  getAffiliationInterest,
  getAffiliationPortrait,
  getAffiliatonPapers
} from '~/api';

export default Vue.extend({
  name: 'Affiliation',
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
  mounted(): void {}
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
