<template>
  <div>
    <!--AdvancedSearchComp-->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { advancedSearch } from "@/api";

export default Vue.extend({
  name: "AdvancedSearchComp",
  methods: {
    async requestAdvancedSearch() {
      const advancedSearchRes = await advancedSearch({
        author: "123", // 作者
        affiliation: "123", // 机构
        conferenceName: "123", // 会议
        keyword: "123", // 研究关键字
        page: 1
      });
      console.log(advancedSearchRes);
    }
  }
});
</script>

<style scoped></style>
