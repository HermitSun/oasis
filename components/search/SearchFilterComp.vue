<template>
  <div class="searchPage-content__filter mobile-hidden">
    <span class="searchPage-content__sub-hint">Filter By</span>
    <div class="filter">
      <div class="filter-wrapper">
        <div class="hint">
          Time Range
        </div>
        <div class="searchPage-time-range">
          <input
            v-model="startYear"
            style="margin: 0 5px"
            size="4"
            aria-label="startYear"
          />～<input
            v-model="endYear"
            style="margin-left: 5px"
            size="4"
            aria-label="endYear"
          />
          <div class="error">
            {{ getYearError(startYear, endYear) }}
          </div>
        </div>
      </div>
      <!--具体的筛选内容-->
      <div id="filter-content" style="min-height: 400px;width:100%">
        <!--学者-->
        <div v-if="filters.authors.length !== 0" class="filter-wrapper">
          <div class="divider"></div>
          <div class="hint">
            Related Authors
          </div>
          <div class="options">
            <el-checkbox-group v-model="checkedAuthors">
              <el-checkbox
                v-for="(author, index) in filters.authors"
                :key="index"
                :label="author.name"
              >
                <span class="option">{{ author.name }}</span>
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <!--机构-->
        <div v-if="filters.affiliations.length !== 0" class="filter-wrapper">
          <div class="divider"></div>
          <div class="hint">
            Related Affiliations
          </div>
          <div class="options">
            <el-checkbox-group v-model="checkedAffiliations">
              <el-checkbox
                v-for="(affiliation, index) in filters.affiliations"
                :key="index"
                :label="affiliation.name"
              >
                <span class="option">{{ affiliation.name }} </span>
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <!--会议-->
        <div v-if="filters.journals.length !== 0" class="filter-wrapper">
          <div class="divider"></div>
          <div class="hint">
            Related Conferences
          </div>
          <div class="options">
            <el-checkbox-group v-model="checkedConferences">
              <el-checkbox
                v-for="(conference, index) in filters.conferences"
                :key="'conference-checkbox' + index"
                :label="conference.name"
              >
                <span class="option">{{ conference.name }}</span>
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <!--期刊-->
        <div v-if="filters.journals.length !== 0" class="filter-wrapper">
          <div class="divider"></div>
          <div class="hint">
            Related Journals
          </div>
          <div class="options">
            <el-checkbox-group v-model="checkedJournals">
              <el-checkbox
                v-for="(journal, index) in filters.journals"
                :key="'journal-checkbox' + index"
                :label="journal.name"
              >
                <span class="option">{{ journal.name }}</span>
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
    </div>
    <!--全部选完之后再进行filter-->
    <el-button
      type="primary"
      size="medium"
      round
      style="display: block; margin: 0 auto"
      @click="notifyFilterChanged"
    >
      Do Filter
    </el-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Checkbox, CheckboxGroup } from 'element-ui';
import { SearchFilterResponse } from '~/interfaces/responses/search/SearchFilterResponse';
import loadingConfig from '~/components/portrait/loadingConfig';
import { getBasicSearchFilterCondition } from '~/api';
import { SearchFilterChangedPayload } from '~/interfaces/components/search/SearchFilterComp';

const START_YEAR = '1963';
const END_YEAR = new Date().getFullYear().toString();

export default Vue.extend({
  name: 'SearchFilterComp',
  components: {
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup
  },
  props: {
    keyword: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 检验
      isError: false,
      // 筛选需要的属性
      // 时间与路由耦合
      startYear: this.$route.query.startYear as string,
      endYear: this.$route.query.endYear as string,
      filters: {
        authors: [] as string[],
        affiliations: [] as string[],
        conferences: [] as string[],
        journals: [] as string[]
      },
      checkedAuthors: [] as string[],
      checkedAffiliations: [] as string[],
      checkedConferences: [] as string[],
      checkedJournals: [] as string[]
    };
  },
  watch: {
    $route() {
      this.startYear = this.$route.query.startYear as string;
      this.endYear = this.$route.query.endYear as string;
      // 路由变化时更新filter
      this.getSearchFilter();
    }
  },
  mounted() {
    this.getSearchFilter();
  },
  methods: {
    // 根据关键字获取filter
    async getSearchFilter() {
      const loading = this.$loading(loadingConfig('#filter-content'));
      const filtersRes = await this.requestBasicSearchFilterCondition(
        this.keyword
      );
      this.filters = filtersRes.filters;
      loading.close();
    },
    async requestBasicSearchFilterCondition(keyword: string) {
      const res: { filters: SearchFilterResponse } = {
        // 设置默认值
        filters: {
          authors: [],
          affiliations: [],
          conferences: [],
          journals: []
        }
      };
      try {
        const filterResponse = await getBasicSearchFilterCondition({ keyword });
        res.filters = filterResponse.data;
      } catch (e) {
        this.$message.error(e.toString());
      }
      return res;
    },
    // 通知父组件filter数据发生了变化
    // 不与具体的逻辑耦合
    notifyFilterChanged() {
      this.$emit(
        'filter-change',
        this.isError
          ? { isValid: false }
          : ({
              isValid: true,
              startYear: Number(this.startYear),
              endYear: Number(this.endYear),
              authors: this.checkedAuthors,
              affiliations: this.checkedAffiliations,
              conferences: this.checkedConferences,
              journals: this.checkedJournals
            } as SearchFilterChangedPayload)
      );
    },
    // 表单验证
    getYearError(startYear: string, endYear: string) {
      let isYearError = false;
      const reg = new RegExp('^[0-9]*$');
      if (!reg.test(startYear) || !reg.test(endYear)) {
        isYearError = true;
      } else if (
        Number(startYear) > Number(endYear) ||
        Number(startYear) < 0 ||
        Number(endYear) < 0
      ) {
        isYearError = true;
      }
      // 在没有错误的情况下重置
      if (isYearError) {
        this.isError = true;
        return 'Invalid time range';
      } else {
        this.isError = false;
        return '';
      }
    },
    // 重置表单
    resetDate() {
      this.isError = false;
      this.startYear = START_YEAR;
      this.endYear = END_YEAR;
    },
    resetAllFields() {
      // 检验
      this.isError = false;
      // 筛选需要的属性
      this.startYear = START_YEAR;
      this.endYear = END_YEAR;
      this.filters = {
        authors: [],
        affiliations: [],
        conferences: [],
        journals: []
      };
      this.checkedAuthors = [];
      this.checkedAffiliations = [];
      this.checkedConferences = [];
      this.checkedJournals = [];
    },
    // 工具方法
    // 判断filter是否为空
    // 如果时间发生变动，不算是空
    isEmpty() {
      return (
        this.startYear === START_YEAR &&
        this.endYear === END_YEAR &&
        this.checkedAuthors.length === 0 &&
        this.checkedAffiliations.length === 0 &&
        this.checkedConferences.length === 0 &&
        this.checkedJournals.length === 0
      );
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';

/*每个选项一行*/
.el-checkbox {
  width: 100%;
}
</style>
