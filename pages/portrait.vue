<template>
  <div>
    <!--搜索框-->
    <SearchBarComp
      v-model="keyword"
      @keyword-change="startAnotherBasicSearch"
    />
    <div class="page">
      <nuxt-child />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import SearchBarComp from '~/components/search/SearchBarComp.vue';
import AsyncLoadEcharts from '~/components/mixins/AsyncLoadEcharts';
import StartAnotherBasicSearch from '~/components/mixins/StartAnotherBasicSearch';

export default Vue.extend({
  name: 'Portrait',
  components: { SearchBarComp },
  // 这里只加载图表的依赖
  // 声明需要词云
  mixins: [AsyncLoadEcharts, StartAnotherBasicSearch],
  data() {
    return {
      isWordCloudRequired: true
    };
  },
  // 销毁时清空store
  beforeDestroy() {
    this.updateIsEchartsLoaded(false);
    this.updateWordCloudLoaded(false);
  },
  methods: {
    onEchartsLoad() {
      this.updateIsEchartsLoaded(true);
      this.updateWordCloudLoaded(true);
    },
    ...mapActions('portrait', {
      updateIsEchartsLoaded: 'updateIsEchartsLoaded',
      updateIsPortraitAffiliationWordCloudLoaded:
        'updateIsAffiliationWordCloudLoaded',
      updateIsPortraitKeywordWordCloudLoaded: 'updateIsKeywordWordCloudLoaded'
    }),
    updateWordCloudLoaded(loaded: boolean) {
      this.updateIsPortraitAffiliationWordCloudLoaded(loaded);
      this.updateIsPortraitKeywordWordCloudLoaded(loaded);
    }
  }
});
</script>

<style scoped lang="less">
@import '../stylesheets/index.less';
/deep/ .el-tabs__nav-wrap.is-top {
  border-radius: @card-border-radius;
  .shadow;
  margin: 0 20px;
  padding: 8px 0 0 40px;
}
</style>
