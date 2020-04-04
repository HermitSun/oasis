/**
 * 关键字论文参数
 * @author Alexchanchic
 * @date 2020.03.28
 */
import { PageAndSortKey } from '~/interfaces/requests/portrait/PortraitPublic';

export interface KeywordPapersPayload extends PageAndSortKey {
  keyword: string;
}
