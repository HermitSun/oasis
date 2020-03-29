<template>
  <div class="portrait-paper">
    <div class="title">
      <a :href="paper.link" class="title" target="_blank">{{ paper.title }}</a>
    </div>
    <div>
      <span
        v-for="(author, index) in paper.authors"
        :key="index"
        class="author"
        style="margin-right: 5px"
      >
        {{ author }}
      </span>
      <span class="info">
        {{ paper.publicationName }}
        <span style="margin-left: 1px">{{ paper.publicationYear }}</span>
      </span>
    </div>
    <div class="abstract">
      {{ paper._abstract }}
      {{ paper._abstract }}
    </div>
    <div class="divider"></div>
    <!--关键词-->
    <div
      style="min-height: 15px"
      :class="
        paper.keywords && paper.keywords.length > 0 ? 'flex-space-between' : ''
      "
    >
      <!--没有关键词的时候不显示-->
      <span
        v-if="paper.keywords && paper.keywords.length > 0"
        class="keyword-wrapper"
      >
        <div style="margin-right: 10px">keywords:</div>
        <div class="keyword-inner-wrapper">
          <span
            v-for="(keyword, index) in paper.keywords"
            :key="index"
            class="keyword"
            style="margin-right: 5px"
          >
            {{ keyword }}
          </span>
        </div>
      </span>
      <!--引用信息-->
      <span class="detail-hint">
        show more
        <!--TODO 修改为引用情况-->
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'PaperInfoComp',
  props: {
    paper: {
      type: Object,
      default: () => ({})
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
