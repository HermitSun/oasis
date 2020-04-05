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
import {
  createForceChart,
  ForceChartLink,
  ForceChartNode
} from '~/utils/charts/force';
import { createPieChart } from '~/utils/charts/pie';
import { createBarChart } from '~/utils/charts/bar';
import journalInterestMockData from '~/server/mock/portrait/journal/journalInterestMockData';

interface AuthorNode extends ForceChartNode {
  name: string;
  count: number;
  citation: number;
}

interface AuthorLink extends ForceChartLink {
  value: number;
}

export default Vue.extend({
  name: 'Index',
  async mounted() {
    const data = await import('./data.json');
    createForceChart('#force', data, {
      width: 400,
      height: 400,
      // nodeColor: '#666',
      linkWidth: (_) => 1,
      linkLength: (d) => {
        const link = d as AuthorLink;
        // 限制最大长度
        return link.value * 30 > 200 ? 200 : link.value * 30;
      },
      nodeRadius: (d) => {
        const node = d as AuthorNode;
        // 大小 = 被引数 / 论文数
        // ÷5是为了显示
        const radius = node.citation / node.count / 5;
        return radius < 2 ? 2 : radius;
      },
      tooltip: (d) => {
        const node = d as AuthorNode;
        return `
          <div style="background-color: rgba(153, 153, 153, 0.8); border-radius: 5px">
            <p>name: ${node.name}</p>
            <p>citation: ${node.citation}</p>
            <p>count: ${node.count}</p>
          </div>
        `;
      },
      draggable: true
    });
    createPieChart(
      '#pie',
      journalInterestMockData.data
        .map((i) => {
          return {
            label: i.name,
            value: i.value
          };
        })
        .sort((a, b) => b.value - a.value)
        .slice(0, 20),
      {
        title: '主要研究方向',
        height: 600,
        width: 800
      }
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
