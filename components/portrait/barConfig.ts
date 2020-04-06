import { getClientWidth } from '~/utils/breakpoint';

function portraitBarConfig(portrait: HTMLElement, maxHeight: number) {
  const isMobile = getClientWidth() < 768;
  console.log(maxHeight);
  return {
    width: isMobile ? getClientWidth() - 20 : 300,
    height: isMobile ? 200 : portrait.offsetHeight - 50,
    barHeight: (d: number) => (maxHeight === 0 ? 0 : (d / maxHeight) * 200),
    barMargin: 10,
    tooltipThreshold: 15
  };
}
export default portraitBarConfig;
