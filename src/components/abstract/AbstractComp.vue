<template>
  <div class="abstract-item">
    <div>
      <span class="year" style="margin-right: 5px"
        >{{ abstract.publicationYear }}:
      </span>
    </div>
    <div>
      <span class="title">
        <a :href="abstract.link" class="title" target="_blank">
          {{ abstract.title }}</a
        >
      </span>
      <span class="author">
        <span v-for="(author, index) in abstract.authors" :key="index">
          <span v-if="index !== 0">,</span>
          {{ author }}
        </span>
      </span>
      <div class="abstract">
        {{ abstract._abstract }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AbstractComp",
  props: {
    abstract: Object
  }
});
</script>

<style scoped lang="less">
@import "../../../src/stylesheets/index.less";
</style>
