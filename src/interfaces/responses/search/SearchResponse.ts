/**
 * 搜索返回值：普通搜索和高级搜索接口共用
 * @author Alexchanchic, Wen Sun
 * @date 2020.02.24
 * @update 2020.03.06
 */

export interface SearchResponse {
  id: string;
  title: string;
  authors: string[];
  _abstract: string; // 因为后端abstract是关键字，所以使用_abstract替代
  publicationYear: string;
  metrics: {
    citationCountPaper: number;
    citationCountPatent: number;
    totalDownloads: number;
  };
  keywords: string[];
  conferenceName: string;
  link: string;
}

export interface SearchFullResponse {
  papers: SearchResponse[];
  size: number;
}

// 搜索时展示的reference
export interface SearchReference {
  title: string;
  googleScholarLink: string;
}
