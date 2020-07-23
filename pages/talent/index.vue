<template>
  <div>
    <SearchBarComp
      v-model="keyword"
      @keyword-change="startAnotherBasicSearch"
    />
    <div class="page">
      <Subtitle :title="'🎓  TALENTS BASE - ' + field" />
      <div class="talent-page-content__talents-list">
        <div v-for="(talent, index) in talentsList" :key="index">
          <TalentDetailComp :talent="talent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Message } from 'element-ui';
import { getTalentsListByTalentBase } from '~/api';
import { TalentsListResponse } from '~/interfaces/responses/talent/TalentsListResponse';
import SearchBarComp from '~/components/search/SearchBarComp.vue';
import StartAnotherBasicSearch from '~/components/mixins/StartAnotherBasicSearch';
import Subtitle from '~/components/public/Subtitle.vue';
import TalentDetailComp from '~/components/talent/TalentDetailComp.vue';

async function requestTalentsListByTalentBase(field: string) {
  const res: {
    talentsList: TalentsListResponse[];
  } = {
    talentsList: []
  };
  try {
    const talentsListResponse = await getTalentsListByTalentBase(field, 1);
    res.talentsList = talentsListResponse.data;
  } catch (e) {
    Message.error(e.toString());
  }
  return res;
}

export default Vue.extend({
  name: 'Index',
  components: {
    SearchBarComp,
    Subtitle,
    TalentDetailComp
  },
  mixins: [StartAnotherBasicSearch],

  async asyncData({ query }) {
    const field = query.field as string;
    const talentsListRes = await requestTalentsListByTalentBase(field);
    return {
      ...query,
      ...talentsListRes
    };
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
