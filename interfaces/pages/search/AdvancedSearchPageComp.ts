/**
 * 高级搜索页的data，包括sync的和async的，用于类型推导
 * 目前并没有很好的方式去进行Vue instance的推导
 * @author WenSun
 * @date 2020.05.01
 */
import { SearchResponse } from '~/interfaces/responses/search/SearchResponse';
import { AdvancedSearchPayload } from '~/interfaces/requests/search/SearchPayload';

interface AsyncAdvancedSearchData {
  searchResponse: SearchResponse[];
  resultCount: number;
}

export type AdvancedSearchDataFromProp = Required<AdvancedSearchPayload>;

interface AdvancedSearchLocalData {
  searchContent: string;
  isLoading: boolean; // 是否正在加载
  showAdvancedSearch: boolean;
  options: []; // sortKey Options
}

export type AdvancedSearchPageComp = AsyncAdvancedSearchData &
  AdvancedSearchDataFromProp &
  AdvancedSearchLocalData;
