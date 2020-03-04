/**
 * 状态码
 * @author WenSun
 * @date 2020.01.09
 */

/**
 * 网络通信的状态码
 */
export enum StatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  ERROR_STUDENT_LOGIN = 50001,
  ERROR_VALIDATE_CODE = 50002,
  VALIDATE_CODE_TIMEOUT = 50003,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  // 不知道为啥，403被这么拿来用了……草
  WRONG_PWD = 403,
  NO_SUCH_USER = 405
}

/**
 * 状态码对应的错误提示
 */
export enum ErrorMessage {
  OK = "请求成功",
  BAD_REQUEST = "参数错误",
  NOT_FOUND = "找不到内容",
  INTERNAL_SERVER_ERROR = "服务端错误",
  ERROR_STUDENT_LOGIN = "学号或密码错误",
  ERROR_VALIDATE_CODE = "验证码错误",
  VALIDATE_CODE_TIMEOUT = "验证码过期",
  BAD_GATEWAY = "网关错误",
  SERVICE_UNAVAILABLE = "服务不可用",
  GATEWAY_TIMEOUT = "网关超时"
}
