import axios from './config';
import {
  AdvancedSearchPayload,
  BasicSearchPayload
} from '~/interfaces/requests/search/SearchPayload';
import { BasicResponse } from '@/interfaces/responses/BasicResponse';
import {
  SearchFullResponse,
  SearchReference
} from '@/interfaces/responses/search/SearchResponse';
// import { get } from '@/plugins/request';
import { AffiliationBasicRankingResponse } from '@/interfaces/responses/ranking/AffiliationBasicRankingResponse';
import { RankingPayload } from '~/interfaces/requests/ranking/RankingPayload';
import { AuthorBasicRankingResponse } from '@/interfaces/responses/ranking/AuthorBasicRankingResponse';
import { PaperImportResponse } from '@/interfaces/responses/manage/PaperImportResponse';
import { ResearcherInterestPayload } from '~/interfaces/requests/interest/ResearcherInterestPayload';
import { ResearcherInterestResponse } from '@/interfaces/responses/interest/ResearcherInterestResponse';
import { ActivePaperAbstractResponse } from '@/interfaces/responses/abstract/ActivePaperAbstractResponse';

// 1. 普通搜索
export async function basicSearch(
  args: BasicSearchPayload
): Promise<BasicResponse<SearchFullResponse>> {
  const { data } = await axios.get('/search/basic/mongo', {
    params: { ...args }
  });
  return data;
}

// 2. 组合搜索
export async function advancedSearch(
  args: AdvancedSearchPayload
): Promise<BasicResponse<SearchFullResponse>> {
  const { data } = await axios.get('/search/advanced/mongo', {
    params: { ...args }
  });
  return data;
}

// 3.1 查看机构论文简略排名
export async function getAffiliationBasicRanking(
  args: RankingPayload
): Promise<BasicResponse<AffiliationBasicRankingResponse[]>> {
  const { data } = await axios.get('/rank/basic/affiliation', {
    params: { ...args }
  });
  return data;
}

// 3.2 查看学者论文简略排名
export async function getAuthorBasicRanking(
  args: RankingPayload
): Promise<BasicResponse<AuthorBasicRankingResponse[]>> {
  const { data } = await axios.get('/rank/basic/author', {
    params: { ...args }
  });
  return data;
}

// 4. 查看学者研究方向
export async function getResearcherInterest(
  args: ResearcherInterestPayload
): Promise<BasicResponse<ResearcherInterestResponse[]>> {
  const { data } = await axios.get('/researcher/interest', {
    params: { ...args }
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

// 6. 导入论文数据
export async function importPaperData(
  paperData: FormData
): Promise<BasicResponse<PaperImportResponse>> {
  const { data } = await axios.post('/import/paper', paperData);
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
