import { AffiliationPortraitResponse } from 'interfaces/responses/portrait/AffiliationResponse';
import { BasicResponse } from 'interfaces/responses/BasicResponse';

const affiliationPortraitMockData: BasicResponse<AffiliationPortraitResponse> = {
  code: 200,
  msg: 'Success',
  data: {
    count: 38,
    citation: 395,
    authorNum: 179,
    citationTrend: [21, 179, 0, 7, 156, 15, 9, 0, 2, 0],
    publicationTrends: [1, 7, 0, 1, 2, 1, 2, 1, 21, 0]
  }
};

export default affiliationPortraitMockData;
