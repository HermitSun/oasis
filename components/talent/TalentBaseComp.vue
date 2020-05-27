<template>
  <div class="talent-base" @click="jumpToTalent(talent.field)">
    <div class="title">
      <span class="field">{{ getUpperTitle(talent.field) }}</span>
      <span class="count">{{ talent.count }} papers</span>
    </div>
    <div class="author">
      <span
        v-for="(expert, index) in talent.experts"
        :key="index"
        class="authorName"
      >
        <span @click="jumpToPortrait(expert.authorId)">{{
          expert.authorName
        }}</span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TalentBaseComp',
  props: {
    talent: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    getUpperTitle(title: string) {
      const arr = title.split(' ');
      return arr
        .map((val) => val.replace(val.charAt(0), val.charAt(0).toUpperCase()))
        .join(' ');
    },
    jumpToPortrait(authorId: string) {
      this.$router.push({
        path: '/portrait/author',
        query: { authorId, sortKey: 'recent', page: '1' }
      });
    },

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
