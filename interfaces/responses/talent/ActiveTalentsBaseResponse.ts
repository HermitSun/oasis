/**
 * 活跃人才库的返回值
 * @author Alexchanchic
 * @date 2020.05.20
 * @update 2020.05.20
 */

export interface ActiveTalentsBaseResponse {
  field: string; // 人才库的研究领域
  count: number; // 该领域的论文数
  experts: {
    authorId: string;
    authorName: string;
  }[]; // 学者名 5个
}
