import axios from './config';
import {
  AdvancedSearchPayload,
  BasicSearchPayload,
  CommandSearchPayload,
  FilterSearchPayload
} from '~/interfaces/requests/search/SearchPayload';
import { BasicResponse } from '~/interfaces/responses/BasicResponse';
import {
  SearchFullResponse,
  SearchReference
} from '~/interfaces/responses/search/SearchResponse';
import { BasicRankingResponse } from '~/interfaces/responses/ranking/basic/BasicRankingResponse';
import {
  KeywordRankingAdvancedPayload,
  RankingAdvancedPayload,
  RankingBasicPayload
} from '~/interfaces/requests/ranking/RankingPayload';
import { AuthorBasicRankingResponse } from '~/interfaces/responses/ranking/basic/AuthorBasicRankingResponse';
import { ResearcherInterestPayload } from '~/interfaces/requests/interest/ResearcherInterestPayload';
import { InterestResponse } from '~/interfaces/responses/interest/InterestResponse';
import { ActivePaperAbstractResponse } from '~/interfaces/responses/abstract/ActivePaperAbstractResponse';
import { SearchFilterPayload } from '~/interfaces/requests/search/SearchFilterPayload';
import { SearchFilterResponse } from '~/interfaces/responses/search/SearchFilterResponse';
import { PortraitResponse } from '~/interfaces/responses/portrait/PortraitResponse';
import { AffiliationPapersPayload } from '~/interfaces/requests/portrait/affiliation/AffiliationPaperPayload';
import {
  AuthorAdvancedRankingResponse,
  AuthorDetailRankingResponse
} from '~/interfaces/responses/ranking/advanced/AuthorAdvancedRankingResponse';
import {
  AffiliationAdvancedRankingResponse,
  AffiliationDetailRankingResponse
} from '~/interfaces/responses/ranking/advanced/AffiliationAdvancedRankingResponse';
import { AuthorPortraitResponse } from '~/interfaces/responses/portrait/AuthorResponse';
import { AuthorPapersPayload } from '~/interfaces/requests/portrait/author/AuthorPaperPayload';
import { KeywordPapersPayload } from '~/interfaces/requests/portrait/keyword/KeywordPaperPayload';
import { ForceChartData } from '~/components/charts/force';
import {
  KeywordAdvancedRankingResponse,
  KeywordDetailRankingResponse
} from '~/interfaces/responses/ranking/advanced/KeywordAdvancedRankingResponse';
import { ActiveTalentsBaseResponse } from '~/interfaces/responses/talent/ActiveTalentsBaseResponse';
import { TalentsListResponse } from '~/interfaces/responses/talent/TalentsListResponse';
import { Keyword3DTrendResponse } from '~/interfaces/responses/charts/3DTrendResponse';

// 1. 普通搜索
export async function basicSearch(
  args: BasicSearchPayload
): Promise<BasicResponse<SearchFullResponse>> {
  const { data } = await axios.get('/search/basic/es/highlight', {
    params: args
  });
  return data;
}

// 1.1 二次搜索（模式：关键词分词，其他精确匹配）
export async function basicFilterSearch(
  args: FilterSearchPayload
): Promise<BasicResponse<SearchFullResponse>> {
  const { data } = await axios.get('/search/filter/es', {
    params: args
  });
  return data;
}

// 2. 组合搜索
export async function advancedSearch(
  args: AdvancedSearchPayload
): Promise<BasicResponse<SearchFullResponse>> {
  const { data } = await axios.get('/search/advanced/es/highlight', {
    params: args
  });
  return data;
}

// 3.1 查看机构论文简略排名
export async function getAffiliationBasicRanking(
  args: RankingBasicPayload
): Promise<BasicResponse<BasicRankingResponse[]>> {
  const { data } = await axios.get('/rank/basic/affiliation', {
    params: args
  });
  return data;
}

// 3.2 查看学者论文简略排名
export async function getAuthorBasicRanking(
  args: RankingBasicPayload
): Promise<BasicResponse<AuthorBasicRankingResponse[]>> {
  const { data } = await axios.get('/rank/basic/author', {
    params: args
  });
  return data;
}

// 3.3 查看会议论文简略排名
export async function getConferenceBasicRanking(
  args: RankingBasicPayload
): Promise<BasicResponse<BasicRankingResponse[]>> {
  const { data } = await axios.get('/rank/basic/conference', {
    params: args
  });
  return data;
}

// 3.4 查看期刊论文简略排名
export async function getJournalBasicRanking(
  args: RankingBasicPayload
): Promise<BasicResponse<BasicRankingResponse[]>> {
  const { data } = await axios.get('/rank/basic/journal', {
    params: args
  });
  return data;
}

