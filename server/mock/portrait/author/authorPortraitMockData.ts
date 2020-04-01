import { BasicResponse } from 'interfaces/responses/BasicResponse';
import { AuthorPortraitResponse } from '~/interfaces/responses/portrait/AuthorResponse';

const authorPortraitMockData: BasicResponse<AuthorPortraitResponse> = {
  code: 200,
  msg: 'Success',
  data: {
    name: 'F. Blaabjerg',
    count: 101,
    citation: 1582,
    affiliation: '',
    citationTrend: [47, 199, 621, 9, 54, 152, 256, 132, 43, 0],
    publicationTrends: [3, 9, 5, 3, 6, 20, 15, 18, 14, 3]
  }
};

export default authorPortraitMockData;
