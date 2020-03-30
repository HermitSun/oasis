/**
 * 搜索返回值：机构论文详情排名
 * @author Alexchanchic
 * @date 2020.03.30
 */

export interface AffiliationAdvancedRankingResponse {
  affiliationId: string;
  affiliationName: string; // 机构名
  count: number; // 发论文总数
  citation: number; // 总被引用数
  authorNum: number; // 作者数
}

export interface AffiliationDetailRankingResponse {
  publicationTrend: number[]; // 返回最近十年每年的发表论文数
  keywords: [
    {
      name: string; // 研究方向的名字
      value: number; // 研究方向出现次数
    }
  ];
}
