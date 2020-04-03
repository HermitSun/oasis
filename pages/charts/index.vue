<template>
  <div class="chart-wrapper">
    <div id="force" style="width: 600px; height: 600px"></div>
    <div id="pie"></div>
    <div id="bar"></div>
    <!--footer不和图表一起实现-->
    <div id="bar-footer">
      2010&nbsp;&nbsp;&nbsp;&nbsp;2015&nbsp;&nbsp;&nbsp;&nbsp;2020
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { createForceChart } from '~/utils/charts/force';
import { createPieChart } from '~/utils/charts/pie';
import { createBarChart } from '~/utils/charts/bar';

export default Vue.extend({
  name: 'Index',
  async mounted() {
    const data = await import('./data.json');
    createForceChart('#force', data, {
      width: 600,
      height: 600,
      // nodeColor: '#666',
      nodeRadius: (_) => Math.random() * 10,
      tooltip: (d) => `<p>id: ${d.id}</p>`,
      draggable: true
    });
    createPieChart(
      '#pie',
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
    createBarChart('#bar', [2, 6, 4, 20, 9, 10, 11, 18, 23, 25], {
      width: 150,
      height: 100,
      barColor: 'black',
      tooltipThreshold: 15,
      hover: {
        mouseOverColor: (_) => 'rgb(100, 0, 0)'
      }
    });
  }
});
</script>
