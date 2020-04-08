import { getClientWidth } from '~/utils/breakpoint';

function portraitBarConfig(portrait: HTMLElement, maxHeight: number) {
  const isMobile = getClientWidth() < 768;
  const chartHeightPC = portrait.offsetHeight - 50;
  return {
    width: isMobile ? getClientWidth() - 20 : 300,
    height: isMobile ? 200 : chartHeightPC,
    barHeight: (d: number) =>
      maxHeight === 0 ? 0 : (d / maxHeight) * chartHeightPC,
    barMargin: 10,
    tooltipThreshold: 15
  };
}
export default portraitBarConfig;
