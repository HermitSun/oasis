/**
 * 公共基础模块
 * @author WenSun
 * @date 2020.01.10
 * @update 2020.02.04
 * @update 2020.03.22
 */

interface BasicResponseWrapper<T = undefined> {
  code: number; // 状态码
  msg: string; // 额外返回的信息
  data: T; // 接口返回的数据部分
}

export type BasicResponse<T> = BasicResponseWrapper<T> & object;
