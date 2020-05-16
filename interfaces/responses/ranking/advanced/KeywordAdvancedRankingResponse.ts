/**
 * 研究方向详情排名
 * @author Alexchanchic
 * @date 2020.05.05
 */

export interface KeywordAdvancedRankingResponse {
  keyword: string;
  count: number; // 发论文总数
  citation: number; // 总被引用数
  authorNum: number;
  publicationTrend: number[]; // 返回最近十年每年的发表论文数
  mostInfluentialPapers: {
    publicationYear: number;
    title: string;
    publicationName: string;
    link: string;
  }[]; // 根据citation数 5个
}

export interface KeywordDetailRankingResponse {
  publicationTrend: number[]; // 返回最近十年每年的发表论文数
  mostInfluentialPapers: [
    {
      publicationYear: number;
      title: string;
      publicationName: string;
      link: string;
    }
  ]; // 根据citation数 5个
}
