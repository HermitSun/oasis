export {};

declare global {
  // extends window
  interface Window {
    echarts: any;
  }
  // directly used global vars
  const echarts: any;
}
