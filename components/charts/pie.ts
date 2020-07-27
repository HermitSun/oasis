/**
 * echarts实现饼状图
 */
import { PieChartDatum } from '~/components/charts/pieD3';

export function createPieChart(
  selectorOrDOM: string | HTMLElement,
  data: PieChartDatum[]
) {
  const pie = echarts.init(
    document.getElementById(selectorOrDOM as string) as any
  );
  const colorList = [
    '#9E87FF',
    '#73ACFF',
    '#58D5FF',
    '#73DDFF',
    '#FDD56A',
    '#FDB36A',
    '#FD866A'
  ];
  const option: any = {
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['24%', '45%'],
        clockwise: true,
        avoidLabelOverlap: true,
        hoverOffset: 15,
        itemStyle: {
          normal: {
            color: (params: any) => colorList[params.dataIndex]
          }
        },
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}：{c}'
        },
        labelLine: {
          normal: {
            length: 20,
            length2: 30,
            lineStyle: {
              width: 1
            }
          }
        },
        data: data.map((item: any) => ({
          name: item.label,
          value: item.value
        }))
      }
    ]
  };
  pie.setOption(option);
  window.addEventListener('resize', function() {
    pie.resize();
  });
}
