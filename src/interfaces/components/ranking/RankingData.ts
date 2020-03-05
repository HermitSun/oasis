/**
 * 排名接口传入的参数
 * @author Alexchanchic
 * @date 2020.02.24
 */
export type sortKey = "acceptanceCount" | "citationCount";

export interface RankingData {
  sortKey: sortKey;
  year: string;
}
