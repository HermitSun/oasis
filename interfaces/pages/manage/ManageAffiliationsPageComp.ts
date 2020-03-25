/**
 * 机构管理页的data，包括sync的和async的，用于类型推导
 * 目前并没有很好的方式去进行Vue instance的推导
 * @author WenSun
 * @date 2020.03.24
 */
import { AffiliationInfo } from '~/interfaces/responses/manage/AffiliationInfoResponse';

interface AsyncManageAffiliationsData {
  affiliations: AffiliationInfo[];
  resultCount: number;
}

export type ManageAffiliationsDataFromProp = {};

export interface WaitToMergeAffiliationInfo {
  name: string;
  id: string; // 此处的ID和name是相同的
}

interface ManageAffiliationsLocalData {
  page: number;
  waitToMerge: WaitToMergeAffiliationInfo[];
  mergeDest: string;
  affiliationName: string;
  showSelectDestDialog: boolean;
}

export type ManageAffiliationsPageComp = AsyncManageAffiliationsData &
  ManageAffiliationsDataFromProp &
  ManageAffiliationsLocalData;
