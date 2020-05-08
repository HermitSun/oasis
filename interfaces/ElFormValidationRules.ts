/**
 * ElementUI的ElForm的表单验证接口
 * @author WenSun
 * @date 2020.03.25
 * @update 2020.05.08
 */

export interface ElFormValidationRule<T = string> {
  trigger: string;
  validator?: ElFormValidationFunction<T>;
  message?: string;
  required?: boolean;
  type?: string;
  min?: number;
  max?: number;
}

export type ElFormValidationFunction<T = string> = (
  rule: string,
  value: T,
  callback: (error?: Error) => boolean
) => void;

export interface ElFormValidationRules {
  [key: string]:
    | ElFormValidationRule<unknown>
    | ElFormValidationRule<unknown>[];
}
