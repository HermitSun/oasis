/**
 * 首页的data，包括sync的和async的，用于类型推导
 * 目前并没有很好的方式去进行Vue instance的推导
 * @author WenSun
 * @date 2020.03.15
 */
import { ActivePaperAbstractResponse } from '~/interfaces/responses/abstract/ActivePaperAbstractResponse';
import { BasicRankingResponse } from '~/interfaces/responses/ranking/basic/BasicRankingResponse';
import { AuthorBasicRankingResponse } from '~/interfaces/responses/ranking/basic/AuthorBasicRankingResponse';

export interface HomePageComp {
  keyword: string;
  showAdvancedSearch: boolean;
  abstractResponse: ActivePaperAbstractResponse[];
  affiliationRanking: BasicRankingResponse[];
  authorRanking: AuthorBasicRankingResponse[];
}
