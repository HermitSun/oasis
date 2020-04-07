/**
 * 搜索页的data，包括sync的和async的，用于类型推导
 * 目前并没有很好的方式去进行Vue instance的推导
 * @author WenSun
 * @date 2020.03.15
 */
import { SearchResponse } from '~/interfaces/responses/search/SearchResponse';
import { AdvancedSearchPayload } from '~/interfaces/requests/search/SearchPayload';
import { SearchFilterResponse } from '~/interfaces/responses/search/SearchFilterResponse';

interface AsyncSearchData {
  searchResponse: SearchResponse[];
  filters: SearchFilterResponse;
  resultCount: number;
}

export type SearchDataFromProp = {
  mode: 'basic' | 'advanced';
} & AdvancedSearchPayload;

interface SearchLocalData {
  searchContent: string;
  showAdvancedSearch: boolean;
  isLoading: boolean; // 是否正在加载
  isFetchingFilter: boolean; // 是否正在获取filter
  options: []; // sortKey Options
  isError: boolean; // time range
}

interface SearchFilterCheckedOptions {
  checkedAuthors: string[];
  checkedAffiliations: string[];
  checkedConferences: string[];
  checkedJournals: string[];
}

export type SearchPageComp = AsyncSearchData &
  SearchDataFromProp &
  SearchLocalData &
  SearchFilterCheckedOptions;