// 3.5 查看研究方向论文简略排名
export async function getKeywordBasicRanking(
  year: number
): Promise<BasicResponse<BasicRankingResponse[]>> {
  const { data } = await axios.get('/rank/basic/keyword', {
    params: { year }
  });
  return data;
}

// 4. 查看学者研究方向
export async function getResearcherInterest(
  args: ResearcherInterestPayload
): Promise<BasicResponse<InterestResponse[]>> {
  const { data } = await axios.get('/researcher/interest', {
    params: args
  });
  return data;
}

// 5. 查看活跃论文摘要
export async function getActivePaperAbstract(): Promise<
  BasicResponse<ActivePaperAbstractResponse[]>
> {
  const { data } = await axios.get('/paper/abstract');
  return data;
}

// 7. 根据论文id获得reference
export async function getReferenceById(
  paperId: string
): Promise<BasicResponse<SearchReference[]>> {
  const { data } = await axios.get('/paper/reference', {
    params: { paperId }
  });
  return data;
}

// 8. 获取普通搜索的二次筛选条件
export async function getBasicSearchFilterCondition(
  args: SearchFilterPayload
): Promise<BasicResponse<SearchFilterResponse>> {
  const { data } = await axios.get('/search/basic/mongo/filter', {
    params: args
  });
  return data;
}

// 9. 查看作者排名详情
export async function getAuthorAdvancedRanking(
  args: RankingAdvancedPayload
): Promise<BasicResponse<AuthorAdvancedRankingResponse[]>> {
  const { data } = await axios.get('/rank/advanced/author', {
    params: args
  });
  return data;
}

// 10. 根据作者id获取排名细节
export async function getAuthorDetailRankingById(
  authorId: string
): Promise<BasicResponse<AuthorDetailRankingResponse>> {
  const { data } = await axios.get('/rank/detail/author', {
    params: { authorId }
  });
  return data;
}

// 11. 查看机构排名详情
export async function getAffiliationAdvancedRanking(
  args: RankingAdvancedPayload
): Promise<BasicResponse<AffiliationAdvancedRankingResponse[]>> {
  const { data } = await axios.get('/rank/advanced/affiliation', {
    params: args
  });
  return data;
}

// 12. 根据机构id获取排名细节
export async function getAffiliationDetailRankingById(
  affiliationId: string
): Promise<BasicResponse<AffiliationDetailRankingResponse>> {
  const { data } = await axios.get('/rank/detail/affiliation', {
    params: { affiliationId }
  });
  return data;
}

// 13.  根据作者id获取作者画像
export async function getAuthorPortraitById(
  authorId: string
): Promise<BasicResponse<AuthorPortraitResponse>> {
  const { data } = await axios.get('/portrait/author', {
    params: { authorId }
  });
  return data;
}

// 14. 根据作者id获取该作者发表的所有论文
export async function getAuthorPapersById(
  args: AuthorPapersPayload
): Promise<BasicResponse<SearchFullResponse>> {
  const { data } = await axios.get('/paper/author', {
    params: args
  });
  return data;
}

// 15. 根据作者id获取该作者的学者关系
export async function getAcademicRelationByAuthorId(
  id: string
): Promise<BasicResponse<ForceChartData>> {
  const { data } = await axios.get('/picture/academic', {
    params: { id }
  });
  return data;
}

// 16. 获取某机构画像
export async function getAffiliationPortrait(
  affiliation: string
): Promise<BasicResponse<PortraitResponse>> {
  const { data } = await axios.get('/portrait/affiliation', {
    params: { affiliation }
  });
  return data;
}

// 17. 获取某机构发表的所有论文
export async function getAffiliationPapers(
  args: AffiliationPapersPayload
): Promise<BasicResponse<SearchFullResponse>> {
  const { data } = await axios.get('/paper/affiliation', {
    params: args
  });
  return data;
}

// 18. 查看某机构研究方向
export async function getAffiliationInterest(
  affiliation: string
): Promise<BasicResponse<InterestResponse[]>> {
  const { data } = await axios.get('/affiliation/interest', {
    params: { affiliation }
  });
  return data;
}

// 19. 查看某机构下的作者排名详情
export async function getAuthorDetailRanking(
  affiliation: string
): Promise<BasicResponse<AuthorAdvancedRankingResponse[]>> {
  const { data } = await axios.get('/rank/affiliation/author', {
    params: { affiliation }
  });
  return data;
}

