/**
 * 作者论文参数
 * @author Alexchanchic
 * @date 2020.03.28
 */
import { PageAndSortKey } from '~/interfaces/requests/portrait/PortraitPublic';

export interface AuthorPapersPayload extends PageAndSortKey {
  authorId: string;
}
