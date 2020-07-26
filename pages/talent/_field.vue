<template>
  <div>
    <SearchBarComp
      v-model="keyword"
      @keyword-change="startAnotherBasicSearch"
    />
    <el-button
      circle
      icon="el-icon-menu"
      type="primary"
      style="position: fixed;top:140px;right: 40px;  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);"
      @click="drawer = true"
    />
    <el-drawer title="TALENTS BASE" :visible.sync="drawer">
      <span>我来啦!</span>
    </el-drawer>
    <div class="page">
      <span
        class="intro-title"
        style="margin: 50px 0;padding: 0 20px; display: flex;align-items: center"
      >
        {{
          field
            .split(' ')
            .map((i) => i[0].toUpperCase() + i.slice(1))
            .join(' ')
        }}
        <el-tag type="primary" style="margin-left: 20px">talents base</el-tag>
      </span>
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
import { Message, Button, Drawer, Tag } from 'element-ui';
import { TalentsListResponse } from '../../interfaces/responses/talent/TalentsListResponse';
import {
  getTalentsActivePapersByTalentBase,
  getTalentsListByTalentBase
} from '../../api';
import SearchBarComp from '../../components/search/SearchBarComp.vue';
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
    TalentDetailComp,
    [Button.name]: Button,
    [Drawer.name]: Drawer,
    [Tag.name]: Tag
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
  },
  data() {
    return {
      drawer: false
    };
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
