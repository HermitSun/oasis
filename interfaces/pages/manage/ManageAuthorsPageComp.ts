/**
 * 作者管理页的data，包括sync的和async的，用于类型推导
 * 目前并没有很好的方式去进行Vue instance的推导
 * @author WenSun
 * @date 2020.03.24
 */
import { AuthorInfo } from '~/interfaces/responses/manage/AuthorInfoResponse';

interface AsyncManageAuthorsData {
  authors: AuthorInfo[];
  resultCount: number;
}

export type ManageAuthorsDataFromProp = {};

export interface WaitToMergeAuthorInfo {
  name: string;
  id: string;
}

interface ManageAuthorsLocalData {
  page: number;
  waitToMerge: WaitToMergeAuthorInfo[];
  mergeDest: string;
  authorName: string;
  showSelectDestDialog: boolean;
}

export type ManageAuthorsPageComp = AsyncManageAuthorsData &
  ManageAuthorsDataFromProp &
  ManageAuthorsLocalData;
