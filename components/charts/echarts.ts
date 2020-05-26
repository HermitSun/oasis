// const hours = [
//   'learning (artificial intelligence)',
//   'Mathematical model',
//   'Feature extraction',
//   'feature extraction',
//   'Internet of Things',
//   'Task analysis',
//   'Training',
//   'Optimization',
//   'optimisation',
//   'Computational modeling'
// ];
// const days = [
//   '2019',
//   '2018',
//   '2017',
//   '2016',
//   '2015',
//   '2014',
//   '2013',
//   '2012',
//   '2011',
//   '2010'
// ];
// const data = [
//   [0, 0, 1540],
//   [1, 0, 1538],
//   [2, 0, 1051],
//   [3, 0, 633],
//   [4, 0, 475],
//   [5, 0, 223],
//   [6, 0, 72],
//   [7, 0, 520],
//   [8, 0, 482],
//   [9, 0, 7],
//   [0, 1, 950],
//   [1, 1, 1622],
//   [2, 1, 1550],
//   [3, 1, 1536],
//   [4, 1, 1369],
//   [5, 1, 747],
//   [6, 1, 166],
//   [7, 1, 1697],
//   [8, 1, 1848],
//   [9, 1, 7],
//   [0, 2, 871],
//   [1, 2, 1089],
//   [2, 2, 975],
//   [3, 2, 818],
//   [4, 2, 690],
//   [5, 2, 372],
//   [6, 2, 57],
//   [7, 2, 644],
//   [8, 2, 562],
//   [9, 2, 14],
//   [0, 3, 759],
//   [1, 3, 861],
//   [2, 3, 742],
//   [3, 3, 504],
//   [4, 3, 488],
//   [5, 3, 298],
//   [6, 3, 35],
//   [7, 3, 503],
//   [8, 3, 401],
//   [9, 3, 12],
//   [0, 4, 497],
//   [1, 4, 503],
//   [2, 4, 374],
//   [3, 4, 236],
//   [4, 4, 144],
//   [5, 4, 56],
//   [6, 4, 4],
//   [7, 4, 22],
//   [8, 4, 14],
//   [9, 4, 1],
//   [0, 5, 837],
//   [1, 5, 1091],
//   [2, 5, 154],
//   [3, 5, 0],
//   [4, 5, 0],
//   [5, 5, 0],
//   [6, 5, 0],
//   [7, 5, 0],
//   [8, 5, 0],
//   [9, 5, 0],
//   [0, 6, 832],
//   [1, 6, 1014],
//   [2, 6, 911],
//   [3, 6, 658],
//   [4, 6, 586],
//   [5, 6, 356],
//   [6, 6, 60],
//   [7, 6, 709],
//   [8, 6, 729],
//   [9, 6, 17],
//   [0, 7, 742],
//   [1, 7, 938],
//   [2, 7, 988],
//   [3, 7, 883],
//   [4, 7, 758],
//   [5, 7, 433],
//   [6, 7, 107],
//   [7, 7, 993],
//   [8, 7, 769],
//   [9, 7, 4],
//   [0, 8, 731],
//   [1, 8, 786],
//   [2, 8, 729],
//   [3, 8, 543],
//   [4, 8, 536],
//   [5, 8, 320],
//   [6, 8, 85],
//   [7, 8, 664],
//   [8, 8, 506],
//   [9, 8, 6],
//   [0, 9, 589],
//   [1, 9, 870],
//   [2, 9, 757],
//   [3, 9, 730],
//   [4, 9, 740],
//   [5, 9, 389],
//   [6, 9, 114],
//   [7, 9, 987],
//   [8, 9, 951],
//   [9, 9, 16]
// ];
export function Echarts3DBarOption(
  xAxis3D: Array<string>,
  yAxis3D: Array<Number>,
  zAxis3D: Array<Array<number>>
) {
  const option = {
    tooltip: {},
    visualMap: [
      {
        max: 1500,
        inRange: {
          color: [
            '#313695',
            '#4575b4',
            '#74add1',
            '#abd9e9',
            '#e0f3f8',
            '#ffffbf',
            '#fee090',
            '#fdae61',
            '#f46d43',
            '#d73027',
            '#a50026'
          ]
        }
      }
    ],
    xAxis3D: {
      type: 'category',
      data: xAxis3D
    },
    yAxis3D: {
      type: 'category',
      data: yAxis3D
    },
    zAxis3D: {
      type: 'value'
    },
    grid3D: {
      boxWidth: 200,
      boxDepth: 80,
      viewControl: {
        // projection: 'orthographic'
      },
      light: {
        main: {
          intensity: 1.2,
          shadow: true
        },
        ambient: {
          intensity: 0.3
        }
      }
    },
    series: [
      {
        type: 'bar3D',
        data: zAxis3D.map(function(item) {
          return {
            value: [item[1], item[0], item[2]]
          };
        }),
        shading: 'lambert',

        label: {
          textStyle: {
            fontSize: 16,
            borderWidth: 1
          }
        },

        emphasis: {
          label: {
            textStyle: {
              fontSize: 20,
              color: '#900'
            }
          },
          itemStyle: {
            color: '#900'
          }
        }
      }
    ]
  };
  return option;
}
