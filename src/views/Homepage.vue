<template>
  <div>
    OASIS
  </div>
</template>

<script lang="ts">
import { basicSearch, advancedSearch } from "../api";
import Vue from "vue";
export default Vue.extend({
  name: "Homepage",
  async mounted() {
    const basicSearchRes = await basicSearch({ keyword: "keyword", page: 1 });
    console.log(basicSearchRes);
    const advancedSearchRes = await advancedSearch({
      author: "123", // 作者
      affiliation: "123", // 机构
      conferenceName: "123", // 会议
      keyword: "123", // 研究关键字
      page: 1
    });
    console.log(advancedSearchRes.data);
  }
});
</script>

<style scoped></style>
