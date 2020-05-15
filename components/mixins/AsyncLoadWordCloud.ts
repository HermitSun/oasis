import Vue from 'vue';

const load = Vue.extend({
  beforeMount() {
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
  },
  mounted() {
    // async load
    const wordCloud = document.createElement('script');
    wordCloud.src =
      'https://cdn.jsdelivr.net/npm/vue-wordcloud@1.1.1/dist/word-cloud.min.js';
    wordCloud.async = true;
    // apply to html
    document.head.appendChild(wordCloud);
    wordCloud.addEventListener('load', () => {
      this.updateWordCloudLoaded(true);
    });
  },
  // improve robust
  beforeDestroy() {
    this.updateWordCloudLoaded(false);
  },
  methods: {
    // placeholder
    updateWordCloudLoaded(loaded: boolean) {
      console.log(loaded);
    }
  }
});

export default load;
