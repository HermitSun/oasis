/**
 * 排名页面的数据
 * @author Wen Sun
 * @date 2020.03.15
 */
export type sortKey = 'acceptanceCount' | 'citationCount';

export interface RankingData {
  sortKey: sortKey;
  year: string;
}
