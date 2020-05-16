/**
 * 排名接口传入的参数
 * @author Alexchanchic
 * @date 2020.02.24
 */
export type sortKey = 'acceptanceCount' | 'citationCount';

export interface RankingBasicPayload {
  sortKey: sortKey;
  year: number;
}

export interface RankingAdvancedPayload {
  sortKey: sortKey;
  startYear: number;
  endYear: number;
}

export interface KeywordRankingAdvancedPayload extends RankingAdvancedPayload {
  keyword: string;
}
