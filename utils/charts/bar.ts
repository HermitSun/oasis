/**
 * 柱状图
 * 从目前的实现看，也许叫条形图更合适
 * @author Alexcchanchic, WenSun
 * @date 2020.03.29
 * @update 2020.04.03
 */

import * as d3 from 'd3-selection';

type D3CallbackFn<T> = (data: T, index?: number) => string | number;
type BarChartDatum = number;
interface BarChartConfig {
  width: number;
  height: number;
  barColor?: string | D3CallbackFn<BarChartDatum>;
  barMargin?: number; // 两个bar之间的距离
  pixelUnit?: number; // 每一单位的数值对应的像素
  tooltipThreshold?: number; // 提示内容出现在bar内部和外部的阈值，低于这个值的会出现在bar外部
  fontFamily?: string; // 应该不会有人每一个条都要换字体吧？？
  fontSize?: string | D3CallbackFn<BarChartDatum>;
  fontColorInsideBar?: string | D3CallbackFn<BarChartDatum>;
  fontColorOutsideBar?: string | D3CallbackFn<BarChartDatum>;
  hover?: {
    mouseOverColor: string | D3CallbackFn<BarChartDatum>;
  };
}
interface BarChartConfigWithDefault
  extends Required<Omit<BarChartConfig, 'hover'>> {
  hover: BarChartConfig['hover'];
}
export function createBarChart(
  selectorOrDOM: string | HTMLElement,
  data: BarChartDatum[],
  options: BarChartConfig
) {
  // 默认值
  const config = {
    // barColor: (d: BarChartDatum) => 'rgb(0, 0, ' + d * 10 + ')',
    barColor: '#275b75',
    barMargin: 1,
    pixelUnit: 4,
    tooltipThreshold: 10,
    fontFamily: 'sans-serif',
    fontSize: '11px',
    fontColorInsideBar: 'white',
    fontColorOutsideBar: 'black',
    hover: {
      mouseOverColor: '#b5d4e3'
    },
    ...options
  } as BarChartConfigWithDefault;

  const svg = d3
    .select(selectorOrDOM as string)
    .append('svg')
    .attr('width', config.width)
    .attr('height', config.height)
    .attr('viewBox', `0,0,${config.width},${config.height}`)
    .attr('preserveAspectRatio', 'xMinYMin');

  svg
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (_, i) => i * (config.width / data.length))
    .attr('y', (d) => config.height - config.pixelUnit * d)
    .attr('width', config.width / data.length - config.barMargin)
    .attr('height', (d) => d * config.pixelUnit)
    .attr('fill', (d) =>
      typeof config.barColor === 'string' ? config.barColor : config.barColor(d)
    );

  // 如果需要hover效果
  if (config.hover) {
    const overColor = config.hover.mouseOverColor;
    svg
      .selectAll('rect')
      .on('mouseover', function(d) {
        const color =
          typeof overColor === 'string' ? overColor : overColor(d as number);
        d3.select(this).attr('fill', color);
      })
      .on('mouseout', function(d) {
        const color =
          typeof config.barColor === 'string'
            ? config.barColor
            : config.barColor(d as number);
        d3.select(this).attr('fill', color);
      });
  }

  svg
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text((d) => d)
    .attr(
      'x',
      (_, i) =>
        i * (config.width / data.length) +
        (config.width / data.length - config.barMargin) / 2
    )
    .attr('y', (d) => {
      const bias = d > config.tooltipThreshold ? 14 : -2;
      return config.height - d * config.pixelUnit + bias;
    })
    .attr('font-family', config.fontFamily)
    .attr('font-size', (d) =>
      typeof config.fontSize === 'string' ? config.fontSize : config.fontSize(d)
    )
    .attr('fill', (d) =>
      d > config.tooltipThreshold
        ? typeof config.fontColorInsideBar === 'string'
          ? config.fontColorInsideBar
          : config.fontColorInsideBar(d)
        : typeof config.fontColorOutsideBar === 'string'
        ? config.fontColorOutsideBar
        : config.fontColorOutsideBar(d)
    )
    .attr('text-anchor', 'middle');
}
