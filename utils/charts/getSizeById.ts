function getSizeById(id: string) {
  const div = document.getElementById(id);
  // 考虑组件不存在的情况
  return {
    width: div ? div.offsetWidth : 0,
    height: div ? div.offsetHeight : 0
  };
}
export default getSizeById;
