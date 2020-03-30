<template>
  <div class="portrait-profile">
    <div class="name">
      {{ profile.name }}
    </div>
    <div>
      <div
        v-for="(info, index) in profile.statistics"
        :key="index"
        class="info"
      >
        <div class="flex-space-between">
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

export default Vue.extend({
  name: 'PortraitProfileComp',
  props: {
    profile: {
      /**
       * type: 包含name和statistics两个参数
       * @name: string
       * @statistics: {prop: string, number: number}[]
       */
      type: Object,
      default: () => ({})
    }
  },
  mounted(): void {
    console.log(this.profile);
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
