/**
 * 导入论文数据的返回值
 * @author WenSun
 * @date 2020.03.04
 * @update 2020.05.08
 */

// 6. 导入论文数据 importPaperData
export interface PaperImportResponse {
  increasedCount: number;
}

// 36. 获取会议期刊列表 getConferencesAndJournalsList
export interface ConferencesAndJournalsInfo {
  titleId: string;
  publicationTitle: string;
}

export interface ConferencesAndJournalsInfoResponse {
  list: ConferencesAndJournalsInfo[]; // 会议或期刊名的列表
  size: number;
}

// 37. 获取会议期刊的所有论文集 getConferencesAndJournalsProceedings
interface ProceedingInfo {
  proceedingId: string;
  proceedingTitle: string;
}

export type ConferencesAndJournalsProceedingsInfoResponse = ProceedingInfo;

// 46. 获取爬虫任务状态 getCrawlTask
export interface CrawlTaskResponse {
  proceedings: ProceedingInfo[]; // 爬取的论文集
  startTime: number;
  endTime: number;
  isFinished: boolean;
  paperCount: number;
  totalPaperNum: number;
}
