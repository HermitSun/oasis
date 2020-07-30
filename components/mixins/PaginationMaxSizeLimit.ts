import Vue from 'vue';
import { isMobile } from '~/utils/breakpoint';

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
    },
    // 分页的大小
    // 在移动端的客户端渲染为5个
    pagerSize(): number {
      return process.client && isMobile() ? 4 : 7;
    }
  }
});

export default limit;
