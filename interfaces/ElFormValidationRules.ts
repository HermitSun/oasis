/**
 * ElementUI的ElForm的表单验证接口
 * @author WenSun
 * @date 2020.03.25
 */

export interface ElFormValidationRule {
  trigger: string;
  validator?: ElFormValidationFunction;
  message?: string;
  required?: boolean;
  type?: string;
  min?: number;
  max?: number;
}

export type ElFormValidationFunction = (
  rule: string,
  value: string,
  callback: (error?: Error) => boolean
) => void;

export interface ElFormValidationRules {
  [key: string]: ElFormValidationRule | ElFormValidationRule[];
}
