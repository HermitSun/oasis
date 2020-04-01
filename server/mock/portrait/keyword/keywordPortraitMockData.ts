import { BasicResponse } from 'interfaces/responses/BasicResponse';
import { PortraitResponse } from '~/interfaces/responses/portrait/PortraitResponse';

const keywordPortraitMockData: BasicResponse<PortraitResponse> = {
  code: 200,
  msg: 'Success',
  data: {
    count: 120,
    citation: 560,
    authorNum: 390,
    citationTrend: [13, 102, 108, 18, 65, 11, 3, 6, 1, 0],
    publicationTrends: [2, 14, 4, 8, 11, 9, 10, 10, 3, 0]
  }
};

export default keywordPortraitMockData;
