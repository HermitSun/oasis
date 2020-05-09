import Vue from 'vue';

const search = Vue.extend({
  data() {
    return {
      keyword: ''
    };
  },
  methods: {
    startAnotherBasicSearch(keyword: string) {
      this.$router.push({
        path: '/search/basic',
        query: {
          keyword,
          startYear: '1963', // 开始日期
          endYear: new Date().getFullYear().toString(), // 结束日期
          page: '1',
          sortKey: 'related'
        }
      });
    }
  }
});

export default search;
