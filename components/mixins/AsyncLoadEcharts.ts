import Vue from 'vue';

const load = Vue.extend({
  mounted() {
    // if not exists, load
    if (window.echarts && window.echarts.graphicGL) {
      console.log('echarts has loaded');
      this.onEchartsLoad();
    } else {
      // 必须串行，echarts-gl似乎是依赖于echarts的
      const echarts = document.createElement('script');
      echarts.src =
        'https://cdn.jsdelivr.net/npm/echarts@4.8.0/dist/echarts.min.js';
      echarts.async = true;
      // loaded
      echarts.addEventListener('load', () => {
        const echartsGL = document.createElement('script');
        echartsGL.src =
          'https://cdn.jsdelivr.net/npm/echarts-gl@1.1.1/dist/echarts-gl.min.js';
        echartsGL.async = true;
        echartsGL.addEventListener('load', () => {
          this.onEchartsLoad();
        });
        document.head.appendChild(echartsGL);
      });
      // apply to html
      document.head.appendChild(echarts);
    }
  },
  methods: {
    // placeholder
    onEchartsLoad() {}
  }
});

export default load;
