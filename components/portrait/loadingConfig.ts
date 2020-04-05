function loadingConfig(ele: HTMLElement) {
  return {
    target: ele,
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.1)'
  };
}
export default loadingConfig;
