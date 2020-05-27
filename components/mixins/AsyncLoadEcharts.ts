import Vue from 'vue';

const load = Vue.extend({
  data() {
    return {
      hasEchartsLoaded: 0
    };
  },
  watch: {
    hasEchartsLoaded(val) {
      if (val === 2) {
        this.onEchartsLoad();
      }
    }
  },
  beforeMount() {
    // load
    // 必须串行，echarts-gl似乎是依赖于echarts的
    const echarts = document.createElement('script');
    echarts.src =
      'https://cdn.jsdelivr.net/npm/echarts@4.8.0/dist/echarts.min.js';
    const echartsGL = document.createElement('script');
    echartsGL.src =
      'https://cdn.jsdelivr.net/npm/echarts-gl@1.1.1/dist/echarts-gl.min.js';
    // loaded
    echarts.addEventListener('load', () => {
      ++this.hasEchartsLoaded;
    });
    echartsGL.addEventListener('load', () => {
      ++this.hasEchartsLoaded;
    });
    // apply to html
    document.head.appendChild(echarts);
    document.head.appendChild(echartsGL);
  },
  methods: {
    // placeholder
    onEchartsLoad() {}
  }
});

export default load;
