<template>
  <div class="chart-wrapper">
    <div id="force" style="width: 600px; height: 600px"></div>
    <div id="pie"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { createForceChart } from '~/utils/charts/force';
import { createPieChart } from '~/utils/charts/pie';

export default Vue.extend({
  name: 'Index',
  async mounted() {
    const svg = await this.init();
    document.getElementById('force')!.appendChild(svg);
    createPieChart(
      'pie',
      [
        {
          label: 'voltage source converters',
          value: 3
          // color: '#7e6538'
        },
        {
          label: 'EEB-ZSI',
          value: 1
          // color: '#7c7e38'
        },
        {
          label: 'conduction loss',
          value: 1
          // color: '#587e38'
        },
        {
          label: 'modular structure',
          value: 1
          // color: '#387e45'
        },
        {
          label: 'SCR',
          value: 1
          // color: '#387e6a'
        },
        {
          label: 'impedance-based stability analysis methods',
          value: 1
          // color: '#386a7e'
        }
      ],
      { title: '主要研究方向', height: 400, width: 590 }
    );
  },
  methods: {
    async init() {
      const data = await import('./data.json');
      // const links = data.links.map((d) => Object.create(d));
      // const nodes = data.nodes.map((d) => Object.create(d));

      return createForceChart(data, {
        width: 600,
        height: 600,
        // nodeColor: '#666',
        nodeRadius: (_) => Math.random() * 10,
        tooltip: (d) => `<p>id: ${d.id}</p>`,
        draggable: true
      });
    }
  }
});
</script>
