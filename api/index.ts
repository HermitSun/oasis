import globalAxios from 'axios';
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
import { BasicRankingResponse } from '@/interfaces/responses/ranking/BasicRankingResponse';
import { RankingPayload } from '~/interfaces/requests/ranking/RankingPayload';
import { AuthorBasicRankingResponse } from '@/interfaces/responses/ranking/AuthorBasicRankingResponse';
import { PaperImportResponse } from '@/interfaces/responses/manage/PaperImportResponse';
import { ResearcherInterestPayload } from '~/interfaces/requests/interest/ResearcherInterestPayload';
import { ResearcherInterestResponse } from '@/interfaces/responses/interest/ResearcherInterestResponse';
import { ActivePaperAbstractResponse } from '@/interfaces/responses/abstract/ActivePaperAbstractResponse';
import { SearchFilterPayload } from '~/interfaces/requests/search/SearchFilterPayload';
import { SearchFilterResponse } from '~/interfaces/responses/search/SearchFilterResponse';
import { AffiliationInfoResponse } from '~/interfaces/responses/manage/AffiliationInfoResponse';
import { ConferenceInfoResponse } from '~/interfaces/responses/manage/ConferenceInfoResponse';
import { JournalInfoResponse } from '~/interfaces/responses/manage/JournalInfoResponse';
import { AuthorInfoResponse } from '~/interfaces/responses/manage/AuthorInfoResponse';
import { UpdatePaperInfoPayload } from '~/interfaces/requests/manage/UpdatePaperInfoPayload';
import { AffiliationPortraitResponse } from '~/interfaces/responses/portrait/AffiliationResponse';
import { AffiliationPapersPayload } from '~/interfaces/requests/portrait/affiliation/AffiliationPaperPayload';

// 1. 普通搜索
export async function basicSearch(
  args: BasicSearchPayload
): Promise<BasicResponse<SearchFullResponse>> {
  const { data } = await axios.get('/search/basic/es', {
    params: args
  });
  return data;
}

// 2. 组合搜索
export async function advancedSearch(
  args: AdvancedSearchPayload
): Promise<BasicResponse<SearchFullResponse>> {
  const { data } = await axios.get('/search/advanced/mongo', {
    params: args
  });
  return data;
}

// 3.1 查看机构论文简略排名
export async function getAffiliationBasicRanking(
  args: RankingPayload
): Promise<BasicResponse<BasicRankingResponse[]>> {
  const { data } = await axios.get('/rank/basic/affiliation', {
    params: args
  });
  return data;
}

// 3.2 查看学者论文简略排名
export async function getAuthorBasicRanking(
  args: RankingPayload
): Promise<BasicResponse<AuthorBasicRankingResponse[]>> {
  const { data } = await axios.get('/rank/basic/author', {
    params: args
  });
  return data;
}

// 3.3 查看会议论文简略排名
export async function getConferenceBasicRanking(
  args: RankingPayload
): Promise<BasicResponse<BasicRankingResponse[]>> {
  const { data } = await axios.get('/rank/basic/conference', {
    params: args
  });
  return data;
}

// 3.4 查看期刊论文简略排名
export async function getJournalBasicRanking(
  args: RankingPayload
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
): Promise<BasicResponse<ResearcherInterestResponse[]>> {
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

// 8. 获取普通搜索的二次筛选条件
export async function getBasicSearchFilterCondition(
  args: SearchFilterPayload
): Promise<BasicResponse<SearchFilterResponse>> {
  // TODO 替换为后端真实url
  const { data } = await axios.get('/search/basic/filter', {
    params: args
  });
  return data;
}

// 16. 获取某机构画像
export async function getAffiliationPortrait(
  affiliation: string
): Promise<BasicResponse<AffiliationPortraitResponse>> {
  const { data } = await axios.get('/portrait/affiliation', {
    params: { affiliation }
  });
  return data;
}

// 17. 获取某机构发表的所有论文
export async function getAffiliatonPapers(
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
): Promise<BasicResponse<ResearcherInterestResponse[]>> {
  const { data } = await axios.get('/affiliation/interest', {
    params: { affiliation }
  });
  return data;
}

// 19. 查看某机构下的作者排名详情

// 以下为管理员端
const mockConfig = {
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://wensun.top'
      : 'http://localhost:3000/test',
  timeout: 60 * 1000
};
const mockAxios = globalAxios.create(mockConfig);
// 26. 获取机构信息 getAffiliationInfo
export async function getAffiliationInfo(
  page: number = 1,
  name: string = ''
): Promise<BasicResponse<AffiliationInfoResponse>> {
  const { data } = await axios.get('/info/affiliation', {
    params: { name, page }
  });
  return data;
}

// 27. 合并机构信息 mergeAffiliationInfo
export async function mergeAffiliationInfo(
  src: string[],
  dest: string
): Promise<BasicResponse> {
  // TODO: 切换成真实的URL
  const { data } = await mockAxios.put('/affiliations/merge', { src, dest });
  return data;
}

// 28. 获取会议信息 getConferenceInfo
export async function getConferenceInfo(
  page: number = 1,
  name: string = ''
): Promise<BasicResponse<ConferenceInfoResponse>> {
  const { data } = await axios.get('/info/conference', {
    params: { name, page }
  });
  return data;
}

// 29. 修改会议信息 updateConferenceInfo
export async function updateConferenceInfo(
  src: string,
  dest: string
): Promise<BasicResponse> {
  // TODO: 切换成真实的URL
  const { data } = await mockAxios.put('/conferences/update', { src, dest });
  return data;
}

// 30. 获取期刊信息 getJournalInfo
export async function getJournalInfo(
  page: number = 1,
  name: string = ''
): Promise<BasicResponse<JournalInfoResponse>> {
  const { data } = await axios.get('/info/journal', {
    params: { name, page }
  });
  return data;
}

// 31. 修改期刊信息 updateJournalInfo
export async function updateJournalInfo(
  src: string,
  dest: string
): Promise<BasicResponse> {
  // TODO: 切换成真实的URL
  const { data } = await mockAxios.put('/journals/update', { src, dest });
  return data;
}

// 32. 修改论文信息 updatePaperInfo
export async function updatePaperInfo(
  args: UpdatePaperInfoPayload
): Promise<BasicResponse> {
  // TODO: 切换成真实的URL
  const { data } = await mockAxios.put('/papers/update', args);
  return data;
}

// 33. 获取作者信息 getAuthorInfo
export async function getAuthorInfo(
  page: number = 1,
  name: string = ''
): Promise<BasicResponse<AuthorInfoResponse>> {
  const { data } = await axios.get('/info/author', {
    params: { name, page }
  });
  return data;
}

// 34. 合并作者信息 mergeAuthorInfo
export async function mergeAuthorInfo(
  src: string[],
  dest: string
): Promise<BasicResponse> {
  // TODO: 切换成真实的URL
  const { data } = await mockAxios.put('/authors/merge', { src, dest });
  return data;
}
