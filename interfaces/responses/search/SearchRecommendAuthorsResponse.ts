/**
 * 搜索推荐学者返回值
 * @author Wen Sun
 * @date 2020.07.30
 */

export interface AuthorInfo {
  authorId: string;
  authorName: string;
  affiliation: string; // 作者所属机构
  count: number; // 发论文总数
  citation: number; // 总被引用数
}

export interface SearchRecommendAuthorsResponse {
  authors: AuthorInfo[];
  size: number;
}
