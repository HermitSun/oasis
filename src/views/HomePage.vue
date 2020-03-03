<template>
  <div class="homepage-header">
    <img src="../assets/logo.png" class="homepage-header__logo" alt="oasis" />
    <AdvancedSearchComp></AdvancedSearchComp>
    <label>
      <input
        class="basic-search__input"
        type="text"
        style="margin-top: 25px;"
        v-model="keyword"
        @keyup.enter="sendBasicSearch"
      />
    </label>
    <div class="flex-center-row" style="margin-top: 15px">
      <button class="basic-search__button">OASIS搜索</button>
      <div style="width: 15px"></div>
      <button>高级搜索</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AdvancedSearchComp from "@/components/search/AdvancedSearchComp.vue";

export default Vue.extend({
  name: "Homepage",
  components: {
    AdvancedSearchComp
  },
  data() {
    return {
      keyword: ""
    };
  },
  methods: {
    async sendBasicSearch() {
      // TODO 判断搜索字符是否为空
      const defaultPage = "1";
      if (this.keyword !== "") {
        await this.$router.push({
          path: "/search",
          query: {
            mode: "basic",
            keyword: this.keyword,
            page: defaultPage
          }
        });
      }
    }
  }
});
</script>

<style scoped lang="less">
@import "../../src/stylesheets/index.less";

.homepage-header {
  .flex-center-column;
  background: @background-blue;
  height: @homepage-header-height;
}

.homepage-header .homepage-header__logo {
  width: 30%;
}
</style>
