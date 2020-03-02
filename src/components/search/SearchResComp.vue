<template>
  <div class="searchPage-item">
    <div class="title">
      <a :href="res.link" class="title" target="_blank">{{ res.title }}</a>
    </div>
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
      <span style="margin-right: 10px">keywords:</span>
      <span
        v-for="(keyword, index) in res.keywords"
        :key="index"
        class="keyword"
        style="margin-right: 5px"
        >{{ keyword }}
      </span>
      <span
        v-if="res.references.length !== 0"
        style="float: right"
        class="detail-hint"
        @click="showReference = !showReference"
        >show reference</span
      >
    </div>
    <div v-if="showReference" style="margin-top:5px">
      <div
        v-for="(ref, index) in res.references"
        :key="index"
        class="reference"
      >
        <span
          :style="index === 0 ? {} : { color: 'transparent' }"
          style="margin-right: 5px"
          >references:</span
        ><a :href="ref.googleScholarLink" target="_blank">{{ ref.title }}</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "SearchResComp",
  props: {
    res: {}
  },
  data() {
    return {
      showReference: false
    };
  }
});
</script>

<style scoped lang="less">
@import "../../../src/stylesheets/index.less";
</style>
