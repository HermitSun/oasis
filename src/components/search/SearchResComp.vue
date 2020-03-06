<template>
  <div class="searchPage-item">
    <div class="title">
      <a :href="res.link" class="title" target="_blank">{{ res.title }}</a>
    </div>
    <div>
      <span
        v-for="(author, index) in res.authors"
        :key="index"
        class="author"
        style="margin-right: 5px"
        >{{ author }}
      </span>
      <span class="info" style="margin-left:10px"
        >{{ res.conferenceName }}
        <span style="margin-left: 1px">{{ res.publicationYear }}</span>
      </span>
    </div>
    <div class="abstract">{{ res._abstract }}</div>
    <div class="divider"></div>
    <!--关键词-->
    <div style="min-height: 15px">
      <!--没有关键词的时候不显示-->
      <template v-if="res.keywords && res.keywords.length > 0">
        <span style="margin-right: 10px">keywords:</span>
        <span
          v-for="(keyword, index) in res.keywords"
          :key="index"
          class="keyword"
          style="margin-right: 5px"
          >{{ keyword }}
        </span>
      </template>
      <!--展示参考文献-->
      <span
        style="float: right; cursor: pointer"
        class="detail-hint"
        @click="showReferences"
        >show reference</span
      >
    </div>
    <!--参考文献内容-->
    <div v-if="showReference" style="margin-top:5px">
      <div v-for="(ref, index) in references" :key="index" class="reference">
        <span
          :style="index === 0 ? {} : { color: 'transparent' }"
          style="margin-right: 5px"
          >references:</span
        ><a :href="ref.googleScholarLink" target="_blank">{{ ref.title }}</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { SearchReference } from "@/interfaces/responses/search/SearchResponse";
import { getReferenceById } from "@/api";
import { StatusCode } from "@/enums/status-code";

export default Vue.extend({
  name: "SearchResComp",
  props: {
    res: Object
  },
  data() {
    return {
      showReference: false,
      references: [] as SearchReference[] // 手动获取references
    };
  },
  methods: {
    // 展示参考文献
    showReferences() {
      this.showReference = !this.showReference;
      this.getReferences(this.res.id);
    },
    // 手动获取参考文献
    async getReferences(paperId: string) {
      try {
        const referRes = await getReferenceById(paperId);
        if (referRes && referRes.code === StatusCode.OK) {
          this.references = referRes.data;
        } else {
          this.$message.error(referRes.msg);
        }
      } catch (e) {
        this.$message.error(e.toString());
      }
    }
  }
});
</script>

<style scoped lang="less">
@import "../../../src/stylesheets/index.less";
</style>
