/**
 * 搜索页的data，包括sync的和async的，用于类型推导
 * 目前并没有很好的方式去进行Vue instance的推导
 * @author WenSun
 * @date 2020.03.15
 */
import { SearchResponse } from '~/interfaces/responses/search/SearchResponse';
import { AdvancedSearchPayload } from '~/interfaces/requests/search/SearchPayload';

interface AsyncSearchData {
  searchResponse: SearchResponse[];
  resultCount: number;
}

export type SearchDataFromProp = {
  mode: 'basic' | 'advanced';
} & AdvancedSearchPayload;

interface SearchLocalData {
  searchContent: string;
  showAdvancedSearch: boolean;
  isLoading: boolean; // 是否正在加载
  options: []; // sortKey Options
}

export type SearchPageComp = AsyncSearchData &
  SearchDataFromProp &
  SearchLocalData;
