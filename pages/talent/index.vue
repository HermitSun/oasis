<template>
  <div>
    {{ talentsList }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getTalentsListByTalentBase } from '~/api';
import { TalentsListResponse } from '~/interfaces/responses/talent/TalentsListResponse';
import { Message } from '~/node_modules/element-ui';
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
  async asyncData({ query }) {
    const field = query.field;
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
