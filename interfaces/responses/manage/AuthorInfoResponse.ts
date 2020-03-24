/**
 * 获取期刊信息的返回值
 * @author WenSun
 * @date 2020.03.24
 */

export interface AuthorInfoResponse {
  authorId: string;
  authorName: string;
  count: number; // 发论文总数
  citation: number; // 总被引用数
}
