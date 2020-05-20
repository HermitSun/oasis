/**
 * 日期相关的工具
 * @author WenSun
 * @date 2020.05.20
 */

export const getFormattedDate = (date: Date, split: string = '-'): string => {
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  return year + split + month + split + day;
};
