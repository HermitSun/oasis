/**
 * ElementUI的ElPagination的类型
 * @author WenSun
 * @date 2020.04.05
 */

/**
 * ElementUI的分页器存在一个逻辑上的问题
 * 如果初始时total为0，先修改current-page，然后修改total，会导致一直停留在第一页
 * 因为ElementUI会确保current-page一定是一个合法值，如果出现上溢就置为当前的最大值
 * @see [[https://github.com/ElemeFE/element/issues/3188]]
 */
export type ElPaginationTotal = number | null;
