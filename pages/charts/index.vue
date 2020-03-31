<template>
  <div id="chart" style="width: 600px; height: 600px"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import { createForceGraph } from '~/utils/charts/force';

export default Vue.extend({
  name: 'Index',
  async mounted() {
    const svg = await this.init();
    document.getElementById('chart')!.appendChild(svg);
  },
  methods: {
    async init() {
      const data = await import('./data.json');
      // const links = data.links.map((d) => Object.create(d));
      // const nodes = data.nodes.map((d) => Object.create(d));

      return createForceGraph(data, {
        width: 600,
        height: 600,
        // nodeColor: '#666',
        nodeRadius: (_) => Math.random() * 10,
        nodeTitle: (d) => 'id: ' + d.id,
        draggable: true
      });
    }
  }
});
</script>
