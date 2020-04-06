<template>
  <div class="mask">
    <div class="mask-box absolute-center advanced-search__mask-box-size">
      <div class="mask-box-header">
        Advanced Search
        <span>
          <img
            src="~/assets/icon/icon-close.png"
            alt="close"
            @click="closeAdvancedSearch"
          />
        </span>
      </div>
      <div class="advanced-search__mask-box-divider"></div>
      <div class="advanced-search__mask-content mask-box-content">
        <div class="item">
          <label>with all of the words </label>
          <div class="input">
            <input
              id="keyword"
              v-model="keyword"
              placeholder="e.g. Software"
              maxlength="33"
            />
            <div class="error">
              {{ getInputLengthError(keyword) }}
            </div>
          </div>
        </div>
        <div class="item">
          <label>return paper authored by</label>
          <div class="input">
            <input
              id="author"
              v-model="author"
              placeholder="e.g. M. Erwig"
              maxlength="33"
            />
            <div class="error">
              {{ getInputLengthError(author) }}
            </div>
          </div>
        </div>
        <div class="item">
          <label>return paper authored from</label>
          <div class="input">
            <input
              id="affiliation"
              v-model="affiliation"
              placeholder="e.g. UC Berkely"
              maxlength="33"
            />
            <div class="error">
              {{ getInputLengthError(affiliation) }}
            </div>
          </div>
        </div>
        <div class="item">
          <label>return papers published in</label>
          <div class="input">
            <input
              id="publicationName"
              v-model="publicationName"
              placeholder="e.g. ASE"
              maxlength="33"
            />
            <div class="error">
              {{ getInputLengthError(publicationName) }}
            </div>
          </div>
        </div>
        <div class="item">
          <label>return papers dated between</label>
          <div class="input">
            <input
              id="startYear"
              v-model="startYear"
              style="width: 67px;margin-right: 5px"
              maxlength="4"
            />-<input
              id="endYear"
              v-model="endYear"
              style="width: 67px;margin-left: 5px"
              maxlength="4"
            />
            <div class="error">
              {{ getYearError(startYear, endYear) }}
            </div>
          </div>
        </div>
      </div>
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
      author: '', // 作者
      affiliation: '', // 机构
      publicationName: '', // 会议|期刊
      keyword: '', // 研究关键字
      startYear: '2001', // 开始日期
      endYear: '2020', // 结束日期
      isError: false
    };
  },
  methods: {
    async sendAdvancedSearch() {
      const defaultPage = '1';
      if (
        !(
          this.author === '' &&
          this.affiliation === '' &&
          this.publicationName === '' &&
          this.keyword === ''
        ) &&
        !this.isError
      ) {
        this.$emit('close');
        await this.$router.push({
          path: '/search',
          query: {
            mode: 'advanced',
            author: this.author,
            affiliation: this.affiliation, // 机构
            publicationName: this.publicationName, // 会议
            keyword: this.keyword, // 研究关键字
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
