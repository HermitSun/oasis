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
    <!--过滤器-->
    <el-button
      v-if="filter"
      type="primary"
      size="mini"
      round
      style="line-height: 20px; float: right; margin-top: 5px"
      class="mobile-hidden"
      @click="$emit('open')"
    >
      Show Filter
    </el-button>
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
    },
    filter: {
      type: Boolean,
      default: false
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
