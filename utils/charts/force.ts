import * as d3 from 'd3-selection';
import 'd3-transition';
import * as force from 'd3-force';
import { drag as d3Drag } from 'd3-drag';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import {
  Selection,
  SimulationNodeDatum,
  SimulationLinkDatum,
  Simulation,
  ValueFn
} from 'd3';

export interface ForceGraphNode extends SimulationNodeDatum {
  id: string;
  [key: string]: any;
}
export interface ForceGraphLink extends SimulationLinkDatum<ForceGraphNode> {
  [key: string]: any;
}
export interface ForceGraphData {
  nodes: ForceGraphNode[];
  links: ForceGraphLink[];
}

type D3CallbackFn<T, R = string | number> = ValueFn<Element, T, R>;
type D3SelectionElement<T> = T extends Selection<
  infer _,
  infer T2,
  infer T3,
  infer T4
>
  ? Selection<Element, T2, T3, T4>
  : T;
type TooltipFn<T> = (data: T) => string;

interface ForceGraphOptions {
  width: number;
  height: number;
  linkColor?: string;
  linkOpacity?: number;
  linkWidth?: number | D3CallbackFn<ForceGraphLink>;
  nodeBorderColor?: string;
  nodeBorderWidth?: number;
  nodeRadius?: number | D3CallbackFn<ForceGraphNode>;
  nodeColor?: string | D3CallbackFn<ForceGraphNode>;
  tooltip?: D3CallbackFn<ForceGraphNode, string>; // 目前直接返回HTML模板的实现不安全
  draggable?: boolean;
}

export function createForceGraph(
  data: ForceGraphData,
  options: ForceGraphOptions
) {
  // 默认颜色
  const scale = scaleOrdinal(schemeCategory10);
  const groupByColor = (d: ForceGraphNode) =>
    scale(d.group ? d.group : Math.random() * 10);

  // 配置项（包括默认值）
  const config = {
    linkColor: '#999',
    linkOpacity: 0.6,
    linkWidth: (d: ForceGraphLink) =>
      d.value ? Math.sqrt(d.value) : Math.random(),
    nodeBorderColor: '#fff',
    nodeBorderWidth: 1.5,
    nodeRadius: 5,
    nodeColor: groupByColor,
    draggable: false,
    ...options
  };

  // 拖拽逻辑
  const drag = (simulation: Simulation<ForceGraphNode, ForceGraphLink>) => {
    function dragStarted(d: ForceGraphNode) {
      if (!d3.event.active) {
        simulation.alphaTarget(0.3).restart();
      }
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d: ForceGraphNode) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragEnded(d: ForceGraphNode) {
      if (!d3.event.active) {
        simulation.alphaTarget(0);
      }
      d.fx = null;
      d.fy = null;
    }

    return d3Drag<Element, ForceGraphNode>()
      .on('start', dragStarted)
      .on('drag', dragged)
      .on('end', dragEnded);
  };

  // tooltip
  // 暂时没想好怎么配置tooltip的内容，先放着
  const tooltip = d3
    .select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

  // 力导向图的配置
  // 其中大部分的断言只是为了符合D3的类型声明，并不符合逻辑
  // 辣鸡D3
  const simulation = force
    .forceSimulation(data.nodes)
    .force(
      'link',
      force.forceLink(data.links).id((d: any) => d.id)
    )
    .force('charge', force.forceManyBody())
    .force('center', force.forceCenter(options.width / 2, options.height / 2));

  const svg = d3
    .create('svg')
    .attr('viewBox', `0,0,${options.width},${options.height}`);

  const link = svg
    .append('g')
    .attr('stroke', config.linkColor)
    .attr('stroke-opacity', config.linkOpacity)
    .selectAll('line')
    .data(data.links)
    .join('line')
    .attr('stroke-width', config.linkWidth as number);

  const node = svg
    .append('g')
    .attr('stroke', config.nodeBorderColor)
    .attr('stroke-width', config.nodeBorderWidth)
    .selectAll('circle')
    .data(data.nodes)
    .join('circle')
    .attr('r', config.nodeRadius as number)
    .attr('fill', config.nodeColor as string);

  // 配置tooltip内容
  if (options.tooltip) {
    node
      .on('mouseover', (d) => {
        // 也许会存在安全问题，但是这里不构成大问题，因为相当于是私有方法
        const tooltipHTML = (options.tooltip as TooltipFn<ForceGraphNode>)(d);
        // 渐变效果
        tooltip
          .transition()
          .duration(500)
          .style('opacity', 0.9);
        tooltip
          .html(tooltipHTML)
          .style('position', 'absolute')
          .style('left', d.x + 'px')
          .style('top', d.y + 'px')
          .style('cursor', 'default')
          .style('user-select', 'none');
      })
      .on('mouseout', (_) => {
        tooltip.style('opacity', 0);
      });
  }

  // 是否可拖拽
  if (config.draggable) {
    (node as D3SelectionElement<typeof node>).call(drag(simulation));
  }

  // 引导
  simulation.on('tick', () => {
    link
      .attr('x1', (d) => (d.source as ForceGraphNode).x as number)
      .attr('y1', (d) => (d.source as ForceGraphNode).y as number)
      .attr('x2', (d) => (d.target as ForceGraphNode).x as number)
      .attr('y2', (d) => (d.target as ForceGraphNode).y as number);

    node.attr('cx', (d) => d.x as number).attr('cy', (d) => d.y as number);
  });

  return svg.node() as SVGSVGElement;
}
