import Vue from 'vue';
import { ForceChartTooltipElement } from '~/utils/charts/force';

const clear = Vue.extend({
  // 只是一个hack，不保证id不会冲突
  // 但是确实能用就是了
  destroyed() {
    const tooltip = document.getElementById(
      'force-chart-tooltip'
    ) as ForceChartTooltipElement;
    tooltip.clear();
  }
});

export default clear;
