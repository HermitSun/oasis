/**
 * 搜索推荐机构返回值
 * @author Wen Sun
 * @date 2020.07.30
 */

export interface AffiliationInfo {
  name: string; // 机构名称
}

export interface SearchRecommendAffiliationsResponse {
  affiliations: AffiliationInfo[];
  size: number;
}
