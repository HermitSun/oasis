/**
 * 搜索返回值：普通搜索和高级搜索接口共用
 * @author Alexchanchic
 * @date 2020.02.24
 */

export interface SearchResponse {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  publicationYear: string;
  metrics: {
    citationCountPaper: number;
    citationCountPatent: number;
    totalDownloads: number;
  };
  keywords: string[];
  references: Array<{
    title: string;
    googleScholarLink: string;
  }>;
  conferenceName: string;
  link: string;
}

export interface SearchFullResponse {
  papers: SearchResponse[];
  size: number;
}
