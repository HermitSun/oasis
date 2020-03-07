<template>
  <div class="mask">
    <div class="mask-box absolute-center advanced-search__mask-box-size">
      <div class="mask-box-header">
        Advanced Search
        <span>
          <img
            src="../../assets/icon/icon-close.png"
            v-on:click="closeAdvancedSearch"
            alt="close"
          />
        </span>
      </div>
      <div class="advanced-search__mask-box-divider"></div>
      <div class="advanced-search__mask-content mask-box-content">
        <div class="item">
          <label>with all of the words </label>
          <div class="input">
            <input
              v-model="keyword"
              id="keyword"
              placeholder="e.g. Software"
              maxlength="33"
            />
            <div class="error">{{ getInputLengthError(keyword) }}</div>
          </div>
        </div>
        <div class="item">
          <label>return paper authored by</label>
          <div class="input">
            <input
              v-model="author"
              id="author"
              placeholder="e.g. M. Erwig"
              maxlength="33"
            />
            <div class="error">{{ getInputLengthError(author) }}</div>
          </div>
        </div>
        <div class="item">
          <label>return paper authored from</label>
          <div class="input">
            <input
              v-model="affiliation"
              id="affiliation"
              placeholder="e.g. UC Berkely"
              maxlength="33"
            />
            <div class="error">{{ getInputLengthError(affiliation) }}</div>
          </div>
        </div>
        <div class="item">
          <label>return papers published in</label>
          <div class="input">
            <input
              v-model="conferenceName"
              id="conferenceName"
              placeholder="e.g. ASE"
              maxlength="33"
            />
            <div class="error">{{ getInputLengthError(conferenceName) }}</div>
          </div>
        </div>
        <div class="item">
          <label>return papers dated between</label>
          <div class="input">
            <input
              v-model="startYear"
              id="startYear"
              style="width: 53px;margin-right: 5px"
              maxlength="4"
            />-<input
              v-model="endYear"
              id="endYear"
              style="width: 53px;margin-left: 5px"
              maxlength="4"
            />
            <div class="error">{{ getYearError(startYear, endYear) }}</div>
          </div>
        </div>
      </div>
      <button
        class="advanced-search__button"
        style="width:50px;float: right"
        @click="sendAdvancedSearch"
      >
        <img src="../../assets/icon/icon-search.png" width="20" alt="search" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AdvancedSearchComp",
  data() {
    return {
      author: "", // 作者
      affiliation: "", // 机构
      conferenceName: "", // 会议
      keyword: "", // 研究关键字
      startYear: "2001", // 开始日期
      endYear: "2020", // 结束日期
      isError: false
    };
  },
  methods: {
    async sendAdvancedSearch() {
      const defaultPage = "1";
      if (
        !(
          this.author === "" &&
          this.affiliation === "" &&
          this.conferenceName === "" &&
          this.keyword === ""
        ) &&
        !this.isError
      ) {
        this.$emit("close");
        await this.$router.push({
          path: "/search",
          query: {
            mode: "advanced",
            author: this.author,
            affiliation: this.affiliation, // 机构
            conferenceName: this.conferenceName, // 会议
            keyword: this.keyword, // 研究关键字
            startYear: this.startYear, // 开始日期
            endYear: this.endYear, // 结束日期
            page: defaultPage
          }
        });
      }
    },

    closeAdvancedSearch() {
      this.$emit("close");
    },

    getInputLengthError(input: string): string {
      if (input.length > 32) {
        this.isError = true;
        return "limit queries to 32 words";
      }
      this.isError = false;
      return "";
    },
    getYearError(startYear: string, endYear: string): string {
      let isYearError = false;
      const reg = new RegExp("^[0-9]*$");
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
        return "Invalid time range";
      }
      return "";
    }
  }
});
</script>

<style scoped lang="less">
@import "../../../src/stylesheets/index.less";
</style>
