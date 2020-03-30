/**
 *
 * @author Alexchanchic
 * @date 2020.03.28
 */
import { PageAndSortKey } from '~/interfaces/requests/portrait/PortraitPublic';

export interface AffiliationPapersPayload extends PageAndSortKey {
  affiliation: string;
}
