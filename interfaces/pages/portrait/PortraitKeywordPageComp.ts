/**
 * 研究方向（关键词）画像页的data，包括sync的和async的，用于类型推导
 * 目前并没有很好的方式去进行Vue instance的推导
 * @author WenSun
 * @date 2020.05.15
 */
import { sortKey } from '~/interfaces/requests/portrait/PortraitPublic';
import { SearchResponse } from '~/interfaces/responses/search/SearchResponse';
import { AuthorAdvancedRankingResponse } from '~/interfaces/responses/ranking/advanced/AuthorAdvancedRankingResponse';
import { AffiliationAdvancedRankingResponse } from '~/interfaces/responses/ranking/advanced/AffiliationAdvancedRankingResponse';

interface Profile {
  name: string;
  statistics: Array<{ prop: string; number: number }>;
}

interface AsyncPortraitKeywordData {
  keyword: string;
  // charts
  affiliation: string;
  profile: Profile;
  citationTrend: number[];
  publicationTrend: number[];
  // papers
  papers: SearchResponse[];
  resultCount: number;
  // authors
  authorDetailRanking: AuthorAdvancedRankingResponse[];
  // affiliations
  affiliationRanking: AffiliationAdvancedRankingResponse[];
}

export type PortraitKeywordDataFromProp = {};

interface PortraitKeywordLocalData {
  showPortrait: boolean;
  page: number;
  sortKey: sortKey;
}

export type PortraitKeywordPageComp = AsyncPortraitKeywordData &
  PortraitKeywordDataFromProp &
  PortraitKeywordLocalData;
