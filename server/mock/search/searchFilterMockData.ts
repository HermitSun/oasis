import { BasicResponse } from '~/interfaces/responses/BasicResponse';
import { SearchFilterResponse } from '~/interfaces/responses/search/SearchFilterResponse';

const searchFilterMockData: BasicResponse<SearchFilterResponse> = {
  code: 200,
  msg: 'success',
  data: {
    authors: ['Mario Piattini', 'Alain Abran', 'Barry W.Boehm'],
    affiliations: ['Nanjing Univ', 'UC Berkely', 'Zhejiang Univ'],
    conferences: ['ICSE', 'Nanjing Univ', 'ICSM'],
    journals: ['Journal of Software']
  }
};
export default searchFilterMockData;
