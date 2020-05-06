/**
 * 搜索返回值：作者论文详情排名
 * @author Alexchanchic
 * @date 2020.03.30
 */

export interface AuthorAdvancedRankingResponse {
  authorId: string;
  authorName: string;
  count: number; // 发论文总数
  citation: number; // 总被引用数
  publicationTrend: number[]; // 返回最近十年每年的发表论文数
}

export interface AuthorDetailRankingResponse {
  keywords: [
    {
      name: string; // 研究方向的名字
      value: number; // 研究方向出现次数
    }
  ];
  mostInfluentialPapers: [
    {
      publicationYear: number;
      title: string;
      publicationName: string;
      link: string;
    }
  ]; // 根据citation数 5个
  mostRecentPapers: [
    {
      publicationYear: number;
      title: string;
      publicationName: string;
      link: string;
    }
  ]; // 最近发表的论文 5个
}
