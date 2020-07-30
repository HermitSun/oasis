<template>
  <div class="searchPage-content__filter mobile-hidden">
    <span class="searchPage-content__sub-hint">Recommendation</span>
    <div class="filter">
      <div id="filter-content" style="min-height: 400px; width:100%">
        <!--学者-->
        <div v-loading="isAuthorsLoading" class="filter-wrapper">
          <div class="hint">
            Authors
          </div>
          <div v-if="!isAuthorsLoading && authors.length === 0">
            No Author Recommend
          </div>
          <div v-if="authors.length > 0" class="options authors">
            <ul>
              <li v-for="(author, i) of authors" :key="'author' + i">
                <p
                  class="name"
                  @click="
                    linkToAuthor({
                      id: author.authorId,
                      name: author.authorName
                    })
                  "
                >
                  {{ author.authorName }}
                </p>
                <p style="color: #909399">
                  <i style="color: black">from</i>
                  {{ author.affiliation || 'unknown' }}
                </p>
              </li>
            </ul>
          </div>
        </div>
        <!--机构-->
        <div v-loading="isAffiliationsLoading" class="filter-wrapper">
          <div class="divider"></div>
          <div class="hint">
            Affiliations
          </div>
          <div v-if="!isAffiliationsLoading && affiliations.length === 0">
            No Affiliation Recommend
          </div>
          <div v-if="affiliations.length > 0" class="options affiliations">
            <ul>
              <li
                v-for="(affiliation, i) of affiliations"
                :key="'affiliation' + i"
              >
                <span class="name" @click="linkToAffiliation(affiliation.name)">
                  {{ affiliation.name }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { AuthorInfo } from '~/interfaces/responses/search/SearchRecommendAuthorsResponse';
import { AffiliationInfo } from '~/interfaces/responses/search/SearchRecommendAffiliationsResponse';
import { getAffiliationInfo, getAuthorInfo } from '~/api';
import LinkToAuthor from '~/components/mixins/LinkToAuthor';

export default Vue.extend({
  name: 'SearchRecommendComp',
  mixins: [LinkToAuthor],
  props: {
    keyword: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isAuthorsLoading: false,
      authors: [] as AuthorInfo[],
      isAffiliationsLoading: false,
      affiliations: [] as AffiliationInfo[]
    };
  },
  watch: {
    // 搜索关键词变化时重新推荐
    // 降低灵敏度，减少性能损耗
    '$route.query.keyword'(cur, last) {
      console.log(cur, last);
      this.getAuthors();
      this.getAffiliations();
    }
  },
  mounted() {
    this.getAuthors();
    this.getAffiliations();
  },
  methods: {
    async getAuthors() {
      this.isAuthorsLoading = true;
      const authorsRes = await getAuthorInfo(this.keyword);
      this.authors = authorsRes.data.authors;
      this.isAuthorsLoading = false;
    },
    async getAffiliations() {
      this.isAffiliationsLoading = true;
      const affiliationsRes = await getAffiliationInfo(this.keyword);
      this.affiliations = affiliationsRes.data.affiliations;
      this.isAffiliationsLoading = false;
    },
    linkToAffiliation(name: string) {
      this.$router.push({
        path: '/portrait/affiliation',
        query: { name }
      });
    }
  }
});
</script>

<style scoped lang="less">
@import '../../stylesheets/index.less';

.authors {
  font-size: @search-item-author-font-size;
  color: @background-blue;
  margin-right: 5px;
  cursor: pointer;

  .name:hover {
    color: @bright-yellow;
  }
}

.affiliations {
  font-size: @search-item-author-font-size;
  color: @background-blue;
  margin-right: 5px;
  cursor: pointer;

  .name:hover {
    color: @bright-yellow;
  }
}
</style>
