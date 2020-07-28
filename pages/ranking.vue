<template>
  <div>
    <SearchBarComp
      v-model="keyword"
      @keyword-change="startAnotherBasicSearch"
    />
    <div class="page">
      <AdvancedRankingSubtitle
        title="OASIS RANKING"
        :subject="currentSubject"
      />
      <div style="padding-top:50px">
        <nuxt-child keep-alive />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import AdvancedRankingSubtitle from '~/components/public/AdvancedRankingSubtitle.vue';
import SearchBarComp from '~/components/search/SearchBarComp.vue';
import StartAnotherBasicSearch from '~/components/mixins/StartAnotherBasicSearch';
import AsyncLoadEcharts from '~/components/mixins/AsyncLoadEcharts';

export default Vue.extend({
  name: 'Ranking',
  components: {
    AdvancedRankingSubtitle,
    SearchBarComp
  },
  mixins: [AsyncLoadEcharts, StartAnotherBasicSearch],
  data() {
    return {
      isWordCloudRequired: true
    };
  },
  computed: {
    currentSubject(): string {
      const regExpMatchArray = this.$route.path.match(/^\/ranking\/(.*)/);
      const subject = regExpMatchArray ? regExpMatchArray[1] : '';
      return subject || '';
    }
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
    ...mapActions('ranking', {
      updateIsEchartsLoaded: 'updateIsEchartsLoaded',
      isRankingAffiliationWordCloudLoaded: 'updateIsAffiliationWordCloudLoaded',
      isRankingAuthorWordCloudLoaded: 'updateIsAuthorWordCloudLoaded',
      isRankingKeywordWordCloudLoaded: 'updateIsKeywordWordCloudLoaded'
    }),
    updateWordCloudLoaded(loaded: boolean) {
      this.isRankingAffiliationWordCloudLoaded(loaded);
      this.isRankingAuthorWordCloudLoaded(loaded);
      this.isRankingKeywordWordCloudLoaded(loaded);
    }
  }
});
</script>

<style scoped lang="less">
@import '../stylesheets/index.less';

.page {
  width: auto;
}
</style>
