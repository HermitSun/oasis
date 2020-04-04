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
export default Vue.extend({
  name: 'InterestWordCloud',
  components: {
    wordcloud: () => import('vue-wordcloud')
  },
  props: {
    interests: {
      type: Array,
      default: () => ({})
    }
  },
  data() {
    return {
      wordcloudColors: ['#1f77b4', '#629fc9', '#94bedb', '#c9e0ef']
    };
  },

  methods: {
    wordClickHandler(name: string) {
      this.$router.push({
        path: '/search',
        query: {
          mode: 'basic',
          keyword: name,
          page: '1',
          startYear: '2001',
          endYear: '2020'
        }
      });
    }
  }
});
</script>
