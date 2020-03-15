/**
 * 搜索页面需要的数据
 * @author Wen Sun
 * @date 2020.03.15
 */

// 普通搜索
export interface BasicSearchData {
  keyword: string;
  page: number;
  startYear?: string; // 开始日期
  endYear?: string; // 结束日期
}

// 组合搜索
export interface AdvancedSearchData {
  author?: string; // 作者
  affiliation?: string; // 机构
  conferenceName?: string; // 会议
  keyword?: string; // 研究关键字
  page: number;
  startYear?: string; // 开始日期
  endYear?: string; // 结束日期
}
