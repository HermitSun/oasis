/**
 * 作者画像返回值
 * @author Alexchanchic, WenSun
 * @date 2020.03.31
 * @update 2020.07.29
 */
import { ForceChartData } from '~/interfaces/components/charts/force';

export interface AuthorPortraitResponse {
  name: string; // 作者名字
  count: number; // 总论文数
  citation: number; // 总被引次数
  affiliation: string; // 所属机构
  citationTrend: number[]; // 被引用趋势
  publicationTrends: number[]; // 发论文趋势
}

export type AcademicRelationResponse = ForceChartData;
