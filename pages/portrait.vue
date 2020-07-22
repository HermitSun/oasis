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
import AsyncLoadWordCloud from '~/components/mixins/AsyncLoadWordCloud';
import StartAnotherBasicSearch from '~/components/mixins/StartAnotherBasicSearch';

export default Vue.extend({
  name: 'Portrait',
  components: { SearchBarComp },
  mixins: [AsyncLoadWordCloud, StartAnotherBasicSearch],
  methods: {
    ...mapActions('portrait', {
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
</style>
