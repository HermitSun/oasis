/**
 * 某活跃人才库的人才列表返回值
 * @author Alexchanchic
 * @date 2020.05.20
 * @update 2020.05.20
 */

export interface TalentsListResponse {
  name: string; // 学者名
  affiliation: string; // 机构
  authorId: string; //学者id
  papers: {
    title: string; // 论文名
    citation: number; // 引用数
  };
}
