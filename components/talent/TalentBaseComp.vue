<template>
  <div class="talent-base">
    <span>{{ talent.field }}</span>
    <span>{{ talent.count }}</span>
    <div class="author">
      <span v-for="(expert, index) in talent.experts" :key="index">
        <span class="authorName" @click="jumpToPortrait(expert.authorId)">{{
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
    jumpToPortrait(authorId: string) {
      this.$router.push({
        path: '/portrait/author',
        query: { authorId, sortKey: 'recent', page: '1' }
      });
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
