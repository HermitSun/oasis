/// <reference types="d3" />
/// <reference types="echarts" />

export {};

declare global {
  // extends window
  interface Window {
    d3: d3;
    echarts: echarts;
  }
  // directly used global vars
  const d3: d3;
  const echarts: echarts;
}