// 20. 获取某研究方向画像
export async function getKeywordPortrait(
  keyword: string
): Promise<BasicResponse<PortraitResponse>> {
  const { data } = await axios.get('/portrait/keyword', {
    params: { keyword }
  });
  return data;
}

// 21. 获取某研究方向发表的所有论文
export async function getKeywordPapers(
  args: KeywordPapersPayload
): Promise<BasicResponse<SearchFullResponse>> {
  const { data } = await axios.get('/paper/keyword', {
    params: args
  });
  return data;
}

// 22. 获取某会议画像
export async function getConferencePortrait(
  conference: string
): Promise<BasicResponse<PortraitResponse>> {
  const { data } = await axios.get('/portrait/conference', {
    params: { conference }
  });
  return data;
}

//  23. 获取某会议研究方向
export async function getConferenceInterest(
  conference: string
): Promise<BasicResponse<InterestResponse[]>> {
  const { data } = await axios.get('/conference/interest', {
    params: { conference }
  });
  return data;
}

// 24. 获取某期刊画像
export async function getJournalPortrait(
  journal: string
): Promise<BasicResponse<PortraitResponse>> {
  const { data } = await axios.get('/portrait/journal', {
    params: { journal }
  });
  return data;
}

//  25. 获取某期刊研究方向
export async function getJournalInterest(
  journal: string
): Promise<BasicResponse<InterestResponse[]>> {
  const { data } = await axios.get('/journal/interest', {
    params: { journal }
  });
  return data;
}

// 以下为管理员端

// 35. 命令搜索
export async function commandSearch(
  args: CommandSearchPayload
): Promise<BasicResponse<SearchFullResponse>> {
  const { data } = await axios.get('/search/command', {
    params: args
  });
  return data;
}

// 38. 查看研究方向排名详情
export async function getKeywordAdvancedRanking(
  args: RankingAdvancedPayload
): Promise<BasicResponse<KeywordAdvancedRankingResponse[]>> {
  const { data } = await axios.get('/rank/advanced/keyword', {
    params: args
  });
  return data;
}

// 39.获取某研究方向下的作者排名详情
export async function getAuthorDetailRankingByKeyword(
  args: KeywordRankingAdvancedPayload
): Promise<BasicResponse<AuthorAdvancedRankingResponse[]>> {
  const { data } = await axios.get('/rank/detail/author/keyword', {
    params: args
  });
  return data;
}

// 40. 获取某研究方向下的机构排名详情
export async function getAffiliationDetailRankingByKeyword(
  args: KeywordRankingAdvancedPayload
): Promise<BasicResponse<AffiliationAdvancedRankingResponse[]>> {
  const { data } = await axios.get('/rank/detail/affiliation/keyword', {
    params: args
  });
  return data;
}

// 42. 合并关键词信息 mergeKeywords
export async function mergeKeywords(
  src: string[],
  dest: string
): Promise<BasicResponse> {
  const { data } = await axios.put('/info/keywords', { src, dest });
  return data;
}

// 43. 查看活跃人才库
export async function getActiveTalentsBase(): Promise<
  BasicResponse<ActiveTalentsBaseResponse[]>
> {
  const { data } = await axios.get('/talents/active');
  return data;
}

// 44. 1 查看某人才库的人才列表
export async function getTalentsListByTalentBase(
  field: string,
  page: number
): Promise<BasicResponse<TalentsListResponse[]>> {
  const { data } = await axios.get('/talents/list', {
    params: { field, page }
  });
  return data;
}

// 44.2 查看某人才库的
export async function getTalentsActivePapersByTalentBase(
  field: string
): Promise<BasicResponse<ActivePaperAbstractResponse[]>> {
  const { data } = await axios.get('/talents/recommend', {
    params: { field }
  });
  return data;
}

// 45. 获取某学者的相关学者推荐
export async function getSimilarAuthorByAuthorId(
  authorId: string
): Promise<BasicResponse<TalentsListResponse[]>> {
  const { data } = await axios.get('/talents/list', {
    params: { authorId }
  });
  return data;
}

// 48. 根据研究方向获取排名详情
export async function getKeywordDetailRanking(
  keyword: string
): Promise<BasicResponse<KeywordDetailRankingResponse>> {
  const { data } = await axios.get('/rank/detail/keyword', {
    params: { keyword }
  });
  return data;
}

// 49. 查看研究方向的排名3D趋势
export async function getKeyword3DTrend(): Promise<
  BasicResponse<Keyword3DTrendResponse>
> {
  const { data } = await axios.get('/keyword/trend');
  return data;
}
