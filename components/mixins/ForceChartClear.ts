import Vue from 'vue';
import { ForceChartTooltipElement } from '~/components/charts/force';

const clear = Vue.extend({
  watch: {
    $route() {
      this.clearTooltip();
    }
  },
  // 只是一个hack，不保证id不会冲突
  // 但是确实能用就是了
  destroyed() {
    this.clearTooltip();
  },
  methods: {
    clearTooltip() {
      const tooltip = document.getElementById('force-chart-tooltip');
      // 考虑tooltip还没创建的情况
      if (tooltip) {
        (tooltip as ForceChartTooltipElement).clear();
      }
    }
  }
});

export default clear;
