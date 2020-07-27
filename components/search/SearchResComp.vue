<template>
  <div class="searchPage-item">
    <div class="title">
      <a
        :href="res.link"
        class="title"
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <!--高亮-->
        <div v-html="filterHTML(res.title)"></div>
      </a>
    </div>
    <div class="info">
      <!--作者 跳转到学者画像-->
      <!--高亮-->
      <span v-for="(author, index) in res.authors" :key="index" class="author">
        <span
          class="name"
          style="margin-right: 8px"
          @click="linkToAuthor(author)"
          v-html="filterHTML(author.name)"
        ></span>
      </span>
      <!--发布时间、机构-->
      <el-button
        plain
        size="mini"
        style="margin-left: 5px"
        @click="jumpToContentPortrait(res.contentType, res.publicationName)"
      >
        <span>{{ res.publicationName }} </span>
        <span style="margin-left: 1px"> {{ res.publicationYear }}</span>
      </el-button>
    </div>
    <template>
      <div class="bookmark">
        <span class="hint">Citation:</span>
        <span class="count">{{ res.metrics.citationCountPaper }}</span>
      </div>
      <div class="bookmark" style="margin-top:40px">
        <span class="hint">Downloads:</span>
        <span class="count">{{ res.metrics.totalDownloads }}</span>
      </div>
    </template>
    <div class="abstract-wrapper">
      <div class="hint" style="margin-right: 16px">
        abstract:
      </div>
      <!--高亮-->
      <div class="abstract" v-html="filterHTML(res._abstract)"></div>
    </div>
    <div class="divider"></div>
    <!--关键词-->
    <div
      style="min-height: 25px"
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
        <el-row class="keyword-inner-wrapper">
          <el-button
            v-for="(keyword, index) in res.keywords"
            :key="index"
            size="mini"
            plain
            @click="jumpToKeywordPortrait(keyword)"
          >
            {{ keyword }}
          </el-button>
        </el-row>
      </span>
      <!--展示参考文献-->
      <span style=" cursor: pointer" class="detail-hint"
        ><el-button type="text" @click="showReferences">
          {{ showReference ? 'hide reference' : 'show reference' }}
        </el-button>
      </span>
    </div>
    <!--引用情况-->
    <!--<div class="citation-wrapper">-->
    <!--<div style="margin-right: 24px" class="hint">-->
    <!--citation:-->
    <!--</div>-->
    <!--<div class="citation-inner-wrapper">-->
    <!--<div class="citation">-->
    <!--By Paper:-->
    <!--<span class="number">{{ res.metrics.citationCountPaper }}</span>-->
    <!--</div>-->
    <!--<div class="citation">-->
    <!--By Patent:-->
    <!--<span class="number">{{ res.metrics.citationCountPatent }}</span>-->
    <!--</div>-->
    <!--<div class="citation">-->
    <!--By Download:<span class="number">{{-->
    <!--res.metrics.totalDownloads-->
    <!--}}</span>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--参考文献内容-->
    <div v-if="showReference" style="margin-top:5px">
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
              rel="noopener noreferrer nofollow"
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
import { Row, Tag } from 'element-ui';
import { filterXSS } from 'xss';
import { getReferenceById } from '~/api';
import { SearchReference } from '~/interfaces/responses/search/SearchResponse';
import LinkToAuthor from '~/components/mixins/LinkToAuthor';

export default Vue.extend({
  name: 'SearchResComp',
  components: {
    [Row.name]: Row,
    [Tag.name]: Tag
  },
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
    // 对HTML进行过滤
    filterHTML(html: string) {
      return filterXSS(html);
    },
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
@font-highlight: #dd4b39;
@bright-yellow: #edc22c;

.searchPage-item {
  .title {
    em {
      font-weight: bold;
      color: @font-highlight;
    }
  }

  .name {
    em {
      font-weight: bold;
      color: @font-highlight;
    }

    &:hover {
      em {
        color: @bright-yellow;
      }
    }
  }

  .abstract {
    em {
      font-weight: bold;
      color: @font-highlight;
    }
  }
}
</style>
