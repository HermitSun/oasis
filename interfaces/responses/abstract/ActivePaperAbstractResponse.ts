/**
 * 活跃论文的返回值
 * @author WenSun
 * @date 2020.03.06
 * @update 2020.03.15
 */

export interface ActivePaperAbstractResponse {
  title: string;
  authors: string[];
  _abstract: string;
  link: string;
  publicationYear: number;
}
