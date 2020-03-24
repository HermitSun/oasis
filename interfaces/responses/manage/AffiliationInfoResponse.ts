/**
 * 获取机构信息的返回值
 * @author WenSun
 * @date 2020.03.24
 */

interface AffiliationInfo {
  name: string; // 机构名称
}

export interface AffiliationInfoResponse {
  affiliations: AffiliationInfo[];
  size: number;
}
