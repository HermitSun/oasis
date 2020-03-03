<template>
  <div class="abstract-item">
    <div style="margin: 5px 0">
      <span class="year" style="margin-right: 5px"
        >{{ abstract.publicationYear }}:</span
      >
      <span class="title">
        <a :href="abstract.link" class="title" target="_blank">
          {{ abstract.title }}</a
        >
      </span>

      <span style="margin-left:50px">
        <span
          v-for="(author, index) in abstract.authors"
          :key="index"
          class="author"
        >
          <span v-if="index !== 0">,</span>
          {{ author }}
        </span>
      </span>
    </div>
    <div class="abstract" style="margin-left:50px">{{ abstract.abstract }}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AbstractComp",
  props: {
    abstract: {}
  }
});
</script>

<style scoped lang="less">
@import "../../../src/stylesheets/index.less";
</style>
