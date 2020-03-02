<template>
  <div class="searchPage-item">
    <a :href="res.link" target="_blank">{{ res.title }}</a>
    <div>
      <span
        v-for="(author, index) in res.authors"
        :key="index"
        class="author"
        style="margin-right: 5px"
        >{{ author }}
      </span>
      <span class="info" style="margin-left:10px"
        >{{ res.conferenceName }}
        <span style="margin-left: 1px">{{ res.publicationYear }}</span>
      </span>
    </div>
    <div class="abstract">{{ res.abstract }}</div>
    <div class="divider"></div>
    <div>
      keywords:
      <span
        v-for="(keyword, index) in res.keywords"
        :key="index"
        class="keyword"
        style="margin-right: 5px"
        >{{ keyword }}
      </span>
      <span style="float: right" class="detail-hint">show reference</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { SearchResponse } from "../../interfaces/responses/search/SearchResponse";

export default Vue.extend({
  name: "SearchResComp",
  props: {
    res: {}
  }
});
</script>

<style scoped lang="less">
@import "../../../src/stylesheets/index.less";
</style>
