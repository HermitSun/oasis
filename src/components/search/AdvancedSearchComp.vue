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
      <button
        class="advanced-search__button"
        style="width:50px"
        @click="sendAdvancedSearch"
      >
        <img src="../../assets/icon/icon-search.png" width="20" alt="search" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { advancedSearch } from "@/api";

export default Vue.extend({
  name: "AdvancedSearchComp",
  data() {
    return {
      author: "1", // 作者
      affiliation: "1", // 机构
      conferenceName: "1", // 会议
      keyword: "1", // 研究关键字
      startYear: "1", // 开始日期
      endYear: "1" // 结束日期
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
        )
      ) {
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
    }
  }
});
</script>

<style scoped lang="less">
@import "../../../src/stylesheets/index.less";
</style>
