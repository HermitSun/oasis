import * as D3 from 'd3';

declare global {
  interface Window {
    d3: D3;
  }
  const d3: D3;
}
