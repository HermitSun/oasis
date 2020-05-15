/**
 * 机构画像页的data，包括sync的和async的，用于类型推导
 * 目前并没有很好的方式去进行Vue instance的推导
 * @author WenSun
 * @date 2020.05.14
 */
import { sortKey } from '~/interfaces/requests/portrait/PortraitPublic';
import { SearchResponse } from '~/interfaces/responses/search/SearchResponse';
import { InterestResponse } from '~/interfaces/responses/interest/InterestResponse';
import { AuthorAdvancedRankingResponse } from '~/interfaces/responses/ranking/advanced/AuthorAdvancedRankingResponse';

interface Profile {
  name: string;
  statistics: Array<{ prop: string; number: number }>;
}

interface AsyncPortraitAffiliationData {
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
  // authors
  authorDetailRanking: AuthorAdvancedRankingResponse[];
}

export type PortraitAffiliationDataFromProp = {};

interface PortraitAffiliationLocalData {
  page: number;
  sortKey: sortKey;
}

export type PortraitAffiliationPageComp = AsyncPortraitAffiliationData &
  PortraitAffiliationDataFromProp &
  PortraitAffiliationLocalData;
