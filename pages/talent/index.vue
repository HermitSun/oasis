<template>
  <div>
    <SearchBarComp
      v-model="keyword"
      @keyword-change="startAnotherBasicSearch"
    />
    <div class="page">
      <Subtitle title="TALENTS BASE" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SearchBarComp from '~/components/search/SearchBarComp.vue';
import StartAnotherBasicSearch from '~/components/mixins/StartAnotherBasicSearch';
import Subtitle from '~/components/public/Subtitle.vue';

export default Vue.extend({
  name: 'Index',
  components: {
    SearchBarComp,
    Subtitle
  },
  mixins: [StartAnotherBasicSearch],

  asyncData({ query }) {
    console.log(query);
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
