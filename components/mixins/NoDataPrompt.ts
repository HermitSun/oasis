import Vue from 'vue';

// 无数据的提示样式
const prompt = Vue.extend({
  data() {
    return {
      noDataPromptStyle: {
        textAlign: 'center',
        minHeight: '100px',
        lineHeight: '100px'
      }
    };
  }
});

export default prompt;
