/**
 * 活跃论文的返回值
 * @author WenSun
 * @date 2020.03.06
 * @update 2020.04.08
 */

export interface AuthorInfo {
  name: string;
  id: string;
}

export interface ActivePaperAbstractResponse {
  title: string;
  authors: AuthorInfo[];
  _abstract: string;
  link: string;
  publicationYear: number;
}
