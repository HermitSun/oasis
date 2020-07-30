<template>
  <div class="talent-detail">
    <div class="name" @click="jumpToPortrait(talent.authorId)">
      {{ talent.name }}
    </div>
    <div class="flex-left-left-row" style="width: 100%">
      <span class="card-hint" style="flex: 1">affiliation: </span>
      <span class="affiliation" style="flex: 1;flex-grow: 6">
        {{ talent.affiliation || 'unknown' }}
      </span>
    </div>
    <div class="papers flex-left-left-row">
      <span class="card-hint" style="flex: 1">hot paper: </span>
      <div style="flex: 1;flex-grow: 6">
        <div v-for="(paper, index) in talent.papers" :key="index">
          <a
            :href="paper.link"
            class="title"
            target="_blank"
            rel="noopener noreferrer nofollow"
            ><span
              v-if="talent.papers.length > 1"
              style="font-weight: 500;color: #2c3e50; "
            >
              {{ index + 1 }}.</span
            >
            <el-tag size="mini" type="warning"
              >citation: {{ paper.citation }}</el-tag
            >
            {{ paper.title }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Tag } from 'element-ui';

export default Vue.extend({
  name: 'TalentDetailComp',
  components: {
    [Tag.name]: Tag
  },
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
