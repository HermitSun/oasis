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
          <input v-model="keyword" id="keyword" placeholder="e.g. Software" />
        </div>
        <div class="item">
          <label>return paper authored by</label>
          <input v-model="author" id="author" placeholder="e.g. M. Erwig" />
        </div>
        <div class="item">
          <label>return paper authored from</label>
          <input
            v-model="affiliation"
            id="affiliation"
            placeholder="e.g. UC Berkely"
          />
        </div>
        <div class="item">
          <label>return papers published in</label>
          <input
            v-model="conferenceName"
            id="conferenceName"
            placeholder="e.g. IEEE"
          />
        </div>
        <div class="item">
          <label>return papers dated between</label>
          <input
            v-model="startYear"
            id="startYear"
            style="width: 53px;margin-right: 5px"
            size="4"
          />-<input
            v-model="endYear"
            id="endYear"
            style="width: 53px;margin-left: 5px"
            size="4"
          />
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
      endYear: "2020" // 结束日期
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
