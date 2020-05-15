/**
 * 期刊画像页的data，包括sync的和async的，用于类型推导
 * 目前并没有很好的方式去进行Vue instance的推导
 * @author WenSun
 * @date 2020.05.14
 */
import { SearchResponse } from '~/interfaces/responses/search/SearchResponse';
import { InterestResponse } from '~/interfaces/responses/interest/InterestResponse';

interface Profile {
  name: string;
  statistics: Array<{ prop: string; number: number }>;
}

interface AsyncPortraitJournalData {
  // charts
  affiliation: string;
  profile: Profile;
  citationTrend: number[];
  publicationTrend: number[];
  // papers
  papers: SearchResponse[];
  resultCount: number;
  // interests
  interests: InterestResponse[];
}

export type PortraitJournalDataFromProp = {};

interface PortraitJournalLocalData {}

export type PortraitJournalPageComp = AsyncPortraitJournalData &
  PortraitJournalDataFromProp &
  PortraitJournalLocalData;
