/**
 * 柱状图
 * @author Alexcchanchic
 * @date 2020.03.29
 */

import * as d3 from 'd3';
export default class Bar {
  private chart: any;

  constructor(selector: string) {
    this.chart = d3.select(selector);
  }

  addColor() {
    this.chart.style('color', 'red');
  }
}
