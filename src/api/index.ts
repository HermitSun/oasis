import {
  AdvancedSearchData,
  BasicSearchData
} from "@/interfaces/components/search/SearchData";
import { BasicResponse } from "@/interfaces/responses/BasicResponse";
import { SearchResponse } from "@/interfaces/responses/search/SearchResponse";
import { get } from "@/plugins/request";
import { AffiliationBasicRankingResponse } from "@/interfaces/responses/ranking/AffiliationBasicRankingResponse";
import { RankingData } from "@/interfaces/components/ranking/RankingData";
import { AuthorBasicRankingResponse } from "@/interfaces/responses/ranking/AuthorBasicRankingResponse";
import { ResearcherInterestData } from "@/interfaces/components/interest/ResearcherInterestData";
import { ResearcherInterestResponse } from "@/interfaces/responses/interest/ResearcherInterestResponse";

// 1. 普通搜索
export async function basicSearch(
  args: BasicSearchData
): Promise<BasicResponse<SearchResponse[]>> {
  const { data } = await get("/search/basic/mongo", {
    params: { ...args }
  });
  return data;
}

// 2. 组合搜索
export async function advancedSearch(
  args: AdvancedSearchData
): Promise<BasicResponse<SearchResponse[]>> {
  const { data } = await get("/search/advanced/mongo", {
    params: { ...args }
  });
  return data;
}

// 3.1 查看机构论文简略排名
export async function getAffiliationBasicRanking(
  args: RankingData
): Promise<BasicResponse<AffiliationBasicRankingResponse[]>> {
  const { data } = await get("/rank/basic/affiliation", {
    params: { ...args }
  });
  return data;
}

// 3.2 查看学者论文简略排名
export async function getAuthorBasicRanking(
  args: RankingData
): Promise<BasicResponse<AuthorBasicRankingResponse[]>> {
  const { data } = await get("/rank/basic/author", {
    params: { ...args }
  });
  return data;
}

// 4. 查看学者研究方向
export async function getResearcherInterest(
  args: ResearcherInterestData
): Promise<BasicResponse<ResearcherInterestResponse[]>> {
  const { data } = await get("/researcher/interest", {
    params: { ...args }
  });
  return data;
}

// 5. 查看活跃论文摘要
export async function getActivePaperAbstract(): Promise<
  BasicResponse<SearchResponse[]>
> {
  const { data } = await get("/paper/abstract");
  return data;
}
