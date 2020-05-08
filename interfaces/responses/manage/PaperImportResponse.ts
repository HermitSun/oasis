/**
 * 导入论文数据的返回值
 * @author WenSun
 * @date 2020.03.04
 * @update 2020.05.08
 */

export interface PaperImportResponse {
  increasedCount: number;
}

// 接口36
interface ConferencesAndJournalsInfo {
  titleId: string;
  publicationTitle: string;
}

export interface ConferencesAndJournalsInfoResponse {
  list: ConferencesAndJournalsInfo[]; // 会议或期刊名的列表
  size: number;
}

// 接口37
interface ConferencesAndJournalsProceedingsInfo {
  proceedingId: string;
  proceedingTitle: string;
}

export interface ConferencesAndJournalsProceedingsInfoResponse {
  list: ConferencesAndJournalsProceedingsInfo[];
}
