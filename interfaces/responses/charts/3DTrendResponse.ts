/**
 * 3DBar图表的返回值
 * @author Alexchanchic
 * @date 2020.05.20
 * @update 2020.05.20
 */

export interface Keyword3DTrendResponse {
  keywords: string[]; // 返回10个keywords x轴
  years: number[]; // 返回近10年数据 y轴
  value: Array<[]>[]; // x,y为坐标 z为论文数
}
