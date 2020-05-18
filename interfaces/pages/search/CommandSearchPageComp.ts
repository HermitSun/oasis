/**
 * 命令搜索页的data，包括sync的和async的，用于类型推导
 * just copy 孙哥的写法
 * @author Alexchanchic
 * @date 2020.05.18
 */
import { SearchResponse } from '~/interfaces/responses/search/SearchResponse';
import { CommandSearchPayload } from '~/interfaces/requests/search/SearchPayload';

interface AsyncCommandSearchData {
  searchResponse: SearchResponse[];
  resultCount: number;
}

export type CommandSearchDataFromProp = Required<CommandSearchPayload>;

interface CommandSearchLocalData {
  searchContent: string;
  isLoading: boolean; // 是否正在加载
  showCommandSearch: boolean;
}

export type CommandSearchPageComp = AsyncCommandSearchData &
  CommandSearchDataFromProp &
  CommandSearchLocalData;
