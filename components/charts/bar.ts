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
  data: BarChartDatum[],
  endYear = new Date().getFullYear(),
  range = 10,
  placeholder: string = `No Data in Recent ${range} Years`
) {
  const element =
    typeof selectorOrDOM === 'string'
      ? document.getElementById(selectorOrDOM)
      : selectorOrDOM;
  // target DOM element not found
  if (!element) {
    throw new Error('element not found');
  }
  // 数据为空或全为0
  const isDataEmpty = data.length === 0 || !data.some((datum) => datum !== 0);
  if (isDataEmpty) {
    element.innerHTML = `<span style="color: #909399">${placeholder}</span>`;
    return;
  }
  // render
  const bar = echarts.init(element);
  // 经评估，使用循环大致能快50-1000倍，取决于浏览器
  const barXAxis = [];
  for (let i = endYear - range + 1; i <= endYear; ++i) {
    barXAxis.push(i);
  }
  const option: any = {
    xAxis: {
      data: barXAxis,
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
  // window.addEventListener('resize', function() {
  //   bar.resize();
  // });
}
