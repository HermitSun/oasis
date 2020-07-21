import Vue from 'vue';

// 无数据的提示样式
const RankingOption = Vue.extend({
  data() {
    return {
      timeRange: [2020, 2019, 2018, 2017, 2016, 2015],
      sortKeys: [
        {
          value: 'acceptanceCount',
          label: 'acceptance count'
        },
        {
          value: 'citationCount',
          label: 'citation count'
        }
      ]
    };
  }
});

export default RankingOption;
