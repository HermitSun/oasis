import {
  EChartsNode,
  ForceChartData,
  ForceChartNode
} from '~/interfaces/components/charts/force';

export interface EchartsItem<T> {
  dataType: string;
  data: T;
}

export function getEchartsForceOption({ nodes, links }: ForceChartData) {
  nodes.sort((nodeA, nodeB) => nodeB.citation - nodeA.citation);

  const colorList =
    nodes.length > 10
      ? ['#9E87FF', '#73ACFF', '#FD866A', '#FDD56A']
      : ['#9E87FF'];
  const indexList = Array.from(new Array(colorList.length + 1).keys())
    .slice(1)
    .reverse();
  return {
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    label: {
      show: true,
      textStyle: {
        fontSize: 10
      }
    },
    tooltip: {
      formatter(item: EchartsItem<EChartsNode>) {
        if (item.dataType === 'node') {
          return `
          <div>
            <p>Name: ${item.data.name}</p>
            <p>Citation: ${item.data.citation}</p>
            <p>Acceptance: ${item.data.count}</p>
          </div>`;
        }
      }
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        animation: false, // 是否开启动画
        force: {
          gravity: 1, // 节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
          edgeLength: 80, // 边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
          repulsion: 500,
          layoutAnimation: false
        },
        focusNodeAdjacency: true,
        roam: true,
        draggable: true,
        symbolSize: (value: number, params: any) => {
          // return Math.min(Math.max(val, 10), 40);
          console.log(value);
          const index = Math.round(
            (params.dataIndex / nodes.length) * (colorList.length - 1)
          );
          return nodes.length > 10 ? indexList[index] * 12 : 40;
        },
        // categories
        edgeSymbol: ['none', 'arrow'],
        edgeSymbolSize: [1, 5],
        label: {
          normal: {
            show: true,
            textStyle: {
              fontSize: 10
            }
          },
          position: 'right'
        },
        itemStyle: {
          color: (params: any) =>
            colorList[
              Math.round(
                (params.dataIndex / nodes.length) * (colorList.length - 1)
              )
            ],
          borderColor: '#fff', // 节点边框背景色白色
          borderWidth: 1,
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.3)'
        },
        data: nodes.map((node: ForceChartNode, index: number) => {
          const percent = Math.round(
            (index / nodes.length) * (colorList.length - 1)
          );
          return {
            ...node,
            label: {
              show:
                (percent !== colorList.length - 1 &&
                  percent !== colorList.length - 2) ||
                nodes.length <= 10,
              formatter: (item: EchartsItem<EChartsNode>) =>
                item.data.name.split(' ').join('\n')
            }
          };
        }),
        links,
        lineStyle: {
          opacity: 0.9,
          width: 0.5,
          curveness: 0.3,
          color: 'target'
        },
        emphasis: {
          // 高亮的图形样式
          lineStyle: {
            width: 2
          }
        }
      }
    ]
  };
}
export function createForceChart(
  selectorOrDOM: string | HTMLDivElement | HTMLCanvasElement,
  { nodes, links }: ForceChartData
) {
  const element =
    typeof selectorOrDOM === 'string'
      ? (document.getElementById(selectorOrDOM) as
          | HTMLDivElement
          | HTMLCanvasElement)
      : selectorOrDOM;
  // target DOM element not found
  if (!element) {
    throw new Error('element not found');
  }
  // render
  const force = echarts.init(element);

  force.setOption(getEchartsForceOption({ nodes, links }));
  // window.addEventListener('resize', function() {
  //   force.resize();
  // });
  return force;
}
