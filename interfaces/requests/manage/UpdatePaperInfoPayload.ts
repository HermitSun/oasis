/**
 * 修改论文信息接口传入的参数
 * @author WenSun
 * @date 2020.02.24
 */
import { SearchResponse } from '~/interfaces/responses/search/SearchResponse';

// 暂时和搜索接口返回值相同
export type UpdatePaperInfoPayload = SearchResponse;
