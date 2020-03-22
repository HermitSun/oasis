import { BasicResponse } from '~/interfaces/responses/BasicResponse';
import { SearchFilterResponse } from '~/interfaces/responses/search/SearchFilterResponse';

const searchFilterMockData: BasicResponse<SearchFilterResponse> = {
  code: 200,
  msg: 'success',
  data: {
    authors: [
      {
        name: 'Mario Piattini',
        count: 558
      },
      {
        name: 'Alain Abran',
        count: 527
      },
      {
        name: 'Barry W.Boehm',
        count: 424
      }
    ],
    affiliations: [
      {
        name: 'Nanjing Univ',
        count: 2180
      },
      {
        name: 'UC Berkely',
        count: 2012
      },
      {
        name: 'Zhejiang Univ',
        count: 1080
      }
    ],
    conferences: [
      {
        name: 'ICSE',
        count: 12343
      },
      {
        name: 'Nanjing Univ',
        count: 5699
      },
      {
        name: 'ICSM',
        count: 2335
      }
    ],
    journals: [
      {
        name: 'Journal of Software',
        count: 7980
      }
    ]
  }
};
export default searchFilterMockData;
