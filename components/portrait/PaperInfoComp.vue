<template>
  <div class="portrait-paper">
    <div class="title">
      <a :href="paper.link" class="title" target="_blank">{{ paper.title }}</a>
    </div>
    <div>
      <!--跳转到学者画像-->
      <!--TODO: 点击跳转后页面应当刷新-->
      <span
        v-for="(author, index) in paper.authors"
        :key="index"
        class="author"
        style="margin-right: 5px"
        @click="linkToAuthor(author)"
      >
        {{ author.name }}
      </span>
      <span class="info">
        <span
          class="publicationName"
          @click="
            jumpToContentPortrait(paper.contentType, paper.publicationName)
          "
          >{{ paper.publicationName }}</span
        >
        <span style="margin-left: 1px">{{ paper.publicationYear }}</span>
      </span>
    </div>
    <div class="abstract">
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
            @click="jumpToKeywordPortrait(keyword)"
          >
            {{ keyword }}
          </span>
        </div>
      </span>
      <!--&lt;!&ndash;引用信息&ndash;&gt;-->
      <!--<span class="detail-hint">-->
      <!--show more-->
      <!--&lt;!&ndash;TODO 修改为引用情况&ndash;&gt;-->
      <!--</span>-->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import LinkToAuthor from '~/components/mixins/LinkToAuthor';

export default Vue.extend({
  name: 'PaperInfoComp',
  mixins: [LinkToAuthor],
  props: {
    paper: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    jumpToKeywordPortrait(keyword: string) {
      this.$router.push({
        path: '/portrait/keyword',
        query: { keyword }
      });
    },
    jumpToContentPortrait(contentType: string, content: string) {
      if (contentType === 'conferences') {
        this.$router.push({
          path: '/portrait/conference',
          query: {
            conference: content
          }
        });
      } else if (contentType === 'periodicals') {
        this.$router.push({
          path: '/portrait/journal',
          query: {
            journal: content
          }
        });
      }
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
