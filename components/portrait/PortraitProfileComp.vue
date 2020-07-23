<template>
  <div class="portrait-profile">
    <el-tooltip trigger="hover" placement="top" :content="profile.name">
      <div class="name">
        <span class="text">{{ profile.name }}</span>
        <el-tag class="icon" size="medium" style="width: 100px">
          <i :class="icon"></i> {{ type }}
        </el-tag>
      </div>
    </el-tooltip>
    <div class="info">
      <div v-for="(info, index) in profile.statistics" :key="index">
        <div v-if="info.number !== ''" class="wrapper">
          <span class="prop" style="min-width: 125px">
            <i :class="info.icon" class="icon"></i> {{ info.prop }}
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
import { Tooltip, Tag } from 'element-ui';

export default Vue.extend({
  name: 'PortraitProfileComp',
  components: {
    [Tooltip.name]: Tooltip,
    [Tag.name]: Tag
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
    },
    type: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
