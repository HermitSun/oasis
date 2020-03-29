/**
 * 机构画像返回值
 * @author Alexchanchic
 * @date 2020.03.28
 */

export interface AffiliationPortraitResponse {
  count: number; // 总论文数
  citation: number; // 总被引次数
  authorNum: number; // 作者数
  citationTrend: number[]; // 被引用趋势
  publicationTrends: number[]; // 发论文趋势
}
