export interface WordcloudDatum {
  name: string;
  value: number;
}

export function createWordCloud(
  selectorOrDOM: string | HTMLElement,
  data: WordcloudDatum[],
  placeholder: string = 'No Data in Recent Years'
) {
  // if (typeof window !== 'undefined') {
  //   require('echarts-wordcloud');
  // }
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
  const wordcloud = echarts.init(element);
  const option: any = {
    series: [
      {
        type: 'wordCloud',

        // The shape of the "cloud" to draw. Can be any polar equation represented as a
        // callback function, or a keyword present. Available presents are circle (default),
        // cardioid (apple or heart shape curve, the most known polar equation), diamond (
        // alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.

        shape: 'circle',

        // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
        // Default to be put in the center and has 75% x 80% size.

        left: 'center',
        top: 'center',
        width: '70%',
        height: '80%',
        right: null,
        bottom: null,

        // Text size range which the value in data will be mapped to.
        // Default to have minimum 12px and maximum 60px size.

        sizeRange: [12, 60],

        // Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45

        rotationRange: [-90, 90],
        rotationStep: 45,

        // size of the grid in pixels for marking the availability of the canvas
        // the larger the grid size, the bigger the gap between words.

        gridSize: 8,

        // set to true to allow word being draw partly outside of the canvas.
        // Allow word bigger than the size of the canvas to be drawn
        drawOutOfBound: false,

        // Global text style
        textStyle: {
          normal: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            // Color can be a callback function or a color string
            color() {
              // Random color
              return (
                'rgb(' +
                [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160)
                ].join(',') +
                ')'
              );
            }
          },
          emphasis: {
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        // Data is an array. Each array item must have name and value property.
        data
      }
    ]
  };
  wordcloud.setOption(option);
  // window.addEventListener('resize', function() {
  //   wordcloud.resize();
  // });
}
