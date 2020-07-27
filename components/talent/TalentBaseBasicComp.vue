<template>
  <div class="talent-base-basic" @click="jumpToTalent(talent.field)">
    <div class="field">
      {{
        talent.field
          .split(' ')
          .map((i) => i[0].toUpperCase() + i.slice(1))
          .join(' ')
      }}
    </div>
    <div class="flex-center-row">
      <span class="count">{{ talent.count }}</span>
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
        path: '/talent/' + field
      });
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
