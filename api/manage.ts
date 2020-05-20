import globalAxios from 'axios';
import importBus from '~/components/manage/bus';
import { BasicResponse } from '~/interfaces/responses/BasicResponse';
import {
  ConferencesAndJournalsInfoResponse,
  ConferencesAndJournalsProceedingsInfoResponse,
  CrawlTaskResponse
} from '~/interfaces/responses/manage/PaperImportResponse';
import axios from '~/api/config';
import { FilterKey } from '~/interfaces/pages/manage/ManageImportPageComp';

// 36. 获取会议期刊列表 getConferencesAndJournalsList
export async function getConferencesAndJournalsList(
  keyword: string = '',
  page: number = 1
): Promise<BasicResponse<ConferencesAndJournalsInfoResponse>> {
  const { data } = await axios.get('/conference/publication', {
    params: { keyword, page }
  });
  return data;
}

// 37. 获取会议期刊的所有论文集 getConferencesAndJournalsProceedings
export async function getConferencesAndJournalsProceedings(
  titleId: string
): Promise<BasicResponse<ConferencesAndJournalsProceedingsInfoResponse[]>> {
  const { data } = await axios.get('/conference/proceeding', {
    params: { titleId }
  });
  return data;
}

// 46. 获取爬虫任务状态 getCrawlTask
// 这里的实现非常dirty，需要留意可能存在的bug
const crawlConfig = {
  baseURL: 'https://wensun.top',
  timeout: 5 * 1000
};
const crawlAxios = globalAxios.create(crawlConfig);
// 利用总线判断正在进行的请求数
// 为什么不用vuex，因为nuxt对vuex的集成非常憨批，完全没法用
// 下次不用了
crawlAxios.interceptors.request.use((config) => {
  ++importBus.crawlTaskReqNum;
  return config;
});
crawlAxios.interceptors.request.use((config) => {
  --importBus.crawlTaskReqNum;
  return config;
});
export async function getCrawlTask(
  filterKey: FilterKey,
  date: string
): Promise<BasicResponse<CrawlTaskResponse[]>> {
  const { data } = await crawlAxios.get('/api/task/state', {
    params: { filterKey, date }
  });
  return data;
}

// 47. 运行爬虫任务 crawl
export async function execCrawlTask(
  proceedings: string[]
): Promise<BasicResponse> {
  const { data } = await crawlAxios.post('/crawl/crawl', { proceedings });
  return data;
}
