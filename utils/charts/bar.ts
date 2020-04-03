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

type BarChartDatum = number;
interface BarChartConfig {
  width: number;
  height: number;
}

export function createBarChart(
  selectorOrDOM: string | HTMLElement,
  data: BarChartDatum[],
  config: BarChartConfig
) {
  const barPadding = 1;
  const svg = d3
    .select(selectorOrDOM as string)
    .append('svg')
    .attr('width', config.width)
    .attr('height', config.height);
  svg
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', function(_, i) {
      return i * (config.width / data.length);
    })
    .attr('y', function(d) {
      return config.height - 4 * d; // Height minus data value
    })
    .attr('width', config.width / data.length - barPadding)
    .attr('height', function(d) {
      return d * 4; // <-- Times four!
    })
    .attr('fill', function(d) {
      return 'rgb(0, 0, ' + d * 10 + ')';
    })
    .on('mouseover', function(d) {
      d3.select(this).attr('fill', 'rgb(0, 0, ' + d * 10 + 5 + ')');
    })
    .on('mouseout', function(d) {
      d3.select(this).attr('fill', 'rgb(0, 0, ' + d * 10 + ')');
    });

  svg
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(function(d) {
      return d;
    })
    .attr('x', function(_, i) {
      return (
        i * (config.width / data.length) +
        (config.width / data.length - barPadding) / 2
      );
    })
    .attr('y', function(d) {
      return d > 10 ? config.height - d * 4 + 14 : config.height - d * 4 - 2;
    })
    .attr('font-family', 'sans-serif')
    .attr('font-size', '11px')
    .attr('fill', (d) => (d > 10 ? 'white' : 'black'))
    .attr('text-anchor', 'middle');
}
