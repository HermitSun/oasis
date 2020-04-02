/// <reference types="d3pie" />
import * as d3 from 'd3-selection';
import { arc, curveBasis, line } from 'd3-shape';
import {
  easeLinear,
  easeBounce,
  easeSin,
  easeElastic,
  easeBack,
  easeQuad,
  easeCircle,
  easeExp,
  easeCubicInOut
} from 'd3-ease';
import { interpolate } from 'd3-interpolate';
import { schemeCategory10 } from 'd3-scale-chromatic';

interface PieChartDatum {
  label: string;
  value: number;
  color?: string;
}
interface PieChartConfig {
  title: string;
  width: number;
  height: number;
}

const minimizedD3 = {
  ...d3,
  // hack for complete d3
  version: 'WenSun',
  // shape
  arc,
  line,
  curveBasis,
  // ease
  easeLinear,
  easeBounce,
  easeSin,
  easeElastic,
  easeBack,
  easeQuad,
  easeCircle,
  easeExp,
  easeCubicInOut,
  // interpolate
  interpolate
};

// mount to window if window exists
// used to handle Node env
if (typeof window !== 'undefined' && !window.d3) {
  window.d3 = minimizedD3;
}
let D3Pie: d3pie.ID3PieClass;

// do NOT support SSR
export function createPieChart(
  dom: string | HTMLElement,
  data: PieChartDatum[],
  config: PieChartConfig
) {
  // load d3pie here, only for the first time
  if (!D3Pie) {
    D3Pie = require('d3pie');
  }
  // random color if not specified
  data.forEach((d, i) => {
    d.color = d.color ? d.color : schemeCategory10[i % 10];
  });

  return new D3Pie(dom, {
    header: {
      title: {
        text: config.title,
        fontSize: 22,
        font: 'verdana'
      }
    },
    size: {
      canvasHeight: config.height,
      canvasWidth: config.width,
      pieOuterRadius: '88%'
    },
    data: {
      sortOrder: 'value-asc',
      content: data
    },
    labels: {
      outer: {
        pieDistance: 32
      },
      inner: {
        format: 'value'
      },
      mainLabel: {
        font: 'verdana'
      },
      value: {
        color: '#e1e1e1',
        font: 'verdana'
      },
      lines: {
        enabled: true,
        color: '#cccccc'
      },
      truncation: {
        enabled: true
      }
    },
    effects: {
      pullOutSegmentOnClick: {
        effect: 'linear',
        speed: 400,
        size: 8
      }
    }
  });
}
