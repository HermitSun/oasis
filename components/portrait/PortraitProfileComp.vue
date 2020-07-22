<template>
  <div class="portrait-profile">
    <el-tooltip trigger="hover" placement="top-start" :content="profile.name">
      <div class="name">
        {{ profile.name }}
      </div>
    </el-tooltip>
    <div class="info">
      <div v-for="(info, index) in profile.statistics" :key="index">
        <div v-if="info.number !== ''" class="wrapper">
          <span class="prop">
            {{ info.prop }}
          </span>
          <span class="number">
            {{ info.number }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Tooltip } from 'element-ui';

export default Vue.extend({
  name: 'PortraitProfileComp',
  components: {
    [Tooltip.name]: Tooltip
  },
  props: {
    profile: {
      /**
       * 包含name、type、statistics
       * @name: string
       * @type: string
       * @statistics: {prop: string, number: number}[]
       */
      type: Object,
      default: () => ({})
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
