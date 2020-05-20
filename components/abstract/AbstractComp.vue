<template>
  <div class="abstract-item">
    <div>
      <span class="year" style="margin-right: 5px">
        {{ abstract.publicationYear }}:
      </span>
    </div>
    <div>
      <div>
        <span class="title">
          <a
            :href="abstract.link"
            class="title"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {{ abstract.title }}
          </a>
        </span>
        <div class="author">
          <span v-for="(author, index) in abstract.authors" :key="index">
            <span v-if="index !== 0">,</span>
            <span class="authorName" @click="linkToAuthor(author)">
              {{ author.name }}
            </span>
          </span>
        </div>
      </div>
      <div class="abstract">
        {{ abstract._abstract }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import LinkToAuthor from '~/components/mixins/LinkToAuthor';

export default Vue.extend({
  name: 'AbstractComp',
  mixins: [LinkToAuthor],
  props: {
    abstract: {
      type: Object,
      default: () => ({})
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
