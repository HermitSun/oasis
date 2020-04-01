<template>
  <div>
    <div class="subtitle">
      {{ title }}
      <span style="float: right">
        sortKey: 'recent'
      </span>
      <!--TODO 添加sortKey-->
    </div>
    <div class="subtitle-divider"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'PapersSubtitle',
  props: {
    title: {
      type: String,
      default: () => ({})
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/default.less';
</style>
