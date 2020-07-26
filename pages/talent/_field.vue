<template>
  <div>
    <SearchBarComp
      v-model="keyword"
      @keyword-change="startAnotherBasicSearch"
    />
    <div class="page">
      <Subtitle :title="'TALENTS BASE' + field" />
      <div class="talentPage-content">
        <div class="talentPage-content__talents">
          <div class="talentPage-subtitle">
            Scholars
          </div>
          <div v-for="(talent, index) in talentsList" :key="index">
            <TalentDetailComp :talent="talent" />
          </div>
        </div>
        <div class="talentPage-content__news">
          <div class="talentPage-subtitle">
            Field Must Read
          </div>
          <div v-for="(papers, index) in talentsActivePapers" :key="index">
            <AbstractComp :abstract="papers" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Message } from 'element-ui';
import { TalentsListResponse } from '../../interfaces/responses/talent/TalentsListResponse';
import {
  getTalentsActivePapersByTalentBase,
  getTalentsListByTalentBase
} from '../../api';
import SearchBarComp from '../../components/search/SearchBarComp.vue';
import Subtitle from '../../components/public/Subtitle.vue';
import TalentDetailComp from '../../components/talent/TalentDetailComp.vue';
import { ActivePaperAbstractResponse } from '../../interfaces/responses/abstract/ActivePaperAbstractResponse';
import AbstractComp from '../../components/abstract/AbstractComp.vue';
import StartAnotherBasicSearch from '~/components/mixins/StartAnotherBasicSearch';

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

async function requestTalentsActivePapersByTalentBase(field: string) {
  const res: {
    talentsActivePapers: ActivePaperAbstractResponse[];
  } = {
    talentsActivePapers: []
  };
  try {
    const talentsActivePapersResponse = await getTalentsActivePapersByTalentBase(
      field
    );
    res.talentsActivePapers = talentsActivePapersResponse.data;
  } catch (e) {
    Message.error(e.toString());
  }
  return res;
}

export default Vue.extend({
  name: 'Field',
  components: {
    AbstractComp,
    SearchBarComp,
    Subtitle,
    TalentDetailComp
  },
  mixins: [StartAnotherBasicSearch],
  async asyncData({ params }) {
    const field = params.field as string;
    const talentsListRes = await requestTalentsListByTalentBase(field);
    const talentsActivePapersRes = await requestTalentsActivePapersByTalentBase(
      field
    );
    return {
      field,
      ...talentsListRes,
      ...talentsActivePapersRes
    };
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
