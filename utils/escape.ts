/**
 * 调用lodash对HTML模板进行转义
 * @author WenSun
 * @date 2020.03.31
 */
import _ from 'lodash';

export function escape(html: string) {
  return _.escape(html);
}
