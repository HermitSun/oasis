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
    // async load
    const echarts = document.createElement('script');
    echarts.src =
      'https://cdn.bootcdn.net/ajax/libs/echarts/4.7.0/echarts.min.js';
    echarts.async = true;
    const echartsGL = document.createElement('script');
    echartsGL.src =
      'https://cdn.jsdelivr.net/npm/echarts-gl@1.1.1/dist/echarts-gl.min.js';
    echartsGL.async = true;
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
