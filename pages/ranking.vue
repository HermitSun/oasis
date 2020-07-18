<template>
  <div class="page">
    <SearchBarComp
      v-model="keyword"
      @keyword-change="startAnotherBasicSearch"
    />
    <div class="advanced-ranking-page">
      <AdvancedRankingSubtitle
        title="🏆 OASIS RANKING"
        :subject="currentSubject"
      />
      <nuxt-child keep-alive />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import AdvancedRankingSubtitle from '~/components/public/AdvancedRankingSubtitle.vue';
import SearchBarComp from '~/components/search/SearchBarComp.vue';
import AsyncLoadWordCloud from '~/components/mixins/AsyncLoadWordCloud';
import StartAnotherBasicSearch from '~/components/mixins/StartAnotherBasicSearch';

export default Vue.extend({
  name: 'Ranking',
  components: {
    AdvancedRankingSubtitle,
    SearchBarComp
  },
  mixins: [AsyncLoadWordCloud, StartAnotherBasicSearch],
  computed: {
    currentSubject(): string {
      const regExpMatchArray = this.$route.path.match(/^\/ranking\/(.*)/);
      const subject = regExpMatchArray ? regExpMatchArray[1] : '';
      console.log(subject);
      return subject || '';
    }
  },
  methods: {
    ...mapActions('ranking', {
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
</style>
