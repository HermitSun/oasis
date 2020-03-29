/**
 * 会议管理页的data，包括sync的和async的，用于类型推导
 * 目前并没有很好的方式去进行Vue instance的推导
 * @author WenSun
 * @date 2020.03.25
 */
import { ConferenceInfo } from '~/interfaces/responses/manage/ConferenceInfoResponse';

interface AsyncManageConferencesData {
  conferences: ConferenceInfo[];
  resultCount: number;
}

export type ManageConferencesDataFromProp = {};

interface ManageConferencesLocalData {
  page: number;
  conferenceName: string;
  showUpdateDialog: boolean;
  waitToUpdateName: string;
  updateDestName: string;
}

export type ManageConferencesPageComp = AsyncManageConferencesData &
  ManageConferencesDataFromProp &
  ManageConferencesLocalData;
