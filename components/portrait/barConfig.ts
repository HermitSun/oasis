import { getClientWidth } from '~/utils/breakpoint';

function portraitBarConfig(portrait: HTMLElement) {
  const isMobile = getClientWidth() < 768;
  return {
    width: isMobile ? getClientWidth() - 20 : 300,
    height: isMobile ? 200 : portrait.offsetHeight - 50,
    barMargin: 10,
    tooltipThreshold: 15
  };
}
export default portraitBarConfig;
