/**
 * 搜索接口传入的参数
 * @author Alexchanchic
 * @date 2020.02.24
 */

// 普通搜索
export interface BasicSearchData {
  keyword: string;
  page: number;
}

// 组合搜索
export interface AdvancedSearchData {
  author?: string; // 作者
  affiliation?: string; // 机构
  conferenceName?: string; // 会议
  keyword?: string; // 研究关键字
  page: number;
}
