/**
 * 普通搜索二次筛选返回值
 * @author Alexchanchic
 * @date 2020.03.16
 */

interface FilterTag {
  name: string;
  count: number;
}

export interface SearchFilterResponse {
  authors: FilterTag[];
  affiliations: FilterTag[];
  conferences: FilterTag[];
  journals: FilterTag[];
}
