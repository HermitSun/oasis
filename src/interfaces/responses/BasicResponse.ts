/**
 * 公共基础模块
 * @author WenSun
 * @date 2020.01.10
 * @update 2020.02.04
 */

export interface BasicResponse<T = undefined> {
  /**
   * 状态码
   */
  code: number;
  /**
   * 额外返回的信息
   */
  msg: string;
  /**
   * 接口返回的数据部分
   */
  data: T;
}
