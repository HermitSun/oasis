/**
 * echarts实现饼状图
 */
export interface PieChartDatum {
  label: string;
  value: number;
  color?: string;
}

export function createPieChart(
  selectorOrDOM: string | HTMLElement,
  data: PieChartDatum[],
  placeholder: string = 'No Data in Recent Years'
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
  const isDataEmpty =
    data.length === 0 || !data.some((datum) => datum.value !== 0);
  if (isDataEmpty) {
    element.innerHTML = `<span style="color: #909399">${placeholder}</span>`;
    return;
  }
  // render
  const pie = echarts.init(element);
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
  // window.addEventListener('resize', function() {
  //   pie.resize();
  // });
}
