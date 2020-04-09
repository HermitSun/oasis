<template>
  <div class="searchPage-item">
    <div class="title">
      <a
        :href="res.link"
        class="title"
        target="_blank"
        rel="noopener noreferrer"
      >
        <!--高亮-->
        <!--TODO:对后端返回内容的校验-->
        <div v-html="res.title"></div>
      </a>
    </div>
    <div>
      <!--跳转到学者画像-->
      <!--高亮-->
      <span
        v-for="(author, index) in res.authors"
        :key="index"
        class="author"
        style="margin-right: 5px"
        @click="linkToAuthor(author)"
        v-html="author.name"
      >
      </span>
      <span class="info">
        <span
          class="publicationName"
          @click="jumpToContentPortrait(res.contentType, res.publicationName)"
          >{{ res.publicationName }}</span
        >
        <span style="margin-left: 1px">{{ res.publicationYear }}</span>
      </span>
    </div>
    <div class="abstract">
      <!--高亮-->
      <div v-html="res._abstract"></div>
    </div>
    <div class="divider"></div>
    <!--关键词-->
    <div
      style="min-height: 15px"
      :class="
        res.keywords && res.keywords.length > 0 ? 'flex-space-between' : ''
      "
    >
      <!--没有关键词的时候不显示-->
      <span
        v-if="res.keywords && res.keywords.length > 0"
        class="keyword-wrapper"
      >
        <div style="margin-right: 10px" class="hint">keywords:</div>
        <div class="keyword-inner-wrapper">
          <span
            v-for="(keyword, index) in res.keywords"
            :key="index"
            class="keyword"
            style="margin-right: 5px"
            @click="jumpToKeywordPortrait(keyword)"
          >
            {{ keyword }}
          </span>
        </div>
      </span>
      <!--展示参考文献-->
      <span
        style=" cursor: pointer"
        class="detail-hint"
        @click="showReferences"
      >
        show more
      </span>
    </div>
    <!--参考文献内容-->
    <div v-if="showReference" style="margin-top:5px">
      <div class="citation-wrapper">
        <div style="margin-right: 24px" class="hint">
          citation:
        </div>
        <div class="citation-inner-wrapper">
          <div class="citation">
            By Paper:
            <span class="number">{{ res.metrics.citationCountPaper }}</span>
          </div>
          <div class="citation">
            By Patent:
            <span class="number">{{ res.metrics.citationCountPatent }}</span>
          </div>
          <div class="citation">
            By Download:<span class="number">{{
              res.metrics.totalDownloads
            }}</span>
          </div>
        </div>
      </div>
      <div v-if="references.length !== 0" class="reference-wrapper">
        <div style="margin-right: 5px" class="hint">
          references:
        </div>
        <div>
          <div
            v-for="(ref, index) in references"
            :key="index"
            class="reference"
          >
            <span style="font-size: 12px;margin-right: 3px">{{
              index + 1
            }}</span>
            <a
              :href="ref.googleScholarLink"
              target="_blank"
              rel="noopener noreferrer"
              >{{ ref.title }}</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getReferenceById } from '~/api';
import { SearchReference } from '~/interfaces/responses/search/SearchResponse';
import LinkToAuthor from '~/components/mixins/LinkToAuthor';

export default Vue.extend({
  name: 'SearchResComp',
  mixins: [LinkToAuthor],
  props: {
    res: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      showReference: false,
      references: [] as SearchReference[], // 手动获取references,
      cachedReferences: [] as SearchReference[] // 缓存
    };
  },
  methods: {
    // 展示参考文献
    showReferences() {
      this.showReference = !this.showReference;
      // 没有缓存的时候去后端请求
      if (this.cachedReferences.length === 0) {
        this.getReferences(this.res.id);
      } else {
        this.references = this.cachedReferences;
      }
    },
    jumpToKeywordPortrait(keyword: string) {
      this.$router.push({
        path: '/portrait/keyword',
        query: { keyword }
      });
    },
    jumpToContentPortrait(contentType: string, content: string) {
      if (contentType === 'conferences') {
        this.$router.push({
          path: '/portrait/conference',
          query: {
            conference: content
          }
        });
      } else if (contentType === 'periodicals') {
        this.$router.push({
          path: '/portrait/journal',
          query: {
            journal: content
          }
        });
      }
    },
    // 手动获取参考文献
    async getReferences(paperId: string) {
      try {
        const referRes = await getReferenceById(paperId);
        this.references = referRes.data;
        // 加入缓存
        this.cachedReferences.splice(0, this.cachedReferences.length - 1);
        this.cachedReferences.push(...referRes.data);
      } catch (e) {
        this.$message.error(e.toString());
      }
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';
</style>

<style lang="less">
/* 只能通过这种比较原始的方式向v-html解析的内容增加样式 */
.searchPage-item {
  .title {
    em,
    font {
      font-weight: bold;
      color: #dd4b39;
    }

    &:hover {
      em,
      font {
        color: #edc22c;
      }
    }
  }
}
</style>
