function getSizeById(id: string) {
  const div = document.getElementById(id) as HTMLElement;
  return {
    width: div.offsetWidth,
    height: div.offsetHeight
  };
}
export default getSizeById;
