/**
 * 论文管理页的data，包括sync的和async的，用于类型推导
 * 目前并没有很好的方式去进行Vue instance的推导
 * @author WenSun
 * @date 2020.03.25
 */
import { SearchResponse } from '~/interfaces/responses/search/SearchResponse';

export interface PaperInfo extends SearchResponse {
  readonly metrics: SearchResponse['metrics'];
}

// 覆盖父接口的类型，针对界面显示做了调整
export interface PaperFrom extends Omit<PaperInfo, 'authors' | 'keywords'> {
  authors: string;
  keywords: string;
}

interface AsyncManagePapersData {
  papers: PaperInfo[];
  resultCount: number;
}

export type ManagePapersDataFromProp = {};

interface ManagePapersLocalData {
  page: number;
  paperTitle: string;
  showUpdateDialog: boolean;
  paperWaitToUpdate: PaperInfo;
}

export type ManagePapersPageComp = AsyncManagePapersData &
  ManagePapersDataFromProp &
  ManagePapersLocalData;
