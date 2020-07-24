/**
 * 柱状图
 * 从目前的实现看，也许叫条形图更合适
 * @author Alexchanchic, WenSun
 * @date 2020.03.29
 * @update 2020.04.03
 */

import * as d3 from 'd3-selection';
import * as echarts from 'echarts';
type D3CallbackFn<T, R = string | number> = (data: T, index?: number) => R;
type BarChartDatum = number;
export interface BarChartConfig {
  width: number;
  height: number;
  barColor?: string | D3CallbackFn<BarChartDatum>;
  barMargin?: number; // 两个bar之间的距离
  barHeight?: string | number | D3CallbackFn<BarChartDatum, number>; // 每一个的高度
  tooltipThreshold?: number; // 提示内容出现在bar内部和外部的阈值，低于这个值的会出现在bar外部
  fontFamily?: string; // 应该不会有人每一个条都要换字体吧？？
  fontSize?: string | D3CallbackFn<BarChartDatum>;
  fontColorInsideBar?: string | D3CallbackFn<BarChartDatum>;
  fontColorOutsideBar?: string | D3CallbackFn<BarChartDatum>;
  hover?: {
    mouseOverColor: string | D3CallbackFn<BarChartDatum>;
  };
}
export function createBarChart(
  selectorOrDOM: string | HTMLElement,
  data: BarChartDatum[]
) {
  const bar = echarts.init(
    document.getElementById(selectorOrDOM as string) as any
  );
  const option: any = {
    xAxis: {
      data: Array.from(new Array(2021).keys()).slice(2011),
      axisLabel: {
        textStyle: {
          color: '#ccc'
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: { show: false },
    series: [
      {
        type: 'bar',
        label: {
          show: true,
          position: 'top',
          color: '#c4c1ff',
          formatter: (params: any) => (params.data === 0 ? '' : params.data)
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#5239ff' },
            { offset: 1, color: '#ab8dff' }
          ]),
          barBorderRadius: 10
        },
        emphasis: {
          itemStyle: {
            color: '#f0efff'
          }
        },
        barCategoryGap: '40%',
        barMaxWidth: '15',
        data
      }
    ]
  };

  bar.setOption(option);
  window.addEventListener('resize', function() {
    bar.resize();
  });
}
export function createBarChartD3(
  selectorOrDOM: string | HTMLElement,
  data: BarChartDatum[],
  {
    width = 300,
    height = 100,
    barColor = '#2f6681',
    barMargin = 1,
    barHeight = (d) => d * 4,
    tooltipThreshold = 10,
    fontFamily = 'sans-serif',
    fontSize = '11px',
    fontColorInsideBar = 'white',
    fontColorOutsideBar = 'black',
    hover = {
      mouseOverColor: '#b5d4e3'
    }
  }: BarChartConfig
) {
  const svg = d3
    .select(selectorOrDOM as string)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0,0,${width},${height}`)
    .attr('preserveAspectRatio', 'xMinYMin');

  svg
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (_, i) => i * (width / data.length))
    .attr('y', (d) => {
      const transformedBarHeight =
        typeof barHeight === 'number'
          ? barHeight
          : typeof barHeight === 'string'
          ? parseInt(barHeight)
          : barHeight(d);
      return height - transformedBarHeight;
    })
    .attr('width', width / data.length - barMargin)
    .attr('height', (d) => {
      return typeof barHeight === 'number'
        ? barHeight
        : typeof barHeight === 'string'
        ? parseInt(barHeight)
        : barHeight(d);
    })
    .attr('fill', (d) =>
      typeof barColor === 'string' ? barColor : barColor(d)
    );

  // 如果需要hover效果
  if (hover) {
    const overColor = hover.mouseOverColor;
    svg
      .selectAll('rect')
      .on('mouseover', function(d) {
        const color =
          typeof overColor === 'string' ? overColor : overColor(d as number);
        d3.select(this).attr('fill', color);
      })
      .on('mouseout', function(d) {
        const color =
          typeof barColor === 'string' ? barColor : barColor(d as number);
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
        i * (width / data.length) + (width / data.length - barMargin) / 2
    )
    .attr('y', (d) => {
      const bias = d > tooltipThreshold ? 14 : -2;
      const transformedBarHeight =
        typeof barHeight === 'number'
          ? barHeight
          : typeof barHeight === 'string'
          ? parseInt(barHeight)
          : barHeight(d);
      return height - transformedBarHeight + bias;
    })
    .attr('font-family', fontFamily)
    .attr('font-size', (d) =>
      typeof fontSize === 'string' ? fontSize : fontSize(d)
    )
    .attr('fill', (d) =>
      d > tooltipThreshold
        ? typeof fontColorInsideBar === 'string'
          ? fontColorInsideBar
          : fontColorInsideBar(d)
        : typeof fontColorOutsideBar === 'string'
        ? fontColorOutsideBar
        : fontColorOutsideBar(d)
    )
    .attr('text-anchor', 'middle');
}
