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
    <el-drawer
      :visible.sync="drawer"
      class="talentPage-menu"
      :size="isMobile ? '90%' : '30%'"
    >
      <div slot="title" class="talent-drawer-title">
        TALENTS BASE
      </div>
      <div class="menu-content">
        <div class="header">
          <span style="margin-left: 12px;">Field</span>
          <span style="margin-right: 20px;">Papers</span>
        </div>
        <div v-for="(talent, index) in talents" :key="index">
          <TalentBaseBasicComp :talent="talent" />
        </div>
      </div>
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
import { Message, Drawer, Tag, Divider } from 'element-ui';
import {
  getActiveTalentsBase,
  getTalentsActivePapersByTalentBase,
  getTalentsListByTalentBase
} from '../../api';
import SearchBarComp from '~/components/search/SearchBarComp.vue';
import TalentDetailComp from '~/components/talent/TalentDetailComp.vue';
import AbstractComp from '~/components/abstract/AbstractComp.vue';
import { ActivePaperAbstractResponse } from '~/interfaces/responses/abstract/ActivePaperAbstractResponse';
import { TalentsListResponse } from '~/interfaces/responses/talent/TalentsListResponse';
import StartAnotherBasicSearch from '~/components/mixins/StartAnotherBasicSearch';
import TalentBaseBasicComp from '~/components/talent/TalentBaseBasicComp.vue';
import { ActiveTalentsBaseResponse } from '~/interfaces/responses/talent/ActiveTalentsBaseResponse';

async function requestActiveTalentsBase() {
  const res: { talents: ActiveTalentsBaseResponse[] } = {
    talents: []
  };
  try {
    const activeTalentsBaseRes = await getActiveTalentsBase();
    if (activeTalentsBaseRes.code === 200) {
      res.talents = activeTalentsBaseRes.data;
    } else {
      Message.error(activeTalentsBaseRes.msg);
    }
  } catch (e) {
    Message.error('网络异常');
  }
  return res;
}

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
    TalentBaseBasicComp,
    [Drawer.name]: Drawer,
    [Tag.name]: Tag,
    [Divider.name]: Divider
  },
  mixins: [StartAnotherBasicSearch],
  async asyncData({ params }) {
    const field = params.field as string;
    const talentsListRes = await requestTalentsListByTalentBase(field);
    const talentsActivePapersRes = await requestTalentsActivePapersByTalentBase(
      field
    );
    const activeTalentsBaseRes = await requestActiveTalentsBase();
    return {
      field,
      ...talentsListRes,
      ...talentsActivePapersRes,
      ...activeTalentsBaseRes
    };
  },
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    isMobile() {
      return typeof window !== 'undefined'
        ? document.body.clientWidth <= 568
        : false;
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
