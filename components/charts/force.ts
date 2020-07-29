export function createForceChart(
  selectorOrDOM: string | HTMLElement,
  { nodes, links }: any
) {
  const element =
    typeof selectorOrDOM === 'string'
      ? document.getElementById(selectorOrDOM)
      : selectorOrDOM;
  // target DOM element not found
  if (!element) {
    throw new Error('element not found');
  }
  // render
  const force = echarts.init(element);
  const options = {
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    label: {
      normal: {
        show: true,
        textStyle: {
          fontSize: 10
        }
      }
    },
    tooltip: {
      formatter(item: any) {
        return `
<p>Name: ${item.data.name}</p>
<p>Citation: ${item.data.citation}</p>
<p>Acceptance: ${item.data.count}</p>
`;
      }
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        animation: false, // 是否开启动画
        force: {
          gravity: 1, // 节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
          edgeLength: 100, // 边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
          repulsion: 500,
          layoutAnimation: false
        },
        focusNodeAdjacency: true,
        roam: true,
        draggable: true,
        symbolSize: (val: number) => {
          return Math.min(val, 20);
        },
        // categories
        edgeSymbol: ['none', 'arrow'],
        edgeSymbolSize: [1, 10],
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
          borderColor: '#fff', // 节点边框背景色白色
          borderWidth: 1,
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.3)'
        },
        data: nodes,
        links,
        lineStyle: {
          normal: {
            opacity: 0.9,
            width: 1,
            curveness: 0.3,
            color: 'source'
          }
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
  force.setOption(options);
  // window.addEventListener('resize', function() {
  //   force.resize();
  // });
  // return force;
}
