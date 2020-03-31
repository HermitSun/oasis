/**
 * 期刊管理页的data，包括sync的和async的，用于类型推导
 * 目前并没有很好的方式去进行Vue instance的推导
 * @author WenSun
 * @date 2020.03.25
 */
import { JournalInfo } from '~/interfaces/responses/manage/JournalInfoResponse';

interface AsyncManageJournalsData {
  journals: JournalInfo[];
  resultCount: number;
}

export type ManageJournalsDataFromProp = {};

interface ManageJournalsLocalData {
  page: number;
  journalName: string;
  showUpdateDialog: boolean;
  waitToUpdateName: string;
  updateDestName: string;
  isLoading: boolean;
}

export type ManageJournalsPageComp = AsyncManageJournalsData &
  ManageJournalsDataFromProp &
  ManageJournalsLocalData;
