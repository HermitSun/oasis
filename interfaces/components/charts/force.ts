/**
 * 关系图类型定义
 * @author WenSun
 * @date 2020.07.29
 */

export interface ForceChartData {
  nodes: ForceChartNode[];
  links: ForceChartLink[];
}

export interface ForceChartNode {
  id: string;
  name: string;
  citation: number;
  count: number;
  value: number;
}

export interface ForceChartLink {
  source: string;
  target: string;
  value: number;
}
