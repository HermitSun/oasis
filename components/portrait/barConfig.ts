import { getClientWidth } from '~/utils/breakpoint';

function portraitBarConfig(portrait: HTMLElement, maxHeight: number) {
  const isMobile = getClientWidth() < 768;
  const chartWidth = isMobile ? getClientWidth() - 20 : 300;
  const chartHeight = isMobile ? 200 : portrait.offsetHeight - 50;
  return {
    width: chartWidth,
    height: chartHeight,
    barHeight: (d: number) =>
      maxHeight === 0 ? 0 : (d / maxHeight) * (chartHeight - 20),
    barMargin: 10,
    tooltipThreshold: maxHeight
  };
}
export default portraitBarConfig;
