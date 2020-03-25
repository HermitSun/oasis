/**
 * 获取会议信息的返回值
 * @author WenSun
 * @date 2020.03.24
 */

export interface ConferenceInfo {
  name: string;
}

export interface ConferenceInfoResponse {
  conferences: ConferenceInfo[];
  size: number;
}
