<template>
  <div>
    <div class="subtitle">
      {{ title }}
    </div>
    <div class="subtitle-divider"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'Subtitle',
  props: {
    title: {
      type: String,
      default: () => ({})
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
