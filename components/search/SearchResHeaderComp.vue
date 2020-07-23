<template>
  <div style="margin: 30px 0">
    <span class="searchPage-content__hint-text" style="margin-left:10px">
      About
    </span>
    <span class="searchPage-content__result-text" style="margin-left:5px">
      {{ resultCount }}
    </span>
    <span class="searchPage-content__hint-text" style="margin-left:5px">
      Results
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SearchResHeaderComp',
  props: {
    resultCount: {
      type: Number,
      default: 0
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
