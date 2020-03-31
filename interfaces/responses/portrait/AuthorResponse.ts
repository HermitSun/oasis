/**
 * 作者画像返回值
 * @author Alexchanchic
 * @date 2020.03.31
 */

export interface AuthorPortraitResponse {
  name: string; // 作者名字
  count: number; // 总论文数
  citation: number; // 总被引次数
  affiliation: string; // 所属机构
  citationTrend: number[]; // 被引用趋势
  publicationTrends: number[]; // 发论文趋势
}
