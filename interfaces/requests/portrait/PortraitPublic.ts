/**
 * 画像下的公用参数
 * @author Alexchanchic
 * @date 2020.03.28
 */

type sortKey = 'recent' | 'early' | 'citation';

export interface PageAndSortKey {
  page: number;
  sortKey: sortKey;
}
