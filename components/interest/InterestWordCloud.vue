<template>
  <!--词云不支持SSR，只在client渲染-->
  <client-only>
    <div class="wordCloud">
      <p v-if="interests.length === 0">
        Sorry,no keyword at present.
      </p>
      <wordcloud
        v-if="interests.length !== 0"
        :data="interests"
        name-key="name"
        value-key="value"
        :color="wordcloudColors"
        :show-tooltip="false"
        :word-click="wordClickHandler"
      />
    </div>
  </client-only>
</template>

<script lang="ts">
import Vue from 'vue';
import { sortKey } from '~/interfaces/requests/search/SearchPayload';

export default Vue.extend({
  name: 'InterestWordCloud',
  props: {
    interests: {
      type: Array,
      default: () => ({})
    }
  },
  data() {
    return {};
  },
  methods: {
    wordClickHandler(name: string) {
      this.$router.push({
        path: '/search/basic',
        query: {
          keyword: name,
          page: '1',
          startYear: '1963', // 开始日期
          endYear: '2020', // 结束日期
          sortKey: 'related' as sortKey
        }
      });
    }
  }
});
</script>

<style scoped lang="less"></style>
