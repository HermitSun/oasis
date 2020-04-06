/**
 * 获取元素相对于document顶部的距离
 * @author WenSun
 * @date 2020.04.06
 */

export function getElementLocation(elem: Element) {
  const location = elem.getBoundingClientRect();
  // 绝对位置
  return {
    x: location.left + document.documentElement.scrollLeft,
    y: location.top + document.documentElement.scrollTop
  };
}
