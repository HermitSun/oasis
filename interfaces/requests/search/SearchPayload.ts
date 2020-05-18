/**
 * 搜索接口传入的参数
 * @author Alexchanchic, Wen Sun
 * @date 2020.02.24
 * @update 2020.03.16
 */

export type sortKey = 'recent' | 'early' | 'citation' | 'related';

// 普通搜索
export interface BasicSearchPayload {
  keyword: string;
  page: number;
  sortKey: sortKey;
}

// 二次搜索
export interface FilterSearchPayload {
  keyword?: string; // 泛用关键字
  author?: string; // 作者
  affiliation?: string; // 机构
  publicationName?: string; // 会议
  page: number;
  startYear?: number; // 开始日期
  endYear?: number; // 结束日期
  sortKey: sortKey;
}

// 组合搜索
export interface AdvancedSearchPayload {
  keyword?: string; // 泛用关键字
  author?: string; // 作者
  affiliation?: string; // 机构
  publicationName?: string; // 会议
  field?: string; // 研究关键字
  page: number;
  startYear?: number; // 开始日期
  endYear?: number; // 结束日期
  sortKey: sortKey;
}

// 命令搜索
export interface CommandSearchPayload {
  query: string;
  // sortKey: sortKey;
  page: number;
}
