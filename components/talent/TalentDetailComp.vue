<template>
  <div class="talent-detail">
    <div class="name" @click="jumpToPortrait(talent.authorId)">
      {{ talent.name }}
    </div>
    <div class="affiliation">
      <span class="tag">🏫 affiliation</span>{{ talent.affiliation }}
    </div>
    <div class="papers">
      <div v-for="(paper, index) in talent.papers" :key="index">
        <a
          :href="paper.link"
          class="title"
          target="_blank"
          rel="noopener noreferrer nofollow"
          >{{ paper.title }}</a
        >
        <span class="citation">【citation: {{ paper.citation }}】</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TalentDetailComp',
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
