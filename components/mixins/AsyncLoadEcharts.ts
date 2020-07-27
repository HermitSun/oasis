import Vue from 'vue';

const load = Vue.extend({
  data() {
    return {
      isEchartsLoaded: false,
      isEchartsGLLoaded: false,
      isEchartsWordCloudLoaded: false,
      isGLRequired: false,
      isWordCloudRequired: false
    };
  },
  computed: {
    isAllLoaded(): boolean {
      return (
        this.isEchartsLoaded &&
        (!this.isGLRequired || (this.isGLRequired && this.isEchartsGLLoaded)) &&
        (!this.isWordCloudRequired ||
          (this.isWordCloudRequired && this.isEchartsWordCloudLoaded))
      );
    }
  },
  watch: {
    isAllLoaded(val) {
      if (val) {
        this.onEchartsLoad();
      }
    }
  },
  mounted() {
    this.isEchartsLoaded = !!window.echarts;
    this.isEchartsGLLoaded = !!window.echarts?.graphicGL;
    // 因为无法判断词云是否已加载，所以默认echarts加载了词云就加载了
    // 实现有缺陷
    this.isEchartsWordCloudLoaded = this.isEchartsLoaded;
    console.log(this.isAllLoaded);
    if (this.isAllLoaded) {
      this.onEchartsLoad();
      return;
    }
    // if not exists, load
    if (this.isEchartsLoaded) {
      console.log('echarts has loaded');
    } else {
      // preconnect
      const cdnPreConnect = document.createElement('link');
      cdnPreConnect.href = 'https://cdn.jsdelivr.net';
      cdnPreConnect.crossOrigin = 'anonymous';
      // dns-prefetch
      const dnsPrefetch = document.createElement('link');
      dnsPrefetch.href = 'https://cdn.jsdelivr.net';
      // apply to html
      document.head.appendChild(cdnPreConnect);
      document.head.appendChild(dnsPrefetch);
      // load echarts
      const echarts = document.createElement('script');
      echarts.src =
        'https://cdn.jsdelivr.net/npm/echarts@4.8.0/dist/echarts.min.js';
      echarts.async = true;
      // loaded
      echarts.addEventListener('load', () => {
        this.isEchartsLoaded = true;
        // optional GL
        if (this.isGLRequired) {
          if (this.isEchartsGLLoaded) {
            console.log('echarts-gl has loaded');
          } else {
            const echartsGL = document.createElement('script');
            echartsGL.src =
              'https://cdn.jsdelivr.net/npm/echarts-gl@1.1.1/dist/echarts-gl.min.js';
            echartsGL.async = true;
            echartsGL.addEventListener('load', () => {
              this.isEchartsGLLoaded = true;
            });
            document.head.appendChild(echartsGL);
          }
        }
        // optional word cloud
        if (this.isWordCloudRequired) {
          if (this.isEchartsWordCloudLoaded) {
            console.log('echarts-wordcloud has loaded');
          } else {
            const wordCloud = document.createElement('script');
            wordCloud.src =
              'https://cdn.jsdelivr.net/npm/echarts-wordcloud@1.1.3/dist/echarts-wordcloud.min.js';
            wordCloud.async = true;
            wordCloud.addEventListener('load', () => {
              this.isEchartsWordCloudLoaded = true;
            });
            document.head.appendChild(wordCloud);
          }
        }
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
