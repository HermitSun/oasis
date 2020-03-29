import Vue from 'vue';

// 最大页数
const MAX_RECORDS = 100 * 10;

const limit = Vue.extend({
  data() {
    return {
      resultCount: 0
    };
  },
  computed: {
    // 限制最大页数
    totalRecords(): number {
      return this.resultCount > MAX_RECORDS ? MAX_RECORDS : this.resultCount;
    }
  }
});

export default limit;
