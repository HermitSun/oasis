/**
 * 窗口大小的阈值，以及判断设备类型的粗略方法
 * @author WenSun
 * @date 2020.03.18
 */

// 选项，用于自定义新的阈值和滚动条宽度
interface BreakpointOptions {
  thresholds?: {
    [threshold: string]: number;
  };
  scrollBarWidth?: number;
}

export function getClientWidth() {
  return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}

export function getClientHeight() {
  return Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
}

// 获取窗口大小的阈值
export function getBreakpoints(options: BreakpointOptions = {}) {
  const thresholds = {
    xs: 600,
    sm: 960,
    md: 1280,
    lg: 1920,
    ...options.thresholds
  };
  const scrollBarWidth = options.scrollBarWidth || 16;

  const height = getClientHeight();
  const width = getClientWidth();
  const xs = width < thresholds.xs;
  const sm = width < thresholds.sm && !xs;
  const md = width < thresholds.md - scrollBarWidth && !(sm || xs);
  const lg = width < thresholds.lg - scrollBarWidth && !(md || sm || xs);
  const xl = width >= thresholds.lg - scrollBarWidth;

  return {
    width,
    height,
    xs,
    sm,
    md,
    lg,
    xl,
    smAndDown: (xs || sm) && !(md || lg || xl),
    smAndUp: !xs && (sm || md || lg || xl),
    mdAndDown: (xs || sm || md) && !(lg || xl),
    mdAndUp: !(xs || sm) && (md || lg || xl),
    lgAndDown: (xs || sm || md || lg) && !xl,
    lgAndUp: !(xs || sm || md) && (lg || xl)
  };
}

export function isPC() {
  return getBreakpoints().mdAndUp;
}

export function isMobile() {
  return getBreakpoints().xs;
}
