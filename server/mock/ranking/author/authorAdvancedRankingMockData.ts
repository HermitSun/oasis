import { BasicResponse } from '~/interfaces/responses/BasicResponse';
import { AuthorAdvancedRankingResponse } from '~/interfaces/responses/ranking/advanced/AuthorAdvancedRankingResponse';

const authorAdvancedRankingMockData: BasicResponse<AuthorAdvancedRankingResponse[]> = {
  code: 200,
  msg: 'Success',
  data: [
    {
      authorId: '37278889300',
      authorName: 'Frede Blaabjerg',
      count: 14,
      citation: 43,
      publicationTrend: [3, 9, 5, 3, 6, 20, 15, 18, 14, 3]
    },
    {
      authorId: '37278438500',
      authorName: 'Dianguo Xu',
      count: 11,
      citation: 16,
      publicationTrend: [0, 4, 0, 0, 1, 3, 1, 6, 11, 0]
    },
    {
      authorId: '37274291900',
      authorName: 'Mohamed-Slim Alouini',
      count: 9,
      citation: 10,
      publicationTrend: [6, 15, 2, 3, 8, 9, 7, 10, 9, 1]
    },
    {
      authorId: '37268675200',
      authorName: 'Saeid Nahavandi',
      count: 9,
      citation: 4,
      publicationTrend: [3, 3, 1, 0, 1, 2, 5, 5, 9, 0]
    },
    {
      authorId: '37278605300',
      authorName: 'Zhu Han',
      count: 9,
      citation: 9,
      publicationTrend: [3, 3, 1, 0, 3, 3, 7, 9, 9, 2]
    },
    {
      authorId: '37278603300',
      authorName: 'Xuemin Shen',
      count: 8,
      citation: 20,
      publicationTrend: [3, 7, 1, 0, 0, 0, 5, 2, 8, 1]
    },
    {
      authorId: '37278653500',
      authorName: 'Zhiguo Ding',
      count: 8,
      citation: 15,
      publicationTrend: [0, 2, 0, 1, 1, 4, 6, 3, 8, 0]
    },
    {
      authorId: '37296968900',
      authorName: 'Dusit Niyato',
      count: 8,
      citation: 53,
      publicationTrend: [1, 4, 1, 2, 4, 3, 7, 6, 8, 1]
    },
    {
      authorId: '37273043000',
      authorName: 'Mohsen Guizani',
      count: 8,
      citation: 17,
      publicationTrend: [2, 4, 0, 0, 1, 6, 5, 6, 8, 0]
    },
    {
      authorId: '37268994500',
      authorName: 'Pei Xiao',
      count: 7,
      citation: 8,
      publicationTrend: [0, 0, 0, 2, 1, 0, 2, 1, 7, 0]
    },
    {
      authorId: '37276255400',
      authorName: 'Lajos Hanzo',
      count: 7,
      citation: 8,
      publicationTrend: [6, 6, 1, 0, 2, 8, 10, 6, 7, 0]
    },
    {
      authorId: '38284905000',
      authorName: 'Theodoros Tsiftsis,Theodoros A. Tsiftsis',
      count: 7,
      citation: 25,
      publicationTrend: [0, 1, 0, 0, 0, 2, 2, 2, 7, 0]
    },
    {
      authorId: '37287152000',
      authorName: 'Peng Shi',
      count: 7,
      citation: 16,
      publicationTrend: [0, 3, 2, 2, 4, 2, 1, 4, 7, 1]
    },
    {
      authorId: '37278594000',
      authorName: 'Branka Vucetic',
      count: 7,
      citation: 15,
      publicationTrend: [1, 4, 0, 1, 2, 0, 2, 2, 7, 0]
    },
    {
      authorId: '37270328400',
      authorName: 'Bo Ai',
      count: 7,
      citation: 13,
      publicationTrend: [1, 0, 1, 0, 1, 1, 2, 5, 7, 0]
    },
    {
      authorId: '37399959800',
      authorName: 'David Lo',
      count: 7,
      citation: 0,
      publicationTrend: [4, 5, 2, 0, 2, 2, 2, 1, 7, 0]
    },
    {
      authorId: '37085805540',
      authorName: 'Sanjeevikumar Padmanaban',
      count: 6,
      citation: 18,
      publicationTrend: [0, 0, 0, 0, 0, 1, 1, 1, 6, 0]
    },
    {
      authorId: '37266996800',
      authorName: 'Boxue Du,B. X. Du',
      count: 6,
      citation: 4,
      publicationTrend: [0, 0, 0, 1, 4, 5, 3, 6, 6, 0]
    },
    {
      authorId: '37278880800',
      authorName: 'Ronghai Qu',
      count: 6,
      citation: 5,
      publicationTrend: [0, 0, 0, 3, 4, 5, 4, 9, 6, 0]
    },
    {
      authorId: '37269764300',
      authorName: 'Dimitrios Tzovaras',
      count: 6,
      citation: 1,
      publicationTrend: [0, 0, 0, 0, 1, 1, 2, 2, 6, 0]
    }
  ]
};

export default authorAdvancedRankingMockData;
