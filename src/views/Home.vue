<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Vue from "vue";
import { basicSearch, advancedSearch } from "../api";

export default Vue.extend({
  name: "Home",
  components: { HelloWorld },
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
