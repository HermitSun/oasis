/**
 * 获取期刊信息的返回值
 * @author WenSun
 * @date 2020.03.24
 */

export interface AuthorInfo {
  authorId: string;
  authorName: string;
  affiliation: string; // 所属机构
  count: number; // 发论文总数
  citation: number; // 总被引用数
}

export interface AuthorInfoResponse {
  authors: AuthorInfo[];
  size: number;
}
