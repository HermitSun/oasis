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
  resultCount: number;
}

export type SearchDataFromProp = AdvancedSearchPayload;

interface SearchLocalData {
  isLoading: boolean; // 是否正在加载
  options: []; // sortKey Options
  filters: SearchFilterResponse;
  isError: boolean; // time range
  isFilter: boolean; // 是否正在过滤状态
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
