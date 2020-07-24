<template>
  <div class="ranking-advanced-detail__paper">
    <div class="sub-title">
      <el-tooltip
        trigger="hover"
        placement="top"
        :content="paper.publicationYear + ' ' + paper.publicationName"
      >
        <el-tag size="mini" class="publication">
          {{ paper.publicationYear }} {{ paper.publicationName }}
        </el-tag>
      </el-tooltip>
      <el-tooltip trigger="hover" placement="top" :content="paper.title">
        <a
          :href="paper.link"
          class="name"
          target="_blank"
          rel="noopener noreferrer nofollow"
          >{{ paper.title }}</a
        >
      </el-tooltip>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Tag, Tooltip } from 'element-ui';
export default Vue.extend({
  name: 'PaperInfoComp',
  components: {
    [Tag.name]: Tag,
    [Tooltip.name]: Tooltip
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
