<template>
  <div class="mask">
    <div class="mask-box absolute-center advanced-search__mask-box-size">
      <!--关闭-->
      <div class="mask-box-header">
        Advanced Search
        <span>
          <img
            style="cursor: pointer"
            src="~/assets/icon/icon-close.png"
            alt="close"
            @click="closeAdvancedSearch"
          />
        </span>
      </div>
      <div class="advanced-search__mask-box-divider"></div>
      <!--搜索框-->
      <div class="advanced-search__mask-content mask-box-content">
        <!--关键词 (title + abstract)-->
        <div class="item">
          <label>with all of the words </label>
          <div class="input">
            <input
              v-model="keyword"
              placeholder="e.g. Software"
              maxlength="33"
              aria-label="advanced-search-keyword"
            />
            <div class="error">
              {{ getInputLengthError(keyword) }}
            </div>
          </div>
        </div>
        <!--学者姓名-->
        <div class="item">
          <label>return paper authored by</label>
          <div class="input">
            <input
              v-model="author"
              placeholder="e.g. Frede Blaabjerg"
              maxlength="33"
              aria-label="advanced-search-author"
            />
            <div class="error">
              {{ getInputLengthError(author) }}
            </div>
          </div>
        </div>
        <!--机构名称-->
        <div class="item">
          <label>return paper authored from</label>
          <div class="input">
            <input
              v-model="affiliation"
              placeholder="e.g. UC Berkely"
              maxlength="33"
              aria-label="advanced-search-affiliation"
            />
            <div class="error">
              {{ getInputLengthError(affiliation) }}
            </div>
          </div>
        </div>
        <!--出版位置-->
        <div class="item">
          <label>return papers published in</label>
          <div class="input">
            <input
              v-model="publicationName"
              placeholder="e.g. ASE"
              maxlength="33"
              aria-label="advanced-search-publicationName"
            />
            <div class="error">
              {{ getInputLengthError(publicationName) }}
            </div>
          </div>
        </div>
        <!--研究方向-->
        <div class="item">
          <label>with in the field of </label>
          <div class="input">
            <input
              v-model="field"
              placeholder="e.g. Optimization"
              maxlength="33"
              aria-label="advanced-search-field"
            />
            <div class="error">
              {{ getInputLengthError(field) }}
            </div>
          </div>
        </div>
        <!--日期-->
        <div class="item">
          <label>return papers dated between</label>
          <div class="input">
            <input
              v-model="startYear"
              style="width: 67px;margin-right: 5px"
              maxlength="4"
              aria-label="advanced-search-startYear"
            />-<input
              v-model="endYear"
              style="width: 67px;margin-left: 5px"
              maxlength="4"
              aria-label="advanced-search-endYear"
            />
            <div class="error">
              {{ getYearError(startYear, endYear) }}
            </div>
          </div>
        </div>
      </div>
      <!--搜索-->
      <button
        class="advanced-search__button"
        style="width:50px;float: right"
        @click="sendAdvancedSearch"
      >
        <img src="~/assets/icon/icon-search.png" width="20" alt="search" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AdvancedSearchComp',
  data() {
    return {
      keyword: this.$route.query.keyword ? this.$route.query.keyword : '', // 泛化关键字
      author: this.$route.query.author ? this.$route.query.author : '', // 作者
      affiliation: this.$route.query.affiliation
        ? this.$route.query.affiliation
        : '', // 机构
      publicationName: this.$route.query.publicationName
        ? this.$route.query.publicationName
        : '', // 会议|期刊
      field: this.$route.query.field ? this.$route.query.field : '', // 研究关键字
      startYear: this.$route.query.startYear
        ? this.$route.query.startYear
        : '1963', // 开始日期
      endYear: this.$route.query.endYear ? this.$route.query.endYear : '2020', // 结束日期
      isError: false
    };
  },
  methods: {
    sendAdvancedSearch() {
      const defaultPage = '1';
      const isInputEmpty =
        this.keyword === '' &&
        this.author === '' &&
        this.affiliation === '' &&
        this.publicationName === '' &&
        this.field === '';
      const isInputValid = !isInputEmpty && !this.isError;
      if (isInputValid) {
        this.$emit('close');
        this.$router.push({
          path: '/search/advanced',
          query: {
            keyword: this.keyword, // 泛化关键字
            author: this.author,
            affiliation: this.affiliation, // 机构
            publicationName: this.publicationName, // 会议
            field: this.field, // 研究关键字
            startYear: this.startYear, // 开始日期
            endYear: this.endYear, // 结束日期
            page: defaultPage,
            // 需要增加sortKey
            sortKey: 'related'
          }
        });
      }
    },

    closeAdvancedSearch() {
      this.$emit('close');
    },

    getInputLengthError(input: string) {
      if (input.length > 32) {
        this.isError = true;
        return 'limit queries to 32 words';
      }
      this.isError = false;
      return '';
    },
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
      if (isYearError) {
        this.isError = true;
        return 'Invalid time range';
      }
      return '';
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>
