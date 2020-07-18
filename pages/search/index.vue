<template>
  <div class="page"></div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SearchIndex',
  // 重定向到基础搜索
  asyncData({ query, redirect }) {
    redirect('/search/basic', query);
  },
  render(h) {
    return h('div');
  }
});
</script>
