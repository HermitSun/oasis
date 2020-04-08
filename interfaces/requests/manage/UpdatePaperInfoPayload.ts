/**
 * 修改论文信息接口传入的参数
 * @author WenSun
 * @date 2020.02.24
 */
import { SearchResponse } from '~/interfaces/responses/search/SearchResponse';

export interface UpdatePaperInfoPayload
  extends Omit<SearchResponse, 'authors'> {
  authors: string[];
}
