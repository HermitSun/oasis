<template>
  <div class="ranking-advanced-detail__paper">
    <div class="sub-title">
      <el-tag size="mini" class="publication">
        {{ paper.publicationYear }} {{ paper.publicationName }}
      </el-tag>
      <a
        :href="paper.link"
        class="name"
        target="_blank"
        rel="noopener noreferrer nofollow"
        >{{ paper.title }}</a
      >
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Tag } from 'element-ui';
export default Vue.extend({
  name: 'PaperInfoComp',
  components: {
    [Tag.name]: Tag
  },
  props: {
    paper: {
      type: Object,
      default: () => ({})
    }
  }
});
</script>

<style scoped lang="less">
@import '../../../stylesheets/index.less';
</style>
