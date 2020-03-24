/**
 * 获取期刊信息的返回值
 * @author WenSun
 * @date 2020.03.24
 */

interface JournalInfo {
  name: string;
}

export interface JournalInfoResponse {
  journals: JournalInfo[];
  size: number;
}
