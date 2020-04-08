function loadingConfig(ele: HTMLElement | string) {
  return {
    target: ele,
    lock: true,
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.1)'
  };
}
export default loadingConfig;
