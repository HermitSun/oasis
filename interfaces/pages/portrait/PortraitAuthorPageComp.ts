/**
 * 学者画像页的data，包括sync的和async的，用于类型推导
 * 目前并没有很好的方式去进行Vue instance的推导
 * @author WenSun
 * @date 2020.04.07
 */
import { sortKey } from '~/interfaces/requests/portrait/PortraitPublic';
import { SearchResponse } from '~/interfaces/responses/search/SearchResponse';
import { InterestResponse } from '~/interfaces/responses/interest/InterestResponse';
import { ForceChartData } from '~/interfaces/components/charts/force';

interface Statistic {
  prop: string;
  number: string | number;
}

interface PortraitProfile {
  name: string;
  statistics: Statistic[];
}

interface AsyncPortraitAuthorData {
  authorId: string;
  page: number;
  sortKey: sortKey; // query
  profile: PortraitProfile;
  citationTrend: number[]; // 被引用趋势
  publicationTrend: number[]; // 发论文趋势
  papers: SearchResponse[];
  resultCount: number;
}

export type PortraitAuthorDataFromProp = {};

interface PortraitAuthorLocalData {
  showPortrait: boolean;
  currentTab: string;
  lastTab: string;
  // 研究兴趣
  interests: InterestResponse[];
  isInterestLoading: boolean;
  // 学术关系
  force: null | any;
  academicRelation: ForceChartData;
  isAcademicRelationLoading: boolean;
  showRelation: boolean;
}

export type PortraitAuthorPageComp = AsyncPortraitAuthorData &
  PortraitAuthorDataFromProp &
  PortraitAuthorLocalData;
