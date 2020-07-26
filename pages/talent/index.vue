<template>
  <div>
    <SearchBarComp
      v-model="keyword"
      @keyword-change="startAnotherBasicSearch"
    />
    <div class="page">
      <Subtitle title="FIELD TALENT BASE" />
      <div class="talentPage-content">
        <div class="talentPage-content__talents">
          <div class="talentPage-subtitle">
            Talent Base
          </div>
          <div class="talents">
            <div v-for="(talent, index) in talents" :key="index" class="talent">
              <TalentBaseComp :talent="talent" />
            </div>
          </div>
        </div>
        <div class="talentPage-content__news">
          <div class="talentPage-subtitle">
            Hot Papers
          </div>
          <div
            v-for="abstract in abstractResponse"
            :key="abstract.id"
            style="margin-bottom: 5px"
          >
            <AbstractComp :abstract="abstract" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Message } from 'element-ui';
import SearchBarComp from '~/components/search/SearchBarComp.vue';
import StartAnotherBasicSearch from '~/components/mixins/StartAnotherBasicSearch';
import Subtitle from '~/components/public/Subtitle.vue';
import { ActivePaperAbstractResponse } from '~/interfaces/responses/abstract/ActivePaperAbstractResponse';
import { getActivePaperAbstract, getActiveTalentsBase } from '~/api';
import AbstractComp from '~/components/abstract/AbstractComp.vue';
import { ActiveTalentsBaseResponse } from '~/interfaces/responses/talent/ActiveTalentsBaseResponse';
import TalentBaseComp from '~/components/talent/TalentBaseComp.vue';

// SSR需要的方法，无状态
async function requestActivePaperAbstract() {
  const res: { abstractResponse: ActivePaperAbstractResponse[] } = {
    abstractResponse: []
  };
  try {
    const activePaperAbstractRes = await getActivePaperAbstract();
    if (activePaperAbstractRes.code === 200) {
      res.abstractResponse = activePaperAbstractRes.data;
    } else {
      Message.error(activePaperAbstractRes.msg);
    }
  } catch (e) {
    Message.error('网络异常');
  }
  return res;
}

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

export default Vue.extend({
  name: 'Index',
  components: {
    TalentBaseComp,
    AbstractComp,
    SearchBarComp,
    Subtitle
  },
  mixins: [StartAnotherBasicSearch],

  async asyncData() {
    const [abstractRes, activeTalentsBaseRes] = await Promise.all([
      requestActivePaperAbstract(),
      requestActiveTalentsBase()
    ]);

    return {
      ...abstractRes,
      ...activeTalentsBaseRes
    };
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
