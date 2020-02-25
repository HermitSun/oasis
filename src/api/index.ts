import {
  AdvancedSearchData,
  BasicSearchData
} from "@/interfaces/components/search/SearchData";
import { BasicResponse } from "@/interfaces/responses/BasicResponse";
import { SearchResponse } from "@/interfaces/responses/search/SearchResponse";
import { get } from "@/plugins/request";
import axios from "axios";

// 1. 普通搜索
export async function basicSearch(
  args: BasicSearchData
): Promise<BasicResponse<SearchResponse[]>> {
  const { data } = await axios.get("/search/basic", {
    params: { ...args }
  });
  return data;
}

// 2. 组合搜索
export async function advancedSearch(
  args: AdvancedSearchData
): Promise<BasicResponse<SearchResponse[]>> {
  const { data } = await get("/search/advanced", {
    params: { ...args }
  });
  return data;
}
