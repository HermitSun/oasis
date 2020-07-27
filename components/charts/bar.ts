/**
 * 柱状图
 * 从目前的实现看，也许叫条形图更合适
 * @author Alexchanchic, WenSun
 * @date 2020.03.29
 * @update 2020.04.03
 */
type BarChartDatum = number;

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
