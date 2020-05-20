<template>
  <div class="talent-base" @click="jumpToTalent(talent.field)">
    <span>{{ talent.field }}</span>
    <span>{{ talent.count }}</span>
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
