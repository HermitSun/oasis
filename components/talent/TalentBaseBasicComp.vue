<template>
  <div class="talent-base-basic" @click="jumpToTalent(talent.field)">
    <div class="count">
      <span>{{ talent.count }}</span>
    </div>
    <div class="field">
      {{ talent.field }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TalentBaseBasicComp',
  props: {
    talent: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    jumpToTalent(field: string) {
      this.$router.push({
        path: '/talent',
        query: { field }
      });
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
