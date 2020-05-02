/**
 * 二次筛选组件的接口
 * @author WenSun
 * @date 2020.04.23
 */
import Vue from 'vue';

export interface OasisSearchFilter extends Vue {
  resetDate: () => void;
  resetAllFields: () => void;
  isEmpty: () => boolean;
}

export interface SearchFilterChangedPayload {
  isValid: boolean;
  startYear: number;
  endYear: number;
  authors: string[];
  affiliations: string[];
  conferences: string[];
  journals: string[];
}
