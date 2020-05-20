/**
 * ElementUI的ElOption的类型
 * @author WenSun
 * @date 2020.04.05
 */

export interface ElOption<T = string> {
  label: string; // 显示的值
  value: T; // 实际的值
}
